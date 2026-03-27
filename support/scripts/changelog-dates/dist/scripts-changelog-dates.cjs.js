'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-changelog-dates.cjs.prod.js");
} else {
  module.exports = require("./scripts-changelog-dates.cjs.dev.js");
}
