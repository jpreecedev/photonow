import React, { FunctionComponent } from "react"
import { Field, reduxForm } from "redux-form"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

import { renderTextField } from "../FormTextField"

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    marginTop: theme.spacing(2)
  }
}))

interface LoginProps {}

const LoginForm: FunctionComponent<LoginProps> = () => {
  const classes = useStyles({})

  return (
    <>
      <Field
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
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
        autoComplete="current-password"
        component={renderTextField}
      />
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
    </>
  )
}

const ReduxLoginForm = reduxForm({
  form: "loginForm"
})(LoginForm)

export { ReduxLoginForm as LoginForm }
