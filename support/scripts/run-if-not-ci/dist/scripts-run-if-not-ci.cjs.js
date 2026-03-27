'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-run-if-not-ci.cjs.prod.js");
} else {
  module.exports = require("./scripts-run-if-not-ci.cjs.dev.js");
}
