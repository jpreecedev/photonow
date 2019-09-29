import React from "react"
import { connect } from "react-redux"
import { InjectedFormProps, FormState } from "redux-form"
import { NextPage } from "next"
import Link from "next/link"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

import * as server from "../utils/server"
import { Main } from "../layouts/main"
import { RegisterForm } from "../components/RegisterForm"
import { AppState } from "../global"

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
    }
  },
  error: {
    color: theme.palette.error.main,
    textAlign: "center"
  }
}))

interface RegisterProps extends InjectedFormProps {
  registerForm: FormState
}

const Register: NextPage<RegisterProps> = () => {
  const classes = useStyles({})
  const [errors, setErrors] = React.useState({})

  const onSubmit = async ({ firstName, lastName, email, password }) => {
    const { success, data } = await server.postAsync<string>("/auth/register", {
      firstName,
      lastName,
      email,
      password
    })

    if (success) {
      window.location.replace(data)
      return
    }

    setErrors({ ...errors, global: data })
  }

  return (
    <Main gap maxWidth="sm">
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Typography component="h1" variant="h4" gutterBottom>
              Register
            </Typography>
            <Typography component="p" gutterBottom>
              Sign up for a new account
            </Typography>
          </Box>
          <aside className={classes.error}>
            {Object.keys(errors).map(error => (
              <p key={errors[error]}>{errors[error]}</p>
            ))}
          </aside>
          <RegisterForm onSubmit={onSubmit} />
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login">
                <a>Already have an account? Sign in</a>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </Main>
  )
}

export default connect((state: AppState) => ({
  registerForm: state.form.registerForm
}))(Register)
