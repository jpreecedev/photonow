import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { Grid, InputAdornment } from "@material-ui/core"

import { renderTextField } from "./ReduxForm"

interface CollectionPriceFormProps {}

const CollectionPriceForm: FunctionComponent<InjectedFormProps & CollectionPriceFormProps> = ({
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Field
            required
            id="price"
            name="price"
            label="Price"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">GBX</InputAdornment>
            }}
            component={renderTextField}
          />
        </Grid>
      </Grid>
    </form>
  )
}

const ReduxCollectionPriceForm = reduxForm<CollectionPriceFormProps>({
  form: "collectionPriceForm"
})(CollectionPriceForm)

export { ReduxCollectionPriceForm as CollectionPriceForm }
