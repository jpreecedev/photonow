import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { getOrder } from '..'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Get order tests', () => {
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
    const testData = require('./get-order.json')
    await dbHelper.seed(sanitizeData(testData))
  })

  test('should get the order when order id is supplied', async () => {
    const orderId = Types.ObjectId('9aaa2370562a178fdfa1ae99')

    const order = await getOrder(orderId)

    expect(order).not.toBeUndefined()
    expect(order._id.toString()).toEqual(orderId.toString())
  })
})
