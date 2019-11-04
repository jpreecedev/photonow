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

    collections.forEach((collection, index) => {
      expect(collection._id).not.toBeUndefined()
      expect(collection._id).toEqual(testData.collections[index]._id)
      expect(collection.userId).toEqual(testData.collections[index].userId)
      expect(collection.name).toEqual(testData.collections[index].name)
      expect(collection.price).toEqual(testData.collections[index].price)
    })
  })

  test("should get one collection", async () => {
    const collectionId = Types.ObjectId(testData.collections[1]._id)

    const collection = await getCollection(collectionId)

    expect(collection).toBeDefined()
    expect(collection._id).not.toBeUndefined()
    expect(collection._id).toEqual(testData.collections[1]._id)
    expect(collection.userId).toEqual(testData.collections[1].userId)
    expect(collection.name).toEqual(testData.collections[1].name)
    expect(collection.price).toEqual(testData.collections[1].price)

    expect(collection.moments).toBeDefined()
    expect(collection.moments).toHaveLength(1)
    expect(collection.moments[0]._id.toString()).toEqual(testData.moments[1]._id.toString())
    expect(Types.ObjectId(collection.moments[0].collectionId.toString())).toEqual(collectionId)
    expect(collection.moments[0].photographerId.toString()).toEqual(
      testData.moments[1].photographerId.toString()
    )
  })
})
