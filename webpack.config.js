const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/boot.ts"],
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  externals: {
    p5: "p5",
    tone: "Tone"
  },
  plugins: [
    new CleanWebpackPlugin(["docs"]),
    new HtmlWebpackPlugin({
      title: "jsgame256"
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "p5",
          entry: "https://unpkg.com/p5@0.6.0/lib/p5.min.js",
          global: "p5"
        },
        {
          module: "tone",
          entry: "https://unpkg.com/tone@0.11.11/build/Tone.min.js",
          global: "Tone"
        },
        {
          module: "lodash.range",
          entry: "https://unpkg.com/lodash.range@3.2.0/index.js",
          global: ""
        }
      ]
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
