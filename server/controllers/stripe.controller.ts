import { Types } from "mongoose"
import fetch from "isomorphic-unfetch"
import uuid from "uuid/v4"
import { Response, Request } from "express"
import { to } from "await-to-js"
import Stripe from "stripe"

import { createCsrfToken } from "../database/stripecsrftoken"
import {
  StripeCsrfToken,
  StripeExpressConnect,
  UserRequest,
  PictureItem,
  Order,
  ClientResponse,
  Email
} from "../../global"
import { errorHandler } from "../utils"
import { sendEmail } from "../utils/email"
import { updateStripeData } from "../database/user/update"
import { getRedirectUrl } from "../auth/utils"
import { getMoments } from "../database/moments"
import { getCollection } from "../database/collection"
import { createOrder, getOrderBySessionId } from "../database/order"
import { fulfillOrder } from "../database/order/update"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")

async function sendConfirmationEmail({ name, email, orderId }) {
  const confirmationEmail = <Email>{
    to: email,
    from: "no-reply@photonow.io",
    subject: `Order confirmation ${orderId}`,
    message: `<p>${name}, thank you for your order</p>
<p>You can review your order and download your pictures any time by clicking this link; <a href="${process.env.SERVER_URL}order-confirmation/${orderId}">${process.env.SERVER_URL}order-confirmation/${orderId}</a></p>
<p>Thank you for your order.</p>
<p>The team at PhotoNow.io</p>`
  }

  return await sendEmail(confirmationEmail)
}

async function checkoutSuccessful(req: Request, res: Response) {
  const { session_id } = req.query
  const order = await getOrderBySessionId(session_id)

  if (!order.fulfilled && process.env.NODE_ENV !== "development") {
    return res.status(500).json({ error: "The order was not fulfilled" })
  }

  const customer = order.customerId && (await stripe.customers.retrieve(order.customerId))

  if (customer) {
    await sendConfirmationEmail({
      name: customer.name,
      email: customer.email,
      orderId: order._id
    })
  }

  return res.redirect(`/order-confirmation/${order._id}`)
}

async function checkoutSessionCompleted(session: Stripe.checkouts.sessions.ICheckoutSession) {
  const customer = await stripe.customers.retrieve(session.customer as string)
  await fulfillOrder({ sessionId: session.id, customerId: customer.id, stripeOrderId: null })
}

async function createSession(req: Request, res: Response) {
  try {
    const { pictures }: { pictures: PictureItem[] } = req.body

    const moments = await getMoments(pictures.map(picture => Types.ObjectId(picture.momentId)))
    const collection = await getCollection(moments[0].collectionId)

    const lineItems: Stripe.checkouts.sessions.ICheckoutLineItems[] = moments.map(moment => ({
      name: "Precious Moment",
      description: moment.filename,
      amount: collection.price,
      currency: "gbp",
      quantity: 1
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.SERVER_API_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SERVER_API_URL}/stripe/cancel`
    })

    await createOrder(<Order>{
      moments: moments.map(moment => moment._id.toString()),
      customerId: session.customer as string,
      sessionId: session.id,
      fulfilled: false
    })

    return res.status(200).json(<ClientResponse<string>>{
      success: true,
      data: session.id
    })
  } catch (e) {
    errorHandler.handle(e)
    return res.status(500).json(<ClientResponse<string>>{
      success: false,
      data: e
    })
  }
}

async function start(req: Request, res: Response) {
  const state = uuid()
  await createCsrfToken(<StripeCsrfToken>{ state })

  return res.redirect(process.env.STRIPE_EXPRESS_REGISTER_URL.replace("{STATE_VALUE}", state))
}

async function requestAccess(req: UserRequest, res: Response) {
  const code = req.query.code
  const body = {
    client_secret: process.env.STRIPE_SECRET_KEY,
    grant_type: "authorization_code",
    code
  }

  const [err, response] = await to(
    fetch(process.env.STRIPE_EXPRESS_CREATE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: Object.entries(body)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join("&")
    }).then(res => res.json())
  )

  if (err) {
    errorHandler.handle(err)
    return res.status(500).send("We were unable to complete the registration process")
  }

  const {
    access_token,
    refresh_token,
    token_type,
    stripe_publishable_key,
    stripe_user_id,
    scope
  } = response

  const stripeData: StripeExpressConnect = {
    accessToken: access_token,
    refreshToken: refresh_token,
    tokenType: token_type,
    publishableKey: stripe_publishable_key,
    userId: stripe_user_id,
    scope
  }

  const updatedUser = await updateStripeData(req.user._id, stripeData)

  return res.redirect(getRedirectUrl(updatedUser))
}

export default { start, requestAccess, createSession, checkoutSessionCompleted, checkoutSuccessful }
