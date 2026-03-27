'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./remirror-preset-template.cjs.prod.js");
} else {
  module.exports = require("./remirror-preset-template.cjs.dev.js");
}
