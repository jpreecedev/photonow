import { Types } from "mongoose"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { getUserByEmail, getUserById, getUserByGoogleId } from "../get"

const dbHelper = TestDbHelper()

describe("Get user tests", () => {
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

  test("should get one user by id", async () => {
    const userId = Types.ObjectId(testData.users[0]._id)

    const user = await getUserById(userId)

    expect(user).toBeDefined()
    expect(user._id).toEqual(userId)
    expect(user.email).toEqual(testData.users[0].email)
    expect(user.password).toEqual(testData.users[0].password)
    expect(user.businessName).toEqual(testData.users[0].businessName)
    expect(user.firstName).toEqual(testData.users[0].firstName)
    expect(user.lastName).toEqual(testData.users[0].lastName)
    expect(user.displayName).toEqual(testData.users[0].displayName)
  })

  test("should get one user by email", async () => {
    const email = testData.users[0].email

    const user = await getUserByEmail(email)

    expect(user).toBeDefined()
    expect(user._id).toBeDefined()
    expect(user.email).toEqual(email)
    expect(user.password).toEqual(testData.users[0].password)
    expect(user.businessName).toEqual(testData.users[0].businessName)
    expect(user.firstName).toEqual(testData.users[0].firstName)
    expect(user.lastName).toEqual(testData.users[0].lastName)
    expect(user.displayName).toEqual(testData.users[0].displayName)
  })

  test("should get user by google id", async () => {
    const googleId = testData.users[1].googleId

    const user = await getUserByGoogleId(googleId)

    expect(user).toBeDefined()
    expect(user._id).toBeDefined()
    expect(user._id).toEqual(testData.users[1]._id)
    expect(user.googleId).toEqual(testData.users[1].googleId)
    expect(user.password).toEqual(testData.users[1].password)
    expect(user.businessName).toEqual(testData.users[1].businessName)
    expect(user.firstName).toEqual(testData.users[1].firstName)
    expect(user.lastName).toEqual(testData.users[1].lastName)
    expect(user.displayName).toEqual(testData.users[1].displayName)
  })
})
