'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-check-styles.cjs.prod.js");
} else {
  module.exports = require("./scripts-check-styles.cjs.dev.js");
}
