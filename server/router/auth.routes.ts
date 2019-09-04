import express, { Response } from "express"
import { to } from "await-to-js"
import {
  check,
  promisifiedPassportAuthentication,
  promisifiedPassportLogin
} from "../utils/authorisation"
import { LogInRequest } from "../../global"

const router = express.Router()

router.post("/api/auth", check, async (req: LogInRequest, res: Response) => {
  console.log(`LOGIN | requester: ${req.body.email}`)

  let [err, user] = await to(promisifiedPassportAuthentication(req, res))

  if (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: "Authentication error!" })
  }
  if (!user) {
    // all failed logins default to the same error message
    return res.status(401).json({ success: false, message: "Wrong credentials!" })
  }

  ;[err] = await to(promisifiedPassportLogin(req, user))

  if (err) {
    console.error(err)
    return res.status(500).json({ success: false, message: "Authentication error!" })
  }

  return res.status(200).json({
    success: true,
    data: { profile: { ...user.profile, id: user._id } }
  })
})

export default router
