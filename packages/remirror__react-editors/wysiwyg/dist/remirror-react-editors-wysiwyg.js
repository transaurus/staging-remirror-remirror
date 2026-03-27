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

// src/wysiwyg/wysiwyg-editor.tsx
import React3, { useCallback } from "react";
import { PlaceholderExtension, wysiwygPreset } from "remirror/extensions";
import { TableComponents, TableExtension } from "@remirror/extension-react-tables";
import { i18nFormat } from "@remirror/i18n";
import { EditorComponent, Remirror, ThemeProvider, useRemirror } from "@remirror/react";
import { AllStyledComponent } from "@remirror/styles/emotion";

// src/components/bubble-menu.tsx
import React from "react";
import { FloatingToolbar } from "@remirror/react-ui";
var BubbleMenu = () => /* @__PURE__ */ React.createElement(FloatingToolbar, null);

// src/components/top-toolbar.tsx
import React2 from "react";
import { WysiwygToolbar } from "@remirror/react-ui";
var TopToolbar = () => /* @__PURE__ */ React2.createElement(WysiwygToolbar, null);

// src/wysiwyg/wysiwyg-editor.tsx
var WysiwygEditor = (_a) => {
  var _b = _a, {
    placeholder,
    stringHandler,
    children,
    theme
  } = _b, rest = __objRest(_b, [
    "placeholder",
    "stringHandler",
    "children",
    "theme"
  ]);
  const extensions = useCallback(
    () => [new PlaceholderExtension({ placeholder }), new TableExtension(), ...wysiwygPreset()],
    [placeholder]
  );
  const { manager } = useRemirror({ extensions, stringHandler });
  return /* @__PURE__ */ React3.createElement(AllStyledComponent, null, /* @__PURE__ */ React3.createElement(ThemeProvider, { theme }, /* @__PURE__ */ React3.createElement(Remirror, __spreadValues({ manager, i18nFormat }, rest), /* @__PURE__ */ React3.createElement(TopToolbar, null), /* @__PURE__ */ React3.createElement(EditorComponent, null), /* @__PURE__ */ React3.createElement(BubbleMenu, null), /* @__PURE__ */ React3.createElement(TableComponents, null), children)));
};
export {
  WysiwygEditor
};
