const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const NodemonPlugin = require("nodemon-webpack-plugin");

const clientConfig = {
  mode: "development",
  entry: "./src/App.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "public"),
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 8000,
  },
  plugins: [new ESLintPlugin()],
};

const serverConfig = {
  mode: "development",
  entry: "./server/index.js",
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
  node: {
    __dirname: false,
  },
  plugins: [new NodemonPlugin(), new ESLintPlugin()],
};

module.exports = [serverConfig, clientConfig];

// devServer: describes the configurations that can be made to webpack-dev-server. We tell webpack-dev-server to serve files from our public directory
