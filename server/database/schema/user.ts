import { model, Model, Schema } from "mongoose"
import { User } from "../../../global"

const UserSchema = new Schema({
  id: String,
  email: String,
  password: String,
  accessToken: String,
  refreshToken: String,
  provider: String,
  businessName: String,
  address: String,
  lat: Number,
  lng: Number,
  firstName: String,
  lastName: String,
  displayName: String,
  selectedPhoto: String,
  profile: { id: String, displayName: String, email: String }
})

const UserModel: Model<User> = model<User>("User", UserSchema)

export { UserModel }
