const UglifyES = require("uglify-es");

module.exports = function shorten(bundle) {
  const __u = bundle
    .replace(/\s+/g, " ")
    .replace(/.*function U\(\) {/, "function U() {")
    .replace(/exports\.U.*/, "")
    .replace(/\/\/.*?\\n\*/g, "")
    .replace(/(\\r|\\n)/g, "");
  const _u = UglifyES.minify(__u, { mangle: false });
  const u = _u.code
    .replace(/^function U\(\){/, "function U(){\n")
    .replace(/}$/, "\n}")
    .replace(/exports./g, "")
    .replace(/(var |let |const )/g, "");
  const l = u.split("\n")[1];
  console.log(l);
  console.log(`${l.length} / 256`);
  return u;
};
