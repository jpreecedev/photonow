import React, { FunctionComponent } from "react"
import { Types } from "mongoose"
import { FormState } from "redux-form"
import { connect, DispatchProp } from "react-redux"

import { AppState } from "../global"
import { CollectionPriceForm } from "./CollectionPriceForm"
import * as server from "../utils/server"
import { Notification } from "./Notification"

interface CollectionPriceFormContainerProps {
  price: number
  collectionId: Types.ObjectId
  collectionPriceForm: FormState
}

const CollectionPriceFormContainer: FunctionComponent<
  CollectionPriceFormContainerProps & DispatchProp<any>
> = ({ collectionId, price, collectionPriceForm }) => {
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
      <CollectionPriceForm initialValues={{ price }} onSubmit={handleSubmit} />
    </>
  )
}

const ConnectedCollectionPriceFormContainer = connect((state: AppState) => ({
  collectionPriceForm: state.form.collectionPriceForm
}))(CollectionPriceFormContainer)

export { ConnectedCollectionPriceFormContainer as CollectionPriceFormContainer }
