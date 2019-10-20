import { Types } from "mongoose"
import { Order, Moment, Payment, User, Collection } from "../../global"

interface TestData {
  orders?: Order[]
  moments?: Moment[]
  payments?: Payment[]
  users?: User[]
  collections?: Collection[]
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
  if (testData.payments && testData.payments.length) {
    testData.payments.forEach(payment => {
      payment._id = Types.ObjectId(payment._id)
      payment.orderId = Types.ObjectId((payment.orderId as unknown) as string)
    })
  }
  if (testData.collections && testData.collections.length) {
    testData.collections.forEach(collection => {
      collection._id = Types.ObjectId(collection._id)
      collection.userId = Types.ObjectId((collection.userId as unknown) as string)
    })
  }
  return testData
}

export { sanitizeData }
