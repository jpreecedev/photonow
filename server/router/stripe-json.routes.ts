import express, { Request, Response } from "express"
import passport from "passport"

import { StripeController } from "../controllers"
import { utils } from "../auth"
import { ROLES } from "../../utils/roles"

const router = express.Router()

router.post("/intent", StripeController.paymentIntent)

router.post("/check-order", StripeController.checkOrderStatus)

router.get("/cancel", (req: Request, res: Response) => res.redirect("/select-your-pictures"))

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
