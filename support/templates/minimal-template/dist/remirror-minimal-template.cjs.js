'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./remirror-minimal-template.cjs.prod.js");
} else {
  module.exports = require("./remirror-minimal-template.cjs.dev.js");
}
