import React from "react"
import { Provider } from "react-redux"

import { Review } from "./Review"
import { initialise, store } from "../../store"
import fakeData from "../../.storybook/fakeStore"

initialise(fakeData)

export const Default = () => {
  return (
    <Provider store={store}>
      <Review />
    </Provider>
  )
}

export default {
  title: "Review"
}
