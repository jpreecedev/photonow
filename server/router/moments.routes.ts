import express from "express"
import uuid from "uuid/v4"
import { MomentsController } from "../controllers"
import { s3Upload, authorisation } from "../utils"

const router = express.Router()

router.post(
  "/",
  authorisation.basic,
  s3Upload.uploadFromClient(
    true,
    file => ({ filename: file.originalname }),
    file => `${uuid()}${file.originalname.substring(file.originalname.lastIndexOf("."))}`
  ),
  MomentsController.post
)

export default router
