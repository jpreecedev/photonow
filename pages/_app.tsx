import React from "react"
import { Provider } from "react-redux"
import Head from "next/head"
import App from "next/app"
import { CssBaseline } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"

import { initialise } from "../store"
import { theme } from "../components/Theme"

interface PhotoNowProps {
  reduxStore: any
}

class PhotoNow extends App<PhotoNowProps> {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props
    const store = initialise()
    return (
      <>
        <Head>
          <title>PhotoNow</title>
        </Head>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </>
    )
  }
}

export default PhotoNow
