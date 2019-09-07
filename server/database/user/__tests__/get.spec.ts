import { getUser, getUserBy } from "../../user"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"

const dbHelper = TestDbHelper()

describe("Add or update user tests", () => {
  const testData = require("./get.json")

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

  test("should get the specified user", async () => {
    const id = testData.users[0].id
    const user = {
      businessName: testData.users[0].businessName,
      lat: testData.users[0].lat,
      lng: testData.users[0].lng,
      address: testData.users[0].address,
      provider: testData.users[0].provider,
      email: testData.users[0].email,
      displayName: testData.users[0].displayName,
      selectedPhoto: testData.users[0].selectedPhoto
    }

    const result = await getUser(id)

    expect(result.businessName).toEqual(user.businessName)
    expect(result.lat).toEqual(user.lat)
    expect(result.lng).toEqual(user.lng)
    expect(result.address).toEqual(user.address)
    expect(result.email).toEqual(user.email)
    expect(result.displayName).toEqual(user.displayName)
    expect(result.selectedPhoto).toEqual(user.selectedPhoto)
    expect(result.provider).toEqual(user.provider)
  })

  test("should get the specified user by email", async () => {
    const email = "test@test.com"

    const result = await getUserBy({ email })

    expect(result).toBeDefined()
    expect(result.provider).toEqual(testData.users[0].provider)
    expect(result.businessName).toEqual(testData.users[0].businessName)
    expect(result.address).toEqual(testData.users[0].address)
    expect(result.email).toEqual(testData.users[0].email)
    expect(result.selectedPhoto).toEqual(testData.users[0].selectedPhoto)
  })

  test("should get the specified user by id", async () => {
    const email = "test@test.com"

    const result = await getUserBy({ email })

    expect(result).toBeDefined()
    expect(result.provider).toEqual(testData.users[0].provider)
    expect(result.businessName).toEqual(testData.users[0].businessName)
    expect(result.address).toEqual(testData.users[0].address)
    expect(result.email).toEqual(testData.users[0].email)
    expect(result.selectedPhoto).toEqual(testData.users[0].selectedPhoto)
  })

  test("should not get the specified user when email is invalid", async () => {
    const email = "Some other email"

    const result = await getUserBy({ email })

    expect(result).toBeFalsy()
  })
})
