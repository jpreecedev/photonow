import { Types } from "mongoose"
import { sanitizeData } from "../../test-utils"
import { createPayment } from ".."
import TestDbHelper from "../../../../setup/mongo"
import { Payment } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Create payment tests", () => {
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
    const testData = require("./create.json")
    await dbHelper.seed(sanitizeData(testData))
  })

  test("should create a payment", async () => {
    const newPayment = <Payment>{
      orderId: Types.ObjectId("9aaa2370562a178fdfa1ae99"),
      moments: [Types.ObjectId("9ccc2370562b178fdfa1be11")],
      amount: 600,
      paid: true,
      status: "succeeded",
      receipt: "http://some_url/",
      stripeCharge: { cameFromStripe: true },
      purchased: new Date()
    }

    const paymentSaved = await createPayment(newPayment)

    expect(paymentSaved).toBeTruthy()
  })
})
