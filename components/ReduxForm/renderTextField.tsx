import React from 'react'
import TextField from '@material-ui/core/TextField'

const renderTextField = ({ input, label, meta, ...custom }) => (
  <TextField label={label} {...input} {...custom} />
)

export { renderTextField }
