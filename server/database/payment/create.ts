import { PaymentModel } from "../schema"
import { Payment } from "../../../global"

async function createPayment(payment: Payment) {
  const result = await new PaymentModel(payment).save()
  return result !== undefined && result !== null
}

export { createPayment }
