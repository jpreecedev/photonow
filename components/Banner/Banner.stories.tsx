import React from "react"
import ErrorIcon from "@material-ui/icons/Error"
import { Typography } from "@material-ui/core"
import { withKnobs, select } from "@storybook/addon-knobs"

import { Banner } from "./Banner"

export const Default = () => {
  const options = {
    error: "error",
    info: "info"
  }

  return (
    <Banner
      theme={select<"error" | "info">("theme", options, "error")}
      message={<Typography>Unable to start a checkout session</Typography>}
      icon={<ErrorIcon />}
    />
  )
}

export default {
  title: "Banner",
  decorators: [withKnobs]
}
