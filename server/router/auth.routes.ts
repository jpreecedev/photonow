import express, { Response } from "express"
import { to } from "await-to-js"
import {
  check,
  hashPassword,
  promisifiedPassportLogin,
  verifyPassword
} from "../utils/authorisation"
import { createUser, getUserBy } from "../database/user"
import { LogInRequest, RegisterRequest, User, ClientResponse } from "../../global"

const router = express.Router()

router.post("/login", check, async (req: LogInRequest, res: Response) => {
  const { email, password } = req.body
  const [err, user] = await to(getUserBy(email))

  if (err || !user) {
    console.error("Unable to find user")
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  if (!(await verifyPassword(password, user.password))) {
    console.error("Passwords do not match")
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  const [loginErr, token] = await to(promisifiedPassportLogin(req, user))

  if (loginErr) {
    console.error("Log in error", loginErr)
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV == `production` && process.env.SERVER_URL.includes("https")
          ? true
          : false,
      maxAge: Date.now() + 60 * 60 * 1000 * 4,
      domain:
        process.env.NODE_ENV == `production`
          ? process.env.SERVER_URL.replace(/http:\/\/|https:\/\//g, "")
          : "localhost"
    })
    .json(<ClientResponse<object>>{
      success: true,
      data: null
    })
})

router.post("/register", check, async (req: RegisterRequest, res: Response) => {
  const { firstName, lastName, email, password } = req.body

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
      password: await hashPassword(password)
    })
  )

  if (err) {
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Email is already taken" })
  }

  const [loginErr, token] = await to(promisifiedPassportLogin(<LogInRequest>req, user))

  if (loginErr) {
    console.error(loginErr)
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV == `production` && process.env.SERVER_URL.includes("https")
          ? true
          : false,
      maxAge: Date.now() + 60 * 60 * 1000 * 4,
      domain:
        process.env.NODE_ENV == `production`
          ? process.env.SERVER_URL.replace(/http:\/\/|https:\/\//g, "")
          : "localhost"
    })
    .json(<ClientResponse<string>>{
      success: true,
      data: null
    })
})

export default router
