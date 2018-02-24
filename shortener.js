const UglifyES = require("uglify-es");

module.exports = function shorten(bundle) {
  const _u = UglifyES.minify(bundle, { mangle: false });
  const u = _u.code
    .replace(/.*U=function\(t\){/, "function U(t){\n")
    .replace(/}},function\(module,exports\).*/, "\n}")
    .replace(/(var |let |const )/g, "");
  const l = u.split("\n")[1];
  console.log(l);
  console.log(`${l.length} / 256`);
  return u;
};
