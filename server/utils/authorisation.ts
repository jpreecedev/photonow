import { Response, NextFunction, Request } from "express"
import bcrypt from "bcrypt"
import passport from "passport"
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth"
import passportJWT from "passport-jwt"
import jwt from "jsonwebtoken"
import { to } from "await-to-js"
import { LogOutRequest, User, UserRequest, JWTPayload } from "../../global"

import { UserModel } from "../database/schema"
import { errorHandler } from "../utils"
import { getUser } from "../database/user"

const saltRounds = 10
const JWTStrategy = passportJWT.Strategy

const check = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    return res.status(500).send("You are already signed in!")
  }
  return next()
}

const verifyPassword = async (candidate: string, actual: string) => {
  return await bcrypt.compare(candidate, actual)
}

const hashPassword = async (password: String) => {
  return new Promise(async (resolve, reject) => {
    if (!password) {
      return reject(null)
    }
    try {
      let salt = await bcrypt.genSalt(saltRounds)
      let hash = await bcrypt.hash(password, salt)
      return resolve(hash)
    } catch (err) {
      return reject(err)
    }
  })
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  req.user = null

  if (!req.cookies.jwt) {
    return res.redirect("/login")
  }

  jwt.verify(
    req.cookies.jwt,
    process.env.JWT_SECRET,
    async (err: Error, decodedToken: JWTPayload) => {
      if (err) {
        return next(err)
      }

      if (decodedToken.exp <= Date.now() / 1000) {
        return res.redirect("/login")
      }

      req.user = await getUser(decodedToken.data._id)
      next()
    }
  )
}

const promisifiedPassportLogin = (req: Request, user: User): Promise<string> => {
  return new Promise((resolve, reject) => {
    req.login(user, { session: false }, err => {
      if (err) {
        return reject(err)
      }

      return resolve(
        jwt.sign({ data: user }, process.env.JWT_SECRET, {
          expiresIn: 604800
        })
      )
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
  passport.serializeUser((user: User, done) => done(null, user._id))

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await UserModel.findById(id).exec()
      return done(null, user)
    } catch (err) {
      errorHandler.handle(err)
      return done(err, null)
    }
  })

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: (req: Request) => req.cookies.jwt,
        secretOrKey: process.env.JWT_SECRET
      },
      async (jwtPayload: JWTPayload, cb) => {
        const [err, user] = await to(UserModel.findById(jwtPayload.data._id).exec())

        if (err) {
          return cb(err)
        }
        return cb(null, user)
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
  verifyPassword,
  hashPassword,
  applyMiddleware,
  promisifiedPassportLogin,
  promisifiedPassportLogout,
  check
}
