import express, { Request, Response } from "express"
import passport from "passport"

import { StripeController } from "../controllers"
import { utils } from "../auth"
import { ROLES } from "../../utils/roles"

const router = express.Router()

router.post("/session", StripeController.createSession)

router.get("/success", (req: Request, res: Response) => {
  const { session_id } = req.query
  // TODO
})

router.get("/cancel", (req: Request, res: Response) => {
  // TODO
})

router.get(
  "/start",
  passport.authenticate("jwt"),
  utils.checkIsInRole(ROLES.Photographer),
  StripeController.start
)

router.get(
  "/request-access",
  passport.authenticate("jwt"),
  utils.checkIsInRole(ROLES.Photographer),
  StripeController.requestAccess
)

export default router
