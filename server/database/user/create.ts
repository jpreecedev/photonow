import { UserModel } from "../schema"
import { User } from "../../../global"

async function createUser({
  firstName,
  lastName,
  email,
  password,
  providerId,
  provider,
  role
}: User): Promise<User> {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOne({ email })

    if (user) {
      reject("Email is already in use")
    }

    resolve(
      await UserModel.create({
        providerId,
        provider,
        firstName,
        lastName,
        email,
        password,
        role
      })
    )
  })
}

export { createUser }
