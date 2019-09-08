import React, { FunctionComponent } from "react"
import { connect, DispatchProp } from "react-redux"
import dynamic from "next/dynamic"
import Router from "next/router"
import { Typography } from "@material-ui/core"

import * as server from "../utils/server"
import { Main } from "../layouts/main"
import { actions } from "../store"
import { PictureItem } from "../global"

const Webcam = dynamic(import("../components/Webcam").then(instance => instance.Webcam), {
  ssr: false
})

const GettingStarted: FunctionComponent<DispatchProp<any>> = ({ dispatch }) => {
  const [uploading, setUploading] = React.useState(false)

  const processImage = async (blob: Blob) => {
    setUploading(true)
    const { success, data } = await server.uploadPhotoAsync<PictureItem[]>("/face", "A Face", blob)
    if (success) {
      data.forEach(picture => dispatch(actions.pictures.addPicture(picture)))
      Router.push("/select-your-pictures")
    }
    setUploading(false)
  }

  return (
    <Main gap>
      <Typography component="h1" variant="h4" gutterBottom>
        Upload your face
      </Typography>
      <Typography component="p" gutterBottom>
        We need you to upload us a picture of your face so we can find you in a crowd.
      </Typography>
      <Webcam onCapture={processImage} isUploading={uploading} />
    </Main>
  )
}

export default connect()(GettingStarted)
