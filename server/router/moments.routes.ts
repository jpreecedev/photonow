import express from "express"
import uuid from "uuid/v4"
import { MomentsController } from "../controllers"
import { s3Upload, authorisation } from "../utils"

const router = express.Router()

router.post(
  "/",
  authorisation.isAuthenticated,
  s3Upload.uploadFromClient(
    true,
    file => ({ filename: file.originalname }),
    file => `${uuid()}${file.originalname.substring(file.originalname.lastIndexOf("."))}`
  ),
  // @ts-ignore
  MomentsController.post
)

export default router
