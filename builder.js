const fs = require("fs");
const path = require("path");
const shorten = require(path.resolve(__dirname, "shortener.js"));

const boot = fs.readFileSync("./src/boot.ts", "utf-8");
const title = boot.match(
  /import\s?{\s?U\s?}\s?from\s?".\/([a-zA-Z0-9_.-]*)"/
)[1];
console.log(`\nBuild: ${title}.html`);

const bundle = fs.readFileSync("./tmp/bundle.js", "utf-8");
const u = shorten(bundle);

const setup_draw = boot
  .substr(boot.indexOf("let ticks = 0;"))
  .replace(/w\./g, "");

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
${setup_draw}
</script>
</body>
</html>`.replace(
  "<title>jsgame256</title>",
  `<title>${title} - jsgame256</title>`
);

fs.writeFileSync(`./docs/${title}.html`, index);
