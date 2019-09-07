import { Types } from "mongoose"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { getOrder } from "../get"
import { Moment } from "../../../../global"

const dbHelper = TestDbHelper()

describe("Get order tests", () => {
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

  test("should get one order", async () => {
    const orderId = Types.ObjectId(testData.orders[0]._id)

    const order = await getOrder(orderId)

    expect(order).toBeDefined()
    expect(order._id).not.toBeUndefined()
    expect(order.amount).toEqual(testData.orders[0].amount)
    expect(order.name).toEqual(testData.orders[0].name)
    expect(order.email).toEqual(testData.orders[0].email)
    expect(order.addressLine1).toEqual(testData.orders[0].addressLine1)
    expect(order.addressLine2).toEqual(testData.orders[0].addressLine2)
    expect(order.city).toEqual(testData.orders[0].city)
    expect(order.postalCode).toEqual(testData.orders[0].postalCode)
    expect(order.state).toEqual(testData.orders[0].state)
    expect(order.country).toEqual(testData.orders[0].country)

    expect(order.moments).toBeDefined()
    expect(order.moments.length).toEqual(2)

    order.moments.forEach((moment: Moment, index) => {
      expect(moment.filename).toEqual(testData.moments[index].filename)
      expect(moment.location).toEqual(testData.moments[index].location)
      expect(moment.resizedLocation).toEqual(testData.moments[index].resizedLocation)
      expect(moment.mimeType).toEqual(testData.moments[index].mimeType)
    })
  })
})
