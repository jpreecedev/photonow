import express, { Response } from "express"
import multer from "multer"
import { faceRecognition } from "../utils"
import { ClientResponse, PictureItem } from "../../global"
import { getCollection } from "../database/collection"

const router = express.Router()
const upload = multer()

// @ts-ignore
router.post("/:collectionId", upload.single("photo"), async (req: FileRequest, res: Response) => {
  const response = await faceRecognition.verifyFace(req.file.buffer)
  if (response) {
    try {
      const { collectionId } = req.params
      const collection = await getCollection(collectionId)

      if (!collection) {
        return res.status(404).json(<ClientResponse<String>>{
          success: false,
          data: "Collection was not found"
        })
      }

      const recogniseFromBuffer = await faceRecognition.recogniseFromBuffer(
        collection.name,
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
})

export default router
