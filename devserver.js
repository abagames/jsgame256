const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const fetch = require("node-fetch");
const path = require("path");
const shorten = require(path.resolve(__dirname, "shortener.js"));
const builder = require(path.resolve(__dirname, "builder.js"));

const app = express();
const config = require("./webpack.config.js");
config.devtool = "source-map";
config.entry.push("webpack-hot-middleware/client?reload=true");
const compiler = webpack(config);

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
      fetch(`http://localhost:${port}/${config.output.filename}`)
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

app.use(express.static(__dirname + "/static"));
app.use(webpackDevMiddleware(compiler, { reporter }));
app.use(webpackHotMiddleware(compiler));

app.listen(port, function() {
  console.log(`webpack-dev-middleware listening on port ${port}`);
});

const WebSocket = require("ws");
const readline = require("readline");

const wss = new WebSocket.Server({ port: 8887 });
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isWaitingBuild = false;

wss.on("connection", (ws, req) => {
  const ra = req.connection.remoteAddress;
  if (ra !== "127.0.0.1" && ra !== "::1") {
    ws.close();
  }
  rl.write("\n");
  ws.on("message", message => {
    if (isWaitingBuild) {
      builder.build(message);
      isWaitingBuild = false;
    } else {
      console.log(message);
    }
    rl.question("REPL> ", answer => {
      if (answer === "//b") {
        isWaitingBuild = true;
      }
      try {
        ws.send(answer);
      } catch (e) {
        console.log(`send failed: ${e}`);
      }
    });
  });
  ws.on("error", err => console.log(err));
});
