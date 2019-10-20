import { Types } from "mongoose"
import { CollectionModel } from "../schema"
import { ROLES } from "../../../utils/roles"

async function getCollections(userId: Types.ObjectId, role: string) {
  if (role === ROLES.Admin) {
    return await CollectionModel.find({}).exec()
  }

  if (role === ROLES.Photographer) {
    return await CollectionModel.find({ userId }).exec()
  }

  return []
}

export { getCollections }
