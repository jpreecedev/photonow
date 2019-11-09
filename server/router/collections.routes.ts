import express from "express"
import passport from "passport"
import { CollectionsController } from "../controllers"
import { utils } from "../auth"
import { ROLES } from "../../utils/roles"

const router = express.Router()

router.get("/", CollectionsController.get)
router.get(
  "/mine",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin, ROLES.Photographer),
  CollectionsController.getMine
)

router.post(
  "/",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin, ROLES.Photographer),
  // @ts-ignore
  CollectionsController.post
)

router.put(
  "/cover",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin, ROLES.Photographer),
  // @ts-ignore
  CollectionsController.put
)

router.put(
  "/price",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin, ROLES.Photographer),
  // @ts-ignore
  CollectionsController.putPrice
)

export default router
