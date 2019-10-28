import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Button, Box, CircularProgress } from "@material-ui/core"

import { RegisterFormProps } from "../global"
import { renderTextField } from "./ReduxForm"

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
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
  },
  error: {
    color: theme.palette.error.main,
    textAlign: "center"
  }
}))

const validate = (values: RegisterFormProps) => {
  const errors = {
    firstName: null,
    lastName: null,
    email: null,
    password: null
  }
  const requiredFields = ["firstName", "lastName", "email", "password"]
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

const RegisterForm: FunctionComponent<InjectedFormProps<RegisterFormProps>> = ({
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
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete="fname"
        autoFocus
        component={renderTextField}
      />
      <Field
        margin="normal"
        required
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lname"
        component={renderTextField}
      />
      <Field
        margin="normal"
        required
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        component={renderTextField}
      />
      <Field
        margin="normal"
        required
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        component={renderTextField}
      />
      <Box mb={6}>
        {process.env.IS_REGISTRATION_DISABLED === "true" && (
          <p className={classes.error}>Sorry, registration is currently closed.</p>
        )}
        <Button
          disabled={submitting || process.env.IS_REGISTRATION_DISABLED === "true"}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
          {submitting ? "Registering..." : "Register"}
        </Button>
      </Box>
    </form>
  )
}

const ReduxRegisterForm = reduxForm<RegisterFormProps>({
  form: "registerForm",
  validate
})(RegisterForm)

export { ReduxRegisterForm as RegisterForm }
