import React from "react"
import Select from "@material-ui/core/Select"

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  inputProps,
  ...rest
}) => {
  return (
    <Select
      native
      {...input}
      {...rest}
      {...inputProps}
      inputProps={inputProps}
      error={touched && error}
    >
      {children}
    </Select>
  )
}

export { renderSelectField }