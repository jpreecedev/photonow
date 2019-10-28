import React, { FunctionComponent } from "react"
import dynamic from "next/dynamic"
import Router from "next/router"
import { Grid } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Box } from "@material-ui/core"
import { CircularProgress } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { injectStripe, ReactStripeElements } from "react-stripe-elements"
import { connect, DispatchProp } from "react-redux"
import { AppState, BillingDetails, PictureItem } from "../global"

import { CheckoutForm } from "../components/CheckoutForm"
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
  const [success, setSuccess] = React.useState(false)
  const [processing, setProcessing] = React.useState(false)

  const classes = useStyles({})

  const handleOrder = async (token: stripe.Token, billingDetails: BillingDetails) => {
    setProcessing(true)

    try {
      const { success, data } = await server.postAsync<string>("/payment", {
        tokenId: token.id,
        billingDetails,
        pictures: pictures.filter(picture => picture.addedToBasket)
      })

      if (success) {
        dispatch(actions.pictures.clearBasket())
        Router.push(data)
        return
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      {success && (
        <>
          <Typography component="h2" variant="h5" gutterBottom>
            Express checkout
          </Typography>
          <Typography component="p" gutterBottom>
            Pay for your pictures faster with express checkout
          </Typography>
        </>
      )}
      <Box mb={5}>
        <StripePaymentButton
          stripe={stripe}
          handleOrder={handleOrder}
          loaded={success => {
            setLoaded(true)
            setSuccess(success)
          }}
        />
      </Box>
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
