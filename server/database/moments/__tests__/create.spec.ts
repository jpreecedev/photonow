import { Types } from "mongoose"
import { createMoment } from "../create"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { Moment } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Create moment tests", () => {
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

  test("should create a moment", async () => {
    const moment = <Moment>{
      photographerId: Types.ObjectId(testData.users[0]._id),
      collectionId: Types.ObjectId(testData.collections[0]._id),
      filename: "Test File Name",
      mimeType: "Test Customer",
      bucket: "test@test.com",
      contentType: "1 Test Street",
      location: "Test Area",
      originalEtag: "Test City",
      resizedLocation: "TT1 1TT",
      resizedEtag: "Test State",
      amount: 100
    }

    const newMoment = await createMoment(moment)

    expect(newMoment).toBeDefined()
    expect(newMoment._id).not.toBeUndefined()
    expect(newMoment.amount).toEqual(moment.amount)
    expect(newMoment.photographerId).toEqual(moment.photographerId)
    expect(newMoment.collectionId).toEqual(moment.collectionId)
    expect(newMoment.filename).toEqual(moment.filename)
    expect(newMoment.bucket).toEqual(moment.bucket)
    expect(newMoment.mimeType).toEqual(moment.mimeType)
    expect(newMoment.contentType).toEqual(moment.contentType)
    expect(newMoment.location).toEqual(moment.location)
    expect(newMoment.originalEtag).toEqual(moment.originalEtag)
    expect(newMoment.resizedLocation).toEqual(moment.resizedLocation)
    expect(newMoment.resizedEtag).toEqual(moment.resizedEtag)
  })
})
