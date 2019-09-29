import { createUser } from "../create"
import TestDbHelper from "../../../../setup/mongo"
import { User, UserRoles } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Create user tests", () => {
  beforeAll(async () => {
    await dbHelper.start()
  })

  afterAll(async () => {
    await dbHelper.stop()
  })

  afterEach(async () => {
    await dbHelper.cleanup()
  })

  test("should create a user", async () => {
    const user = <User>{
      firstName: "Test First Name",
      lastName: "Test Last Name",
      email: "test@test.com",
      password: "test-super-secure-password-probably-hashed",
      role: UserRoles.Customer
    }

    const result = await createUser(user)

    expect(result).toBeDefined()
    expect(result._id).toBeDefined()
    expect(result.firstName).toEqual(user.firstName)
    expect(result.lastName).toEqual(user.lastName)
    expect(result.email).toEqual(user.email)
    expect(result.password).toEqual(user.password)
    expect(result.role).toEqual(user.role)
  })
})
