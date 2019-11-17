import { Types } from "mongoose"
import { deleteCollection } from "../delete"
import TestDbHelper from "../../../../setup/mongo"
import { sanitizeData } from "../../test-utils"
import { getCollections } from "../get"

const dbHelper = TestDbHelper()

describe("Delete collection tests", () => {
  const testData = require("./data.json")

  beforeEach(async () => {
    await dbHelper.seed(sanitizeData(testData))
  })

  beforeAll(async () => {
    await dbHelper.start()
  })

  afterAll(async () => {
    await dbHelper.stop()
  })

  afterEach(async () => {
    await dbHelper.cleanup()
  })

  test("should delete the collection", async () => {
    const collectionId = Types.ObjectId(testData.collections[2]._id)
    const userId = Types.ObjectId(testData.collections[2].userId)

    await deleteCollection(userId, collectionId)

    const collections = await getCollections()

    expect(collections.length).toEqual(2)
    expect(
      collections.some(collection => Types.ObjectId(collection._id) === collectionId)
    ).toBeFalsy()
  })
})
