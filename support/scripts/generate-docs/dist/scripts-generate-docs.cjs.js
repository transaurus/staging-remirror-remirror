'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-generate-docs.cjs.prod.js");
} else {
  module.exports = require("./scripts-generate-docs.cjs.dev.js");
}
