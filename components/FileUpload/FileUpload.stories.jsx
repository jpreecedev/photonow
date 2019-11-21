import React from "react"
import { action } from "@storybook/addon-actions"

import { FileUpload } from "./FileUpload"

export const Default = () => {
  return <FileUpload url="/" onUploaded={action("uploaded")} />
}

export default {
  title: "File Upload"
}
