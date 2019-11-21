import { configure } from "@storybook/react"
import { addDecorator, addParameters } from "@storybook/react"
import { muiTheme } from "storybook-addon-material-ui"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"

import theme from "../components/Theme"

addDecorator(muiTheme(theme))
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: "iphone6"
  }
})

configure(require.context("../components", true, /\.stories\.(t|j)sx?$/), module)
