'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-generate-intl.cjs.prod.js");
} else {
  module.exports = require("./scripts-generate-intl.cjs.dev.js");
}
