import React, { FunctionComponent } from "react";
import { Container } from "@material-ui/core";

import { Base } from "./base";

interface MainProps {
  gap?: boolean;
}

const Main: FunctionComponent<MainProps> = ({ gap = false, children }) => {
  return (
    <Base gap={gap}>
      <Container>{children}</Container>
    </Base>
  );
};

export { Main };
