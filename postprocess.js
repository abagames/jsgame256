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
