import React from "react"
import { TextField } from "@material-ui/core"

const renderTextField = ({ input, label, meta: { touched, error }, ...rest }) => {
  return (
    <TextField
      label={label}
      {...input}
      {...rest}
      fullWidth
      error={touched && typeof error !== "undefined"}
    />
  )
}

export { renderTextField }
