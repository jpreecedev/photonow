import express, { Response } from "express"
import passport from "passport"
import { Types } from "mongoose"
import multer from "multer"
import { faceRecognition } from "../utils"
import { ClientResponse, PictureItem, FileRequest } from "../../global"
import { getCollection } from "../database/collection"

import { utils } from "../auth"
import { ROLES } from "../../utils/roles"
import { Rekognition } from "aws-sdk"

const router = express.Router()
const upload = multer()

router.get(
  "/",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin),
  // @ts-ignore
  async (req: Request, res: Response) => {
    try {
      const collections = await faceRecognition.listCollections()

      return res.status(200).json(<ClientResponse<Rekognition.CollectionIdList>>{
        success: true,
        data: collections.CollectionIds
      })
    } catch (err) {
      return res.status(500).json(<ClientResponse<String>>{
        success: false,
        data: "No faces were recognised"
      })
    }
  }
)

router.delete(
  "/",
  passport.authenticate("jwt", { failureRedirect: "/login" }),
  utils.checkIsInRole(ROLES.Admin),
  // @ts-ignore
  async (req: DeleteFaceRequest, res: Response) => {
    try {
      const { collectionId } = req.body
      await faceRecognition.deleteCollection(collectionId)

      return res.status(200).json(<ClientResponse<null>>{
        success: true,
        data: null
      })
    } catch (err) {
      return res.status(500).json(<ClientResponse<String>>{
        success: false,
        data: err
      })
    }
  }
)

router.post(
  "/upload/:collectionId",
  upload.single("filepond"),
  // @ts-ignore
  async (req: FileRequest, res: Response) => {
    return verifyFace(req, res)
  }
)

router.post(
  "/:collectionId",
  upload.single("filepond"),
  // @ts-ignore
  async (req: FileRequest, res: Response) => {
    return verifyFace(req, res)
  }
)

const verifyFace = async (req: FileRequest, res: Response) => {
  const response = await faceRecognition.verifyFace(req.file.buffer)
  if (response) {
    try {
      const { collectionId } = req.params
      const collection = await getCollection(Types.ObjectId(collectionId))

      if (!collection) {
        return res.status(404).json(<ClientResponse<String>>{
          success: false,
          data: "Collection was not found"
        })
      }

      const recogniseFromBuffer = await faceRecognition.recogniseFromBuffer(
        collection,
        req.file.buffer
      )

      return res.status(200).json(<ClientResponse<PictureItem[]>>{
        success: true,
        data: recogniseFromBuffer
      })
    } catch (error) {
      return res.status(500).json(<ClientResponse<String>>{
        success: false,
        data: "No faces were recognised"
      })
    }
  }
  return res.status(500).json(<ClientResponse<string>>{
    success: false,
    data: "There was an unexpected error"
  })
}

export default router
