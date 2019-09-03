import React from "react"
import ReactWebcam from "react-webcam"
import throttle from "lodash.throttle"
import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import { useTheme } from "@material-ui/styles"

import * as server from "../../utils/server"
import { DefaultButton } from "../DefaultButton"

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      marginLeft: 0
    },

    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    },
    wrapper: {
      position: "relative"
    }
  })
)

const getVideoConstraints = (padding: number) => {
  const aspectRatio = 1.777777777777778
  const width = window.innerWidth > 1280 + padding ? 1280 : window.innerWidth - padding

  return {
    width,
    height: width / aspectRatio,
    facingMode: "user"
  }
}

const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}

const Webcam = () => {
  const theme: Theme = useTheme()
  const classes = useStyles({})

  const [state, setState] = React.useState({
    loaded: false,
    uploading: false,
    pictures: [],
    windowWidth: window.innerWidth
  })

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      throttle(() => setState({ ...state, windowWidth: window.innerWidth }), 1000)
    )
  }, [])

  const webcamRef = React.useRef<ReactWebcam>(null)

  const capture = React.useCallback(async () => {
    if (webcamRef && webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        const split = imageSrc.split(",")
        const contentType = "image/jpeg"
        const blob = b64toBlob(split[1], contentType)
        setState({ ...state, uploading: true })
        const result = await server.uploadPhotoAsync("/face", "A Face", blob)
        setState({ ...state, uploading: false, pictures: result })
      }
    }
  }, [webcamRef])

  const videoConstraints = getVideoConstraints(theme.spacing(4))

  return (
    <>
      <ReactWebcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
        screenshotQuality={1}
      />
      <div className={classes.wrapper}>
        <DefaultButton
          disabled={state.uploading}
          className={classes.button}
          onClick={capture}
        >
          Capture Photo
        </DefaultButton>
        {state.uploading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </>
  )
}

export { Webcam }
