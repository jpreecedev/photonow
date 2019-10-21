import { Response } from "express"
import { errorHandler } from "../utils"
import { ClientResponse, UserRequest, CreateCollectionRequest, Collection } from "../../global"
import { faceRecognition } from "../utils"

import { getCollections, createCollection } from "../database/collection"

async function get(req: UserRequest, res: Response) {
  try {
    const data = await getCollections()

    return res.status(200).json(<ClientResponse<Collection[]>>{
      success: true,
      data
    })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: e
    })
  }
}

async function post(req: CreateCollectionRequest, res: Response) {
  try {
    const { _id: userId } = req.user
    const { name } = req.body

    const collection = <Collection>{
      moments: [],
      name,
      userId
    }

    const isAvailable = await faceRecognition.isCollectionNameAvailable(name)
    if (isAvailable) {
      await faceRecognition.createCollection(name)
    } else {
      return res.status(500).json(<ClientResponse<string>>{
        success: false,
        data: "Collection name is not available, choose a different name"
      })
    }

    const data = await createCollection(collection)

    return res.status(200).json(<ClientResponse<Collection>>{
      success: true,
      data
    })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: e
    })
  }
}

export default { get, post }
