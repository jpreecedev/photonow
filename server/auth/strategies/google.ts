import { Express, Request, Response, NextFunction } from "express"
import passport from "passport"
import passportGoogle from "passport-google-oauth"
import { to } from "await-to-js"

import { User, GoogleProfile, UserRequest } from "../../../global"
import { getUserByProviderId, createUser } from "../../database/user"
import { signToken, getRedirectUrl } from "../utils"
import { ROLES } from "../../../utils/roles"

const GoogleStrategy = passportGoogle.OAuth2Strategy

const getRole = (req: Request) => {
  if (!req.query || !req.query.state) {
    return ROLES.Customer
  }

  let role = `${req.query.state.substring(0, 1).toUpperCase()}${req.query.state
    .substring(1)
    .toLowerCase()}`

  switch (role) {
    case ROLES.Photographer:
      return ROLES.Photographer
    default:
      return ROLES.Customer
  }
}

const strategy = (app: Express) => {
  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`,
    passReqToCallback: true
  }

  const verifyCallback = async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done
  ) => {
    let [err, user] = await to(getUserByProviderId(profile.id))
    if (err || user) {
      return done(err, user)
    }

    const verifiedEmail = profile.emails.find(email => email.verified) || profile.emails[0]

    const [createdError, createdUser] = await to(
      createUser(<User>{
        provider: profile.provider,
        providerId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: verifiedEmail.value,
        role: getRole(req),
        password: null
      })
    )

    return done(createdError, createdUser)
  }

  passport.use(new GoogleStrategy(strategyOptions, verifyCallback))

  app.get(
    `${process.env.BASE_API_URL}/auth/google`,
    (req: Request, res: Response, next: NextFunction) =>
      passport.authenticate("google", {
        state: req.query.type,
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email"
        ]
      })(req, res, next)
  )

  app.get(
    `${process.env.BASE_API_URL}/auth/google/callback`,
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req: UserRequest, res: Response) => {
      return res
        .status(200)
        .cookie("jwt", signToken(req.user))
        .redirect(getRedirectUrl(req.user))
    }
  )

  return app
}

export { strategy }
