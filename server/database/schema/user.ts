import { model, Model, Schema } from "mongoose"
import { User } from "../../../global"

const UserSchema = new Schema({
  email: String,
  password: String,
  businessName: String,
  firstName: String,
  lastName: String,
  displayName: String,
  providerId: String,
  provider: String,
  role: String
})

const UserModel: Model<User> = model<User>("User", UserSchema)

export { UserModel }
