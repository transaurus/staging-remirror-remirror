"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
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

// src/markdown/index.ts
var markdown_exports = {};
__export(markdown_exports, {
  MarkdownEditor: () => MarkdownEditor
});
module.exports = __toCommonJS(markdown_exports);

// src/markdown/markdown-editor.tsx
var import_all = require("@remirror/styles/all.css");
var import_react = __toESM(require("react"), 1);
var import_jsx = __toESM(require("refractor/lang/jsx.js"), 1);
var import_typescript = __toESM(require("refractor/lang/typescript.js"), 1);
var import_remirror = require("remirror");
var import_extensions = require("remirror/extensions");
var import_i18n = require("@remirror/i18n");
var import_react2 = require("@remirror/react");
var import_react_ui = require("@remirror/react-ui");
var import_emotion = require("@remirror/styles/emotion");
var MarkdownEditor = (_a) => {
  var _b = _a, {
    placeholder,
    children,
    theme
  } = _b, rest = __objRest(_b, [
    "placeholder",
    "children",
    "theme"
  ]);
  const extensions = (0, import_react.useCallback)(
    () => [
      new import_extensions.LinkExtension({ autoLink: true }),
      new import_extensions.PlaceholderExtension({ placeholder }),
      new import_extensions.BoldExtension(),
      new import_extensions.StrikeExtension(),
      new import_extensions.ItalicExtension(),
      new import_extensions.HeadingExtension(),
      new import_extensions.BlockquoteExtension(),
      new import_extensions.BulletListExtension({ enableSpine: true }),
      new import_extensions.OrderedListExtension(),
      new import_extensions.ListItemExtension({
        priority: import_remirror.ExtensionPriority.High,
        enableCollapsible: true
      }),
      new import_extensions.CodeExtension(),
      new import_extensions.CodeBlockExtension({ supportedLanguages: [import_jsx.default, import_typescript.default] }),
      new import_extensions.TrailingNodeExtension(),
      new import_extensions.TableExtension(),
      new import_extensions.MarkdownExtension({ copyAsMarkdown: false }),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new import_extensions.HardBreakExtension()
    ],
    [placeholder]
  );
  const { manager } = (0, import_react2.useRemirror)({
    extensions,
    stringHandler: "markdown"
  });
  return /* @__PURE__ */ import_react.default.createElement(import_emotion.AllStyledComponent, null, /* @__PURE__ */ import_react.default.createElement(import_react2.ThemeProvider, { theme }, /* @__PURE__ */ import_react.default.createElement(import_react2.Remirror, __spreadValues({ manager, i18nFormat: import_i18n.i18nFormat, autoFocus: true }, rest), /* @__PURE__ */ import_react.default.createElement(import_react_ui.MarkdownToolbar, null), /* @__PURE__ */ import_react.default.createElement(import_react2.EditorComponent, null), children)));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MarkdownEditor
});
