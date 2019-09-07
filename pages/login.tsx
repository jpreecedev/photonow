import React, { FormEvent, FunctionComponent } from "react"
import { connect } from "react-redux"
import Router from "next/router"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

import * as server from "../utils/server"
import { Main } from "../layouts/main"
import { LoginForm } from "../components/LoginForm"

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

interface LoginProps {
  loginForm: { values: { email: string; password: string } }
}

const Login: FunctionComponent<LoginProps> = ({ loginForm }) => {
  const classes = useStyles({})
  const [errors, setErrors] = React.useState({})

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { success, message } = await server.postAsync("/auth/login", {
      email: loginForm.values.email,
      password: loginForm.values.password
    })

    if (success) {
      return await Router.push("/upload")
    }

    setErrors({ ...errors, global: message })
  }

  return (
    <Main gap maxWidth="sm">
      <main className={classes.layout}>
        <div>
          {Object.keys(errors).map(error => (
            <p key={errors[error]}>{errors[error]}</p>
          ))}
        </div>
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
            <LoginForm />
          </form>
        </Paper>
      </main>
    </Main>
  )
}

export default connect(state => ({
  // @ts-ignore
  loginForm: state.form.loginForm
}))(Login)
