import { model, Model, Schema } from "mongoose"
import { Order } from "../../../global"

const OrderSchema = new Schema({
  moments: [{ type: Schema.Types.ObjectId, ref: "Moment" }],
  amount: Number,
  name: String,
  email: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  postalCode: String,
  state: String,
  country: String
})

const OrderModel: Model<Order> = model<Order>("Order", OrderSchema)

export { OrderModel }
