'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-generate-api.cjs.prod.js");
} else {
  module.exports = require("./scripts-generate-api.cjs.dev.js");
}
