import express from "express"
import passport from "passport"
import { CollectionsController } from "../controllers"
import { utils } from "../auth"
import { ROLES } from "../../utils/roles"

const router = express.Router()

router.get(
  "/",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin, ROLES.Photographer),
  // @ts-ignore
  CollectionsController.get
)

router.post(
  "/",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin, ROLES.Photographer),
  // @ts-ignore
  CollectionsController.post
)

export default router
