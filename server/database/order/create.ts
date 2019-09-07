import { OrderModel } from "../schema"
import { Order } from "../../../global"

async function createOrder(order: Order) {
  return await new OrderModel(order).save()
}

export { createOrder }
