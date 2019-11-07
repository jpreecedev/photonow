import { model, Model, Schema } from "mongoose"
import { Order } from "../../../global"

const OrderSchema = new Schema({
  moments: [{ type: Schema.Types.ObjectId, ref: "Moment" }],
  customerId: String,
  paymentIntentId: String,
  fulfilled: Boolean
})

const OrderModel: Model<Order> = model<Order>("Order", OrderSchema)

export { OrderModel }
