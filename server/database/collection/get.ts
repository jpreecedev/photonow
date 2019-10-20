import { Types } from "mongoose"
import { CollectionModel } from "../schema"

async function getCollections(userId: Types.ObjectId) {
  return await CollectionModel.find({ userId }).exec()
}

export { getCollections }
