import passport from "passport"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { Request, Response, NextFunction } from "express"
import { User, UserRequest, ClientResponse, JWTPayload } from "../../global"
import { UserModel } from "../database/schema"
import { errorHandler } from "../utils"
import { UserViewModel } from "../viewModels"
import { ROLES } from "../../utils/roles"

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
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: "You are already signed in!"
    })
  }
  return next()
}

const checkIsInRole = (...roles: string[]) => (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.redirect("/login")
  }

  const hasRole = roles.find(role => req.user.role === role)

  if (!hasRole) {
    return res.redirect("/login")
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
        req.logout()
        return res.clearCookie("jwt").redirect("/login")
      }

      next()
    }
  )
}

const getUserRole = async (req: Request): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!req.cookies.jwt) {
      return reject("Unauthorised request")
    }

    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err: Error, decodedToken: JWTPayload) => {
      if (err) {
        return reject(`Unexpected error. ${err}`)
      }

      return resolve(decodedToken.data.role)
    })
  })
}

const getRedirectUrl = (user: User) => {
  if (!user || !user.role || user.role === ROLES.Customer) {
    return "/select-gallery"
  }

  if (
    user.role === ROLES.Photographer &&
    !user.stripeData.authCode &&
    !user.stripeData.accessToken
  ) {
    return "/api/stripe/start"
  }

  if (
    user.role === ROLES.Photographer &&
    user.stripeData &&
    user.stripeData.authCode &&
    !user.stripeData.accessToken
  ) {
    return `${process.env.SERVER_API_URL}/stripe/request-access?code=${user.stripeData.authCode}`
  }

  if (
    user.role === ROLES.Admin ||
    (user.role === ROLES.Photographer && user.stripeData && user.stripeData.accessToken)
  ) {
    return "/dashboard/collections"
  }

  return "/"
}

export {
  setup,
  isAuthenticated,
  checkIfLoggedIn,
  checkIsInRole,
  verifyPassword,
  hashPassword,
  signToken,
  getRedirectUrl,
  getUserRole
}
