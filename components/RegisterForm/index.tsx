import React, { FunctionComponent } from "react"
import { Field, reduxForm } from "redux-form"
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Register
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link href="/login">
            <a>Already have an account? Sign in</a>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}

const ReduxRegisterForm = reduxForm({
  form: "registerForm"
})(RegisterForm)

export { ReduxRegisterForm as RegisterForm }
