import express from "express"
import uuid from "uuid/v4"
import passport from "passport"
import { MomentsController } from "../controllers"
import { utils } from "../auth"
import { s3Upload } from "../utils"

const router = express.Router()

router.post(
  "/:collectionId",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.isAuthenticated,
  s3Upload.uploadFromClient(
    true,
    file => ({ filename: file.originalname }),
    file => `${uuid()}${file.originalname.substring(file.originalname.lastIndexOf("."))}`
  ),
  // @ts-ignore
  MomentsController.post
)

export default router
