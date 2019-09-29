import express, { Response } from "express"
import { to } from "await-to-js"
import { utils } from "../auth"
import { login } from "../auth/strategies/jwt"
import { createUser, getUserByEmail } from "../database/user"
import { LogInRequest, RegisterRequest, User, ClientResponse, UserRoles } from "../../global"

const router = express.Router()

router.post("/login", utils.checkIfLoggedIn, async (req: LogInRequest, res: Response) => {
  const { email, password } = req.body
  const [err, user] = await to(getUserByEmail(email))

  const authenticationError = () => {
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  if (err || !user) {
    console.error("Unable to find user")
    return authenticationError()
  }

  if (!password || !user.password) {
    console.error("Probably should be using social login")
    return authenticationError()
  }

  if (!(await utils.verifyPassword(password, user.password))) {
    console.error("Passwords do not match")
    return authenticationError()
  }

  const [loginErr, token] = await to(login(req, user))

  if (loginErr) {
    console.error("Log in error", loginErr)
    return authenticationError()
  }

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true
    })
    .json(<ClientResponse<string>>{
      success: true,
      data: utils.getRedirectUrl(user.role)
    })
})

router.post("/register", utils.checkIfLoggedIn, async (req: RegisterRequest, res: Response) => {
  const { firstName, lastName, email, password } = req.body

  if (process.env.IS_REGISTRATION_DISABLED === "true") {
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: "Sorry, registration is currently closed."
    })
  }

  if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Enter a valid email address." })
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
      role: UserRoles.Customer
    })
  )

  if (err) {
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Email is already taken" })
  }

  const [loginErr, token] = await to(login(<LogInRequest>req, user))

  if (loginErr) {
    console.error(loginErr)
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true
    })
    .json(<ClientResponse<string>>{
      success: true,
      data: utils.getRedirectUrl(user.role)
    })
})

export default router
