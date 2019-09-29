import { Express, Response, NextFunction, Request } from "express"
import passport from "passport"
import passportGoogle from "passport-google-oauth"
import { User, GoogleProfile, UserRequest, ClientResponse } from "../../global"
import { to } from "await-to-js"
import jwt from "jsonwebtoken"
import { login } from "./jwt"

import { getUserByGoogleId, createUser } from "../database/user"

const GoogleStrategy = passportGoogle.OAuth2Strategy

const createStrategy = (app: Express) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`
      },
      async (accessToken: string, refreshToken: string, profile: GoogleProfile, done) => {
        let [err, user] = await to(getUserByGoogleId(profile.id))
        if (err || user) {
          return done(err, user)
        }

        const verifiedEmail = profile.emails.find(email => email.verified) || profile.emails[0]

        const [createdError, createdUser] = await to(
          createUser(<User>{
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: verifiedEmail.value,
            password: null
          })
        )

        return done(createdError, createdUser)
      }
    )
  )

  app.get(
    `${process.env.BASE_API_URL}/auth/google`,
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    })
  )

  app.get(
    `${process.env.BASE_API_URL}/auth/google/callback`,
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req: UserRequest, res: Response) => {
      const token = jwt.sign({ data: req.user }, process.env.JWT_SECRET, {
        expiresIn: 604800
      })

      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true
        })
        .redirect("/getting-started")
    }
  )
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login")
  }

  next()
}

const logout = (req: Request) => {
  req.logout()
}

export { isAuthenticated, createStrategy, logout }
