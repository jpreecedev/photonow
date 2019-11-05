import TestDbHelper from "../../../../setup/mongo"
import { sanitizeData } from "../../test-utils"
import { fulfillOrder } from "../update"

const dbHelper = TestDbHelper()

describe("Update order tests", () => {
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

  test("should update the given order", async () => {
    const sessionId = testData.orders[1].sessionId
    const customerId = testData.orders[1].customerId
    const stripeOrderId = "MY_RANDOM_STRIPE_ORDER_ID"

    const result = await fulfillOrder({ sessionId, customerId, stripeOrderId })
    console.log(result)

    expect(result).toBeDefined()
    expect(result).toBeTruthy()
    expect(result.fulfilled).toBeTruthy()
    expect(result.stripeOrderId).toEqual(stripeOrderId)
  })
})
