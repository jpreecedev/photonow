import React, { FunctionComponent } from "react"
import Router from "next/router"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import ErrorIcon from "@material-ui/icons/Error"

import { CheckoutForm } from "../components/CheckoutForm"
import { Banner } from "../components/Banner"
import * as server from "../utils/server"

interface CheckoutFormContainerProps {}

const CheckoutFormContainer: FunctionComponent<
  ReactStripeElements.InjectedStripeProps & CheckoutFormContainerProps
> = ({ stripe }) => {
  const [paymentStatus, setPaymentStatus] = React.useState({
    paymentAttemptMade: false,
    success: false
  })
  const [processing, setProcessing] = React.useState(false)

  const handleOrder = async (
    paymentIntent: stripe.paymentIntents.PaymentIntent,
    error?: stripe.Error
  ) => {
    if (error) {
      setPaymentStatus({ paymentAttemptMade: true, success: false })
      window.scrollTo(0, 0)
      console.log(error)
      return
    }

    setProcessing(true)

    try {
      const { success, data } = await server.postAsync<string>("/stripe/check-order", {
        paymentIntentId: paymentIntent.id
      })

      setPaymentStatus({ paymentAttemptMade: true, success })

      if (success) {
        Router.push(data)
        return
      } else {
        window.scrollTo(0, 0)
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      {paymentStatus.paymentAttemptMade && !paymentStatus.success && (
        <Banner
          theme="error"
          icon={<ErrorIcon />}
          message={"Your payment was not successful. Please check your details and try again."}
        />
      )}
      <CheckoutForm handleOrder={handleOrder} processing={processing} stripe={stripe} />
    </>
  )
}

const InjectedCheckoutFormContainer = injectStripe(CheckoutFormContainer)

export { InjectedCheckoutFormContainer as CheckoutFormContainer }
