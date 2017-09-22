var path = require("path")

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "./public/app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.rt$/,
        loader: "react-templates-loader?modules=es6"
      }
    ]
  },
  node: {
    fs: "empty",
    child_process: "empty"
  }
}
