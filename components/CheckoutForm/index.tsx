import React, { FunctionComponent } from "react"
import Router from "next/router"
import { connect } from "react-redux"
import { FormState } from "redux-form"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

import { AddressForm } from "../AddressForm"
import { PaymentForm } from "../PaymentForm"
import { Review } from "../Review"
import { AppState, PictureItem } from "../../global"
import * as server from "../../utils/server"

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
}

const CheckoutForm: FunctionComponent<
  ReactStripeElements.InjectedStripeProps & CheckoutFormProps
> = ({ stripe, addressForm, paymentForm, pictures }) => {
  const [processing, setProcessing] = React.useState(false)
  const classes = useStyles({})

  const handleOrder = async () => {
    setProcessing(true)

    try {
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

      const { token } = await stripe.createToken({
        type: "card",
        name: billingDetails.name,
        address_line1: billingDetails.addressLine1,
        address_line2: billingDetails.addressLine2,
        address_city: billingDetails.city,
        address_state: billingDetails.state,
        address_zip: billingDetails.postalCode,
        address_country: billingDetails.country
      })

      const { success, redirectUrl } = await server.postAsync("/payment", {
        tokenId: token.id,
        billingDetails,
        pictures: pictures.filter(picture => picture.addedToBasket)
      })

      if (success) {
        Router.push(redirectUrl)
        return
      }
    } finally {
      setProcessing(false)
    }
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
          onClick={handleOrder}
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

const InjectedCheckoutForm = injectStripe(ConnectedCheckoutForm)

export { InjectedCheckoutForm as CheckoutForm }
