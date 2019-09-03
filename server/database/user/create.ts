import { UserModel } from "../schema"

async function createUser({
  firstName,
  lastName,
  email,
  username,
  password
}: User): Promise<User> {
  const user = await UserModel.findOne({ username })

  if (user) {
    throw new Error("Username is already taken")
  }

  return await UserModel.create({
    firstName,
    lastName,
    email,
    username,
    password
  })
}

export { createUser }
