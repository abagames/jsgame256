const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const config = require("./webpack.config.js");
config.devtool = "source-map";
config.entry.push("webpack-hot-middleware/client?reload=true");
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

const port = 8080;

app.listen(port, function() {
  console.log(`webpack-dev-middleware listening on port ${port}`);
});
