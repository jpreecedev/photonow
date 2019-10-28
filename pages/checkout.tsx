import React from "react"
import { NextPage } from "next"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Head from "next/head"
import { Paper } from "@material-ui/core"
import { Box } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { Elements, StripeProvider } from "react-stripe-elements"

import { MainLayout } from "../layouts/main"
import { CheckoutFormContainer } from "../components/CheckoutFormContainer"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: theme.spacing(3)
    }
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
    }
  }
}))

interface CheckoutProps {}

const Checkout: NextPage<CheckoutProps> = () => {
  const classes = useStyles({})
  const watchRef = React.useRef(false)
  const [stripe, setStripe] = React.useState(null)

  React.useEffect(() => {
    if (!watchRef.current) {
      const interval = setInterval(() => {
        if (window && window.Stripe) {
          setStripe(window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY))
          clearInterval(interval)
        }
      }, 100)
      watchRef.current = true
    }
  }, [])

  return (
    <>
      <Head>
        <script src="https://js.stripe.com/v3/"></script>
      </Head>
      <MainLayout maxWidth="md">
        <Paper className={classes.paper} elevation={2}>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <Typography component="h1" variant="h4" gutterBottom>
              Checkout
            </Typography>
            <Typography component="p" gutterBottom>
              Purchase your selected pictures using the checkout form below
            </Typography>
          </Box>
          <StripeProvider stripe={stripe}>
            <Elements>
              <CheckoutFormContainer />
            </Elements>
          </StripeProvider>
        </Paper>
      </MainLayout>
    </>
  )
}

export default Checkout
