import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { verifyCsrfToken } from "../get"

const dbHelper = TestDbHelper()

describe("Get csrf token tests", () => {
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

  test("should verify that the state token exists", async () => {
    const state = "THIS_IS_RANDOM_STATE"

    const exists = await verifyCsrfToken(state)

    expect(exists).toBeTruthy()
  })

  test("should verify that the state token does not exist", async () => {
    const state = "THIS_IS_INCORRECT"

    const exists = await verifyCsrfToken(state)

    expect(exists).toBeFalsy()
  })
})
