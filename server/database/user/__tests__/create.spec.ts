import { sanitizeData } from '../../test-utils'
import { create } from '..'
import TestDbHelper from '../../../../../config/jest/mongo-setup'

const dbHelper = new TestDbHelper()

describe('Create user tests', () => {
  const testData = require('./create.json')

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

  test('should create a new user', async () => {
    const firstName = 'test firstName'
    const lastName = 'test lastName'
    const email = 'test@email.com'
    const username = 'test username'
    const password = 'test password'

    const result = await create({ firstName, lastName, email, username, password })

    expect(result).toBeTruthy()
    expect(result.firstName).toEqual(firstName)
    expect(result.lastName).toEqual(lastName)
    expect(result.email).toEqual(email)
    expect(result.username).toEqual(username)
    expect(result.password).toEqual(password)
  })

  test('should not create a new user and throw an error', async () => {
    const username = testData.users[0].username

    expect(create({ username })).rejects.toEqual(new Error('Username is already taken'))
  })
})
