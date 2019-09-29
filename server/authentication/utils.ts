import passport from "passport"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { Request, Response, NextFunction } from "express"
import { User, UserRequest, ClientResponse, JWTPayload } from "../../global"
import { UserModel } from "../database/schema"
import { getUserById } from "../database/user"
import { errorHandler } from "../utils"
import { UserViewModel } from "../viewModels"

const saltRounds = 10

const setup = () => {
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
}

const checkIfLoggedIn = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "You are already signed in!" })
  }
  return next()
}

const verifyPassword = async (candidate: string, actual: string) => {
  return await bcrypt.compare(candidate, actual)
}

const hashPassword = async (password: String) => {
  if (!password) {
    throw new Error("Password was not provided")
  }

  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(password, salt)
}

const signToken = (user: User) => {
  const userViewModel = UserViewModel(user)

  return jwt.sign({ data: userViewModel }, process.env.JWT_SECRET, {
    expiresIn: 604800
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

      req.user = await getUserById(decodedToken.data._id)

      next()
    }
  )
}

const logout = (req: Request) => {
  req.logout()
  req.clearCookie("jwt")
}

export { setup, isAuthenticated, checkIfLoggedIn, verifyPassword, hashPassword, signToken, logout }
