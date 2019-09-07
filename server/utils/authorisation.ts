import { Response, NextFunction, Request } from "express"
import bcrypt from "bcrypt"
import passport from "passport"
import passportJWT from "passport-jwt"
import jwt from "jsonwebtoken"
import { to } from "await-to-js"
import { User, UserRequest, JWTPayload } from "../../global"

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

const logout = (req: Request) => {
  req.logout()
  req.clearCookie("jwt")
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
}

export {
  isAuthenticated,
  verifyPassword,
  hashPassword,
  applyMiddleware,
  promisifiedPassportLogin,
  logout,
  check
}
