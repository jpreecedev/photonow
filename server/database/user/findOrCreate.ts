import { UserModel } from "../schema"
import { Profile, User } from "../../../global"

async function findOrCreate(profile: Profile): Promise<User> {
  let user = await UserModel.findOne({ id: profile.id })

  if (!user) {
    user = await UserModel.create({
      ...profile,
      id: profile.id
    })
  }

  return user
}

export { findOrCreate }
