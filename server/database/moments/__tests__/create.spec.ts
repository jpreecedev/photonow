import { create } from '..'
import { sanitizeData } from '../../test-utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Create moment tests', () => {
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

  test('should create a new moment', async () => {
    const newMoment = {
      filename: 'TEST FILE NAME.jpg',
      mimeType: 'application/test',
      bucket: 'TEST BUCKET NAME',
      contentType: 'image/test',
      location: 'TEST LOCATION',
      originalEtag: 'TEST ORIGINAL ETAG',
      resizedLocation: 'RESIZED LOCATION',
      resizedEtag: 'TEST RESIZED ETAG'
    }

    const result = await create(newMoment)

    expect(result.id).not.toBeUndefined()
  })
})
