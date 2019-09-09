import React, { FunctionComponent } from "react"

import { Base } from "./base"
import { Splash } from "../components/Splash"

interface LandingPageProps {}

const LandingPage: FunctionComponent<LandingPageProps> = ({ children }) => {
  return (
    <Base>
      <Splash />
    </Base>
  )
}

export { LandingPage }
