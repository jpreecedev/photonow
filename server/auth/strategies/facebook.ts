import { Express, Response } from "express"
import passport from "passport"
import passportFacebook from "passport-facebook"
import { to } from "await-to-js"

import { User, FacebookProfile, UserRequest, UserRoles } from "../../../global"
import { getUserByProviderId, createUser } from "../../database/user"
import { signToken, getRedirectUrl } from "../utils"

const FacebookStrategy = passportFacebook.Strategy

const strategy = (app: Express) => {
  const strategyOptions = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/facebook/callback`,
    profileFields: ["id", "displayName", "name", "emails"]
  }

  const verifyCallback = async (
    accessToken: string,
    refreshToken: string,
    profile: FacebookProfile,
    done
  ) => {
    let [err, user] = await to(getUserByProviderId(profile.id))
    if (err || user) {
      return done(err, user)
    }

    const [createdError, createdUser] = await to(
      createUser(<User>{
        providerId: profile.id,
        provider: profile.provider,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        role: UserRoles.Customer,
        password: null
      })
    )

    return done(createdError, createdUser)
  }

  passport.use(new FacebookStrategy(strategyOptions, verifyCallback))

  app.get(`${process.env.BASE_API_URL}/auth/facebook`, passport.authenticate("facebook"))

  app.get(
    `${process.env.BASE_API_URL}/auth/facebook/callback`,
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    (req: UserRequest, res: Response) => {
      return res
        .status(200)
        .cookie("jwt", signToken(req.user), {
          httpOnly: true
        })
        .redirect(getRedirectUrl(req.user.role))
    }
  )

  return app
}

export { strategy }
