import { Types } from "mongoose"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { getMoment, getMomentsByCollectionId } from "../get"

const dbHelper = TestDbHelper()

describe("Get moment tests", () => {
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

  test("should get one moment", async () => {
    const momentId = Types.ObjectId(testData.moments[1]._id)

    const moment = await getMoment(momentId)

    expect(moment).toBeDefined()
    expect(moment._id).not.toBeUndefined()
    expect(moment.photographerId).toEqual(testData.moments[1].photographerId)
    expect(moment.collectionId).toEqual(testData.moments[1].collectionId)
    expect(moment.filename).toEqual(testData.moments[1].filename)
    expect(moment.mimeType).toEqual(testData.moments[1].mimeType)
    expect(moment.bucket).toEqual(testData.moments[1].bucket)
    expect(moment.contentType).toEqual(testData.moments[1].contentType)
    expect(moment.location).toEqual(testData.moments[1].location)
    expect(moment.originalEtag).toEqual(testData.moments[1].originalEtag)
    expect(moment.resizedLocation).toEqual(testData.moments[1].resizedLocation)
    expect(moment.resizedEtag).toEqual(testData.moments[1].resizedEtag)
    expect(moment.amount).toEqual(testData.moments[1].amount)
  })

  test("should get two moments using collection Id", async () => {
    const collectionId = Types.ObjectId(testData.collections[0]._id)

    const moments = await getMomentsByCollectionId(collectionId)

    expect(moments).toBeDefined()
    expect(moments.length).toEqual(2)

    moments.forEach((moment, index) => {
      expect(moment._id).not.toBeUndefined()
      expect(moment.photographerId).toEqual(testData.moments[index].photographerId)
      expect(moment.collectionId).toEqual(testData.moments[index].collectionId)
      expect(moment.filename).toEqual(testData.moments[index].filename)
      expect(moment.mimeType).toEqual(testData.moments[index].mimeType)
      expect(moment.bucket).toEqual(testData.moments[index].bucket)
      expect(moment.contentType).toEqual(testData.moments[index].contentType)
      expect(moment.location).toEqual(testData.moments[index].location)
      expect(moment.originalEtag).toEqual(testData.moments[index].originalEtag)
      expect(moment.resizedLocation).toEqual(testData.moments[index].resizedLocation)
      expect(moment.resizedEtag).toEqual(testData.moments[index].resizedEtag)
      expect(moment.amount).toEqual(testData.moments[index].amount)
    })
  })
})
