import React, { FormEvent } from "react"
import { Field, reduxForm } from "redux-form"
import { Typography } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

import { Main } from "../layouts/main"
import { FacebookLoginButton } from "../components/FacebookLoginButton"
import { renderTextField } from "../components/FormTextField"
import * as server from "../utils/server"

const useStyles = makeStyles(theme => ({
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3)
    }
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const Login = () => {
  const classes = useStyles({})

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await server.postAsync("/auth", null)
    debugger
  }

  return (
    <Main gap maxWidth="sm">
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <Typography component="h2" variant="h4" gutterBottom>
            Login
          </Typography>
          <Typography component="p" gutterBottom>
            Log in to your account dashboard
          </Typography>
          <form
            method="post"
            action="/api/auth"
            className={classes.form}
            onSubmit={onSubmit}
            noValidate
          >
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
          </form>
        </Paper>
      </main>
    </Main>
  )
}

export default reduxForm({
  form: "loginForm"
})(Login)
