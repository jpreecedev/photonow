import React, { FunctionComponent } from "react"
import { Field, reduxForm } from "redux-form"
import { Typography } from "@material-ui/core"
import { Grid } from "@material-ui/core"
import { TextField } from "@material-ui/core"
import { Box } from "@material-ui/core"
import { CardExpiryElement, CardCVCElement, CardNumberElement } from "react-stripe-elements"

import { StripeInput } from "./StripeInput"
import { renderTextField } from "./ReduxForm"

interface PaymentFormProps {}

const PaymentForm: FunctionComponent<PaymentFormProps> = () => (
  <>
    <Typography component="h2" variant="h5" gutterBottom>
      Payment method
    </Typography>
    <Box mb={6}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Field
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            component={renderTextField}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Credit Card Number"
            id="cardNumber"
            name="cardNumber"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputProps: {
                component: CardNumberElement
              },
              inputComponent: StripeInput
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            id="expDate"
            label="Expiry date"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputProps: {
                component: CardExpiryElement
              },
              inputComponent: StripeInput
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputProps: {
                component: CardCVCElement
              },
              inputComponent: StripeInput
            }}
          />
        </Grid>
      </Grid>
    </Box>
  </>
)

const ReduxPaymentForm = reduxForm({
  form: "paymentForm"
})(PaymentForm)

export { ReduxPaymentForm as PaymentForm }
