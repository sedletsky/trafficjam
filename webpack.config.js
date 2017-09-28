var path = require("path")

module.exports = {
  entry: "./src/trafficjam/index.js",
  output: {
    filename: "./dist/trafficjam.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      }
    ]
  },
  node: {
    fs: "empty",
    child_process: "empty"
  }
}
