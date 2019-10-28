import React, { FunctionComponent } from "react"
import { Types } from "mongoose"
import { FormState } from "redux-form"
import Router from "next/router"
import { CircularProgress, Button } from "@material-ui/core"
import { connect, DispatchProp } from "react-redux"
import { makeStyles, Theme } from "@material-ui/core/styles"

import { AppState } from "../global"
import { CollectionPriceForm } from "./CollectionPriceForm"
import * as server from "../utils/server"
import { Notification } from "./Notification"

interface CollectionPriceFormContainer {
  price: number
  collectionId: Types.ObjectId
  collectionPriceForm: FormState
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}))

const CollectionPriceFormContainer: FunctionComponent<
  CollectionPriceFormContainer & DispatchProp<any>
> = ({ collectionId, price, collectionPriceForm }) => {
  const classes = useStyles({})
  const [processing, setProcessing] = React.useState(false)
  const [notification, setNotification] = React.useState({ open: false, message: "" })

  const handleSubmit = async () => {
    setProcessing(true)

    try {
      const { success, data } = await server.putAsync<string>("/collections/price", {
        collectionId,
        price: collectionPriceForm.values.price
      })

      if (success) {
        return setNotification({ open: true, message: "Successfully updated price for collection" })
      } else {
        return setNotification({ open: true, message: `Unable to update price: ${data}` })
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      <Notification
        open={notification.open}
        message={notification.message}
        onClose={() => setNotification({ open: false, message: "" })}
      />
      <CollectionPriceForm initialValues={{ price }} onSubmit={() => handleSubmit()} />
      <Button
        disabled={processing}
        variant="contained"
        className={classes.button}
        onClick={handleSubmit}
      >
        {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
        Update Price
      </Button>
    </>
  )
}

const ConnectedCollectionPriceFormContainer = connect((state: AppState) => ({
  collectionPriceForm: state.form.collectionPriceForm
}))(CollectionPriceFormContainer)

export { ConnectedCollectionPriceFormContainer as CollectionPriceFormContainer }
