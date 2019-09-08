import express, { Response } from "express"
import multer from "multer"
import { faceRecognition } from "../utils"

const router = express.Router()
const upload = multer()

// @ts-ignore
router.post("/", upload.single("photo"), async (req: FileRequest, res: Response) => {
  const response = await faceRecognition.verifyFace(req.file.buffer)
  if (response) {
    const recogniseFromBuffer = await faceRecognition.recogniseFromBuffer(req.file.buffer)
    return res.status(200).json({
      success: true,
      data: recogniseFromBuffer
    })
  }
  return res.status(500).json({
    success: false,
    message: "There was an unexpected error"
  })
})

export default router
