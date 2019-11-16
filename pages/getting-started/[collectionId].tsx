import React from "react"
import { NextPage } from "next"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Typography, Box, Container } from "@material-ui/core"

import * as server from "../../utils/server"
import { MainLayout } from "../../layouts/main"
import { store } from "../../store"
import { addPicture } from "../../store/basket"
import { PictureItem } from "../../global"
import { FileUpload } from "../../components/FileUpload"

const Webcam = dynamic(import("../../components/Webcam").then(instance => instance.Webcam), {
  ssr: false
})

const GettingStarted: NextPage = () => {
  const router = useRouter()
  const [uploading, setUploading] = React.useState(false)
  const [webcamUnavailable, setWebcamUnavailable] = React.useState(false)

  const processResponse = (pictures: PictureItem[]) => {
    pictures.forEach(picture => store.dispatch(addPicture(picture)))
  }

  const processImage = async (blob: Blob) => {
    setUploading(true)
    const { success, data } = await server.uploadPhotoAsync<PictureItem[]>(
      `/face/${router.query.collectionId}`,
      "A Face",
      blob
    )

    if (success) {
      processResponse(data)
    }

    router.push("/select-your-pictures")
    setUploading(false)
  }

  return (
    <MainLayout>
      <Container maxWidth="md">
        <Typography component="h1" variant="h4" gutterBottom>
          Show us your face
        </Typography>
        <Typography component="p" gutterBottom>
          We need a picture of you that we can use to search through our galleries
        </Typography>
        {!webcamUnavailable && (
          <Box mt={5}>
            <Typography component="h2" variant="h5" gutterBottom>
              Using your camera/webcam...
            </Typography>
            <Webcam
              onCapture={processImage}
              isUploading={uploading}
              onWebcamUnavailable={() => setWebcamUnavailable(true)}
            />
          </Box>
        )}
        <Box mt={5}>
          <Typography component="h2" variant="h5" gutterBottom>
            Select a picture from your device or computer
          </Typography>
          <FileUpload
            allowMultiple={false}
            url={`/api/face/${router.query.collectionId}`}
            onUploaded={processResponse}
          />
        </Box>
      </Container>
    </MainLayout>
  )
}

export default GettingStarted
