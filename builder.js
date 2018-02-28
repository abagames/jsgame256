const imageUrl = "https://abagames.github.io/jsgame256/";

const webpack = require("webpack");
const config = require("./webpack.config.js");
const compiler = webpack(config);
const fs = require("fs");

module.exports.build = function(captureDataUrl) {
  compiler.run((err, stats) => {
    if (err != null) {
      console.err(err);
      return;
    }
    buildHtml(captureDataUrl);
  });
};

function writeDataUrl(dataUrl, filename) {
  const matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/);
  const ext = matches[1];
  const data = matches[2];
  const buffer = new Buffer(data, "base64");
  fs.writeFileSync(`${filename}.${ext}`, buffer);
}

function buildHtml(captureDataUrl) {
  const boot = fs.readFileSync("./src/_boot.ts", "utf-8");
  const title = boot.match(/import \* as g from ".\/([a-zA-Z0-9_.-]*)"/)[1];
  console.log(`\nBuild: ${title}.html`);

  const path = require("path");
  const shorten = require(path.resolve(__dirname, "shortener.js"));
  const bundle = fs.readFileSync("./tmp/bundle.js", "utf-8");
  const u = shorten(bundle);
  const l = u.split("\n")[1];
  const el = l.replace(/\'/g, "'");

  const setupDraw = boot
    .substr(boot.indexOf("let isEmptySoundPlayed = false;"))
    .replace(/w\./g, "")
    .replace("g.U()", "U()")
    .replace('sourceText.innerText = ""', `sourceText.innerText = '${el}'`);

  const template = fs.readFileSync("./tmp/index.html", "utf-8");
  const toneStr = 'Tone.min.js"></script>';
  const toneIndex = template.indexOf(toneStr) + toneStr.length;

  let index = `${template.substr(0, toneIndex)}
<script>var module = {exports:{}};</script>${template.substr(toneIndex)}`;

  index = `${index.substr(
    0,
    index.indexOf('<script type="text/javascript" src="bundle.js">')
  )}
<script>
${u}
</script>
<script>
${setupDraw}
</script>
</body>
</html>`.replace(
    "<title>jsgame256</title>",
    `<title>${title} - jsgame256</title>`
  );

  const headStr = "<head>";
  const headIndex = index.indexOf(headStr) + headStr.length;

  index = `${index.substr(0, headIndex)}
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content='${title} - jsgame256 (${l.length} / 256)' />
<meta name="twitter:description" content='${el}' />
${
    captureDataUrl != null
      ? `<meta name="twitter:image" content='${imageUrl}${title}.png' />`
      : ""
  }
${index.substr(headIndex)}`;

  fs.writeFileSync(`./docs/${title}.html`, index);

  if (captureDataUrl != null) {
    writeDataUrl(captureDataUrl, `./docs/${title}`);
  }
}

module.exports.build();
