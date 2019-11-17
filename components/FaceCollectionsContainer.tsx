import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { Typography, Button, CircularProgress, Box } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"

import { Collection, AppState } from "../global"
import { CoverPhotoSelector } from "./CoverPhotoSelector"

import { getAsync, postAsync } from "../utils/server"
import { Dialog } from "../components/Dialog"
import { NewCollectionForm } from "../components/NewCollectionForm"
import { FaceCollectionsForm } from "../components/FaceCollectionsForm"
import { CollectionPriceFormContainer } from "../components/CollectionPriceFormContainer"
import { Notification } from "../components/Notification"
import { FileUpload } from "../components/FileUpload"

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

const FaceCollectionsContainer: FunctionComponent = () => {
  const classes = useStyles({})

  const [collections, setCollections] = React.useState<Collection[]>([])
  const [selectedCollection, setSelectedCollection] = React.useState<Collection>(null)
  const [processing, setProcessing] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [notification, setNotification] = React.useState({
    open: false,
    message: ""
  })
  const newCollectionForm = useSelector((state: AppState) => state.form.newCollectionForm)

  const fetchData = async () => {
    const { success, data } = await getAsync<Collection[]>("/collections/mine")
    if (success) {
      setCollections(data)
      setSelectedCollection(data[0])
    } else {
      setCollections([])
    }
  }

  const updateSelectedCollection = (collection: Collection) => {
    setSelectedCollection(collection)
  }

  const handleCreateCollection = async (confirm: boolean) => {
    setOpen(false)
    if (!confirm) {
      return
    }

    setProcessing(true)

    try {
      const formData = {
        name: newCollectionForm.values.collectionName
      }
      const { success, data } = await postAsync<string>("/collections", formData)
      if (success) {
        setNotification({
          open: true,
          message: "Collection was created successfully"
        })
      } else {
        setNotification({ open: true, message: `There was an error: ${data}` })
      }
    } catch (error) {
    } finally {
      setProcessing(false)
      await fetchData()
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
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
        onClose={handleCreateCollection}
      >
        <NewCollectionForm onSubmit={() => handleCreateCollection(true)} />
      </Dialog>
      <FaceCollectionsForm
        collections={collections}
        onSelectionChanged={collection => updateSelectedCollection(collection)}
      />
      <Button
        disabled={processing}
        variant="contained"
        className={classes.button}
        onClick={() => setOpen(true)}
      >
        {processing && <CircularProgress size={24} className={classes.buttonProgress} />}
        Create new collection
      </Button>
      {selectedCollection && (
        <>
          <Box mt={5}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Set a price for this collection
            </Typography>
            <Typography component="p" gutterBottom>
              Applies to all pictures in this collection. Price must be specified in GBX (Great
              British Pence, not Great British Pounds)
            </Typography>
            <CollectionPriceFormContainer
              collectionId={selectedCollection._id}
              price={selectedCollection.price}
            />
          </Box>
          <Box mt={5}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Pictures currently in this gallery
            </Typography>
            <Typography component="p" gutterBottom>
              The currently active cover photo is highlighted in green
            </Typography>
            <CoverPhotoSelector
              selectedCollectionId={selectedCollection._id}
              coverPhoto={selectedCollection.coverPhoto}
            />
          </Box>
          <Box mt={10}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Upload pictures to the "{selectedCollection.name}" collection
            </Typography>
            <FileUpload url={`/api/moments/${selectedCollection._id}`} />
          </Box>
        </>
      )}
    </>
  )
}

export { FaceCollectionsContainer }
