import { UserModel } from "../schema"
import { User } from "../../../global"

async function createUser({ firstName, lastName, email, password }: User): Promise<User> {
  const user = await UserModel.findOne({ email })

  if (user) {
    throw new Error("Email is already in use")
  }

  return await UserModel.create({
    firstName,
    lastName,
    email,
    password
  })
}

export { createUser }
