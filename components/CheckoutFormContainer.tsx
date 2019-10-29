import React, { FunctionComponent } from "react"
import dynamic from "next/dynamic"
import Router from "next/router"
import { Grid, Box, CircularProgress, Typography } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import { connect, DispatchProp } from "react-redux"
import { AppState, BillingDetails, PictureItem } from "../global"
import ErrorIcon from "@material-ui/icons/Error"

import { CheckoutForm } from "../components/CheckoutForm"
import { Banner } from "../components/Banner"
import * as server from "../utils/server"
import { actions } from "../store"

const StripePaymentButton = dynamic(
  import("./StripePaymentButton").then(instance => instance.StripePaymentButton),
  {
    ssr: false
  }
)

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    margin: theme.spacing(2)
  }
}))

interface CheckoutFormContainerProps {
  pictures: PictureItem[]
}

const CheckoutFormContainer: FunctionComponent<
  ReactStripeElements.InjectedStripeProps & CheckoutFormContainerProps & DispatchProp<any>
> = ({ stripe, pictures, dispatch }) => {
  const [loaded, setLoaded] = React.useState(false)
  const [paymentStatus, setPaymentStatus] = React.useState({
    paymentAttemptMade: false,
    success: false
  })
  const [success, setSuccess] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)

  const classes = useStyles({})

  const handleOrder = async (
    token: stripe.Token,
    billingDetails: BillingDetails,
    error?: stripe.Error
  ) => {
    if (error) {
      setPaymentStatus({ paymentAttemptMade: true, success: false })
      window.scrollTo(0, 0)
      console.log(error)
      return
    }

    setProcessing(true)

    try {
      const { success, data } = await server.postAsync<string>("/payment", {
        tokenId: token.id,
        billingDetails,
        pictures: pictures.filter(picture => picture.addedToBasket)
      })

      setPaymentStatus({ paymentAttemptMade: true, success })

      if (success) {
        dispatch(actions.pictures.clearBasket())
        Router.push(data)
        return
      } else {
        window.scrollTo(0, 0)
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      {success && (
        <Box mt={5}>
          <Typography component="h2" variant="h5" gutterBottom>
            Express checkout
          </Typography>
          <Typography component="p" gutterBottom>
            Pay for your pictures faster with express checkout
          </Typography>
        </Box>
      )}
      <Box mb={5}>
        <StripePaymentButton
          orderTotal={pictures
            .filter(picture => picture.addedToBasket)
            .reduce((acc, current) => (acc += current.price), 0)}
          stripe={stripe}
          handleOrder={handleOrder}
          loaded={success => {
            setLoaded(true)
            setSuccess(success)
          }}
        />
      </Box>
      {paymentStatus.paymentAttemptMade && !paymentStatus.success && (
        <Banner
          theme="error"
          icon={<ErrorIcon />}
          message={
            <Typography>
              Your payment was not successful.
              <br />
              Please check your details and try again.
            </Typography>
          }
        />
      )}
      {loaded && <CheckoutForm handleOrder={handleOrder} processing={processing} stripe={stripe} />}
      {!loaded && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <CircularProgress className={classes.progress} />
          </Grid>
        </Grid>
      )}
    </>
  )
}

const ConnectedCheckoutFormContainer = connect((state: AppState) => ({
  pictures: state.pictures
}))(CheckoutFormContainer)

const InjectedCheckoutFormContainer = injectStripe(ConnectedCheckoutFormContainer)

export { InjectedCheckoutFormContainer as CheckoutFormContainer }
