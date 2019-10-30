const { parsed: localEnv } = require("dotenv").config()
const webpack = require("webpack")
const withCSS = require("@zeit/next-css")

const exposedConfig = {
  GOOGLE_PLACES_API_KEY: localEnv.GOOGLE_PLACES_API_KEY,
  BASE_API_URL: localEnv.BASE_API_URL,
  STRIPE_PUBLISHABLE_KEY: localEnv.STRIPE_PUBLISHABLE_KEY,
  SERVER_API_URL: localEnv.SERVER_API_URL
}

module.exports = withCSS({
  webpack(config, options) {
    config.plugins.push(new webpack.EnvironmentPlugin(exposedConfig))
    return config
  }
})
