var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/formatter.ts
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import graphqlPlugin from "prettier/plugins/graphql";
import htmlPlugin from "prettier/plugins/html";
import markdownPlugin from "prettier/plugins/markdown";
import postcssPlugin from "prettier/plugins/postcss";
import typescriptPlugin from "prettier/plugins/typescript";
import yamlPlugin from "prettier/plugins/yaml";
import { formatWithCursor } from "prettier/standalone";
var plugins = [
  babelPlugin,
  estreePlugin,
  htmlPlugin,
  typescriptPlugin,
  markdownPlugin,
  graphqlPlugin,
  postcssPlugin,
  yamlPlugin
];
var options = {
  bracketSpacing: true,
  arrowParens: "always",
  jsxSingleQuote: true,
  singleQuote: true,
  semi: true
};
function formatCode({ parser, source, cursorOffset }) {
  return formatWithCursor(source, __spreadProps(__spreadValues({}, options), {
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
export {
  formatter
};
