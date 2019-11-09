import { Express, Response, NextFunction, Request } from "express"
import passport from "passport"
import passportFacebook, { StrategyOptionWithRequest, Profile } from "passport-facebook"
import { to } from "await-to-js"

import { User, UserRequest } from "../../../global"
import { getUserByProviderId, createUser } from "../../database/user"
import { signToken, getRedirectUrl } from "../utils"
import { ROLES } from "../../../utils/roles"

const FacebookStrategy = passportFacebook.Strategy

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
  const strategyOptions: StrategyOptionWithRequest = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/facebook/callback`,
    profileFields: ["id", "displayName", "emails"],
    passReqToCallback: true
  }

  const verifyCallback = async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done
  ) => {
    let [err, user] = await to(getUserByProviderId(profile.id))
    if (err || user) {
      return done(err, user)
    }

    try {
      const [createdError, createdUser] = await to(
        createUser(<User>{
          providerId: profile.id,
          provider: profile.provider,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          role: getRole(req),
          password: null
        })
      )

      return done(createdError, createdUser)
    } catch (error) {
      return done(error, null)
    }
  }

  passport.use(new FacebookStrategy(strategyOptions, verifyCallback))

  app.get(
    `${process.env.BASE_API_URL}/auth/facebook`,
    (req: Request, res: Response, next: NextFunction) =>
      passport.authenticate("facebook", {
        scope: ["email"],
        state: req.query.type || "Customer"
      })(req, res, next)
  )

  app.get(
    `${process.env.BASE_API_URL}/auth/facebook/callback`,
    passport.authenticate("facebook", { failureRedirect: "/login" }),
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
