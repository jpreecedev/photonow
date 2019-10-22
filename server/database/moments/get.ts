import { Types } from "mongoose"
import { MomentModel } from "../schema"

async function getMoment(id: Types.ObjectId) {
  return await MomentModel.findById(id).exec()
}

async function getMoments(ids: Types.ObjectId[]) {
  return await MomentModel.find({
    _id: {
      $in: ids
    }
  }).exec()
}

async function getMomentsByCollectionId(collectionId: Types.ObjectId) {
  return await MomentModel.find({
    collectionId
  }).exec()
}

export { getMoment, getMoments, getMomentsByCollectionId }
