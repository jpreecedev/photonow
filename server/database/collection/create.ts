import { CollectionModel } from "../schema"
import { Collection } from "../../../global"

async function createCollection(collection: Collection) {
  return await new CollectionModel(collection).save()
}

export { createCollection }
