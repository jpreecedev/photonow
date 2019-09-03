import { UserModel } from "../schema"

async function addOrUpdate(user: User) {
  const { ok } = await UserModel.updateOne({ id: user.id }, user, {
    upsert: true,
    setDefaultsOnInsert: true
  }).exec()

  let result: User | null = user
  if (ok) {
    result = await UserModel.findOne({ id: user.id }).exec()
  }

  return result
}

export { addOrUpdate }
