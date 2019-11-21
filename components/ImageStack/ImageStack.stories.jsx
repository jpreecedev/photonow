import React from "react"
import { withKnobs, select, text, boolean } from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"

import { ImageStack } from "./ImageStack"

export const Default = () => {
  const caption = text("caption", "Caption")
  const sizes = {
    "225": 225,
    "150": 150
  }

  return (
    <ImageStack
      imgSrc="http://placekitten.com/g/250/200"
      caption={caption}
      onClick={action("Clicked")}
      size={select("sizes", sizes, 150)}
      selected={boolean("selected", false)}
    />
  )
}

export default {
  title: "Image Stack",
  decorators: [withKnobs]
}
