import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography"

import { LoginFormProps } from "../../global"
import { renderTextField } from "../ReduxForm"
import { GoogleLoginButton } from "../GoogleLoginButton"
import { FacebookLoginButton } from "../FacebookLoginButton"

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 3)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}))

const validate = (values: LoginFormProps) => {
  const errors = {
    email: null
  }
  const requiredFields = ["email", "password"]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required"
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }
  return errors
}

const LoginForm: FunctionComponent<InjectedFormProps<LoginFormProps>> = ({
  handleSubmit,
  submitting
}) => {
  const classes = useStyles({})

  return (
    <form
      method="post"
      action="/api/auth"
      className={classes.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <Field
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

      <Box mb={6}>
        <Button
          disabled={submitting}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          {submitting ? "Signing in..." : "Sign In"}
        </Button>
        <Typography variant="overline" display="block" gutterBottom>
          Social Login Providers
        </Typography>
        <GoogleLoginButton />
        <FacebookLoginButton />
      </Box>
    </form>
  )
}

const ReduxLoginForm = reduxForm<LoginFormProps>({
  form: "loginForm",
  validate
})(LoginForm)

export { ReduxLoginForm as LoginForm }
