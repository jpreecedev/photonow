import { Types } from 'mongoose'
import { sanitizeData } from '../../test-utils'
import { create } from '..'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Create payment tests', () => {
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
    const testData = require('./create.json')
    await dbHelper.seed(sanitizeData(testData))
  })

  test('should create a payment', async () => {
    const newPayment = {
      customerId: Types.ObjectId('1cfc2370562b178fdfa1be91'),
      photographerId: Types.ObjectId('1dfd2370562d198fdfa1de91'),
      moments: [Types.ObjectId('9ccc2370562b178fdfa1be11')],
      amount: 600,
      paid: true,
      status: 'succeeded',
      receipt: 'http://some_url/',
      stripeCharge: { cameFromStripe: true },
      purchased: new Date()
    }

    const paymentSaved = await create(newPayment)

    expect(paymentSaved).toBeTruthy()
  })
})
