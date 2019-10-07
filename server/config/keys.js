if (process.env.NODE === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
