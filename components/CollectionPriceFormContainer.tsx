import React, { FunctionComponent } from "react"
import { Types } from "mongoose"
import { useSelector } from "react-redux"

import { AppState } from "../global"
import { CollectionPriceForm } from "./CollectionPriceForm"
import * as server from "../utils/server"
import { Notification } from "./Notification"

interface CollectionPriceFormContainerProps {
  price: number
  collectionId: Types.ObjectId
}

const CollectionPriceFormContainer: FunctionComponent<CollectionPriceFormContainerProps> = ({
  collectionId,
  price
}) => {
  const [processing, setProcessing] = React.useState(false)
  const [notification, setNotification] = React.useState({ open: false, message: "" })
  const collectionPriceForm = useSelector((state: AppState) => state.form.collectionPriceForm)

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

export { CollectionPriceFormContainer }
