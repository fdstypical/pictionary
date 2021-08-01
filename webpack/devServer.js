const path = require("path");

const devServer = {
  index: "index.html",
  hot: true,
  noInfo: true,
  overlay: true,
  port: 3000,
  contentBase: [
    path.join(__dirname, "../src/", "public"),
    path.join(__dirname, "../", "dist"),
  ],
};

module.exports = { devServer };
