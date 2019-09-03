import { model, Model, Schema } from "mongoose"

const MomentSchema = new Schema({
  photographerId: { type: Schema.Types.ObjectId, ref: "User" },
  filename: String,
  mimeType: String,
  bucket: String,
  contentType: String,
  location: String,
  originalEtag: String,
  resizedLocation: String,
  resizedEtag: String,
  amount: Number // Calculated field and almost certainly wrong!
})

const MomentModel: Model<Moment> = model<Moment>("Moment", MomentSchema)

export { MomentModel }
