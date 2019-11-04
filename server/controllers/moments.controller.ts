import { Response, Request } from "express"
import { createMoment, getMomentsByCollectionId } from "../database/moments"
import { errorHandler, faceRecognition } from "../utils"
import { FileRequest, Moment, ClientResponse } from "../../global"
import { getCollection, addMomentToCollection } from "../database/collection"
import { Types } from "mongoose"

async function get(req: Request, res: Response) {
  try {
    const { collectionId } = req.params

    const data = await getMomentsByCollectionId(Types.ObjectId(collectionId))

    return res.status(200).json(<ClientResponse<Moment[]>>{ success: true, data })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: e
    })
  }
}

async function post(req: FileRequest, res: Response) {
  try {
    const { _id: photographerId } = req.user
    const { collectionId } = req.params

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
      collectionId: Types.ObjectId(collectionId),
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
    const collection = await getCollection(Types.ObjectId(collectionId))

    await faceRecognition.addImageToCollection(
      collection.name,
      originalFile.bucket,
      result._id.toString(),
      originalFile.key
    )

    await addMomentToCollection(collection._id, result._id)

    return res.status(200).json(<ClientResponse<string>>{ success: true, data: "Upload complete" })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: e
    })
  }
}

export default { post, get }
