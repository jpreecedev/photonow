const path = require("path")
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader"),
        options: {
          configFileName: path.join(__dirname, "tsconfig.json")
        }
      }
    ]
  })
  config.resolve.extensions.push(".ts", ".tsx")
  return config
}
