import { createCsrfToken } from "../create"
import TestDbHelper from "../../../../setup/mongo"
import { StripeCsrfToken } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Create csrf token tests", () => {
  beforeAll(async () => {
    await dbHelper.start()
  })

  afterAll(async () => {
    await dbHelper.stop()
  })

  afterEach(async () => {
    await dbHelper.cleanup()
  })

  test("should create a CSRF token", async () => {
    const state = "SOME_RANDOM_STATE"
    const order = <StripeCsrfToken>{
      state
    }

    const result = await createCsrfToken(order)

    expect(result).toBeDefined()
    expect(result._id).not.toBeUndefined()
    expect(result.state).toEqual(state)
  })
})
