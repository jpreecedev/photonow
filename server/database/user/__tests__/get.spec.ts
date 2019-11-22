import { Types } from "mongoose"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../utils/mongo"
import { getUserByEmail, getUserById, getUserByProviderId, getAllUsers } from "../get"
import { User, DatabaseUser } from "../../../../global"

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
    expect(user.role).toEqual(testData.users[0].role)
  })

  test("should get user by google id", async () => {
    const providerId = testData.users[1].providerId

    const user = await getUserByProviderId(providerId)

    expect(user).toBeDefined()
    expect(user._id).toBeDefined()
    expect(user._id).toEqual(testData.users[1]._id)
    expect(user.providerId).toEqual(testData.users[1].providerId)
    expect(user.provider).toEqual(testData.users[1].provider)
    expect(user.password).toEqual(testData.users[1].password)
    expect(user.businessName).toEqual(testData.users[1].businessName)
    expect(user.firstName).toEqual(testData.users[1].firstName)
    expect(user.lastName).toEqual(testData.users[1].lastName)
    expect(user.displayName).toEqual(testData.users[1].displayName)
    expect(user.role).toEqual(testData.users[1].role)
  })

  test("should get a list of users", async () => {
    const expectedUsers = testData.users.map((user: User) => ({
      _id: user._id,
      name: `${user.firstName} ${user.lastName} (${user.email})`
    }))

    const users = await getAllUsers()

    expect(users).toBeDefined()
    expect(users).toHaveLength(2)

    users.forEach((user: DatabaseUser, index: number) => {
      expect(expectedUsers[index]._id === user._id)
      expect(expectedUsers[index].name === user.name)
      expect(expectedUsers[index].role === user.role)
    })
  })
})
