import { Types } from "mongoose"
import { CollectionModel } from "../schema"

async function addMomentToCollection(collectionId: Types.ObjectId, momentId: Types.ObjectId) {
  return await CollectionModel.findByIdAndUpdate(
    collectionId,
    {
      $push: { moments: momentId }
    },
    { new: true }
  ).exec()
}

export { addMomentToCollection }
