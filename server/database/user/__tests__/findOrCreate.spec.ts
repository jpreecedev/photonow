import { findOrCreate } from '../../user'
import { sanitizeData } from '../../test-utils'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Find or create user tests', () => {
  const testData = require('./findOrCreate.json')

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

  test('should find the specified user', async () => {
    const profile: IUser = { id: testData.users[0].id, displayName: 'EXISTING NAME' }
    const accessToken = testData.users[0].accessToken
    const refreshToken = testData.users[0].refreshToken

    const result = await findOrCreate(profile, accessToken, refreshToken)

    expect(result).not.toBeUndefined()
    expect(result.id).toEqual(profile.id)
    expect(result.accessToken).toEqual(accessToken)
    expect(result.refreshToken).toEqual(refreshToken)
  })

  test('should create a new user', async () => {
    const profile: IUser = {
      id: 'SOME_OTHER_PROFILE_ID',
      displayName: 'SOME DISPLAY NAME',
      username: 'SOME USERNAME',
      provider: 'SOME PROVIDER'
    }
    const accessToken = 'SOME ACCESS TOKEN'
    const refreshToken = 'SOME REFRESH TOKEN'

    const result = await findOrCreate(profile, accessToken, refreshToken)

    expect(result).not.toBeUndefined()
    expect(result.id).toEqual(profile.id)
    expect(result.displayName).toEqual(profile.displayName)
    expect(result.username).toEqual(profile.username)
    expect(result.provider).toEqual(profile.provider)
    expect(result.accessToken).toEqual(accessToken)
    expect(result.refreshToken).toEqual(refreshToken)
  })
})
