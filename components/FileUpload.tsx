import React, { FunctionComponent } from "react"
import { FilePond, registerPlugin } from "react-filepond"
import { makeStyles, Theme } from "@material-ui/core/styles"

import "filepond/dist/filepond.min.css"

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(2)
  }
}))

interface FileUploadProps {
  collectionId: string
}

const FileUpload: FunctionComponent<FileUploadProps> = ({ collectionId }) => {
  const [state, setState] = React.useState([])
  const classes = useStyles({})

  const [server, setServer] = React.useState(`/api/moments/${collectionId}`)

  React.useEffect(() => {
    setServer(`/api/moments/${collectionId}`)
  }, [collectionId])

  return (
    <section id="upload" className={classes.container}>
      <FilePond
        metadata={{ collectionId }}
        files={state}
        allowMultiple={true}
        server={server}
        onupdatefiles={items => {
          setState(items.map(item => item.file))
        }}
      />
    </section>
  )
}

export { FileUpload }
