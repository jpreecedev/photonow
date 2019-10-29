import React, { FunctionComponent } from "react"
import { DispatchProp, connect } from "react-redux"
import { FormState } from "redux-form"
import { ReactStripeElements } from "react-stripe-elements"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Button, CircularProgress } from "@material-ui/core"

import { AddressForm } from "./AddressForm"
import { PaymentForm } from "./PaymentForm"
import { Review } from "./Review"
import { PictureItem, BillingDetails, AppState } from "../global"

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
  handleOrder: (token: stripe.Token, billingDetails: BillingDetails, error: stripe.Error) => void
}

const CheckoutForm: FunctionComponent<
  ReactStripeElements.InjectedStripeProps & CheckoutFormProps & DispatchProp<any>
> = ({ stripe, addressForm, paymentForm, processing, handleOrder }) => {
  const classes = useStyles({})

  const getOrderDetails = async (): Promise<{
    token: stripe.Token
    billingDetails: BillingDetails
    error?: stripe.Error
  }> => {
    const billingDetails = {
      name: paymentForm.values.cardName,
      email: addressForm.values.emailAddress,
      addressLine1: addressForm.values.address1,
      addressLine2: addressForm.values.address2,
      city: addressForm.values.city,
      postalCode: addressForm.values.postalCode,
      state: addressForm.values.state,
      country: addressForm.values.country
    }

    const response = await stripe.createToken({
      type: "card",
      name: billingDetails.name,
      address_line1: billingDetails.addressLine1,
      address_line2: billingDetails.addressLine2,
      address_city: billingDetails.city,
      address_state: billingDetails.state,
      address_zip: billingDetails.postalCode,
      address_country: billingDetails.country
    })

    return { error: response.error, token: response.token, billingDetails }
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
            const { token, billingDetails, error } = await getOrderDetails()
            await handleOrder(token, billingDetails, error)
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
