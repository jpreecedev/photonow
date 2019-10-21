import { Types } from "mongoose"
import { CollectionModel } from "../schema"

async function getCollection(collectionId: Types.ObjectId) {
  return await CollectionModel.findOne({ _id: collectionId }).exec()
}

async function getCollections() {
  return await CollectionModel.find({}).exec()
}

export { getCollections, getCollection }
