'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts.cjs.prod.js");
} else {
  module.exports = require("./scripts.cjs.dev.js");
}
