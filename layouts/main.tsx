import React, { FunctionComponent } from "react"
import { Container } from "@material-ui/core"

import { Base } from "./base"

interface MainProps {
  gap?: boolean
  maxWidth?: false | "xs" | "sm" | "md" | "lg" | "xl"
}

const Main: FunctionComponent<MainProps> = ({ gap = false, maxWidth, children }) => {
  return (
    <Base gap={gap}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </Base>
  )
}

export { Main }
