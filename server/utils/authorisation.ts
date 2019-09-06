import { Response, NextFunction, Request } from "express"
import bcrypt from "bcrypt"
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth"
import { to } from "await-to-js"
import { LogInRequest, LogOutRequest, User, UserRequest } from "../../global"

import {
  AuthorisationUser,
  AuthenticatedRequest,
  UserAuthorisationRequest,
  Token
} from "../../global"
import { UserModel } from "../database/schema"
import { errorHandler, authorisation } from "../utils"

const isAuthenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect("/login")
}

const isAuthorised = (
  req: UserAuthorisationRequest,
  res: Response,
  next: NextFunction
) => {
  const provider = req.path.split("/").slice(-1)[0]
  const token = req.user.data.tokens.find((token: Token) => token.kind === provider)
  if (token) {
    return next()
  }

  res.redirect(`/auth/${provider}`)
}

const check = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.status(500).send("You are already signed in!")
  }
  return next()
}

const verifyPassword = (candidate: string, actual: string) => {
  return bcrypt.compare(candidate, actual)
}

const promisifiedPassportAuthentication = (
  req: Request,
  res: Response
): Promise<User> => {
  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user: User, info) => {
      if (err) {
        return reject(err)
      }
      return resolve(user)
    })(req, res)
  })
}

const promisifiedPassportLogin = (req: LogInRequest, user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    req.logIn(user, (err, user, info) => {
      if (err) {
        return reject(err)
      }
      return resolve(user)
    })
  })
}

const promisifiedPassportLogout = (req: LogOutRequest) => {
  return new Promise((resolve, reject) => {
    req.logout()
    req.session.destroy((err: any) => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

const applyMiddleware = () => {
  passport.serializeUser((user: AuthorisationUser, done) => done(null, user.data._id))

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id).exec()
      return done(null, user)
    } catch (err) {
      errorHandler.handle(err)
      return done(err, null)
    }
  })

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      async (email, password, done) => {
        let [error, user] = await to(
          UserModel.findOne({
            email: email.toLowerCase()
          }).exec()
        )

        if (error) {
          return done(error)
        }

        if (!user) {
          return done(`Email ${email} not found.`)
        }

        let [err, matched] = await to(
          authorisation.verifyPassword(password, user.password)
        )

        if (err) {
          return done(err)
        }

        if (matched) {
          return done(null, user)
        }

        return done("Invalid credentials.")
      }
    )
  )

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_ID,
  //       clientSecret: process.env.GOOGLE_SECRET,
  //       callbackURL: `${process.env.SERVER_URL || ""}/auth/google/callback`,
  //       passReqToCallback: true
  //     },
  //     async (req, accessToken, refreshToken, profile, done) => {
  //       // checking for linked accounts
  //       let [error, existingUser] = await to(
  //         UserModel.findOne({
  //           google: profile.id
  //         }).exec()
  //       )

  //       if (error) {
  //         return done(error)
  //       }

  //       if (existingUser) {
  //         if (req.user) {
  //           req.session.message = {
  //             msg: "This Google account is already linked.",
  //             error: true
  //           }

  //           return done(null, false)
  //         }

  //         return done(null, new User(existingUser))
  //       }

  //       if (req.user) {
  //         // linking Google with existing logged in account
  //         let user = new User(req.user.data)
  //         user.data.google = profile.id
  //         user.data.tokens.push({
  //           kind: "google",
  //           accessToken
  //         })

  //         // not overwriting existing profile values
  //         user.data.profile = user.data.profile || {}
  //         user.data.profile.name = user.data.profile.name || profile.displayName
  //         user.data.profile.gender = user.data.profile.gender || profile._json.gender
  //         user.data.profile.picture = user.data.profile.picture || profile._json.picture

  //         // save user
  //         let [linkError, linkedUser] = await to(user.saveUser())

  //         if (linkError) {
  //           return done(linkError)
  //         }

  //         let [err] = await to(_promisifiedPassportLogin(req, linkedUser))

  //         if (err) {
  //           req.session.message = {
  //             msg: "Internal server error.",
  //             error: true
  //           }

  //           return done(null, false)
  //         }

  //         // Google linked successfully
  //         req.session.message = {
  //           msg: "Google successfully linked!",
  //           error: false
  //         }
  //         return done(null, user)
  //       }

  //       // create new user
  //       let user = new User()
  //       user._meta.noPassword = true
  //       user.data.email = profile.emails[0].value
  //       user.data.google = profile.id
  //       user.data.tokens.push({
  //         kind: "google",
  //         accessToken
  //       })

  //       // initiating profile if not existent
  //       user.data.profile = user.data.profile || {}
  //       user.data.profile.name = profile.displayName
  //       user.data.profile.gender = profile._json.gender
  //       user.data.profile.picture = profile._json.picture
  //       let [creationError, createdUser] = await to(user.saveUser())

  //       if (creationError) {
  //         if (creationError.code == 11000) {
  //           req.session.message = {
  //             msg: "This email account is already in use!",
  //             error: true
  //           }

  //           return done(null, false)
  //         } else {
  //           req.session.message = {
  //             msg: "Internal server error.",
  //             error: true
  //           }

  //           return done(null, false)
  //         }
  //       }

  //       // created a new account via Google
  //       req.session.message = {
  //         msg: "Created a new account via Google!",
  //         error: false
  //       }
  //       return done(null, createdUser)
  //     }
  //   )
  // )

  // const _promisifiedPassportLogin = (req, user) => {
  //   return new Promise((resolve, reject) => {
  //     req.logIn(user, (err, user, info) => {
  //       if (err) {
  //         return reject(err)
  //       }
  //       return resolve(user)
  //     })
  //   })
  // }
}

export {
  isAuthenticated,
  isAuthorised,
  verifyPassword,
  applyMiddleware,
  promisifiedPassportAuthentication,
  promisifiedPassportLogin,
  promisifiedPassportLogout,
  check
}
