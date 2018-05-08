const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: ["./src/_boot.ts"],
  output: {
    path: path.resolve(__dirname, "tmp"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules", "web_modules"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|web_modules)/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  externals: {
    p5: "p5",
    tone: "Tone"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
