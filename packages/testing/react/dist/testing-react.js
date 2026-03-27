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

// src/react.tsx
import { render as originalRender } from "@testing-library/react";
import * as hooks from "@testing-library/react-hooks";
import React, { StrictMode } from "react";
import TestRenderer from "react-test-renderer";
import { useRemirrorContext } from "@remirror/react";
export * from "@testing-library/react";
function strictRender(ui, options) {
  return originalRender(/* @__PURE__ */ React.createElement(StrictMode, null, ui), __spreadValues({}, options));
}
var DefaultEditor = () => {
  const { getRootProps } = useRemirrorContext();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", __spreadValues({}, getRootProps())));
};
export {
  DefaultEditor,
  TestRenderer,
  hooks,
  strictRender
};
