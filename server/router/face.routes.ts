import express, { Response } from "express"
import multer from "multer"
import { faceRecognition } from "../utils"
import { ClientResponse, PictureItem } from "../../global"

const router = express.Router()
const upload = multer()

// @ts-ignore
router.post("/", upload.single("photo"), async (req: FileRequest, res: Response) => {
  const response = await faceRecognition.verifyFace(req.file.buffer)
  if (response) {
    try {
      const recogniseFromBuffer = await faceRecognition.recogniseFromBuffer(req.file.buffer)
      console.log(recogniseFromBuffer)

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
