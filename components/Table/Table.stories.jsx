import React from "react"
import { action } from "@storybook/addon-actions"

import { Table } from "./Table"

const data = [
  "FaceRecognitionCollection",
  "jons-faces",
  "photographer-collection",
  "sreenis-face-2019",
  "test-album",
  "wedding"
]

const state = {
  columns: [{ title: "Collection Id", field: "collectionId" }],
  data: data.map(item => ({ collectionId: item }))
}

export const Default = () => <Table state={state} onRowDelete={() => action("deleted")} />

export default {
  title: "Table"
}
