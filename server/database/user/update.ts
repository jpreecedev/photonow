import { Types } from "mongoose"
import { UserModel } from "../schema"
import { StripeExpressConnect, User } from "../../../global"

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

async function updateStripeData(
  userId: Types.ObjectId,
  stripeData: StripeExpressConnect
): Promise<User> {
  const user = await UserModel.findById(userId)

  if (!user) {
    throw new Error("Unable to find user")
  }

  return await UserModel.findOneAndUpdate({ _id: user._id }, { stripeData }, { new: true }).exec()
}

export { updateRole, updateStripeData }
