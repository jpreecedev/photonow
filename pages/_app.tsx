import App from "next/app"
import React from "react"
import { Provider } from "react-redux"

import { initialiseStore } from "../store"

interface WithReduxProps {
  reduxStore: any
}

class FindMyFace extends App<WithReduxProps> {
  reduxStore: any

  constructor(props) {
    super(props)
    this.reduxStore = initialiseStore()
  }

  render() {
    const { Component } = this.props
    return (
      <Provider store={this.reduxStore}>
        <Component />
      </Provider>
    )
  }
}

export default FindMyFace
