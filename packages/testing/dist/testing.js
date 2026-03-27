var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// src/index.ts
import { jest } from "@jest/globals";
import createMockRaf from "@react-spring/mock-raf";
import diff from "jest-diff";
import {
  Framework
} from "@remirror/core";
import { createEditorView } from "@remirror/react";

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
import { default as default2 } from "delay";
import { default as default3 } from "min-document";
var initialJson = {
  type: "doc",
  content: [
    { type: "paragraph", content: [{ type: "text", text: "Better docs to come soon..." }] }
  ]
};
function hideConsoleError(hide) {
  const ref = { spy: jest.spyOn(console, "error") };
  beforeEach(() => {
    if (!hide) {
      return;
    }
    ref.spy = jest.spyOn(console, "error");
    ref.spy.mockImplementation(() => {
    });
  });
  afterEach(() => {
    ref.spy.mockRestore();
  });
  return ref;
}
function rafMock() {
  const mockRaf = createMockRaf();
  const spy = jest.spyOn(window, "requestAnimationFrame").mockImplementation(mockRaf.raf);
  return __spreadProps(__spreadValues({}, mockRaf), { cleanup: () => spy.mockRestore() });
}
var _cacheOutput;
var TestFramework = class extends Framework {
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
    return createEditorView(element != null ? element : null, {
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
export {
  basicJSON,
  createFramework,
  default2 as delay,
  diff,
  docNodeBasicJSON,
  docNodeSimpleJSON,
  docNodeTestJSON,
  hideConsoleError,
  initialJson,
  default3 as minDocument,
  rafMock,
  simpleJSON,
  testJSON
};
