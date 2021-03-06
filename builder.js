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

function writeDataUrl(dataUrl, path, filename) {
  const di = dataUrl.indexOf("data:");
  const bi = dataUrl.indexOf(";base64,");
  const ds = dataUrl.substring(di + 5, bi);
  const ext = ds.substr(ds.indexOf("/") + 1);
  const data = dataUrl.substr(bi + 8);
  const buffer = new Buffer(data, "base64");
  const imageFileName = `${filename}.${ext}`;
  fs.writeFileSync(`${path}${imageFileName}`, buffer);
  return imageFileName;
}

function buildHtml(captureDataUrl) {
  const boot = fs.readFileSync("./src/_boot.ts", "utf-8");
  const title = boot.match(/import \* as g from ".\/([a-zA-Z0-9_.-]*)"/)[1];
  console.log(`\nBuild: ${title}.html`);

  let imageFileName;
  if (captureDataUrl != null) {
    imageFileName = writeDataUrl(captureDataUrl, "./docs/", title);
  }

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
    .replace("(<any>g).options", "options")
    .replace('sourceText.innerText = ""', `sourceText.innerText = '${el}'`);

  const template = fs.readFileSync("./static/index.html", "utf-8");
  const toneStr = 'Tone.min.js"></script>';
  const toneIndex = template.indexOf(toneStr) + toneStr.length;

  let index = `${template.substr(0, toneIndex)}
<script>var module = {exports:{}};</script>${template.substr(toneIndex)}`;

  index = `${index.substr(0, index.indexOf('<script src="bundle.js">'))}
<script>
${u}
</script>
<script>
${setupDraw}
</script>
</body>
</html>`.replace(
    /<title>\s*jsgame256\s*<\/title>/,
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
      ? `<meta name="twitter:image" content='${imageUrl}${imageFileName}' />`
      : ""
  }
${index.substr(headIndex)}`;

  fs.writeFileSync(`./docs/${title}.html`, index);
}
