import { getUser, getUserBy } from '../../user'
import { sanitizeData } from '../../test-utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Add or update user tests', () => {
  const testData = require('./get.json')

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
    await dbHelper.seed(sanitizeData(testData))
  })

  test('should get the specified user', async () => {
    const id = testData.users[0].id
    const user = {
      businessName: testData.users[0].businessName,
      lat: testData.users[0].lat,
      lng: testData.users[0].lng,
      address: testData.users[0].address,
      provider: testData.users[0].provider,
      email: testData.users[0].email,
      displayName: testData.users[0].displayName,
      username: testData.users[0].username,
      selectedPhoto: testData.users[0].selectedPhoto
    }

    const result = await getUser(id)

    expect(result.businessName).toEqual(user.businessName)
    expect(result.lat).toEqual(user.lat)
    expect(result.lng).toEqual(user.lng)
    expect(result.address).toEqual(user.address)
    expect(result.email).toEqual(user.email)
    expect(result.displayName).toEqual(user.displayName)
    expect(result.username).toEqual(user.username)
    expect(result.selectedPhoto).toEqual(user.selectedPhoto)
    expect(result.provider).toEqual(user.provider)
  })

  test('should get the specified user by username', async () => {
    const username = 'Test Username'

    const result = await getUserBy({ username })

    expect(result).toBeDefined()
    expect(result.provider).toEqual(testData.users[0].provider)
    expect(result.businessName).toEqual(testData.users[0].businessName)
    expect(result.address).toEqual(testData.users[0].address)
    expect(result.username).toEqual(testData.users[0].username)
    expect(result.selectedPhoto).toEqual(testData.users[0].selectedPhoto)
  })

  test('should get the specified user by id', async () => {
    const id = '8a8b8f06cd5'

    const result = await getUserBy({ id })

    expect(result).toBeDefined()
    expect(result.provider).toEqual(testData.users[0].provider)
    expect(result.businessName).toEqual(testData.users[0].businessName)
    expect(result.address).toEqual(testData.users[0].address)
    expect(result.username).toEqual(testData.users[0].username)
    expect(result.selectedPhoto).toEqual(testData.users[0].selectedPhoto)
  })

  test('should not get the specified user when username is invalid', async () => {
    const username = 'Some other username'

    const result = await getUserBy({ username })

    expect(result).toBeFalsy()
  })
})
