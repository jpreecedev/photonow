import { UserModel } from "../schema"

async function getUser(id: string) {
  return await UserModel.findOne({
    id
  }).exec()
}

async function getUserBy({ username }: { username: string }) {
  return await UserModel.findOne({ username }).exec()
}

export { getUser, getUserBy }
