import { Types } from "mongoose"
import { createOrder } from "../create"
import TestDbHelper from "../../../../setup/mongo"
import { Order } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Create order tests", () => {
  beforeAll(async () => {
    await dbHelper.start()
  })

  afterAll(async () => {
    await dbHelper.stop()
  })

  afterEach(async () => {
    await dbHelper.cleanup()
  })

  test("should create an order", async () => {
    const order = <Order>{
      moments: [Types.ObjectId("1aaa9190969b198adaa1ba91")],
      amount: 222,
      name: "Test Customer",
      email: "test@test.com",
      addressLine1: "1 Test Street",
      addressLine2: "Test Area",
      city: "Test City",
      postalCode: "TT1 1TT",
      state: "Test State",
      country: "Test Country"
    }

    const newOrder = await createOrder(order)

    expect(newOrder).toBeDefined()
    expect(newOrder._id).not.toBeUndefined()
    expect(newOrder.moments.length).toEqual(1)
    expect(newOrder.amount).toEqual(order.amount)
    expect(newOrder.name).toEqual(order.name)
    expect(newOrder.email).toEqual(order.email)
    expect(newOrder.addressLine1).toEqual(order.addressLine1)
    expect(newOrder.addressLine2).toEqual(order.addressLine2)
    expect(newOrder.city).toEqual(order.city)
    expect(newOrder.postalCode).toEqual(order.postalCode)
    expect(newOrder.state).toEqual(order.state)
    expect(newOrder.country).toEqual(order.country)
  })
})
