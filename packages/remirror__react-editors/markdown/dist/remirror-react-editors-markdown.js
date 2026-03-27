var __defProp = Object.defineProperty;
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

// src/markdown/markdown-editor.tsx
import "@remirror/styles/all.css";
import React, { useCallback } from "react";
import jsx from "refractor/lang/jsx.js";
import typescript from "refractor/lang/typescript.js";
import { ExtensionPriority } from "remirror";
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  PlaceholderExtension,
  StrikeExtension,
  TableExtension,
  TrailingNodeExtension
} from "remirror/extensions";
import { i18nFormat } from "@remirror/i18n";
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from "@remirror/react";
import { MarkdownToolbar } from "@remirror/react-ui";
import { AllStyledComponent } from "@remirror/styles/emotion";
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
  const extensions = useCallback(
    () => [
      new LinkExtension({ autoLink: true }),
      new PlaceholderExtension({ placeholder }),
      new BoldExtension(),
      new StrikeExtension(),
      new ItalicExtension(),
      new HeadingExtension(),
      new BlockquoteExtension(),
      new BulletListExtension({ enableSpine: true }),
      new OrderedListExtension(),
      new ListItemExtension({
        priority: ExtensionPriority.High,
        enableCollapsible: true
      }),
      new CodeExtension(),
      new CodeBlockExtension({ supportedLanguages: [jsx, typescript] }),
      new TrailingNodeExtension(),
      new TableExtension(),
      new MarkdownExtension({ copyAsMarkdown: false }),
      /**
       * `HardBreakExtension` allows us to create a newline inside paragraphs.
       * e.g. in a list item
       */
      new HardBreakExtension()
    ],
    [placeholder]
  );
  const { manager } = useRemirror({
    extensions,
    stringHandler: "markdown"
  });
  return /* @__PURE__ */ React.createElement(AllStyledComponent, null, /* @__PURE__ */ React.createElement(ThemeProvider, { theme }, /* @__PURE__ */ React.createElement(Remirror, __spreadValues({ manager, i18nFormat, autoFocus: true }, rest), /* @__PURE__ */ React.createElement(MarkdownToolbar, null), /* @__PURE__ */ React.createElement(EditorComponent, null), children)));
};
export {
  MarkdownEditor
};
