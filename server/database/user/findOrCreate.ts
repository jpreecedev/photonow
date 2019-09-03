import { UserModel } from "../schema";

async function findOrCreate(
  profile: Profile,
  accessToken: string,
  refreshToken: string
): Promise<User> {
  let user = await UserModel.findOne({ id: profile.id });

  if (!user) {
    user = await UserModel.create({
      ...profile,
      id: profile.id,
      accessToken,
      refreshToken
    });
  }

  return user;
}

export { findOrCreate };
