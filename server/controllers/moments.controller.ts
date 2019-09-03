import { Response } from "express"
import { createMoment } from "../database/moments"
import { faceRecognition } from "../utils"
import { errorHandler } from "../utils"

async function post(req: FileRequest, res: Response) {
  try {
    const { _id: photographerId } = req.user
    const originalFile = req.file.transforms.find(t => t.id === "original")
    const resizedFile = req.file.transforms.find(t => t.id === "resized")

    if (!originalFile) {
      throw new Error("Unable to find original file!")
    }
    if (!resizedFile) {
      throw new Error("Unable to find resized file!")
    }

    const { originalname, mimetype } = req.file

    const moment = <Moment>{
      photographerId,
      filename: originalname,
      mimeType: mimetype,
      bucket: originalFile.bucket,
      contentType: originalFile.contentType,
      location: originalFile.location,
      originalEtag: originalFile.etag,
      resizedLocation: resizedFile.location,
      resizedEtag: resizedFile.etag
    }

    const result = await createMoment(moment)

    await faceRecognition.addImageToCollection(
      originalFile.bucket,
      result._id.toString(),
      originalFile.key
    )

    return res.status(200).send({
      location: result.location
    })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).send(e)
  }
}

export default { post }
