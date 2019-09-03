import React, { FunctionComponent } from "react";
import Head from "next/head";
import { Container, Box } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { MainAppBar } from "../components/MainAppBar";
import { Splash } from "../components/Splash";

let theme = createMuiTheme();

interface DefaultLayoutProps {}

const DefaultLayout: FunctionComponent<DefaultLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <Head>
        <title>Find My Face</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
        />
      </Head>
      <style jsx global>
        {`
          html,
          body {
            height: 100%;
            width: 100%;
          }
          *,
          *:after,
          *:before {
            box-sizing: border-box;
          }
          body {
            font-family: "Roboto", "Helvetica", "Arial", sans-serif;
            font-size: 1rem;
            margin: 0;
          }
        `}
      </style>
      <MainAppBar />
      <Splash />
      <Container>
        <Box>{children}</Box>
      </Container>
    </ThemeProvider>
  );
};

export { DefaultLayout };
