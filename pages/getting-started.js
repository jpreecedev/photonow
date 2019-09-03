import React from "react";
import dynamic from "next/dynamic";
import { Typography } from "@material-ui/core";

import { Main } from "../layouts/main";

const Webcam = dynamic(
  import("../components/Webcam").then(instance => instance.Webcam),
  { ssr: false }
);

export default () => (
  <Main gap>
    <Typography component="h2" variant="h4" gutterBottom>
      Upload your face
    </Typography>
    <Typography component="p" gutterBottom>
      We need you to upload us a picture of your face so we can find you in a
      crowd.
    </Typography>
    <Webcam />
  </Main>
);
