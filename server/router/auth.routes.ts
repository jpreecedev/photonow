import express, { Response } from "express"
import { to } from "await-to-js"
import {
  check,
  hashPassword,
  promisifiedPassportAuthentication,
  promisifiedPassportLogin
} from "../utils/authorisation"
import { createUser } from "../database/user"
import { LogInRequest, RegisterRequest, User } from "../../global"

const router = express.Router()

router.post("/login", check, async (req: LogInRequest, res: Response) => {
  console.log(`LOGIN | requester: ${req.body.email}`)

  const [err, user] = await to(promisifiedPassportAuthentication(req, res))

  if (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: "Authentication error!" })
  }
  if (!user) {
    // all failed logins default to the same error message
    return res.status(401).json({ success: false, message: "Wrong credentials!" })
  }

  const [loginErr, token] = await to(promisifiedPassportLogin(req, user))

  if (loginErr) {
    console.error(loginErr)
    return res.status(500).json({ success: false, message: "Authentication error!" })
  }

  res.cookie("jwt", token, { httpOnly: true, secure: true })

  return res.status(200).json({
    success: true
  })
})

router.post("/register", check, async (req: RegisterRequest, res: Response) => {
  const { firstName, lastName, email, password } = req.body

  if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
    return res.status(500).send("Enter a valid email address.")
  } else if (password.length < 5 || password.length > 20) {
    return res.status(500).send("Password must be between 5 and a 20 characters.")
  }

  let [err, user] = await to(
    createUser(<User>{
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
      username: email
    })
  )

  if (err) {
    if (err.code == 11000) {
      return res
        .status(500)
        .json({ success: false, message: "Username is already in use" })
    } else {
      console.error(err)
      return res.status(500).json({ success: false, message: "Server error" })
    }
  }

  const [loginErr, token] = await to(promisifiedPassportLogin(<LogInRequest>req, user))

  if (loginErr) {
    console.error(loginErr)
    return res.status(500).json({ success: false, message: "Authentication error!" })
  }

  res.cookie("jwt", token, { httpOnly: true, secure: true })

  return res.status(200).json({
    success: true
  })
})

export default router
