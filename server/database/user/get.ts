import { UserModel } from "../schema"
import { Types } from "mongoose"

async function getUserById(id: Types.ObjectId) {
  return await UserModel.findById(id).exec()
}

async function getUserBy({ email }: { email: string }) {
  return await UserModel.findOne({ email }).exec()
}

export { getUserById, getUserBy }
