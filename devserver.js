const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const fetch = require("node-fetch");
const path = require("path");
const shorten = require(path.resolve(__dirname, "shortener.js"));

const port = 8080;

function reporter(middlewareOptions, options) {
  const { log, state, stats } = options;
  if (state) {
    const displayStats = middlewareOptions.stats !== false;
    if (displayStats) {
      if (stats.hasErrors()) {
        log.error(stats.toString(middlewareOptions.stats));
      } else if (stats.hasWarnings()) {
        log.warn(stats.toString(middlewareOptions.stats));
      } else {
        log.info(stats.toString(middlewareOptions.stats));
      }
    }
    let message = "Compiled successfully.";
    if (stats.hasErrors()) {
      message = "Failed to compile.";
    } else if (stats.hasWarnings()) {
      message = "Compiled with warnings.";
    } else {
      fetch(`http://localhost:${port}/bundle.js`)
        .then(res => res.text())
        .then(bundle => {
          shorten(bundle);
        });
    }
    log.info(message);
  } else {
    log.info("Compiling...");
  }
}

const app = express();
const config = require("./webpack.config.js");
config.devtool = "source-map";
config.entry.push("webpack-hot-middleware/client?reload=true");
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { reporter }));
app.use(webpackHotMiddleware(compiler));

app.listen(port, function() {
  console.log(`webpack-dev-middleware listening on port ${port}`);
});
