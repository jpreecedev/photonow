import express from "express"
import passport from "passport"
import { UsersController } from "../controllers"
import { utils } from "../auth"
import { ROLES } from "../../utils/roles"

const router = express.Router()

router.get(
  "/",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin),
  //@ts-ignore
  UsersController.get
)

router.get(
  "/role",
  //@ts-ignore
  UsersController.getRole
)

router.post(
  "/role",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin),
  //@ts-ignore
  UsersController.post
)

export default router
