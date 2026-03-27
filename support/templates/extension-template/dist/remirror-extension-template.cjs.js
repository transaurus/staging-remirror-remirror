'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./remirror-extension-template.cjs.prod.js");
} else {
  module.exports = require("./remirror-extension-template.cjs.dev.js");
}
