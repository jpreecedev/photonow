import React from "react"
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import { Notification } from "./Notification"

export const Default = () => {
  const vertical = {
    bottom: "bottom",
    top: "top"
  }
  const horizontal = {
    left: "left",
    center: "center",
    right: "right"
  }
  return (
    <Notification
      message={text("message", "I have a message for you")}
      open={boolean("open", true)}
      horizontal={select("horizontal", horizontal)}
      vertical={select("vertical", vertical)}
      onClose={action("closed")}
    />
  )
}

export default {
  title: "Notification",
  decorators: [withKnobs]
}
