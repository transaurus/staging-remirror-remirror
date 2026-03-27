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
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ItalicExtension: () => ItalicExtension
});
module.exports = __toCommonJS(src_exports);

// src/italic-extension.ts
var import_core = require("@remirror/core");

// src/italic-utils.ts
var import_messages = require("@remirror/messages");
var toggleItalicOptions = {
  icon: "italic",
  label: ({ t }) => t(import_messages.ExtensionItalicMessages.LABEL),
  description: ({ t }) => t(import_messages.ExtensionItalicMessages.DESCRIPTION)
};

// src/italic-extension.ts
var _shortcut_dec, _toggleItalic_dec, _a, _ItalicExtension_decorators, _init;
_ItalicExtension_decorators = [(0, import_core.extension)({})];
var ItalicExtension = class extends (_a = import_core.MarkExtension, _toggleItalic_dec = [(0, import_core.command)(toggleItalicOptions)], _shortcut_dec = [(0, import_core.keyBinding)({ shortcut: import_core.NamedShortcut.Italic, command: "toggleItalic" })], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "italic";
  }
  createTags() {
    return [import_core.ExtensionTag.FontStyle, import_core.ExtensionTag.FormattingMark];
  }
  createMarkSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({}, override), {
      attrs: extra.defaults(),
      parseDOM: [
        { tag: "i", getAttrs: extra.parse },
        { tag: "em", getAttrs: extra.parse },
        { style: "font-style=italic" },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (mark) => ["em", extra.dom(mark), 0]
    });
  }
  createKeymap() {
    return {
      "Mod-i": (0, import_core.toggleMark)({ type: this.type })
    };
  }
  createInputRules() {
    return [
      (0, import_core.markInputRule)({
        regexp: /(?:^|[^*])\*([^*]+)\*$/,
        type: this.type,
        ignoreWhitespace: true,
        updateCaptured: ({ fullMatch, start }) => !fullMatch.startsWith("*") ? { fullMatch: fullMatch.slice(1), start: start + 1 } : {}
      }),
      (0, import_core.markInputRule)({
        regexp: /(?:^|\W)_([^_]+)_$/,
        type: this.type,
        ignoreWhitespace: true,
        updateCaptured: ({ fullMatch, start }) => !fullMatch.startsWith("_") ? { fullMatch: fullMatch.slice(1), start: start + 1 } : {}
      })
    ];
  }
  createPasteRules() {
    return [
      { type: "mark", markType: this.type, regexp: /(?:^|\W)_([^_]+)_/g },
      { type: "mark", markType: this.type, regexp: /\*([^*]+)\*/g }
    ];
  }
  toggleItalic(selection) {
    return (0, import_core.toggleMark)({ type: this.type, selection });
  }
  shortcut(props) {
    return this.toggleItalic()(props);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "toggleItalic", _toggleItalic_dec, ItalicExtension);
__decorateElement(_init, 1, "shortcut", _shortcut_dec, ItalicExtension);
ItalicExtension = __decorateElement(_init, 0, "ItalicExtension", _ItalicExtension_decorators, ItalicExtension);
__runInitializers(_init, 1, ItalicExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItalicExtension
});
