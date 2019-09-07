import React, { FormEvent, FunctionComponent } from "react"
import { connect } from "react-redux"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

import * as server from "../utils/server"
import { Main } from "../layouts/main"
import { RegisterForm } from "../components/RegisterForm"

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

interface RegisterProps {
  registerForm: {
    values: {
      firstName: string
      lastName: string
      email: string
      password: string
      passwordConfirmation: string
    }
  }
}

const Register: FunctionComponent<RegisterProps> = ({ registerForm }) => {
  const classes = useStyles({})

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await server.postAsync("/auth", {
      firstName: registerForm.values.firstName,
      lastName: registerForm.values.lastName,
      email: registerForm.values.email,
      password: registerForm.values.password
    })
    debugger
  }

  return (
    <Main gap maxWidth="sm">
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <Typography component="h2" variant="h4" gutterBottom>
            Register
          </Typography>
          <Typography component="p" gutterBottom>
            Sign up for a new account
          </Typography>
          <form
            method="post"
            action="/api/auth"
            className={classes.form}
            onSubmit={onSubmit}
            noValidate
          >
            <RegisterForm />
          </form>
        </Paper>
      </main>
    </Main>
  )
}

export default connect(state => ({
  // @ts-ignore
  registerForm: state.form.registerForm
}))(Register)
