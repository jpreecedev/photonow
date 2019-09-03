import { PaymentModel } from "../schema"

async function createPayment(payment: Payment) {
  const result = await new PaymentModel(payment).save()
  return result !== undefined && result !== null
}

export { createPayment }
