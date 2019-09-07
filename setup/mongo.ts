import { MongoClient } from "mongodb"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

// Extend the default timeout so MongoDB binaries can download when first run
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000

export default () => {
  let db = null
  let server = new MongoMemoryServer()
  let connection = null

  const start = async () => {
    const url = await server.getConnectionString()
    connection = await MongoClient.connect(url, { useNewUrlParser: true })
    db = connection.db(await server.getDbName())
    await mongoose.connect(url, { useNewUrlParser: true }, err => {
      if (err) console.error(err)
    })
  }

  const stop = async () => {
    await mongoose.disconnect()
    connection.close()
    return server.stop()
  }

  const seed = testData => {
    return Promise.all(
      Object.keys(testData).map(item => db.collection(item).insertMany(testData[item]))
    )
  }

  const cleanup = async () => {
    const collections = await db.listCollections().toArray()
    return Promise.all(
      collections
        .map(({ name }) => name)
        .map(collection => db.collection(collection).drop())
    )
  }

  const createDoc = async (collectionName, document) => {
    const { ops } = await db.collection(collectionName).insertOne(document)
    return ops[0]
  }

  return {
    start,
    stop,
    seed,
    cleanup,
    createDoc
  }
}
