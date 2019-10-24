import React, { FunctionComponent } from "react"
import { ReactStripeElements, PaymentRequestButtonElement } from "react-stripe-elements"

import { BillingDetails } from "../global"

interface StripePaymentButtonProps {
  loaded: (success: boolean) => void
  handleOrder: (token: stripe.Token, billingDetails: BillingDetails) => void
}

const StripePaymentButton: FunctionComponent<
  ReactStripeElements.InjectedStripeProps & StripePaymentButtonProps
> = ({ stripe, handleOrder, loaded }) => {
  const paymentRequestRef = React.useRef(null)

  const [canMakePayment, setCanMakePayment] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (stripe === null) {
      return
    }

    paymentRequestRef.current = stripe.paymentRequest({
      country: "GB",
      currency: "gbp",
      total: {
        label: "Demo total",
        amount: 1
      },
      requestPayerName: true,
      requestPayerEmail: true
    })

    paymentRequestRef.current.on("token", async ({ token, complete }) => {
      const { card } = token

      const billingDetails = {
        name: card.name,
        email: card.email,
        addressLine1: card.address_line1,
        addressLine2: card.address_line2,
        city: card.address_city,
        postalCode: card.address_zip,
        state: card.address_state,
        country: card.country
      }

      handleOrder(token, billingDetails)
      complete("success")
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
