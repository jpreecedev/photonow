import React from "react"
import { connect } from "react-redux"
import { NextPage } from "next"
import Link from "next/link"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"

import { MainLayout } from "../layouts/main"
import { LoginForm } from "../components/LoginForm"
import { AppState, LoginFormProps } from "../global"
import * as server from "../utils/server"
import { Container } from "@material-ui/core"

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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  const classes = useStyles({})
  const [errors, setErrors] = React.useState({})

  const onSubmit = async ({ email, password }: LoginFormProps) => {
    const { success, data } = await server.postAsync<string>("/auth/login", {
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
    <MainLayout>
      <main className={classes.content}>
        <Container maxWidth="sm">
          <Paper className={classes.paper} elevation={2}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <Typography component="h1" variant="h4" gutterBottom>
                Login
              </Typography>
              <Typography component="p" gutterBottom>
                Log in to your account dashboard
              </Typography>
            </Box>
            <aside className={classes.error}>
              {Object.keys(errors).map(error => (
                <p key={errors[error]}>{errors[error]}</p>
              ))}
            </aside>
            <LoginForm onSubmit={onSubmit} />
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/register">
                  <a>Don't already have an account?</a>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </main>
    </MainLayout>
  )
}

export default connect((state: AppState) => ({
  loginForm: state.form.loginForm
}))(Login)
