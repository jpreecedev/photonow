import React from "react"
import { withKnobs, text, boolean, action } from "@storybook/addon-knobs"

import { Dialog } from "./Dialog"

export const Default = () => {
  return (
    <Dialog
      isOpen={boolean("isOpen", true)}
      title={text("title", "Dialog title")}
      text={text("text", "I am some content within the dialog")}
      submitText={text("submitText", "Submit")}
      onClose={() => action("Closed")}
    />
  )
}

export default {
  title: "Dialog",
  decorators: [withKnobs]
}
