import { Types } from "mongoose"
import { createPayment } from "../create"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { Payment } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Create payment tests", () => {
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

  test("should create a payment", async () => {
    const payment = <Payment>{
      orderId: Types.ObjectId("5d73db4b1bc1e4507529d548"),
      moments: [Types.ObjectId(testData.moments[0]._id)],
      amount: 222,
      paid: true,
      status: "test status",
      receipt: "http://test-url/receipt",
      stripeCharge: {},
      purchased: new Date()
    }

    const result = await createPayment(payment)

    expect(result).toBeTruthy()
  })
})
