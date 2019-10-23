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
  const { ok } = await CollectionModel.updateOne(
    { _id: collectionId, userId },
    { coverPhoto }
  ).exec()
  if (ok === 1) {
    return true
  }

  return false
}

export { createCollection, addCoverPhoto }
