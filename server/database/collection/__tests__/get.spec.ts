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

  test("should get three collections when using admin user", async () => {
    const userId = Types.ObjectId(testData.users[0]._id)
    const role = testData.users[0].role

    const collections = await getCollections(userId, role)

    expect(collections).toBeDefined()
    expect(collections.length).toEqual(3)

    collections.forEach((collection, index) => {
      expect(collection._id).not.toBeUndefined()
      expect(collection._id).toEqual(testData.collections[index]._id)
      expect(collection.userId).toEqual(testData.collections[index].userId)
      expect(collection.name).toEqual(testData.collections[index].name)
    })
  })

  test("should get two collections when using photographer user", async () => {
    const userId = Types.ObjectId(testData.users[1]._id)
    const role = testData.users[1].role

    const collections = await getCollections(userId, role)

    expect(collections).toBeDefined()
    expect(collections.length).toEqual(2)

    collections.forEach((collection, index) => {
      expect(collection._id).not.toBeUndefined()
      expect(collection._id).toEqual(testData.collections[index]._id)
      expect(collection.userId).toEqual(testData.collections[index].userId)
      expect(collection.name).toEqual(testData.collections[index].name)
    })
  })

  test("should get no collections when using customer user", async () => {
    const userId = Types.ObjectId(testData.users[3]._id)
    const role = testData.users[3].role

    const collections = await getCollections(userId, role)

    expect(collections).toBeDefined()
    expect(collections.length).toEqual(0)
  })
})
