import { Types } from "mongoose"
import { CollectionModel } from "../schema"

async function getCollection(collectionId: Types.ObjectId) {
  return await CollectionModel.findOne({ _id: collectionId }).exec()
}

async function getCollections(populate: boolean = false) {
  if (populate) {
    return await CollectionModel.find({})
      .populate({
        path: "coverPhoto",
        select: ["resizedLocation"]
      })
      .exec()
  }

  return await CollectionModel.find({}).exec()
}

export { getCollections, getCollection }
