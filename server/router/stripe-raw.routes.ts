import express, { Request, Response } from "express"
import Stripe from "stripe"
import bodyParser from "body-parser"

import { StripeController } from "../controllers"
import { errorHandler } from "../utils"

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"]

    let event
    let intent

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
    } catch (err) {
      errorHandler.handle(err)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    switch (event["type"]) {
      case "payment_intent.succeeded":
        intent = event.data.object
        await StripeController.paymentIntentCompleted(intent)
        break
      case "payment_intent.payment_failed":
        intent = event.data.object
        const message = intent.last_payment_error && intent.last_payment_error.message
        console.log("Failed:", intent.id, message)
        break
    }

    return res.status(200).json({ received: true })
  }
)

export default router
