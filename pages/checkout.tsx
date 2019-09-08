import React, { FunctionComponent } from "react"
import { Elements, StripeProvider } from "react-stripe-elements"
import Head from "next/head"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

import { CheckoutForm } from "../components/CheckoutForm"
import { Main } from "../layouts/main"

const useStyles = makeStyles((theme: Theme) => ({
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
  }
}))

interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
  const classes = useStyles({})

  const [state, setState] = React.useState({ stripe: null })
  const watchRef = React.useRef(false)

  React.useEffect(() => {
    if (!watchRef.current) {
      const interval = setInterval(() => {
        if (window && window.Stripe) {
          setState({ stripe: window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY) })
          clearInterval(interval)
        }
      }, 100)
      watchRef.current = true
    }
  }, [])

  return (
    <Main gap>
      <Head>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <StripeProvider stripe={state.stripe}>
            <Elements>
              <>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Typography component="h1" variant="h4" gutterBottom>
                    Checkout
                  </Typography>
                  <Typography component="p" gutterBottom>
                    Purchase your selected pictures using the checkout form below
                  </Typography>
                </Box>
                <CheckoutForm />
              </>
            </Elements>
          </StripeProvider>
        </Paper>
      </main>
    </Main>
  )
}

export default Checkout
