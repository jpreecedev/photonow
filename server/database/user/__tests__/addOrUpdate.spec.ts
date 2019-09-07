import { sanitizeData } from "../../test-utils"
import { addOrUpdate } from ".."
import TestDbHelper from "../../../../setup/mongo"
import { User } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Add or update user tests", () => {
  const testData = require("./addOrUpdate.json")

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

  test("should create a new user then update it", async () => {
    const user = <User>{
      id: "identityId",
      provider: "providerName",
      businessName: "test business name"
    }

    let result = await addOrUpdate(user)

    expect(result.id).not.toBeUndefined()
    expect(result.id).toEqual(user.id)

    user.businessName = "different business name"

    result = await addOrUpdate(user)

    expect(result.businessName).toEqual(user.businessName)
  })

  test("should update an existing user", async () => {
    const updatedUser = <User>{
      id: testData.users[0].id,
      selectedPhoto: "UPDATED PHOTO"
    }

    const result = await addOrUpdate(updatedUser)

    expect(result).toBeDefined()
    expect(result.id).toEqual(testData.users[0].id)
    expect(result.displayName).toEqual(testData.users[0].displayName)
    expect(result.email).toEqual(testData.users[0].email)
    expect(result.selectedPhoto).toEqual(updatedUser.selectedPhoto)
  })
})
