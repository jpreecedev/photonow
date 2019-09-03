import { OrderModel } from "../schema"

async function createOrder(order: Order) {
  return await new OrderModel(order).save()
}

export { createOrder }
