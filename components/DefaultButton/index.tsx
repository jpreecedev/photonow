import React, { FunctionComponent } from "react"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

interface DefaultButtonProps {
  variant?: "text" | "outlined" | "contained"
  color?: "primary" | "secondary" | "default"
  size?: "small" | "medium" | "large"
  [x: string]: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1)
    }
  })
)

const DefaultButton: FunctionComponent<DefaultButtonProps> = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  children,
  ...rest
}) => {
  const classes = useStyles({})

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      className={classes.button}
      {...rest}
    >
      {children}
    </Button>
  )
}

export { DefaultButton }
