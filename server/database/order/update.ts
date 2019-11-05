import { OrderModel } from "../schema"
import { Order } from "../../../global"

async function fulfillOrder(sessionId: string): Promise<Order> {
  return await OrderModel.findOneAndUpdate({ sessionId }, { fulfilled: true }, { new: true }).exec()
}

export { fulfillOrder }
