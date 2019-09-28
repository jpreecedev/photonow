import express, { Response } from "express"
import { to } from "await-to-js"
import { jwt, utils } from "../authentication"
import { createUser, getUserBy } from "../database/user"
import { LogInRequest, RegisterRequest, User, ClientResponse } from "../../global"

const router = express.Router()

router.post("/login", utils.checkIfLoggedIn, async (req: LogInRequest, res: Response) => {
  const { email, password } = req.body
  const [err, user] = await to(getUserBy(email))

  if (err || !user) {
    console.error("Unable to find user")
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  if (!(await jwt.verifyPassword(password, user.password))) {
    console.error("Passwords do not match")
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  const [loginErr, token] = await to(jwt.login(req, user))

  if (loginErr) {
    console.error("Log in error", loginErr)
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Authentication error!" })
  }

  return res
    .status(200)
    .cookie("jwt", token, {
      httpOnly: true
    })
    .json(<ClientResponse<object>>{
      success: true,
      data: null
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
      password: await jwt.hashPassword(password)
    })
  )

  if (err) {
    return res
      .status(500)
      .json(<ClientResponse<string>>{ success: false, data: "Email is already taken" })
  }

  const [loginErr, token] = await to(jwt.login(<LogInRequest>req, user))

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
      data: null
    })
})

export default router
