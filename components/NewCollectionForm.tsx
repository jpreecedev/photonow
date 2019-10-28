import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { Grid, Box } from "@material-ui/core"

import { renderTextField } from "./ReduxForm"

interface NewCollectionFormProps {}

interface NewCollectionDispatchProps {}

const NewCollectionForm: FunctionComponent<
  NewCollectionDispatchProps & InjectedFormProps<NewCollectionFormProps, NewCollectionDispatchProps>
> = ({ handleSubmit }) => {
  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <Field
                autoFocus
                required
                id="collectionName"
                name="collectionName"
                label="Collection name"
                component={renderTextField}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

const ReduxNewCollectionForm = reduxForm<NewCollectionFormProps, NewCollectionDispatchProps>({
  form: "newCollectionForm"
})(NewCollectionForm)

export { ReduxNewCollectionForm as NewCollectionForm }
