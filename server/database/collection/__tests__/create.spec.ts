import { Types } from "mongoose"
import { createCollection, addCoverPhoto } from "../create"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { Collection } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Create collection tests", () => {
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

  test("should create a collection", async () => {
    const collection = <Collection>{
      moments: [
        Types.ObjectId("5d73d69ef390eea3b2bfa4df"),
        Types.ObjectId("5d73d6d317fde1fec95d6d1f")
      ],
      userId: Types.ObjectId("5d73d17b2efd821fa43c17b6"),
      name: "Some Test Collection"
    }

    const newCollection = await createCollection(collection)

    expect(newCollection).toBeDefined()
    expect(newCollection._id).not.toBeUndefined()
    expect(newCollection.userId).toEqual(collection.userId)
    expect(newCollection.moments).toHaveLength(2)
    expect(newCollection.name).toEqual(collection.name)

    collection.moments.forEach((moment, index) => {
      expect(moment).toEqual(newCollection.moments[index])
    })
  })

  test("should set the cover photo", async () => {
    const collectionId = Types.ObjectId("5dab326748f8923dbffbbf92")
    const coverPhoto = Types.ObjectId("5d73d6d317fde1fec95d6d1f")
    const userId = Types.ObjectId("5dac1640a44770f0715f0fac")

    const updatedCollection = await addCoverPhoto({ collectionId, coverPhoto, userId })

    expect(updatedCollection).toEqual(true)
  })
})
