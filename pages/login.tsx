import React from "react"
import { NextPage } from "next"
import { Box, Paper, Typography } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"

import { MainLayout } from "../layouts/main"
import { SocialLoginProviders } from "../components/SocialLoginProviders"

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

const Login: NextPage = () => {
  const classes = useStyles({})

  return (
    <MainLayout maxWidth="sm">
      <Paper className={classes.paper} elevation={2}>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Typography component="h1" variant="h4" gutterBottom>
            Connect with us
          </Typography>
          <Typography component="p" gutterBottom align="center">
            To make registering and logging in with us easy and <strong>secure</strong>, we use
            social networks to authenticate you.
          </Typography>
          <Box mt={3} mb={5} display="block" maxWidth="75%" width="100%" textAlign="center">
            <SocialLoginProviders />
          </Box>
          <Typography component="p" align="center" variant="body2">
            By using our website, you agree to our
            <br /> <a href="/legal/cookie-policy">Cookie Policy</a>,{" "}
            <a href="/legal/privacy-policy">Privacy Policy</a>, and{" "}
            <a href="/legal/terms-of-service">Terms of Service</a>.
          </Typography>
          <br />
          <Typography component="small" align="center" variant="body2">
            If you do not already have an account, we will create one for you automatically.
          </Typography>
        </Box>
      </Paper>
    </MainLayout>
  )
}

export default Login
