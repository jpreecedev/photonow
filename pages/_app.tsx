import App from "next/app"
import React from "react"
import { AppWithRedux } from "../store/withReduxStore"
import { Provider } from "react-redux"

interface WithReduxProps {
  reduxStore: any
}

class MyApp extends App<WithReduxProps> {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default AppWithRedux(MyApp)
