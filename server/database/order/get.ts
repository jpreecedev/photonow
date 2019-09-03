import { Types } from "mongoose"
import { OrderModel } from "../schema"

async function getOrder(orderId: Types.ObjectId) {
  return OrderModel.findById(orderId)
    .populate({
      path: "moments",
      select: ["filename", "location", "resizedLocation", "mimeType"]
    })
    .exec()
}

export { getOrder }
