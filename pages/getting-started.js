import React from "react";

import { Main } from "../layouts/main";
import { Typography } from "@material-ui/core";

export default () => (
  <Main gap>
    <Typography component="h2" variant="h4" gutterBottom>
      Upload your face
    </Typography>
    <Typography component="p" gutterBottom>
      We need you to upload us a picture of your face so we can find you in a
      crowd.
    </Typography>
  </Main>
);
