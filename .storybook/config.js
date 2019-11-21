import { configure } from "@storybook/react"
import { addDecorator } from "@storybook/react"
import { muiTheme } from "storybook-addon-material-ui"

import theme from "../components/Theme"

addDecorator(muiTheme(theme))

configure(require.context("../components", true, /\.stories\.(t|j)sx?$/), module)
