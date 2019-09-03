import { Types } from 'mongoose'
import { createOrder } from '../create'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Create order tests', () => {
  beforeAll(async () => {
    await dbHelper.start()
  })

  afterAll(async () => {
    await dbHelper.stop()
  })

  afterEach(async () => {
    await dbHelper.cleanup()
  })

  test('should create an order', async () => {
    const newOrder = <IOrder>{
      moments: [
        Types.ObjectId('1aaa9190969b198adaa1ba91'),
        Types.ObjectId('4bcc2370562b178fdfa1be11')
      ],
      amount: 1197,
      name: 'Test Customer',
      email: 'test@email.com',
      addressLine1: '1 Test Street',
      addressLine2: 'Test District',
      city: 'Test City',
      postalCode: 'Test Postal Code',
      state: 'Test State',
      country: 'Test Country'
    }

    const order = await createOrder(newOrder)

    expect(order).toBeDefined()
    expect(order.moments).not.toBeUndefined()
    expect(order.moments.length).toEqual(2)
    expect(order.amount).toEqual(1197)
    expect(order.name).toEqual(newOrder.name)
    expect(order.email).toEqual(newOrder.email)
    expect(order.addressLine1).toEqual(newOrder.addressLine1)
    expect(order.addressLine2).toEqual(newOrder.addressLine2)
    expect(order.city).toEqual(newOrder.city)
    expect(order.postalCode).toEqual(newOrder.postalCode)
    expect(order.state).toEqual(newOrder.state)
    expect(order.country).toEqual(newOrder.country)
  })
})
