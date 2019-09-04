import { Types } from "mongoose"
import { Order, Moment, Payment } from "../../global"

interface TestData {
  orders?: Order[]
  moments?: Moment[]
  payments?: Payment[]
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

  if (testData.moments && testData.moments.length) {
    testData.moments.forEach(moment => {
      moment._id = Types.ObjectId(moment._id)
      moment.photographerId = Types.ObjectId((moment.photographerId as unknown) as string)
    })
  }
  if (testData.payments && testData.payments.length) {
    testData.payments.forEach(payment => {
      payment._id = Types.ObjectId(payment._id)
      payment.orderId = Types.ObjectId((payment.orderId as unknown) as string)
    })
  }
  return testData
}

export { sanitizeData }
