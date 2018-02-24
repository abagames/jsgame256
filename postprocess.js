const fs = require("fs");

const _u = fs.readFileSync("./docs/_u.js", "utf-8");
const u = _u
  .replace(/.*function U\(t\){/, "function U(t){\n")
  .replace(/}exports.*/, "\n}")
  .replace(/(var |let |const )/g, "");
fs.writeFileSync("./docs/u.js", u);
const l = u.split("\n")[1];
console.log(l);
console.log(`${l.length} / 256`);

const boot = fs.readFileSync("./src/boot.ts", "utf-8");
const setup_draw = boot
  .substr(boot.indexOf("let ticks = 0;"))
  .replace(/w\./g, "");

const template = fs.readFileSync("./docs/index.html", "utf-8");
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
</html>`;
fs.writeFileSync("./docs/u.html", index);
