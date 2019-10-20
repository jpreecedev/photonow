import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import { FormState } from "redux-form"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

import { Collection, AppState } from "../global"
import { getAsync, postAsync } from "../utils/server"
import { Dialog } from "../components/Dialog"
import { NewCollectionForm } from "../components/NewCollectionForm"
import { FaceCollectionsForm } from "../components/FaceCollectionsForm"
import { Notification } from "../components/Notification"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}))

interface FaceCollectionsContainerProps {
  newCollectionForm: FormState
}

const FaceCollectionsContainer: FunctionComponent<FaceCollectionsContainerProps> = ({
  newCollectionForm
}) => {
  const classes = useStyles({})

  const [collections, setCollections] = React.useState<Collection[]>([])
  const [processing, setProcessing] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [notification, setNotification] = React.useState({ open: false, message: "" })

  const fetchCollections = async () => {
    const { success, data } = await getAsync<Collection[]>("/collections")
    if (success) {
      setCollections(data)
    } else {
      setCollections([])
    }
  }

  const handleCreateCollection = async () => {
    setOpen(false)
    setProcessing(true)

    try {
      const formData = {
        name: newCollectionForm.values.collectionName
      }
      const { success, data } = await postAsync<string>("/collections", formData)
      if (success) {
        setNotification({ open: true, message: "Collection was created successfully" })
      } else {
        setNotification({ open: true, message: `There was an error: ${data}` })
      }
    } catch (error) {
    } finally {
      setProcessing(false)
      await fetchCollections()
    }
  }

  React.useEffect(() => {
    fetchCollections()
  }, [])

  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Face Recognition Photo Collections
      </Typography>
      <Notification
        open={notification.open}
        message={notification.message}
        onClose={() => setNotification({ open: false, message: "" })}
      />
      <Dialog
        isOpen={open}
        title="Create a new collection"
        text="Give your collection a meaningful name"
        submitText="Create"
        onClose={() => handleCreateCollection()}
      >
        <NewCollectionForm />
      </Dialog>
      <FaceCollectionsForm collections={collections} />
      <div>
        <Button
          disabled={processing}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => setOpen(true)}
        >
          {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
          Create new collection
        </Button>
      </div>
    </>
  )
}

const ConnectedFaceCollectionsContainer = connect((state: AppState) => ({
  newCollectionForm: state.form.newCollectionForm,
  faceCollectionsForm: state.form.faceCollectionsForm
}))(FaceCollectionsContainer)

export { ConnectedFaceCollectionsContainer as FaceCollectionsContainer }
