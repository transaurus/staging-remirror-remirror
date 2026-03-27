"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/jest-remirror-environment.ts
var import_core5 = require("@remirror/core");

// src/jest-remirror-matchers.ts
var import_core3 = require("@remirror/core");

// src/jest-remirror-utils.ts
var import_core2 = require("@remirror/core");
var import_state = require("@remirror/pm/state");

// src/jest-remirror-builder.ts
var import_core = require("@remirror/core");
var import_model = require("@remirror/pm/model");

// src/jest-remirror-types.ts
var TagTracker = class {
  constructor() {
    __publicField(this, "tags");
  }
};

// src/jest-remirror-builder.ts
var isTagTracker = (0, import_core.isInstanceOf)(TagTracker);

// src/jest-remirror-utils.ts
function createSelectionFromTaggedDocument(doc, tags) {
  const { cursor, node, start, end, all, anchor, head } = tags;
  if ((0, import_core2.isNumber)(cursor)) {
    return import_state.TextSelection.near(doc.resolve(cursor));
  } else if ((0, import_core2.isNumber)(start)) {
    return import_state.TextSelection.between(
      doc.resolve(start),
      doc.resolve((0, import_core2.isNumber)(end) && start <= end ? end : doc.resolve(start).end())
    );
  } else if ((0, import_core2.isNumber)(head) && (0, import_core2.isNumber)(anchor)) {
    return import_state.TextSelection.between(doc.resolve(anchor), doc.resolve(head));
  } else if ((0, import_core2.isNumber)(node)) {
    return import_state.NodeSelection.create(doc, doc.resolve(node).before());
  } else if ((0, import_core2.isNumber)(all)) {
    return new import_state.AllSelection(doc);
  }
  return null;
}

