import express, { Response } from "express"
import { authorisation } from "../utils"
import { UserRequest } from "../../global"

const router = express.Router()

router.get("/check", authorisation.basic, (req: UserRequest, res: Response) => {
  return res.status(200).json(req.user)
})

export default router
