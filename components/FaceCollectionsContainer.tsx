import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import { FormState } from "redux-form"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

import { Collection, AppState } from "../global"

import { ManageCollections } from "../components/ManageCollections"
import { CoverPhotoSelector } from "./CoverPhotoSelector"

interface FaceCollectionsContainerProps {
  newCollectionForm: FormState
}

const FaceCollectionsContainer: FunctionComponent<FaceCollectionsContainerProps> = ({
  newCollectionForm
}) => {
  const [selectedCollection, setSelectedCollection] = React.useState<Collection>(null)
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Face Recognition Photo Collections
      </Typography>
      <ManageCollections
        newCollectionForm={newCollectionForm}
        onSelectedCollectionChanged={collection => setSelectedCollection(collection)}
      />
      {selectedCollection && (
        <>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Pictures currently in this gallery
          </Typography>
          <Typography component="p" gutterBottom>
            The currently active cover photo is highlighted in green
          </Typography>
          <Grid container spacing={3}>
            <Grid item>
              <CoverPhotoSelector selectedCollectionId={selectedCollection._id} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

const ConnectedFaceCollectionsContainer = connect((state: AppState) => ({
  newCollectionForm: state.form.newCollectionForm,
  faceCollectionsForm: state.form.faceCollectionsForm
}))(FaceCollectionsContainer)

export { ConnectedFaceCollectionsContainer as FaceCollectionsContainer }
