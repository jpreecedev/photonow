import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"

import { NewCollection } from "../global"
import { renderSelectField } from "./ReduxForm"

interface FaceCollectionsFormProps {}

interface FaceCollectionsDispatchProps {
  collections: NewCollection[]
}

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    color: theme.palette.text.secondary
  }
}))

const FaceCollectionsForm: FunctionComponent<
  FaceCollectionsDispatchProps &
    InjectedFormProps<FaceCollectionsFormProps, FaceCollectionsDispatchProps>
> = ({ handleSubmit, collections }) => {
  const classes = useStyles({})
  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="collection" shrink>
                  Existing Collections
                </InputLabel>
                <Field
                  required
                  name="collection"
                  id="collection"
                  className={classes.select}
                  component={renderSelectField}
                >
                  <option value="" disabled>
                    -- Please Select --
                  </option>
                  {collections.map(option => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </Field>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

const ReduxFaceCollectionsForm = reduxForm<FaceCollectionsFormProps, FaceCollectionsDispatchProps>({
  form: "faceCollectionsForm"
})(FaceCollectionsForm)

export { ReduxFaceCollectionsForm as FaceCollectionsForm }
