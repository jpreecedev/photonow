import { OrderModel } from "../schema"
import { Order } from "../../../global"

async function fulfillOrder({
  sessionId,
  customerId,
  stripeOrderId
}: {
  sessionId: string
  customerId: string
  stripeOrderId: string
}): Promise<Order> {
  return await OrderModel.findOneAndUpdate(
    { sessionId, customerId },
    { fulfilled: true, stripeOrderId: stripeOrderId },
    { new: true }
  ).exec()
}

export { fulfillOrder }
