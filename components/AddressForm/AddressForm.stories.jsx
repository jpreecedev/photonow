import React from "react"
import withReduxForm from "redux-form-storybook"
import { Provider } from "react-redux"

import { AddressForm } from "./AddressForm"
import { initialise, store } from "../../store"
import fakeData from "../../.storybook/fakeStore"
import { reduxForm } from "redux-form"

initialise(fakeData)

const Decorated = reduxForm({ form: "addressForm" })(AddressForm)

export const Default = () => {
  return (
    <Provider store={store}>
      <Decorated />
    </Provider>
  )
}

export default {
  title: "Address Form",
  decorators: [withReduxForm]
}
