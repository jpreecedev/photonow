import React from "react"
import { NextPage } from "next"
import { connect, DispatchProp } from "react-redux"
import dynamic from "next/dynamic"
import Router from "next/router"
import { Typography } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { Container } from "@material-ui/core"

import * as server from "../utils/server"
import { MainLayout } from "../layouts/main"
import { actions } from "../store"
import { PictureItem } from "../global"

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Webcam = dynamic(import("../components/Webcam").then(instance => instance.Webcam), {
  ssr: false
})

const GettingStarted: NextPage<DispatchProp<any>> = ({ dispatch }) => {
  const classes = useStyles({})
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
    <MainLayout>
      <main className={classes.content}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h4" gutterBottom>
            Upload your face
          </Typography>
          <Typography component="p" gutterBottom>
            We need you to upload us a picture of your face so we can find you in a crowd.
          </Typography>
          <Webcam onCapture={processImage} isUploading={uploading} />
        </Container>
      </main>
    </MainLayout>
  )
}

export default connect()(GettingStarted)
