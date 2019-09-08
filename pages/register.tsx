import React, { FormEvent, FunctionComponent } from "react"
import { connect } from "react-redux"
import { InjectedFormProps, FormState } from "redux-form"
import Router from "next/router"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

import * as server from "../utils/server"
import { Main } from "../layouts/main"
import { RegisterForm } from "../components/RegisterForm"
import { AppState } from "../global"

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

interface RegisterProps extends InjectedFormProps {
  registerForm: FormState
}

const Register: FunctionComponent<RegisterProps> = ({ registerForm }) => {
  const classes = useStyles({})
  const [errors, setErrors] = React.useState({})

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { success, message } = await server.postAsync("/auth/register", {
      firstName: registerForm.values.firstName,
      lastName: registerForm.values.lastName,
      email: registerForm.values.email,
      password: registerForm.values.password
    })

    if (success) {
      return await Router.push("/upload")
    }

    setErrors({ ...errors, global: message })
  }

  return (
    <Main gap maxWidth="sm">
      <main className={classes.layout}>
        <aside>
          {Object.keys(errors).map(error => (
            <p key={errors[error]}>{errors[error]}</p>
          ))}
        </aside>
        <Paper className={classes.paper} elevation={2}>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Typography component="h2" variant="h4" gutterBottom>
              Register
            </Typography>
            <Typography component="p" gutterBottom>
              Sign up for a new account
            </Typography>
          </Box>
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

export default connect((state: AppState) => ({
  registerForm: state.form.registerForm
}))(Register)
