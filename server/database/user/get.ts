import { UserModel } from "../schema"
import { Types } from "mongoose"

async function getUserById(id: Types.ObjectId) {
  return await UserModel.findById(id).exec()
}

async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email }).exec()
}

async function getUserByProviderId(providerId: string) {
  return await UserModel.findOne({ providerId }).exec()
}

export { getUserById, getUserByEmail, getUserByProviderId }
