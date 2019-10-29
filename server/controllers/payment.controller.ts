import { Response } from "express"
import Stripe from "stripe"
import { Types } from "mongoose"

import {
  Moment,
  UserRequest,
  Order,
  Payment,
  PictureItem,
  ClientResponse,
  Collection
} from "../../global"
import { createPayment } from "../database/payment"
import { createOrder } from "../database/order"
import { getMoments } from "../database/moments"
import { errorHandler } from "../utils"
import { getCollection } from "../database/collection"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

interface PaymentRequest {
  tokenId: string
  billingDetails: Order
  pictures: PictureItem[]
}

function calculateOrderAmount(collection: Collection, moments: Moment[]) {
  return moments.length * collection.price
}

async function post(req: UserRequest, res: Response) {
  try {
    const { tokenId, billingDetails, pictures } = <PaymentRequest>req.body
    const {
      name,
      email,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      state,
      country
    } = billingDetails

    const momentIds: Types.ObjectId[] = pictures.reduce(
      (acc: Types.ObjectId[], current: PictureItem) => {
        acc.push(Types.ObjectId(current.momentId))
        return acc
      },
      []
    )

    const moments = await getMoments(momentIds)
    const collection = await getCollection(moments[0].collectionId)

    const amount = calculateOrderAmount(collection, moments)

    const result = await stripe.charges.create({
      amount,
      currency: "gbp",
      description: `Purchase of precious moments (${name})`,
      source: tokenId
    })

    const newOrder = <Order>{
      moments: momentIds,
      amount,
      name,
      email,
      addressLine1,
      addressLine2,
      city,
      postalCode,
      state,
      country
    }

    const order = await createOrder(newOrder)

    const paymentSaved = await createPayment(<Payment>{
      orderId: order._id,
      moments: momentIds,
      amount: order.amount,
      paid: result.paid,
      status: result.status,
      receipt: result.receipt_url,
      stripeCharge: result,
      purchased: new Date()
    })

    if (paymentSaved) {
      return res.status(200).json(<ClientResponse<string>>{
        success: true,
        data: `/order-confirmation/${order._id}`
      })
    }

    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: "Payment was not created"
    })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: null
    })
  }
}

export default { post }
