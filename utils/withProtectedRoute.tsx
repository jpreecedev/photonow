import React from "react"
import Router from "next/router"
import { NextPageContext, NextComponentType } from "next"

const getDisplayName = (Component: NextComponentType) =>
  Component.displayName || Component.name || "Component"

const auth = ctx => {
  if (ctx.req && !ctx.req.cookies.jwt) {
    ctx.res.writeHead(302, { Location: "/login" })
    ctx.res.end()
    return
  }

  if (!ctx.req.cookies.jwt) {
    Router.push("/login")
  }
}

export const withProtectedRoute = (WrappedComponent: NextComponentType) =>
  class extends React.Component {
    static displayName = `withProtectedRoute(${getDisplayName(WrappedComponent)})`

    static async getInitialProps(ctx: NextPageContext) {
      auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
withProtectedRoute
