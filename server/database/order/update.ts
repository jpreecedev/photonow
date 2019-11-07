import { OrderModel } from "../schema"
import { Order } from "../../../global"

async function fulfillOrder(paymentIntentId: string): Promise<Order> {
  return await OrderModel.findOneAndUpdate(
    { paymentIntentId },
    { fulfilled: true },
    { new: true }
  ).exec()
}

export { fulfillOrder }
