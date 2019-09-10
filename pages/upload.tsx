import React, { FunctionComponent } from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

import { Main } from "../layouts/main"
import { FileUpload } from "../components/FileUpload"
import { withProtectedRoute } from "../utils/withProtectedRoute"

const useStyles = makeStyles(theme => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
    }
  }
}))

interface UploadProps {}

const Upload: FunctionComponent<UploadProps> = () => {
  const classes = useStyles({})
  return (
    <Main gap>
      <main className={classes.layout}>
        <Paper className={classes.paper} elevation={2}>
          <Typography component="h1" variant="h4" align="center">
            Upload Pictures
          </Typography>

          <Typography component="p" gutterBottom>
            Upload your pictures to our face recognition collection (
            {process.env.FACE_RECOGNITION_COLLECTION_NAME})
          </Typography>
          <FileUpload />
        </Paper>
      </main>
    </Main>
  )
}

export default withProtectedRoute(Upload)
