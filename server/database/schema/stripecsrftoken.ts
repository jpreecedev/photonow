import { model, Model, Schema } from "mongoose"
import { StripeCsrfToken } from "../../../global"

const StripeCsrfTokenSchema = new Schema({
  state: String
})

const StripeCsrfTokenModel: Model<StripeCsrfToken> = model<StripeCsrfToken>(
  "StripeCsrfToken",
  StripeCsrfTokenSchema
)

export { StripeCsrfTokenModel }
