import { Types } from "mongoose"
import { Order, Moment, User, Collection, StripeCsrfToken } from "../../global"

interface TestData {
  orders?: Order[]
  moments?: Moment[]
  users?: User[]
  collections?: Collection[]
  stripeCsrfTokens?: StripeCsrfToken[]
}

function sanitizeData(testData: TestData) {
  if (testData.orders && testData.orders.length) {
    testData.orders.forEach(order => {
      order._id = Types.ObjectId(order._id)
      if (order.moments) {
        order.moments.forEach(moment => {
          moment = Types.ObjectId(moment)
        })
      }
    })
  }

  if (testData.users && testData.users.length) {
    testData.users.forEach(user => {
      user._id = Types.ObjectId(user._id)
    })
  }

  if (testData.moments && testData.moments.length) {
    testData.moments.forEach(moment => {
      moment._id = Types.ObjectId(moment._id)
      moment.photographerId = Types.ObjectId((moment.photographerId as unknown) as string)
      moment.collectionId = Types.ObjectId((moment.collectionId as unknown) as string)
    })
  }

  if (testData.collections && testData.collections.length) {
    testData.collections.forEach(collection => {
      collection._id = Types.ObjectId(collection._id)
      collection.userId = Types.ObjectId((collection.userId as unknown) as string)
    })
  }

  if (testData.stripeCsrfTokens && testData.stripeCsrfTokens.length) {
    testData.stripeCsrfTokens.forEach(token => {
      token._id = Types.ObjectId(token._id)
    })
  }
  return testData
}

export { sanitizeData }
