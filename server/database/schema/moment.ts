import { model, Model, Schema } from "mongoose"
import { Moment } from "../../../global"

const MomentSchema = new Schema({
  photographerId: { type: Schema.Types.ObjectId, ref: "User" },
  collectionId: { type: Schema.Types.ObjectId, ref: "Collection" },
  filename: String,
  mimeType: String,
  bucket: String,
  contentType: String,
  location: String,
  originalEtag: String,
  resizedLocation: String,
  resizedEtag: String
})

const MomentModel: Model<Moment> = model<Moment>("Moment", MomentSchema)

export { MomentModel }
