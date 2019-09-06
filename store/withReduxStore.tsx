import React from "react"
import { initialiseStore } from "."
import { NextComponentType, NextPageContext } from "next"

const isServer = typeof window === "undefined"
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__"

function getOrCreateStore(initialState = {}) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initialiseStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initialiseStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

const AppWithRedux = <P extends object>(Component: NextComponentType<P>) =>
  class WithRedux extends React.Component<P> {
    reduxStore: any

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    static async getInitialProps(appContext: any) {
      const reduxStore = getOrCreateStore()

      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof Component.getInitialProps === "function") {
        appProps = await Component.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    render() {
      return <Component {...this.props} reduxStore={this.reduxStore} />
    }
  }

export { AppWithRedux }
