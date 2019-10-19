import { updateRole } from "../update"
import TestDbHelper from "../../../../setup/mongo"
import { sanitizeData } from "../../test-utils"

const dbHelper = TestDbHelper()

describe("Update user tests", () => {
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

  test("should update the given users role", async () => {
    const id = testData.users[1]._id
    const newRole = "Updated test role"

    const result = await updateRole(id, newRole)

    expect(result).toBeTruthy()
  })
})
