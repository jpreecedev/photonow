import React, { FunctionComponent } from "react"
import { ReactStripeElements, PaymentRequestButtonElement } from "react-stripe-elements"
import { useRouter } from "next/router"

import { BillingDetails } from "../global"

interface StripePaymentButtonProps {
  loaded: (success: boolean) => void
  handleOrder: (paymentIntent: stripe.paymentIntents.PaymentIntent, error: stripe.Error) => void
  orderTotal: number
}

const StripePaymentButton: FunctionComponent<
  ReactStripeElements.InjectedStripeProps & StripePaymentButtonProps
> = ({ stripe, handleOrder, loaded, orderTotal }) => {
  const paymentRequestRef = React.useRef(null)
  const router = useRouter()
  const clientSecret = router.query.token as string

  const [canMakePayment, setCanMakePayment] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (stripe === null) {
      return
    }

    paymentRequestRef.current = stripe.paymentRequest({
      country: "GB",
      currency: "gbp",
      total: {
        label: "Purchase of precious moments from PhotoNow.io",
        amount: orderTotal
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true
    })

    paymentRequestRef.current.on("paymentmethod", async ({ paymentMethod, complete }) => {
      // @ts-ignore
      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: paymentMethod.id },
        { handleActions: false }
      )

      if (confirmError) {
        // Report to the browser that the payment failed, prompting it to
        // re-show the payment interface, or show an error message and close
        // the payment interface.
        complete("fail")
      } else {
        // Report to the browser that the confirmation was successful, prompting
        // it to close the browser payment method collection interface.
        complete("success")
        // Let Stripe.js handle the rest of the payment flow.
        // @ts-ignore
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret)
        if (error) {
          debugger
          // TODO
          // The payment failed -- ask your customer for a new payment method.
        } else {
          handleOrder(paymentIntent, error)
        }
      }
    })

    paymentRequestRef.current.canMakePayment().then(result => {
      setCanMakePayment(result)
      loaded(result !== null)
    })
  }, [stripe])

  if (!canMakePayment) {
    return null
  }

  return <PaymentRequestButtonElement paymentRequest={paymentRequestRef.current} />
}

export { StripePaymentButton }
