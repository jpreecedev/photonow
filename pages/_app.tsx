import React from "react"
import { Provider } from "react-redux"
import Head from "next/head"
import App from "next/app"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider } from "@material-ui/styles"

import { initialiseStore } from "../store"
import { theme } from "../components/Theme"

interface PhotoNowProps {
  reduxStore: any
}

class PhotoNow extends App<PhotoNowProps> {
  reduxStore: any

  constructor(props) {
    super(props)
    this.reduxStore = initialiseStore()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>PhotoNow</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={this.reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </>
    )
  }
}

export default PhotoNow
