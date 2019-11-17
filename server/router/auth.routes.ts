import express, { Request, Response } from "express"
import passport from "passport"
import { to } from "await-to-js"
import { utils } from "../auth"
import { login } from "../auth/strategies/jwt"
import { createUser, getUserByEmail } from "../database/user"
import { LogInRequest, RegisterRequest, User, ClientResponse } from "../../global"
import { ROLES } from "../../utils/roles"
import { log } from "../utils"

const router = express.Router()

router.get("/", passport.authenticate("jwt"), (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json(<ClientResponse<{}>>{ success: true, data: null })
  }

  return res.status(403).json(<ClientResponse<{}>>{ success: false, data: null })
})

router.get("/logout", async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie("jwt")
    .redirect("/")
})

router.post("/login", utils.checkIfLoggedIn, async (req: LogInRequest, res: Response) => {
  const { email, password } = req.body
  const [err, user] = await to(getUserByEmail(email))

  const authenticationError = () => {
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: "Authentication error!"
    })
  }

  if (err || !user) {
    log("Unable to find user", "error")
    return authenticationError()
  }

  if (!password || !user.password) {
    log("Probably should be using social login", "error")
    return authenticationError()
  }

  if (!(await utils.verifyPassword(password, user.password))) {
    log("Passwords do not match", "error")
    return authenticationError()
  }

  const [loginErr, token] = await to(login(req, user))

  if (loginErr) {
    log(`Log in error: ${loginErr}`, "error")
    return authenticationError()
  }

  return res
    .status(200)
    .cookie("jwt", token)
    .json(<ClientResponse<string>>{
      success: true,
      data: utils.getRedirectUrl(user)
    })
})

router.post("/register", utils.checkIfLoggedIn, async (req: RegisterRequest, res: Response) => {
  const { firstName, lastName, email, password } = req.body

  if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: "Enter a valid email address."
    })
  } else if (password.length < 5 || password.length > 20) {
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: "Password must be between 5 and a 20 characters."
    })
  }

  let [err, user] = await to(
    createUser(<User>{
      firstName,
      lastName,
      email,
      password: await utils.hashPassword(password),
      role: ROLES.Customer
    })
  )

  if (err) {
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: "Email is already taken"
    })
  }

  const [loginErr, token] = await to(login(<LogInRequest>req, user))

  if (loginErr) {
    log(loginErr, "error")
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: "Authentication error!"
    })
  }

  return res
    .status(200)
    .cookie("jwt", token)
    .json(<ClientResponse<string>>{
      success: true,
      data: utils.getRedirectUrl(user)
    })
})

export default router
