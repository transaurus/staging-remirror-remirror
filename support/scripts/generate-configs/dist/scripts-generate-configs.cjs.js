'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-generate-configs.cjs.prod.js");
} else {
  module.exports = require("./scripts-generate-configs.cjs.dev.js");
}
