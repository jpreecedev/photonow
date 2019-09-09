import React, { FunctionComponent } from "react"
import { Field, reduxForm } from "redux-form"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"

import { renderTextField } from "../FormTextField"

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

interface RegisterProps {}

const RegisterForm: FunctionComponent<RegisterProps> = () => {
  const classes = useStyles({})

  return (
    <>
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete="fname"
        autoFocus
        component={renderTextField}
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lname"
        component={renderTextField}
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        component={renderTextField}
      />
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        component={renderTextField}
      />
      <Box mb={6}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
      </Box>
    </>
  )
}

const ReduxRegisterForm = reduxForm({
  form: "registerForm"
})(RegisterForm)

export { ReduxRegisterForm as RegisterForm }
