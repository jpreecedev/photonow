import { Types } from "mongoose"
import { CollectionModel } from "../schema"
import { CollectionWithMoments } from "../../../global"

async function getCollection(collectionId: Types.ObjectId): Promise<CollectionWithMoments> {
  const collection = await CollectionModel.findOne({ _id: collectionId })
    .populate({
      path: "moments"
    })
    .exec()

  return (collection as unknown) as CollectionWithMoments
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

async function getMyCollections(userId: Types.ObjectId) {
  return await CollectionModel.find({ userId }).exec()
}

export { getCollections, getCollection, getMyCollections }
