import { sanitizeData } from "../../test-utils"
import { createUser } from ".."
import TestDbHelper from "../../../../setup/mongo"
import { User } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Create user tests", () => {
  const testData = require("./create.json")

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

  test("should create a new user", async () => {
    const firstName = "test firstName"
    const lastName = "test lastName"
    const email = "test@email.com"
    const password = "test password"

    const result = await createUser(<User>{
      firstName,
      lastName,
      email,
      password
    })

    expect(result).toBeTruthy()
    expect(result.firstName).toEqual(firstName)
    expect(result.lastName).toEqual(lastName)
    expect(result.email).toEqual(email)
    expect(result.password).toEqual(password)
  })

  test("should not create a new user and throw an error", async () => {
    const email = testData.users[0].email

    expect(createUser(<User>{ email })).rejects.toEqual(
      new Error("Email is already in use")
    )
  })
})
