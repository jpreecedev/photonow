import React from "react"
import Select from "@material-ui/core/Select"

const renderSelectField = ({ input, label, meta, children, inputProps, ...other }) => {
  return (
    <Select native {...input} {...other} {...inputProps} inputProps={inputProps}>
      {children}
    </Select>
  )
}

export { renderSelectField }
