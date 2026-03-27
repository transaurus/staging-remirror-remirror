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
var __typeError = (msg) => {
  throw TypeError(msg);
};
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
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  basicJSON: () => basicJSON,
  createFramework: () => createFramework,
  delay: () => import_delay.default,
  diff: () => import_jest_diff.default,
  docNodeBasicJSON: () => docNodeBasicJSON,
  docNodeSimpleJSON: () => docNodeSimpleJSON,
  docNodeTestJSON: () => docNodeTestJSON,
  hideConsoleError: () => hideConsoleError,
  initialJson: () => initialJson,
  minDocument: () => import_min_document.default,
  rafMock: () => rafMock,
  simpleJSON: () => simpleJSON,
  testJSON: () => testJSON
});
module.exports = __toCommonJS(src_exports);
var import_globals = require("@jest/globals");
var import_mock_raf = __toESM(require("@react-spring/mock-raf"), 1);
var import_jest_diff = __toESM(require("jest-diff"), 1);
var import_core = require("@remirror/core");
var import_react = require("@remirror/react");

// src/object-nodes.ts
var testJSON = {
  type: "paragraph",
  content: [
    { type: "text", text: "This is a node with " },
    { type: "text", marks: [{ type: "bold" }], text: "bold text and " },
    { type: "text", marks: [{ type: "bold" }, { type: "italic" }], text: "italic bold and " },
    {
      type: "text",
      marks: [{ type: "bold" }, { type: "italic" }, { type: "underline" }],
      text: "underlined italic text"
    }
  ]
};
var simpleJSON = {
  type: "paragraph",
  content: [
    { type: "text", text: "This is a node with " },
    { type: "text", marks: [{ type: "bold" }], text: "bold text." }
  ]
};
var basicJSON = { type: "paragraph", content: [{ type: "text", text: "basic" }] };
var docNodeSimpleJSON = { type: "doc", content: [simpleJSON] };
var docNodeTestJSON = { type: "doc", content: [testJSON] };
var docNodeBasicJSON = { type: "doc", content: [basicJSON] };

// src/index.ts
var import_delay = __toESM(require("delay"), 1);
var import_min_document = __toESM(require("min-document"), 1);
var initialJson = {
  type: "doc",
  content: [
    { type: "paragraph", content: [{ type: "text", text: "Better docs to come soon..." }] }
  ]
};
function hideConsoleError(hide) {
  const ref = { spy: import_globals.jest.spyOn(console, "error") };
  beforeEach(() => {
    if (!hide) {
      return;
    }
    ref.spy = import_globals.jest.spyOn(console, "error");
    ref.spy.mockImplementation(() => {
    });
  });
  afterEach(() => {
    ref.spy.mockRestore();
  });
  return ref;
}
function rafMock() {
  const mockRaf = (0, import_mock_raf.default)();
  const spy = import_globals.jest.spyOn(window, "requestAnimationFrame").mockImplementation(mockRaf.raf);
  return __spreadProps(__spreadValues({}, mockRaf), { cleanup: () => spy.mockRestore() });
}
var _cacheOutput;
var TestFramework = class extends import_core.Framework {
  constructor() {
    super(...arguments);
    __privateAdd(this, _cacheOutput);
  }
  get name() {
    return "test";
  }
  updateState() {
  }
  createView(state, element) {
    return (0, import_react.createEditorView)(element != null ? element : null, {
      state,
      dispatchTransaction: this.dispatchTransaction,
      attributes: () => this.getAttributes(),
      editable: () => {
        var _a;
        return (_a = this.props.editable) != null ? _a : true;
      },
      plugins: []
    });
  }
  get frameworkOutput() {
    var _a;
    return (_a = __privateGet(this, _cacheOutput)) != null ? _a : __privateSet(this, _cacheOutput, this.baseOutput);
  }
};
_cacheOutput = new WeakMap();
function createFramework(manager) {
  function createStateFromContent(content, selection) {
    return manager.createState({
      content,
      stringHandler: "html",
      selection
    });
  }
  return new TestFramework({
    getProps: () => ({ manager }),
    initialEditorState: createStateFromContent(manager.createEmptyDoc())
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  basicJSON,
  createFramework,
  delay,
  diff,
  docNodeBasicJSON,
  docNodeSimpleJSON,
  docNodeTestJSON,
  hideConsoleError,
  initialJson,
  minDocument,
  rafMock,
  simpleJSON,
  testJSON
});
