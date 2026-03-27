'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./scripts-linaria.cjs.prod.js");
} else {
  module.exports = require("./scripts-linaria.cjs.dev.js");
}