// src/jest-remirror-matchers.ts
var remirrorMatchers = {
  toContainRemirrorDocument(state, value) {
    var _a;
    if (!(0, import_core3.isProsemirrorNode)(value)) {
      return {
        pass: false,
        message: () => "The expected value should be an instance of ProsemirrorNode."
      };
    }
    if (!(0, import_core3.isEditorState)(state)) {
      return {
        pass: false,
        message: () => "Expected the value passed in to be an EditorState"
      };
    }
    if (value.type.schema !== state.schema) {
      return {
        pass: false,
        message: () => "Expected both values to be using the same schema."
      };
    }
    const expected = (_a = value == null ? void 0 : value.toJSON) == null ? void 0 : _a.call(value);
    const pass = this.equals(state.doc.content.child(0).toJSON(), expected);
    const message = pass ? () => "".concat(this.utils.matcherHint(".not.toContainRemirrorDocument"), "\n\n") + "Expected JSON value of document to not contain:\n  ".concat(this.utils.printExpected(
      value
    ), "\n") + "Actual JSON:\n  ".concat(this.utils.printReceived(state.doc.content.child(0))) : () => {
      const diffString = this.utils.diff(value, state.doc.content.child(0), {
        expand: this.expand
      });
      return "".concat(this.utils.matcherHint(".toContainRemirrorDocument"), "\n\n") + "Expected JSON value of document to contain:\n".concat(this.utils.printExpected(value), "\n") + "Actual JSON:\n  ".concat(this.utils.printReceived(state.doc.content.child(0))) + "".concat(diffString ? "\n\nDifference:\n\n".concat(diffString) : "");
    };
    return {
      pass,
      message
    };
  },
  toEqualRemirrorState(state, value) {
    var _a, _b, _c;
    if (!(0, import_core3.isProsemirrorNode)(value)) {
      return {
        pass: false,
        message: () => "The expected value should be an instance of ProsemirrorNode."
      };
    }
    if (!(0, import_core3.isEditorState)(state)) {
      return {
        pass: false,
        message: () => "Expected the value passed in to be an EditorState"
      };
    }
    if (value.type.schema !== state.schema) {
      return {
        pass: false,
        message: () => "Expected both values to be using the same schema."
      };
    }
    const expectedDocument = (_a = value == null ? void 0 : value.toJSON) == null ? void 0 : _a.call(value);
    const expectedSelection = (_c = createSelectionFromTaggedDocument(
      state.doc,
      (_b = value == null ? void 0 : value.tags) != null ? _b : {}
    )) == null ? void 0 : _c.toJSON();
    if (!(0, import_core3.isProsemirrorNode)(value)) {
      return {
        pass: false,
        message: () => "The expected value should be an instance of ProsemirrorNode."
      };
    }
    if (!(0, import_core3.isEditorState)(state)) {
      return {
        pass: false,
        message: () => "Expected the value passed in to be an EditorState"
      };
    }
    if (value.type.schema !== state.schema) {
      return {
        pass: false,
        message: () => "Expected both values to be using the same schema."
      };
    }
    const passDocuement = this.equals(state.doc.toJSON(), expectedDocument);
    let passSelection = true;
    if (passDocuement && expectedSelection) {
      passSelection = this.equals(state.selection.toJSON(), expectedSelection);
    }
    const pass = passDocuement && passSelection;
    const message = pass ? () => "".concat(this.utils.matcherHint(".not.toContainRemirrorDocument"), "\n\n") + "Expected JSON value of document to not contain:\n  ".concat(this.utils.printExpected(
      value
    ), "\n") + "Actual JSON value of document:\n  ".concat(this.utils.printReceived(state.doc), "\n") + "Expected JSON value of selection to not contain:\n  ".concat(this.utils.printExpected(
      expectedSelection
    ), "\n") + "Actual JSON value of selection:\n  ".concat(this.utils.printReceived(state.selection), "\n") : () => {
      const diffString = this.utils.diff(value, state.doc, {
        expand: this.expand
      });
      return "".concat(this.utils.matcherHint(".toContainRemirrorDocument"), "\n\n") + "Expected JSON value of document to contain:\n".concat(this.utils.printExpected(value), "\n") + "Actual JSON value of document:\n  ".concat(this.utils.printReceived(state.doc), "\n") + "Expected JSON value of selection to contain:\n".concat(this.utils.printExpected(
        expectedSelection
      ), "\n") + "Actual JSON value of selection:\n  ".concat(this.utils.printReceived(state.selection)) + "".concat(diffString ? "\n\nDifference:\n\n".concat(diffString) : "");
    };
    return {
      pass,
      message
    };
  },
  toEqualRemirrorDocument(doc, value) {
    if (!(0, import_core3.isProsemirrorNode)(value) || !(0, import_core3.isProsemirrorNode)(doc)) {
      return {
        pass: false,
        message: () => "Expected both values to be instance of prosemirror-model Node."
      };
    }
    if (value.type.schema !== doc.type.schema) {
      return {
        pass: false,
        message: () => "Expected both values to be using the same schema."
      };
    }
    const pass = this.equals(doc.toJSON(), value.toJSON());
    const message = pass ? () => "".concat(this.utils.matcherHint(".not.toEqualRemirrorDocument"), "\n\n") + "Expected JSON value of document to not equal:\n  ".concat(this.utils.printExpected(value), "\n") + "Actual JSON:\n  ".concat(this.utils.printReceived(doc)) : () => {
      const diffString = this.utils.diff(value, doc, {
        expand: this.expand
      });
      return "".concat(this.utils.matcherHint(".toEqualRemirrorDocument"), "\n\n") + "Expected JSON value of document to equal:\n".concat(this.utils.printExpected(value), "\n") + "Actual JSON:\n  ".concat(this.utils.printReceived(doc)) + "".concat(diffString ? "\n\nDifference:\n\n".concat(diffString) : "");
    };
    return {
      pass,
      message
    };
  }
};

