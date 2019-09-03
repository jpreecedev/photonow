import { MongoClient } from "mongodb"
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

// Extend the default timeout so MongoDB binaries can download when first run
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000

export default class TestDbHelper {
  constructor() {
    this.db = null
    this.server = new MongoMemoryServer()
    this.connection = null
  }

  async start() {
    const url = await this.server.getConnectionString()
    this.connection = await MongoClient.connect(url, { useNewUrlParser: true })
    this.db = this.connection.db(await this.server.getDbName())
    await mongoose.connect(url, { useNewUrlParser: true }, err => {
      if (err) console.error(err)
    })
  }

  async stop() {
    await mongoose.disconnect()
    this.connection.close()
    return this.server.stop()
  }

  async seed(testData) {
    return Promise.all(
      Object.keys(testData).map(item =>
        this.db.collection(item).insertMany(testData[item])
      )
    )
  }

  async cleanup() {
    const collections = await this.db.listCollections().toArray()
    return Promise.all(
      collections
        .map(({ name }) => name)
        .map(collection => this.db.collection(collection).drop())
    )
  }

  async createDoc(collectionName, document) {
    const { ops } = await this.db.collection(collectionName).insertOne(document)
    return ops[0]
  }
}
