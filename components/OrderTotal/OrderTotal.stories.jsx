import React from "react"
import { Provider } from "react-redux"

import { OrderTotal } from "./OrderTotal"
import { initialise, store } from "../../store"
import fakeData from "../../.storybook/fakeStore"

initialise(fakeData)

export const Default = () => {
  return (
    <Provider store={store}>
      <OrderTotal />
    </Provider>
  )
}

export default {
  title: "Order Total"
}
