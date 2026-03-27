'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-changeset-forced-update.cjs.prod.js");
} else {
  module.exports = require("./scripts-changeset-forced-update.cjs.dev.js");
}
