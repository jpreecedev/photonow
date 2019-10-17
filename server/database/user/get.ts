import { UserModel } from "../schema"
import { Types } from "mongoose"
import { DatabaseUser } from "../../../global"

async function getUserById(id: Types.ObjectId) {
  return await UserModel.findById(id).exec()
}

async function getUserByEmail(email: string) {
  return await UserModel.findOne({ email }).exec()
}

async function getUserByProviderId(providerId: string) {
  return await UserModel.findOne({ providerId }).exec()
}

async function getAllUsers(): Promise<DatabaseUser[]> {
  return await UserModel.find()
    .exec()
    .then(users =>
      users.map(user => ({
        _id: user._id,
        name: `${user.firstName} ${user.lastName} (${user.email})`,
        role: user.role
      }))
    )
}

export { getUserById, getUserByEmail, getUserByProviderId, getAllUsers }
