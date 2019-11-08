import React, { FunctionComponent } from "react"
import { DispatchProp, connect } from "react-redux"
import { FormState } from "redux-form"
import { ReactStripeElements } from "react-stripe-elements"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Button, CircularProgress } from "@material-ui/core"
import { useRouter } from "next/router"

import { AddressForm } from "./AddressForm"
import { PaymentForm } from "./PaymentForm"
import { Review } from "./Review"
import { PictureItem, AppState } from "../global"

const useStyles = makeStyles((theme: Theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}))

interface CheckoutFormProps {
  addressForm: FormState
  paymentForm: FormState
  pictures: PictureItem[]
  processing: boolean
  handleOrder: (paymentIntent: stripe.paymentIntents.PaymentIntent, error: stripe.Error) => void
}

const CheckoutForm: FunctionComponent<
  ReactStripeElements.InjectedStripeProps & CheckoutFormProps & DispatchProp<any>
> = ({ stripe, addressForm, paymentForm, processing, handleOrder }) => {
  const classes = useStyles({})
  const router = useRouter()

  const getOrderDetails = async (): Promise<stripe.PaymentIntentResponse> => {
    return await stripe.handleCardPayment(router.query.token as string, {
      receipt_email: addressForm.values.emailAddress,
      payment_method_data: {
        billing_details: {
          email: addressForm.values.emailAddress,
          name: paymentForm.values.cardName,
          address: {
            line1: addressForm.values.address1,
            line2: addressForm.values.address2,
            city: addressForm.values.city,
            state: addressForm.values.state,
            postal_code: addressForm.values.postalCode,
            country: addressForm.values.country
          }
        }
      }
    })
  }

  return (
    <>
      <AddressForm />
      <PaymentForm />
      <Review />
      <div className={classes.buttons}>
        <Button variant="outlined" color="primary" className={classes.button}>
          Cancel
        </Button>
        <Button
          disabled={processing}
          variant="contained"
          color="primary"
          onClick={async () => {
            const { paymentIntent, error } = await getOrderDetails()
            await handleOrder(paymentIntent, error)
          }}
          className={classes.button}
        >
          {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
          Place order
        </Button>
      </div>
    </>
  )
}

const ConnectedCheckoutForm = connect((state: AppState) => ({
  pictures: state.pictures,
  addressForm: state.form.addressForm,
  paymentForm: state.form.paymentForm
}))(CheckoutForm)

export { ConnectedCheckoutForm as CheckoutForm }
