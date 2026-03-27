"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/formatter.ts
var formatter_exports = {};
__export(formatter_exports, {
  formatter: () => formatter
});
module.exports = __toCommonJS(formatter_exports);
var import_babel = __toESM(require("prettier/plugins/babel"), 1);
var import_estree = __toESM(require("prettier/plugins/estree"), 1);
var import_graphql = __toESM(require("prettier/plugins/graphql"), 1);
var import_html = __toESM(require("prettier/plugins/html"), 1);
var import_markdown = __toESM(require("prettier/plugins/markdown"), 1);
var import_postcss = __toESM(require("prettier/plugins/postcss"), 1);
var import_typescript = __toESM(require("prettier/plugins/typescript"), 1);
var import_yaml = __toESM(require("prettier/plugins/yaml"), 1);
var import_standalone = require("prettier/standalone");
var plugins = [
  import_babel.default,
  import_estree.default,
  import_html.default,
  import_typescript.default,
  import_markdown.default,
  import_graphql.default,
  import_postcss.default,
  import_yaml.default
];
var options = {
  bracketSpacing: true,
  arrowParens: "always",
  jsxSingleQuote: true,
  singleQuote: true,
  semi: true
};
function formatCode({ parser, source, cursorOffset }) {
  return (0, import_standalone.formatWithCursor)(source, __spreadProps(__spreadValues({}, options), {
    cursorOffset,
    plugins,
    parser
  }));
}
function offsetIncrement(source, initialCursor, formatted, endCursor, replacementPairs) {
  const beforeCursorSource = source.slice(initialCursor - 1, initialCursor);
  const afterCursorFormatted = formatted.slice(endCursor, endCursor + 1);
  for (const [invalid, replacement] of replacementPairs) {
    if (beforeCursorSource === invalid && afterCursorFormatted === replacement) {
      return 1;
    }
  }
  return 0;
}
function identifyParser(language) {
  switch (language) {
    case "typescript":
    case "ts":
    case "tsx":
      return "typescript";
    case "javascript":
    case "jsx":
    case "js":
      return "babel-flow";
    case "markdown":
    case "md":
      return "markdown";
    case "mdx":
      return "mdx";
    case "yml":
    case "yaml":
      return "yaml";
    case "html":
      return "html";
    case "css":
      return "css";
    case "less":
      return "less";
    case "json":
      return "json";
    case "json5":
      return "json5";
    default:
      return;
  }
}
async function formatter(props) {
  const { cursorOffset, language, source } = props;
  const fn = (result, pairs = [
    ['"', "'"],
    ["'", '"']
  ]) => {
    const increment = offsetIncrement(
      source,
      cursorOffset,
      result.formatted,
      result.cursorOffset,
      pairs
    );
    return __spreadProps(__spreadValues({}, result), { cursorOffset: result.cursorOffset + increment });
  };
  const parser = identifyParser(language);
  if (!parser) {
    return;
  }
  try {
    const formatResult = await formatCode({ source, cursorOffset, parser });
    return fn(formatResult);
  } catch (e) {
    return;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatter
});
