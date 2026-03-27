'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-deprecate-version.cjs.prod.js");
} else {
  module.exports = require("./scripts-deprecate-version.cjs.dev.js");
}
