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
  FontSizeExtension: () => FontSizeExtension
});
module.exports = __toCommonJS(src_exports);

// src/font-size-extension.ts
var import_round = __toESM(require("round"), 1);
var import_core = require("@remirror/core");

// src/font-size-utils.ts
var import_messages = require("@remirror/messages");
var setFontSizeOptions = {
  icon: "fontSize",
  description: ({ t }) => t(import_messages.ExtensionFontSizeMessages.SET_DESCRIPTION),
  label: ({ t }) => t(import_messages.ExtensionFontSizeMessages.SET_LABEL)
};
var increaseFontSizeOptions = {
  icon: "addLine",
  description: ({ t }) => t(import_messages.ExtensionFontSizeMessages.INCREASE_DESCRIPTION),
  label: ({ t }) => t(import_messages.ExtensionFontSizeMessages.INCREASE_LABEL)
};
var decreaseFontSizeOptions = {
  icon: "subtractLine",
  description: ({ t }) => t(import_messages.ExtensionFontSizeMessages.DECREASE_DESCRIPTION),
  label: ({ t }) => t(import_messages.ExtensionFontSizeMessages.DECREASE_LABEL)
};
var FONT_SIZE_ATTRIBUTE = "data-font-size-mark";

// src/font-size-extension.ts
var _getFontSizeFromDom_dec, _getFontSizeForSelection_dec, _decreaseFontSizeShortcut_dec, _increaseFontSizeShortcut_dec, _removeFontSize_dec, _decreaseFontSize_dec, _increaseFontSize_dec, _setFontSize_dec, _a, _FontSizeExtension_decorators, _init;
_FontSizeExtension_decorators = [(0, import_core.extension)({
  defaultOptions: {
    defaultSize: "",
    unit: "pt",
    increment: 1,
    max: 100,
    min: 1,
    roundingMultiple: 0.5
  },
  staticKeys: ["defaultSize"]
})];
var FontSizeExtension = class extends (_a = import_core.MarkExtension, _setFontSize_dec = [(0, import_core.command)(setFontSizeOptions)], _increaseFontSize_dec = [(0, import_core.command)(increaseFontSizeOptions)], _decreaseFontSize_dec = [(0, import_core.command)(decreaseFontSizeOptions)], _removeFontSize_dec = [(0, import_core.command)()], _increaseFontSizeShortcut_dec = [(0, import_core.keyBinding)({ shortcut: import_core.NamedShortcut.IncreaseFontSize, command: "increaseFontSize" })], _decreaseFontSizeShortcut_dec = [(0, import_core.keyBinding)({ shortcut: import_core.NamedShortcut.IncreaseFontSize, command: "decreaseFontSize" })], _getFontSizeForSelection_dec = [(0, import_core.helper)()], _getFontSizeFromDom_dec = [(0, import_core.helper)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "fontSize";
  }
  createTags() {
    return [import_core.ExtensionTag.FormattingMark, import_core.ExtensionTag.FontStyle];
  }
  createMarkSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({}, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        size: { default: this.options.defaultSize }
      }),
      parseDOM: [
        {
          tag: "span[".concat(FONT_SIZE_ATTRIBUTE, "]"),
          getAttrs: (dom) => {
            if (!(0, import_core.isElementDomNode)(dom)) {
              return null;
            }
            let size = dom.getAttribute(FONT_SIZE_ATTRIBUTE);
            if (!size) {
              return null;
            }
            size = "".concat((0, import_core.convertPixelsToDomUnit)(size, this.options.unit, dom)).concat(this.options.unit);
            return __spreadProps(__spreadValues({}, extra.parse(dom)), { size });
          }
        },
        {
          // Get the color from the css style property. This is useful for pasted content.
          style: "font-size",
          priority: import_core.ExtensionPriority.Low,
          getAttrs: (size) => {
            if (!(0, import_core.isString)(size)) {
              return null;
            }
            size = this.getFontSize(size);
            return { size };
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (mark) => {
        const _a3 = (0, import_core.omitExtraAttributes)(mark.attrs, extra), { size } = _a3, other = __objRest(_a3, ["size"]);
        const extraAttrs = extra.dom(mark);
        let style = extraAttrs.style;
        let fontSize;
        if (size) {
          style = (0, import_core.joinStyles)({ fontSize: this.getFontSize(size) }, style);
        }
        return ["span", __spreadProps(__spreadValues(__spreadValues({}, other), extraAttrs), { style, [FONT_SIZE_ATTRIBUTE]: fontSize }), 0];
      }
    });
  }
  getFontSize(size) {
    var _a2;
    const { unit, roundingMultiple, max, min, defaultSize } = this.options;
    const fontSize = (0, import_core.convertPixelsToDomUnit)(size, unit, (_a2 = this.store.view) == null ? void 0 : _a2.dom);
    if (Number.isNaN(fontSize)) {
      return defaultSize || "1rem";
    }
    const value = (0, import_core.clamp)({
      value: (0, import_round.default)(fontSize, roundingMultiple),
      max,
      min
    });
    return "".concat(value).concat(unit);
  }
  setFontSize(size, options) {
    return this.store.commands.applyMark.original(
      this.type,
      // Store always as string. This removes the need to treat string vs number when using the value
      { size: String(size) },
      options == null ? void 0 : options.selection
    );
  }
  increaseFontSize(options) {
    const { increment } = this.options;
    return (props) => {
      const [parsedFontSize] = this.getFontSizeForSelection(options == null ? void 0 : options.selection);
      let [size] = parsedFontSize;
      size += (0, import_core.isFunction)(increment) ? increment(parsedFontSize, 1) : increment;
      return this.setFontSize(size, options)(props);
    };
  }
  decreaseFontSize(options) {
    const { increment } = this.options;
    return (props) => {
      const [parsedFontSize] = this.getFontSizeForSelection(options == null ? void 0 : options.selection);
      let [size] = parsedFontSize;
      size -= (0, import_core.isFunction)(increment) ? increment(parsedFontSize, -1) : increment;
      return this.setFontSize(size, options)(props);
    };
  }
  removeFontSize(options) {
    return this.store.commands.removeMark.original(__spreadValues({ type: this.type, expand: false }, options));
  }
  increaseFontSizeShortcut(props) {
    return this.increaseFontSize()(props);
  }
  decreaseFontSizeShortcut(props) {
    return this.decreaseFontSize()(props);
  }
  getFontSizeForSelection(position) {
    const state = this.store.getState();
    const selection = (0, import_core.getTextSelection)(position != null ? position : state.selection, state.doc);
    const [range, ...rest] = (0, import_core.getMarkRanges)(selection, this.type);
    if (range) {
      return [
        (0, import_core.parseSizeUnit)(range.mark.attrs.size),
        ...rest.map((range2) => (0, import_core.parseSizeUnit)(range2.mark.attrs.size))
      ];
    }
    const { defaultSize, unit } = this.options;
    const parsedSize = [(0, import_core.convertPixelsToDomUnit)(defaultSize, unit), unit];
    return [parsedSize];
  }
  getFontSizeFromDom(position) {
    const state = this.store.getState();
    const selection = (0, import_core.getTextSelection)(position != null ? position : state.selection, state.doc);
    const nodeAtPos = this.store.view.domAtPos(selection.from);
    const element = (0, import_core.isElementDomNode)(nodeAtPos.node) ? nodeAtPos.node : this.store.view.dom;
    return (0, import_core.parseSizeUnit)((0, import_core.getFontSize)(element));
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "setFontSize", _setFontSize_dec, FontSizeExtension);
__decorateElement(_init, 1, "increaseFontSize", _increaseFontSize_dec, FontSizeExtension);
__decorateElement(_init, 1, "decreaseFontSize", _decreaseFontSize_dec, FontSizeExtension);
__decorateElement(_init, 1, "removeFontSize", _removeFontSize_dec, FontSizeExtension);
__decorateElement(_init, 1, "increaseFontSizeShortcut", _increaseFontSizeShortcut_dec, FontSizeExtension);
__decorateElement(_init, 1, "decreaseFontSizeShortcut", _decreaseFontSizeShortcut_dec, FontSizeExtension);
__decorateElement(_init, 1, "getFontSizeForSelection", _getFontSizeForSelection_dec, FontSizeExtension);
__decorateElement(_init, 1, "getFontSizeFromDom", _getFontSizeFromDom_dec, FontSizeExtension);
FontSizeExtension = __decorateElement(_init, 0, "FontSizeExtension", _FontSizeExtension_decorators, FontSizeExtension);
__runInitializers(_init, 1, FontSizeExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FontSizeExtension
});
