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

export { getMoment, getMoments }
