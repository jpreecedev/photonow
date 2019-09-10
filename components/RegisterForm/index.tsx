import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import CircularProgress from "@material-ui/core/CircularProgress"

import { RegisterFormProps } from "../../global"
import { renderTextField } from "../ReduxForm"

const useStyles = makeStyles(theme => ({
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
        fullWidth
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
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lname"
        component={renderTextField}
      />
      <Field
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
          disabled={submitting}
          type="submit"
          fullWidth
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
