import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { Grid } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { FormControl } from "@material-ui/core"
import { InputLabel } from "@material-ui/core"
import { Box } from "@material-ui/core"
import countryList from "react-select-country-list"
import { useTheme } from "@material-ui/core/styles"

import { Country } from "../global"
import { renderSelectField, renderTextField } from "./ReduxForm"

interface AddressFormProps {}

const AddressForm: FunctionComponent<InjectedFormProps & AddressFormProps> = ({ handleSubmit }) => {
  const [state, setState] = React.useState<Country[]>([])

  React.useEffect(() => {
    setState(countryList().getData())
  }, [])

  const theme = useTheme()

  return (
    <>
      <Typography component="h2" variant="h5" gutterBottom>
        Shipping address
      </Typography>
      <Box mb={6}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                required
                id="firstName"
                name="firstName"
                label="First name"
                autoComplete="fname"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                id="lastName"
                name="lastName"
                label="Last name"
                autoComplete="lname"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                required
                id="emailAddress"
                name="emailAddress"
                label="Email address"
                autoComplete="email"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                required
                id="address1"
                name="address1"
                label="Address line 1"
                autoComplete="billing address-line1"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                id="address2"
                name="address2"
                label="Address line 2"
                autoComplete="billing address-line2"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                id="city"
                name="city"
                label="City"
                autoComplete="billing address-level2"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                id="state"
                name="state"
                label="State/Province/Region"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                id="postalCode"
                name="postalCode"
                label="Zip / Postal code"
                autoComplete="billing postal-code"
                component={renderTextField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="country" shrink required>
                  Country
                </InputLabel>
                <Field
                  required
                  name="country"
                  id="country"
                  style={{
                    color: theme.palette.text.secondary
                  }}
                  component={renderSelectField}
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {state.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

const ReduxAddressForm = reduxForm({
  form: "addressForm"
})(AddressForm)

export { ReduxAddressForm as AddressForm }
