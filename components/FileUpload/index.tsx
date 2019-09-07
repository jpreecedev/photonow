import * as React from "react"
import { FilePond, registerPlugin } from "react-filepond"
import { makeStyles } from "@material-ui/core/styles"

import "filepond/dist/filepond.min.css"

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2)
  }
}))

const FileUpload = () => {
  const [state, setState] = React.useState([])
  const classes = useStyles({})

  return (
    <section id="upload" className={classes.container}>
      <FilePond
        files={state}
        allowMultiple={true}
        server="/api/moments"
        onupdatefiles={items => {
          setState(items.map(item => item.file))
        }}
      />
    </section>
  )
}

export { FileUpload }
