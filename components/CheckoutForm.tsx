import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import { reduxForm, InjectedFormProps } from "redux-form"
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
  pictures: PictureItem[]
  firstName: string
  lastName: string
  emailAddress: string
  address1: string
  address2: string
  city: string
  state: string
  postalCode: string
  cardName: string
}

const validate = (values: CheckoutFormProps) => {
  const errors = {
    firstName: null,
    lastName: null,
    emailAddress: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    postalCode: null,
    cardName: null
  }
  const requiredFields = [
    "firstName",
    "lastName",
    "emailAddress",
    "address1",
    "address2",
    "city",
    "state",
    "postalCode",
    "cardName"
  ]
  requiredFields.forEach(field => {
    if (!values[field] || values[field].length <= 2) {
      errors[field] = "Required"
    }
  })
  if (
    values.emailAddress &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)
  ) {
    errors.emailAddress = "Invalid email address"
  }
  return errors
}

const CheckoutForm: FunctionComponent<
  ReactStripeElements.InjectedStripeProps & InjectedFormProps<CheckoutFormProps>
> = ({ submitting, valid, handleSubmit }) => {
  const classes = useStyles({})
  const router = useRouter()

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AddressForm />
      <PaymentForm />
      <Review />
      <div className={classes.buttons}>
        <Button
          disabled={submitting}
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={() => router.push("/select-your-pictures")}
        >
          Cancel
        </Button>
        <Button
          disabled={submitting || !valid}
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          Place order
        </Button>
      </div>
    </form>
  )
}

const ReduxCheckoutForm = reduxForm<CheckoutFormProps>({
  form: "checkoutForm",
  validate
})(CheckoutForm)

const ConnectedCheckoutForm = connect((state: AppState) => ({
  pictures: state.pictures
}))(ReduxCheckoutForm)

export { ConnectedCheckoutForm as CheckoutForm }
