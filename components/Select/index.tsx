import React, { FunctionComponent } from "react"
import { makeStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import NativeSelect from "@material-ui/core/NativeSelect"
import InputLabel from "@material-ui/core/InputLabel"
import FormHelperText from "@material-ui/core/FormHelperText"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

interface SelectProps {
  id: string
  label: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>, child: React.ReactNode) => void
  value: string
  helperText?: string
}

const Select: FunctionComponent<SelectProps> = ({
  id,
  label,
  children,
  onChange,
  value,
  helperText
}) => {
  const classes = useStyles({})

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <NativeSelect
        onChange={onChange}
        value={value}
        inputProps={{
          name: id,
          id
        }}
      >
        {children}
      </NativeSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export { Select }
