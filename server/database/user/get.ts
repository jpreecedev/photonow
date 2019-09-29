import { UserModel } from "../schema"
import { Types } from "mongoose"

async function getUserById(id: Types.ObjectId) {
  return await UserModel.findById(id).exec()
}

async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email }).exec()
}

async function getUserByGoogleId(googleId: string) {
  return await UserModel.findOne({ googleId }).exec()
}

export { getUserById, getUserByEmail, getUserByGoogleId }
