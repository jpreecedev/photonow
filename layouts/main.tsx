import React, { FunctionComponent } from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"

import { Base } from "./base"

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(10)
  }
}))

interface MainProps {
  gap?: boolean
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl"
}

const Main: FunctionComponent<MainProps> = ({ gap = false, maxWidth, children }) => {
  const classes = useStyles({})
  return (
    <Base gap={gap}>
      <Container className={classes.container} maxWidth={maxWidth}>
        {children}
      </Container>
    </Base>
  )
}

export { Main }