// src/jsdom-polyfills.ts
var import_sanitize_html = __toESM(require("sanitize-html"), 1);
var import_tiny_warning = __toESM(require("tiny-warning"), 1);
var import_core4 = require("@remirror/core");
function jsdomPolyfill() {
  if (!import_core4.environment.isJSDOM) {
    return;
  }
  supportBoundingClientRect();
  supportCancelAnimationFrame();
  supportInnerTextInAnchors();
  supportRanges();
  supportAdjustableSizes();
  supportScrollIntoView();
}
function supportBoundingClientRect() {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect.bind(
    Element.prototype
  );
  if (!window.DOMRect) {
    global.DOMRect = window.DOMRect = class DOMRect {
      constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        __publicField(this, "left");
        __publicField(this, "right");
        __publicField(this, "top");
        __publicField(this, "bottom");
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
      }
      fromRect(_) {
        return new DOMRect();
      }
    };
  }
  Element.prototype.getBoundingClientRect = function() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    if ((0, import_core4.isFunction)(originalGetBoundingClientRect)) {
      try {
        return originalGetBoundingClientRect();
      } catch (e) {
      }
    }
    return {
      toJSON() {
        return {};
      },
      width: (_b = Number.parseFloat((_a = this.style) == null ? void 0 : _a.width)) != null ? _b : 0,
      height: (_d = Number.parseFloat((_c = this.style) == null ? void 0 : _c.height)) != null ? _d : 0,
      top: (_f = Number.parseFloat((_e = this.style) == null ? void 0 : _e.marginTop)) != null ? _f : 0,
      left: (_h = Number.parseFloat((_g = this.style) == null ? void 0 : _g.marginLeft)) != null ? _h : 0,
      x: (_j = Number.parseFloat((_i = this.style) == null ? void 0 : _i.marginLeft)) != null ? _j : 0,
      y: (_l = Number.parseFloat((_k = this.style) == null ? void 0 : _k.marginTop)) != null ? _l : 0,
      right: (_n = Number.parseFloat((_m = this.style) == null ? void 0 : _m.width)) != null ? _n : 0,
      bottom: (_p = Number.parseFloat((_o = this.style) == null ? void 0 : _o.height)) != null ? _p : 0
    };
  };
  const originalGetClientRects = Element.prototype.getClientRects;
  Element.prototype.getClientRects = function() {
    if ((0, import_core4.isFunction)(originalGetClientRects)) {
      try {
        return originalGetClientRects();
      } catch (e) {
      }
    }
    const rects = [];
    rects.item = (_) => null;
    return rects;
  };
}
function supportCancelAnimationFrame() {
  if ((0, import_core4.isFunction)(window.cancelAnimationFrame)) {
    return;
  }
  window.cancelAnimationFrame = () => {
    if (!window.ignoreAllJSDOMWarnings && !window.hasWarnedAboutCancelAnimationFramePolyfill) {
      window.hasWarnedAboutCancelAnimationFramePolyfill = true;
      (0, import_tiny_warning.default)(
        true,
        "Warning! Test uses DOM cancelAnimationFrame API which is not available in JSDOM/Node environment."
      );
    }
  };
}
function supportInnerTextInAnchors() {
  if ("innerText" in document.createElement("a")) {
    return;
  }
  Object.defineProperty(Element.prototype, "innerText", {
    get() {
      return (0, import_sanitize_html.default)(this.textContent, {
        allowedTags: [],
        // remove all tags and return text content only
        allowedAttributes: {}
        // remove all tags and return text content only
      });
    },
    configurable: true
    // make it so that it doesn't blow chunks on re-running tests with things like --watch
  });
}
function supportRanges() {
  var _a;
  if (window.Range) {
    window.Range.prototype.getClientRects = Element.prototype.getClientRects;
    window.Range.prototype.getBoundingClientRect = Element.prototype.getBoundingClientRect;
  }
  function fakeCreateRange() {
    return {
      setStart: import_core4.noop,
      setEnd: import_core4.noop,
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document
      },
      getClientRects: Element.prototype.getClientRects,
      getBoundingClientRect: Element.prototype.getBoundingClientRect
    };
  }
  document.createRange = (_a = document.createRange) != null ? _a : fakeCreateRange;
}
function supportAdjustableSizes() {
  var _a, _b;
  Object.defineProperties(document.documentElement, {
    clientWidth: {
      writable: true,
      value: (_a = document.documentElement.clientWidth) != null ? _a : window.innerWidth
    },
    clientHeight: {
      writable: true,
      value: (_b = document.documentElement.clientHeight) != null ? _b : window.innerHeight
    },
    scrollWidth: {
      writable: true,
      value: document.documentElement.scrollWidth
    },
    scrollHeight: {
      writable: true,
      value: document.documentElement.scrollHeight
    }
  });
}
function supportScrollIntoView() {
  Element.prototype.scrollIntoView = () => {
  };
}

// src/jest-remirror-environment.ts
function setupRemirrorEnvironment() {
  if (!import_core5.environment.isBrowser) {
    return;
  }
  expect.extend(remirrorMatchers);
  jsdomPolyfill();
}

// src/environment.ts
setupRemirrorEnvironment();
