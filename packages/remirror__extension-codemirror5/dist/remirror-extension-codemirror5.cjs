"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decoratorStart = (base) => {
  var _a2;
  return [, , , __create((_a2 = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a2 : null)];
};
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CodeMirrorExtension: () => CodeMirrorExtension
});
module.exports = __toCommonJS(src_exports);

// src/codemirror-extension.ts
var import_core4 = require("@remirror/core");

// src/codemirror-node-view.ts
var import_core3 = require("@remirror/core");
var import_commands = require("@remirror/pm/commands");
var import_history = require("@remirror/pm/history");
var import_state2 = require("@remirror/pm/state");

// src/codemirror-ref.ts
var import_core = require("@remirror/core");
var ref = (0, import_core.object)();
var codemirror_ref_default = ref;

// src/codemirror-utils.ts
var import_core2 = require("@remirror/core");
var import_state = require("@remirror/pm/state");
function arrowHandler(dir) {
  return ({ dispatch, view, tr }) => {
    if (!view) {
      return false;
    }
    if (!(tr.selection.empty && view.endOfTextblock(dir))) {
      return false;
    }
    const side = dir === "left" || dir === "up" ? -1 : 1;
    const $head = tr.selection.$head;
    const nextPos = import_state.Selection.near(tr.doc.resolve(side > 0 ? $head.after() : $head.before()), side);
    if (nextPos.$head && nextPos.$head.parent.type.name === "codeMirror") {
      dispatch == null ? void 0 : dispatch(tr.setSelection(nextPos));
      return true;
    }
    return false;
  };
}
function updateNodeAttributes(type) {
  return (attributes) => ({ state: { tr, selection }, dispatch }) => {
    const parent = (0, import_core2.findParentNodeOfType)({ types: type, selection });
    if (!parent || (0, import_core2.isEqual)(attributes, parent.node.attrs)) {
      return false;
    }
    tr.setNodeMarkup(parent.pos, type, __spreadValues(__spreadValues({}, parent.node.attrs), attributes));
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}
function parseLanguageToMode(language) {
  if (language) {
    let mime;
    if (mime = codemirror_ref_default.CodeMirror.findModeByName(language)) {
      return mime.mode;
    } else if (mime = codemirror_ref_default.CodeMirror.findModeByExtension(language)) {
      return mime.mode;
    } else if (mime = codemirror_ref_default.CodeMirror.findModeByMIME(language)) {
      return mime.mode;
    }
  }
  return null;
}

// src/codemirror-node-view.ts
var _node, _cm, _schema, _view, _getPos, _incomingChanges, _updating;
var CodeMirrorNodeView = class {
  constructor(node, view, getPos, config) {
    /**
     * The dom element which wraps the CodeMirror editor element. This is directly
     * controlled by ProseMirror.
     */
    __publicField(this, "dom");
    /**
     * The ProseMirror Node represented by this instance of the
     * [[`CodeMirrorNodeView`]].
     */
    __privateAdd(this, _node);
    /**
     * The CodeMirror editor instance being controlled by this NodeView.
     */
    __privateAdd(this, _cm);
    /**
     * The schema for the current editor.
     */
    __privateAdd(this, _schema);
    /**
     * The `EditorView` being used.
     */
    __privateAdd(this, _view);
    /**
     * A method for retrieving the current position from the editor.
     */
    __privateAdd(this, _getPos);
    /**
     * A flag used to identify whether there are any changes that are incoming. It
     * is used along with `this.#updating` to prevent cursorActivity changes from
     * being forwarded to the ProseMirror editor.
     */
    __privateAdd(this, _incomingChanges, false);
    /**
     * This flag is used to avoid an update loop between the outer and inner
     * editor.
     *
     * - `true` when the CodeMirror editor is being updated right now.
     */
    __privateAdd(this, _updating, false);
    __privateSet(this, _node, node);
    __privateSet(this, _schema, node.type.schema);
    __privateSet(this, _view, view);
    __privateSet(this, _getPos, getPos);
    __privateSet(this, _cm, codemirror_ref_default.CodeMirror(null, __spreadValues({
      value: __privateGet(this, _node).textContent,
      extraKeys: this.codeMirrorKeymap()
    }, config)));
    this.dom = __privateGet(this, _cm).getWrapperElement();
    this.setupCodeMirrorHandlers();
  }
  /**
   * Create the event listeners for managing updates from CodeMirror.
   */
  setupCodeMirrorHandlers() {
    setTimeout(() => __privateGet(this, _cm).refresh(), 20);
    __privateSet(this, _updating, false);
    __privateGet(this, _cm).on("beforeChange", () => __privateSet(this, _incomingChanges, true));
    __privateGet(this, _cm).on("cursorActivity", () => {
      if (!__privateGet(this, _updating) && !__privateGet(this, _incomingChanges)) {
        this.forwardSelection();
      }
    });
    __privateGet(this, _cm).on("changes", () => {
      if (!__privateGet(this, _updating)) {
        this.valueChanged();
        this.forwardSelection();
      }
      __privateSet(this, _incomingChanges, false);
    });
    __privateGet(this, _cm).on("focus", () => this.forwardSelection());
  }
  /**
   * When the code editor is focused, we can keep the selection of the outer
   * editor synchronized with the inner one, so that any commands executed on
   * the outer editor see an accurate selection.
   */
  forwardSelection() {
    if (!__privateGet(this, _cm).hasFocus()) {
      return;
    }
    const state = __privateGet(this, _view).state;
    const selection = this.asProseMirrorSelection(state.doc);
    if (!selection.eq(state.selection)) {
      __privateGet(this, _view).dispatch(state.tr.setSelection(selection));
    }
  }
  /**
   * This helper function translates from a CodeMirror selection to a
   * ProseMirror selection. Because CodeMirror uses a line/column based indexing
   * system, `indexFromPos` is used to convert to an actual character index.
   */
  asProseMirrorSelection(doc) {
    const offset = __privateGet(this, _getPos).call(this) + 1;
    const anchor = __privateGet(this, _cm).indexFromPos(__privateGet(this, _cm).getCursor("anchor")) + offset;
    const head = __privateGet(this, _cm).indexFromPos(__privateGet(this, _cm).getCursor("head")) + offset;
    return import_state2.TextSelection.between(doc.resolve(anchor), doc.resolve(head));
  }
  /**
   * Selections are also synchronized the other way, from ProseMirror to
   * CodeMirror, using the view's `setSelection` method.
   */
  setSelection(anchor, head) {
    __privateGet(this, _cm).focus();
    __privateSet(this, _updating, true);
    __privateGet(this, _cm).setSelection(__privateGet(this, _cm).posFromIndex(anchor), __privateGet(this, _cm).posFromIndex(head));
    __privateSet(this, _updating, false);
  }
  /**
   * When the actual content of the code editor is changed, the event handler
   * registered in the node view's constructor calls this method. It'll compare
   * the code block node's current value to the value in the editor, and
   * dispatch a transaction if there is a difference.
   */
  valueChanged() {
    const change = computeTextChange(__privateGet(this, _node).textContent, __privateGet(this, _cm).getValue());
    if (!change) {
      return;
    }
    const start = __privateGet(this, _getPos).call(this) + 1;
    const tr = __privateGet(this, _view).state.tr.replaceWith(
      start + change.from,
      start + change.to,
      change.text ? __privateGet(this, _schema).text(change.text) : []
    );
    __privateGet(this, _view).dispatch(tr);
  }
  /**
   * A somewhat tricky aspect of nesting editor like this is handling cursor
   * motion across the edges of the inner editor. This node view will have to
   * take care of allowing the user to move the selection out of the code
   * editor. For that purpose, it binds the arrow keys to handlers that check if
   * further motion would ‘escape’ the editor, and if so, return the selection
   * and focus to the outer editor.
   *
   * The keymap also binds keys for undo and redo, which the outer editor will
   * handle, and for ctrl-enter, which, in ProseMirror's base keymap, creates a
   * new paragraph after a code block.
   */
  codeMirrorKeymap() {
    const view = __privateGet(this, _view);
    const mod = /Mac/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return codemirror_ref_default.CodeMirror.normalizeKeyMap({
      Up: () => this.maybeEscape("line", -1),
      Left: () => this.maybeEscape("char", -1),
      Down: () => this.maybeEscape("line", 1),
      Right: () => this.maybeEscape("char", 1),
      "Ctrl-Enter": () => {
        if ((0, import_commands.exitCode)(view.state, view.dispatch)) {
          view.focus();
        }
      },
      ["".concat(mod, "-Z")]: () => (0, import_history.undo)(view.state, view.dispatch),
      ["Shift-".concat(mod, "-Z")]: () => (0, import_history.redo)(view.state, view.dispatch),
      ["".concat(mod, "-Y")]: () => (0, import_history.redo)(view.state, view.dispatch)
    });
  }
  maybeEscape(unit, dir) {
    const pos = __privateGet(this, _cm).getCursor();
    if (__privateGet(this, _cm).somethingSelected() || pos.line !== (dir < 0 ? __privateGet(this, _cm).firstLine() : __privateGet(this, _cm).lastLine()) || unit === "char" && pos.ch !== (dir < 0 ? 0 : __privateGet(this, _cm).getLine(pos.line).length)) {
      return codemirror_ref_default.CodeMirror.Pass;
    }
    __privateGet(this, _view).focus();
    const targetPos = __privateGet(this, _getPos).call(this) + (dir < 0 ? 0 : __privateGet(this, _node).nodeSize);
    const selection = import_state2.Selection.near(__privateGet(this, _view).state.doc.resolve(targetPos), dir);
    __privateGet(this, _view).dispatch(__privateGet(this, _view).state.tr.setSelection(selection).scrollIntoView());
    __privateGet(this, _view).focus();
    return null;
  }
  /**
   * When an update comes in from the editor, for example because of an undo
   * action, we kind of have to do the inverse of what `valueChanged` did—check
   * for text changes, and if present, propagate them from the outer to the
   * inner editor.
   */
  update(node) {
    if (node.type !== __privateGet(this, _node).type) {
      return false;
    }
    const textChange = computeTextChange(__privateGet(this, _cm).getValue(), node.textContent);
    const attrsChange = computeAttrsChange(__privateGet(this, _node).attrs, node.attrs);
    __privateSet(this, _node, node);
    if (textChange || attrsChange) {
      __privateSet(this, _updating, true);
      if (textChange) {
        __privateGet(this, _cm).replaceRange(
          textChange.text,
          __privateGet(this, _cm).posFromIndex(textChange.from),
          __privateGet(this, _cm).posFromIndex(textChange.to)
        );
      }
      if (attrsChange) {
        for (const k of Object.keys(attrsChange)) {
          __privateGet(this, _cm).setOption(k, attrsChange[k]);
        }
      }
      __privateSet(this, _updating, false);
    }
    return true;
  }
  selectNode() {
    __privateGet(this, _cm).focus();
  }
  stopEvent() {
    return true;
  }
};
_node = new WeakMap();
_cm = new WeakMap();
_schema = new WeakMap();
_view = new WeakMap();
_getPos = new WeakMap();
_incomingChanges = new WeakMap();
_updating = new WeakMap();
function computeTextChange(previousText, currentText) {
  if (previousText === currentText) {
    return null;
  }
  let from = 0;
  let to = previousText.length;
  let currentTo = currentText.length;
  while (from < to && previousText.charCodeAt(from) === currentText.charCodeAt(from)) {
    ++from;
  }
  while (to > from && currentTo > from && previousText.charCodeAt(to - 1) === currentText.charCodeAt(currentTo - 1)) {
    to--;
    currentTo--;
  }
  return { from, to, text: currentText.slice(from, currentTo) };
}
function computeAttrsChange(oldAttrs, newAttrs) {
  var _a2, _b, _c;
  let updated = false;
  const deltaConfig = {};
  const oldConfig = (_a2 = oldAttrs.codeMirrorConfig) != null ? _a2 : {};
  const newConfig = (_b = newAttrs.codeMirrorConfig) != null ? _b : {};
  for (const [key, value] of (0, import_core3.entries)(oldConfig)) {
    if (value !== newConfig[key]) {
      deltaConfig[key] = newConfig[key];
      updated = true;
    }
  }
  if (oldAttrs.language !== newAttrs.language) {
    deltaConfig.mode = (_c = parseLanguageToMode(newAttrs.language)) != null ? _c : void 0;
    updated = true;
  }
  if (updated) {
    return deltaConfig;
  }
  return null;
}

// src/codemirror-extension.ts
var _updateCodeMirror_dec, _createCodeMirror_dec, _a, _CodeMirrorExtension_decorators, _init;
_CodeMirrorExtension_decorators = [(0, import_core4.extension)({
  defaultOptions: {
    CodeMirror: codemirror_ref_default.CodeMirror,
    defaultCodeMirrorConfig: null
  },
  staticKeys: ["CodeMirror"]
})];
var CodeMirrorExtension = class extends (_a = import_core4.NodeExtension, _createCodeMirror_dec = [(0, import_core4.command)()], _updateCodeMirror_dec = [(0, import_core4.command)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "tags", [import_core4.ExtensionTag.Block, import_core4.ExtensionTag.Code]);
  }
  get name() {
    return "codeMirror";
  }
  init() {
    if (this.options.CodeMirror) {
      codemirror_ref_default.CodeMirror = this.options.CodeMirror;
    }
  }
  createNodeSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({
      group: "block",
      content: "text*",
      marks: "",
      defining: true
    }, override), {
      code: true,
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        codeMirrorConfig: { default: void 0 },
        language: { default: void 0 }
      }),
      parseDOM: [
        {
          tag: "pre",
          getAttrs: (node) => (0, import_core4.isElementDomNode)(node) ? extra.parse(node) : false
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM() {
        return ["pre", ["code", 0]];
      },
      isolating: true
    });
  }
  createNodeViews() {
    return (node, view, getPos) => {
      const codeMirrorConfig = __spreadValues(__spreadValues({}, this.options.defaultCodeMirrorConfig), node.attrs.codeMirrorConfig);
      if (node.attrs.language) {
        const mode = parseLanguageToMode(node.attrs.language);
        if (mode) {
          codeMirrorConfig.mode = mode;
        }
      }
      return new CodeMirrorNodeView(node, view, getPos, codeMirrorConfig);
    };
  }
  createKeymap() {
    return {
      ArrowLeft: arrowHandler("left"),
      ArrowRight: arrowHandler("right"),
      ArrowUp: arrowHandler("up"),
      ArrowDown: arrowHandler("down")
    };
  }
  createCodeMirror(attributes) {
    return (0, import_core4.setBlockType)(this.type, attributes);
  }
  updateCodeMirror(attributes) {
    return updateNodeAttributes(this.type)(attributes);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "createCodeMirror", _createCodeMirror_dec, CodeMirrorExtension);
__decorateElement(_init, 1, "updateCodeMirror", _updateCodeMirror_dec, CodeMirrorExtension);
CodeMirrorExtension = __decorateElement(_init, 0, "CodeMirrorExtension", _CodeMirrorExtension_decorators, CodeMirrorExtension);
__runInitializers(_init, 1, CodeMirrorExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodeMirrorExtension
});
