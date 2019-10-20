import { UserModel } from "../schema"

async function updateRole(id: string, role: string): Promise<boolean | string> {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(id)

    if (!user) {
      return reject("Unable to find user")
    }

    const { ok } = await UserModel.updateOne({ _id: user._id }, { role }).exec()

    if (ok === 1) {
      return resolve(true)
    }

    return resolve(false)
  })
}

export { updateRole }
