'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-run-if-publishable.cjs.prod.js");
} else {
  module.exports = require("./scripts-run-if-publishable.cjs.dev.js");
}
