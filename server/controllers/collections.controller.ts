import { Response } from "express"
import { errorHandler } from "../utils"
import { ClientResponse, UserRequest, CreateCollectionRequest, Collection } from "../../global"
import { faceRecognition } from "../utils"
import { deleteCollection } from "../database/collection"

import {
  getCollections,
  getMyCollections,
  createCollection,
  addCoverPhoto,
  updatePrice
} from "../database/collection"

async function getMine(req: UserRequest, res: Response) {
  try {
    const data = await getMyCollections(req.user._id)

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

async function get(req: UserRequest, res: Response) {
  try {
    const { populate } = req.query
    const data = await getCollections(populate)

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

async function put(req: UserRequest, res: Response) {
  try {
    const { _id: userId } = req.user
    const { collectionId, coverPhoto } = req.body

    const data = await addCoverPhoto({ collectionId, coverPhoto, userId })

    return res.status(200).json(<ClientResponse<boolean>>{
      success: data,
      data: null
    })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: e
    })
  }
}

async function putPrice(req: UserRequest, res: Response) {
  try {
    const { _id: userId } = req.user
    const { collectionId, price } = req.body

    const data = await updatePrice({ collectionId, userId, price })

    return res.status(200).json(<ClientResponse<boolean>>{
      success: data,
      data: null
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
      userId,
      price: Number.parseInt(process.env.DEFAULT_MOMENT_PRICE, 10)
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

async function deleteUserCollection(req: UserRequest, res: Response) {
  try {
    const { _id: userId } = req.user
    const { name } = req.body

    const collections = await getMyCollections(userId)
    const collection = collections.find(c => c.name === name)

    if (!collection) {
      return res.status(404).json(<ClientResponse<string>>{
        success: false,
        data: "Collection not found"
      })
    }

    await deleteCollection(userId, collection._id)

    await faceRecognition.deleteCollection(name)

    return res.status(200).json(<ClientResponse<Collection>>{
      success: true,
      data: null
    })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: e
    })
  }
}

export default { get, getMine, post, put, putPrice, deleteUserCollection }
