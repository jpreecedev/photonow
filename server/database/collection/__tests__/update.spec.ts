import { Types } from "mongoose"
import { addMomentToCollection } from "../update"
import TestDbHelper from "../../../../setup/mongo"
import { sanitizeData } from "../../test-utils"

const dbHelper = TestDbHelper()

describe("Update collection tests", () => {
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

  test("should add a moment to the collection", async () => {
    const momentId = Types.ObjectId("5dbf3e7b23f2de5c03a6d135")

    const result = await addMomentToCollection(testData.collections[2]._id, momentId)

    expect(result).toBeTruthy()
    expect(result.moments).toBeDefined()
    expect(result.moments.length).toEqual(1)
  })
})
