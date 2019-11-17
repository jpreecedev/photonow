import { Types } from "mongoose"
import { CollectionModel } from "../schema"

async function deleteCollection(userId: Types.ObjectId, collectionId: Types.ObjectId) {
  return await CollectionModel.deleteOne({ userId, _id: collectionId }).exec()
}

export { deleteCollection }
