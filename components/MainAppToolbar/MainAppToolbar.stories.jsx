import React from "react"
import { withKnobs, boolean } from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"
import { Provider } from "react-redux"

import { MainAppToolbar } from "./MainAppToolbar"
import { initialise, store } from "../../store"

initialise()

export const Default = () => {
  return (
    <Provider store={store}>
      <MainAppToolbar
        fixed={boolean("fixed", false)}
        showDrawerToggle={boolean("showDrawerToggle", false)}
        handleDrawerToggle={action("toggled drawer")}
      />
    </Provider>
  )
}

export default {
  title: "MainAppToolbar",
  decorators: [withKnobs]
}
