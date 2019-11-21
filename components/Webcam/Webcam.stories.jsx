import React from "react"
import { withKnobs, action, boolean } from "@storybook/addon-knobs"

import { Webcam } from "./Webcam"

export const Default = () => {
  return (
    <Webcam
      onCapture={() => action("Captured image")}
      onWebcamUnavailable={() => action("Webcam was unavailable")}
      isUploading={boolean("isUploading", false)}
    />
  )
}

export default {
  title: "Webcam",
  decorators: [withKnobs]
}
