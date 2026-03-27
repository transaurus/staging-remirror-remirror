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
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  YjsExtension: () => YjsExtension,
  defaultDestroyProvider: () => defaultDestroyProvider
});
module.exports = __toCommonJS(src_exports);

// src/yjs-extension.ts
var import_y_prosemirror = require("y-prosemirror");
var import_yjs = require("yjs");
var import_core = require("@remirror/core");
var import_messages = require("@remirror/messages");
var _redoShortcut_dec, _undoShortcut_dec, _yRedo_dec, _yUndo_dec, _a, _YjsExtension_decorators, _init;
_YjsExtension_decorators = [(0, import_core.extension)({
  defaultOptions: {
    getProvider: () => {
      (0, import_core.invariant)(false, {
        code: import_core.ErrorConstant.EXTENSION,
        message: "You must provide a YJS Provider to the `YjsExtension`."
      });
    },
    destroyProvider: defaultDestroyProvider,
    syncPluginOptions: void 0,
    cursorBuilder: import_y_prosemirror.defaultCursorBuilder,
    selectionBuilder: import_y_prosemirror.defaultSelectionBuilder,
    cursorStateField: "cursor",
    getSelection: (state) => state.selection,
    disableUndo: false,
    protectedNodes: new Set("paragraph"),
    trackedOrigins: []
  },
  staticKeys: ["disableUndo", "protectedNodes", "trackedOrigins"],
  defaultPriority: import_core.ExtensionPriority.High
})];
var YjsExtension = class extends (_a = import_core.PlainExtension, _yUndo_dec = [(0, import_core.command)({
  disableChaining: true,
  description: ({ t }) => t(import_messages.ExtensionHistoryMessages.UNDO_DESCRIPTION),
  label: ({ t }) => t(import_messages.ExtensionHistoryMessages.UNDO_LABEL),
  icon: "arrowGoBackFill"
})], _yRedo_dec = [(0, import_core.command)({
  disableChaining: true,
  description: ({ t }) => t(import_messages.ExtensionHistoryMessages.REDO_DESCRIPTION),
  label: ({ t }) => t(import_messages.ExtensionHistoryMessages.REDO_LABEL),
  icon: "arrowGoForwardFill"
})], _undoShortcut_dec = [(0, import_core.keyBinding)({ shortcut: import_core.NamedShortcut.Undo, command: "yUndo" })], _redoShortcut_dec = [(0, import_core.keyBinding)({ shortcut: import_core.NamedShortcut.Redo, command: "yRedo" })], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "_provider");
  }
  get name() {
    return "yjs";
  }
  /**
   * The provider that is being used for the editor.
   */
  get provider() {
    var _a2;
    const { getProvider } = this.options;
    return (_a2 = this._provider) != null ? _a2 : this._provider = getLazyValue(getProvider);
  }
  getBinding() {
    const state = this.store.getState();
    const { binding } = import_y_prosemirror.ySyncPluginKey.getState(state);
    return binding;
  }
  /**
   * Create the yjs plugins.
   */
  createExternalPlugins() {
    const {
      syncPluginOptions,
      cursorBuilder,
      getSelection,
      cursorStateField,
      disableUndo,
      protectedNodes,
      trackedOrigins,
      selectionBuilder
    } = this.options;
    const yDoc = this.provider.doc;
    const type = yDoc.getXmlFragment("prosemirror");
    const { mapping } = (0, import_y_prosemirror.initProseMirrorDoc)(type, this.store.schema);
    const plugins = [
      (0, import_y_prosemirror.ySyncPlugin)(type, __spreadProps(__spreadValues({}, syncPluginOptions), { mapping })),
      (0, import_y_prosemirror.yCursorPlugin)(
        this.provider.awareness,
        { cursorBuilder, getSelection, selectionBuilder },
        cursorStateField
      )
    ];
    if (!disableUndo) {
      const undoManager = new import_yjs.UndoManager(type, {
        trackedOrigins: /* @__PURE__ */ new Set([import_y_prosemirror.ySyncPluginKey, ...trackedOrigins]),
        deleteFilter: (item) => (0, import_y_prosemirror.defaultDeleteFilter)(item, protectedNodes)
      });
      plugins.push((0, import_y_prosemirror.yUndoPlugin)({ undoManager }));
    }
    return plugins;
  }
  /**
   * This managers the updates of the collaboration provider.
   */
  onSetOptions(props) {
    var _a2, _b;
    const { changes, pickChanged } = props;
    const changedPluginOptions = pickChanged([
      "cursorBuilder",
      "cursorStateField",
      "getProvider",
      "getSelection",
      "syncPluginOptions"
    ]);
    if (changes.getProvider.changed) {
      this._provider = void 0;
      const previousProvider = getLazyValue(changes.getProvider.previousValue);
      if (changes.destroyProvider.changed) {
        (_b = (_a2 = changes.destroyProvider).previousValue) == null ? void 0 : _b.call(_a2, previousProvider);
      } else {
        this.options.destroyProvider(previousProvider);
      }
    }
    if (!(0, import_core.isEmptyObject)(changedPluginOptions)) {
      this.store.updateExtensionPlugins(this);
    }
  }
  /**
   * Remove the provider from the manager.
   */
  onDestroy() {
    if (!this._provider) {
      return;
    }
    this.options.destroyProvider(this._provider);
    this._provider = void 0;
  }
  yUndo() {
    return (0, import_core.nonChainable)((props) => {
      var _a2;
      if (this.options.disableUndo) {
        return false;
      }
      const { state, dispatch } = props;
      const undoManager = (_a2 = import_y_prosemirror.yUndoPluginKey.getState(state)) == null ? void 0 : _a2.undoManager;
      if (!undoManager || undoManager.undoStack.length === 0) {
        return false;
      }
      if (!dispatch) {
        return true;
      }
      return (0, import_core.convertCommand)(import_y_prosemirror.undo)(props);
    });
  }
  yRedo() {
    return (0, import_core.nonChainable)((props) => {
      var _a2;
      if (this.options.disableUndo) {
        return false;
      }
      const { state, dispatch } = props;
      const undoManager = (_a2 = import_y_prosemirror.yUndoPluginKey.getState(state)) == null ? void 0 : _a2.undoManager;
      if (!undoManager || undoManager.redoStack.length === 0) {
        return false;
      }
      if (!dispatch) {
        return true;
      }
      return (0, import_core.convertCommand)(import_y_prosemirror.redo)(props);
    });
  }
  undoShortcut(props) {
    return this.yUndo()(props);
  }
  redoShortcut(props) {
    return this.yRedo()(props);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "yUndo", _yUndo_dec, YjsExtension);
__decorateElement(_init, 1, "yRedo", _yRedo_dec, YjsExtension);
__decorateElement(_init, 1, "undoShortcut", _undoShortcut_dec, YjsExtension);
__decorateElement(_init, 1, "redoShortcut", _redoShortcut_dec, YjsExtension);
YjsExtension = __decorateElement(_init, 0, "YjsExtension", _YjsExtension_decorators, YjsExtension);
__runInitializers(_init, 1, YjsExtension);
function defaultDestroyProvider(provider) {
  const { doc } = provider;
  provider.disconnect();
  provider.destroy();
  doc.destroy();
}
function getLazyValue(lazyValue) {
  return (0, import_core.isFunction)(lazyValue) ? lazyValue() : lazyValue;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YjsExtension,
  defaultDestroyProvider
});
