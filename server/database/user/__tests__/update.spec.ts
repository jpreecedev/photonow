import { updateRole, updateStripeData } from "../update"
import TestDbHelper from "../../../../utils/mongo"
import { sanitizeData } from "../../test-utils"
import { StripeExpressConnect } from "../../../../global"

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

  test("should update the given users stripe data", async () => {
    const id = testData.users[1]._id

    const rawStripeData = {
      access_token: "TEST_ACCESS_TOKEN",
      refresh_token: "TEST_REFRESH_TOKEN",
      token_type: "bearer",
      stripe_publishable_key: "TEST_PUBLISHABLE_KEY",
      stripe_user_id: "TEXT_USER_ID",
      scope: "TEST_SCOPE"
    }

    const stripeData: StripeExpressConnect = {
      accessToken: rawStripeData.access_token,
      refreshToken: rawStripeData.refresh_token,
      tokenType: rawStripeData.token_type,
      publishableKey: rawStripeData.stripe_publishable_key,
      userId: rawStripeData.stripe_user_id,
      scope: rawStripeData.scope
    }

    const result = await updateStripeData(id, stripeData)

    expect(result).toBeDefined()
    expect(result).toBeTruthy()
    expect(result.stripeData).toBeDefined()
    expect(result.stripeData.accessToken).toEqual(stripeData.accessToken)
    expect(result.stripeData.refreshToken).toEqual(stripeData.refreshToken)
    expect(result.stripeData.tokenType).toEqual(stripeData.tokenType)
    expect(result.stripeData.publishableKey).toEqual(stripeData.publishableKey)
    expect(result.stripeData.userId).toEqual(stripeData.userId)
    expect(result.stripeData.scope).toEqual(stripeData.scope)
  })
})
