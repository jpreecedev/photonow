import { Response } from "express"
import { Types } from "mongoose"
import { getOrder } from "../database/order"
import { errorHandler } from "../utils"

async function get(req: OrderRequest, res: Response) {
  try {
    const { orderId } = req.params
    const order = await getOrder(Types.ObjectId(orderId))

    return res.status(200).json(order)
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).send(e)
  }
}

export default { get }
