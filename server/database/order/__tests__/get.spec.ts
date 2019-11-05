import { Types } from "mongoose"
import { sanitizeData } from "../../test-utils"
import TestDbHelper from "../../../../setup/mongo"
import { getOrder, getOrderBySessionId } from "../get"
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
    expect(order.customerId).toEqual(testData.orders[0].customerId)
    expect(order.sessionId).toEqual(testData.orders[0].sessionId)
    expect(order.fulfilled).toEqual(testData.orders[0].fulfilled)

    expect(order.moments).toBeDefined()
    expect(order.moments.length).toEqual(2)

    order.moments.forEach((moment: Moment, index) => {
      expect(moment.filename).toEqual(testData.moments[index].filename)
      expect(moment.location).toEqual(testData.moments[index].location)
      expect(moment.resizedLocation).toEqual(testData.moments[index].resizedLocation)
      expect(moment.mimeType).toEqual(testData.moments[index].mimeType)
    })
  })

  test("should get one order by session id", async () => {
    const sessionId = testData.orders[1].sessionId

    const order = await getOrderBySessionId(sessionId)

    expect(order).toBeDefined()
    expect(order._id).not.toBeUndefined()
    expect(order.customerId).toEqual(testData.orders[1].customerId)
    expect(order.sessionId).toEqual(testData.orders[1].sessionId)
    expect(order.fulfilled).toEqual(testData.orders[1].fulfilled)

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
