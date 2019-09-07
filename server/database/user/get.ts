import { UserModel } from "../schema"

async function getUser(id: string) {
  return await UserModel.findOne({
    id
  }).exec()
}

async function getUserBy({ email }: { email: string }) {
  return await UserModel.findOne({ email }).exec()
}

export { getUser, getUserBy }
