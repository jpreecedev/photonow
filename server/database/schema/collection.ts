import { model, Model, Schema } from "mongoose"
import { Collection } from "../../../global"

const CollectionSchema = new Schema({
  moments: [{ type: Schema.Types.ObjectId, ref: "Moment" }],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  coverPhoto: { type: Schema.Types.ObjectId, ref: "Moment" },
  name: String,
  price: Number
})

const CollectionModel: Model<Collection> = model<Collection>("Collection", CollectionSchema)

export { CollectionModel }
