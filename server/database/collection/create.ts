import { Types } from "mongoose"
import { CollectionModel } from "../schema"
import { Collection } from "../../../global"

async function createCollection(collection: Collection) {
  return await new CollectionModel(collection).save()
}

async function addCoverPhoto({
  collectionId,
  coverPhoto,
  userId
}: {
  collectionId: Types.ObjectId
  coverPhoto: Types.ObjectId
  userId: Types.ObjectId
}): Promise<boolean> {
  const { nModified } = await CollectionModel.updateOne(
    { _id: collectionId, userId },
    { coverPhoto }
  ).exec()
  if (nModified === 1) {
    return true
  }

  return false
}

async function updatePrice({
  collectionId,
  price,
  userId
}: {
  collectionId: Types.ObjectId
  price: number
  userId: Types.ObjectId
}): Promise<Collection | boolean> {
  const { nModified } = await CollectionModel.updateOne(
    { _id: { $eq: collectionId }, userId: { $eq: userId } },
    { price }
  ).exec()
  if (nModified === 1) {
    return await CollectionModel.findById(collectionId).exec()
  }

  return false
}

export { createCollection, addCoverPhoto, updatePrice }
