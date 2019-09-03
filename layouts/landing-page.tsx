import React, { FunctionComponent } from "react";
import { Container } from "@material-ui/core";

import { Base } from "./base";
import { Splash } from "../components/Splash";

interface LandingPageProps {}

const LandingPage: FunctionComponent<LandingPageProps> = ({ children }) => {
  return (
    <Base>
      <Splash />
      <Container>{children}</Container>
    </Base>
  );
};

export { LandingPage };
