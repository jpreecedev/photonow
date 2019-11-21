import React, { FunctionComponent } from "react"
import { Field, reduxForm, InjectedFormProps } from "redux-form"
import { Grid, InputAdornment, CircularProgress, Button } from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles"

import { renderTextField } from "../ReduxForm"

interface CollectionPriceFormProps {
  price: Number
}

const validate = (values: CollectionPriceFormProps) => {
  const errors = {
    price: null
  }

  const requiredFields = ["price"]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required"
    } else if (Number.parseInt(values[field]) === Number.NaN) {
      errors[field] = "Required"
    } else if (Number.parseInt(values[field]) < 500) {
      errors[field] = "Must be at least 500"
    }
  })

  return errors
}

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

const CollectionPriceForm: FunctionComponent<InjectedFormProps<CollectionPriceFormProps>> = ({
  handleSubmit,
  submitting,
  valid
}) => {
  const classes = useStyles({})

  return (
    <form noValidate onSubmit={handleSubmit}>
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
      <Button
        disabled={submitting || !valid}
        variant="contained"
        className={classes.button}
        onClick={handleSubmit}
      >
        {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
        Update Price
      </Button>
    </form>
  )
}

const ReduxCollectionPriceForm = reduxForm<CollectionPriceFormProps>({
  form: "collectionPriceForm",
  validate
})(CollectionPriceForm)

export { ReduxCollectionPriceForm as CollectionPriceForm }
