import { findOrCreate } from "../../user"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { Profile } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Find or create user tests", () => {
  const testData = require("./findOrCreate.json")

  beforeAll(async () => {
    await dbHelper.start()
  })

  afterAll(async () => {
    await dbHelper.stop()
  })

  afterEach(async () => {
    await dbHelper.cleanup()
  })

  beforeEach(async () => {
    await dbHelper.seed(sanitizeData(testData))
  })

  test("should find the specified user", async () => {
    const profile = <Profile>{ id: testData.users[0].id, displayName: "EXISTING NAME" }

    const result = await findOrCreate(profile)

    expect(result).not.toBeUndefined()
    expect(result.id).toEqual(profile.id)
  })

  test("should create a new user", async () => {
    const profile = <Profile>{
      id: "SOME_OTHER_PROFILE_ID",
      displayName: "SOME DISPLAY NAME"
    }
    const result = await findOrCreate(profile)

    expect(result).not.toBeUndefined()
    expect(result.id).toEqual(profile.id)
    expect(result.displayName).toEqual(profile.displayName)
    expect(result.email).toEqual(profile.email)
  })
})
