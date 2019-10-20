import { Types } from "mongoose"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { getCollections } from "../get"

const dbHelper = TestDbHelper()

describe("Get collection tests", () => {
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

  test("should get two collections using userId", async () => {
    const userId = Types.ObjectId(testData.users[0]._id)

    const collections = await getCollections(userId)

    expect(collections).toBeDefined()
    expect(collections.length).toEqual(2)

    collections.forEach((collection, index) => {
      expect(collection._id).not.toBeUndefined()
      expect(collection.userId).toEqual(testData.collections[index].userId)
      expect(collection.name).toEqual(testData.collections[index].name)
    })
  })
})
