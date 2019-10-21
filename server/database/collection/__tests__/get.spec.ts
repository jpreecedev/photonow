import { Types } from "mongoose"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { getCollections, getCollection } from "../get"

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

  test("should get three collections", async () => {
    const collections = await getCollections()

    expect(collections).toBeDefined()
    expect(collections.length).toEqual(3)

    collections.forEach((collection, index) => {
      expect(collection._id).not.toBeUndefined()
      expect(collection._id).toEqual(testData.collections[index]._id)
      expect(collection.userId).toEqual(testData.collections[index].userId)
      expect(collection.name).toEqual(testData.collections[index].name)
    })
  })

  test("should get three collections", async () => {
    const collections = await getCollections()

    expect(collections).toBeDefined()
    expect(collections.length).toEqual(3)

    collections.forEach((collection, index) => {
      expect(collection._id).not.toBeUndefined()
      expect(collection._id).toEqual(testData.collections[index]._id)
      expect(collection.userId).toEqual(testData.collections[index].userId)
      expect(collection.name).toEqual(testData.collections[index].name)
    })
  })
})
