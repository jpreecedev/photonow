import React from "react"
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

type FileUploadProps<T extends object> = {
  url: string
  allowMultiple?: boolean
  onUploaded?: (data: T) => void
}

const FileUpload = <T extends object>({
  url,
  allowMultiple = true,
  onUploaded
}: FileUploadProps<T>) => {
  const [state, setState] = React.useState([])
  const classes = useStyles({})

  const [server, setServer] = React.useState(url)

  React.useEffect(() => {
    setServer(url)
  }, [url])

  return (
    <section id="upload" className={classes.container}>
      <FilePond
        acceptedFileTypes={["image/*"]}
        files={state}
        allowMultiple={allowMultiple}
        server={server}
        onprocessfile={(error, response) => {
          if (!onUploaded) {
            return
          }

          if (!error) {
            onUploaded(JSON.parse((response as any).serverId).data)
          } else {
            onUploaded([] as any)
          }
        }}
        name="filepond"
        onupdatefiles={items => {
          setState(items.map(item => item.file))
        }}
      />
    </section>
  )
}

export { FileUpload }
