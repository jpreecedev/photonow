import React, { FunctionComponent } from "react"
import { Field, reduxForm } from "redux-form"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

import { renderTextField } from "../FormTextField"
import { FacebookLoginButton } from "../FacebookLoginButton"

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

interface Props {}

const LoginForm: FunctionComponent<Props> = () => {
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
      <FacebookLoginButton />
    </>
  )
}

const ReduxLoginForm = reduxForm({
  form: "loginForm"
})(LoginForm)

export { ReduxLoginForm as LoginForm }
