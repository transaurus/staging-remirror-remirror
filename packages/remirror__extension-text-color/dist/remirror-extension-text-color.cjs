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
  CSS_VAR_REGEX: () => CSS_VAR_REGEX,
  TEXT_COLOR_ATTRIBUTE: () => TEXT_COLOR_ATTRIBUTE,
  TextColorExtension: () => TextColorExtension,
  palette: () => palette,
  setTextColorOptions: () => setTextColorOptions
});
module.exports = __toCommonJS(src_exports);

// src/text-color-extension.ts
var import_color2k = require("color2k");
var import_core2 = require("@remirror/core");

// src/text-color-utils.ts
var import_core = require("@remirror/core");
var import_messages = require("@remirror/messages");
var import_theme = require("@remirror/theme");
var setTextColorOptions = {
  icon: "fontColor",
  description: ({ t }) => t(import_messages.ExtensionTextColorMessages.SET_COLOR_DESCRIPTION),
  label: ({ t }) => t(import_messages.ExtensionTextColorMessages.SET_COLOR_LABEL)
};
var hueRange = (0, import_core.range)([10]);
function createHuePalette(props) {
  const { t, name, labelDescriptor, hueDescriptor } = props;
  const label = t(labelDescriptor);
  const hues = hueRange.map((hue) => ({
    label: t(hueDescriptor, { hue }),
    color: (0, import_theme.getThemeVar)("hue", name, hue)
  }));
  return { label, hues };
}
function palette(t) {
  const black = {
    label: t(import_messages.ExtensionTextColorMessages.BLACK),
    color: "#000"
  };
  const white = {
    label: t(import_messages.ExtensionTextColorMessages.WHITE),
    color: "#fff"
  };
  const transparent = {
    label: t(import_messages.ExtensionTextColorMessages.TRANSPARENT),
    color: "transparent"
  };
  const hues = {
    gray: createHuePalette({
      t,
      name: "gray",
      labelDescriptor: import_messages.ExtensionTextColorMessages.GRAY,
      hueDescriptor: import_messages.ExtensionTextColorMessages.GRAY_HUE
    }),
    blue: createHuePalette({
      t,
      name: "blue",
      labelDescriptor: import_messages.ExtensionTextColorMessages.BLUE,
      hueDescriptor: import_messages.ExtensionTextColorMessages.BLUE_HUE
    }),
    cyan: createHuePalette({
      t,
      name: "cyan",
      labelDescriptor: import_messages.ExtensionTextColorMessages.CYAN,
      hueDescriptor: import_messages.ExtensionTextColorMessages.CYAN_HUE
    }),
    grape: createHuePalette({
      t,
      name: "grape",
      labelDescriptor: import_messages.ExtensionTextColorMessages.GRAPE,
      hueDescriptor: import_messages.ExtensionTextColorMessages.GRAPE_HUE
    }),
    green: createHuePalette({
      t,
      name: "green",
      labelDescriptor: import_messages.ExtensionTextColorMessages.GREEN,
      hueDescriptor: import_messages.ExtensionTextColorMessages.GREEN_HUE
    }),
    indigo: createHuePalette({
      t,
      name: "indigo",
      labelDescriptor: import_messages.ExtensionTextColorMessages.INDIGO,
      hueDescriptor: import_messages.ExtensionTextColorMessages.INDIGO_HUE
    }),
    lime: createHuePalette({
      t,
      name: "lime",
      labelDescriptor: import_messages.ExtensionTextColorMessages.LIME,
      hueDescriptor: import_messages.ExtensionTextColorMessages.LIME_HUE
    }),
    orange: createHuePalette({
      t,
      name: "orange",
      labelDescriptor: import_messages.ExtensionTextColorMessages.ORANGE,
      hueDescriptor: import_messages.ExtensionTextColorMessages.ORANGE_HUE
    }),
    pink: createHuePalette({
      t,
      name: "pink",
      labelDescriptor: import_messages.ExtensionTextColorMessages.PINK,
      hueDescriptor: import_messages.ExtensionTextColorMessages.PINK_HUE
    }),
    red: createHuePalette({
      t,
      name: "red",
      labelDescriptor: import_messages.ExtensionTextColorMessages.RED,
      hueDescriptor: import_messages.ExtensionTextColorMessages.RED_HUE
    }),
    teal: createHuePalette({
      t,
      name: "teal",
      labelDescriptor: import_messages.ExtensionTextColorMessages.TEAL,
      hueDescriptor: import_messages.ExtensionTextColorMessages.TEAL_HUE
    }),
    violet: createHuePalette({
      t,
      name: "violet",
      labelDescriptor: import_messages.ExtensionTextColorMessages.VIOLET,
      hueDescriptor: import_messages.ExtensionTextColorMessages.VIOLET_HUE
    }),
    yellow: createHuePalette({
      t,
      name: "yellow",
      labelDescriptor: import_messages.ExtensionTextColorMessages.YELLOW,
      hueDescriptor: import_messages.ExtensionTextColorMessages.YELLOW_HUE
    })
  };
  return { black, hues, transparent, white };
}
var CSS_VAR_REGEX = /^var\((--[A-Za-z-]+)\);?/;
var TEXT_COLOR_ATTRIBUTE = "data-text-color-mark";

// src/text-color-extension.ts
var _getHexColor_dec, _removeTextColor_dec, _setTextColor_dec, _a, _TextColorExtension_decorators, _init;
_TextColorExtension_decorators = [(0, import_core2.extension)({
  defaultOptions: {
    defaultColor: "",
    palette
  },
  staticKeys: ["defaultColor"]
})];
var TextColorExtension = class extends (_a = import_core2.MarkExtension, _setTextColor_dec = [(0, import_core2.command)(setTextColorOptions)], _removeTextColor_dec = [(0, import_core2.command)()], _getHexColor_dec = [(0, import_core2.helper)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "textColor";
  }
  createTags() {
    return [import_core2.ExtensionTag.FormattingMark, import_core2.ExtensionTag.FontStyle];
  }
  createMarkSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({}, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        color: { default: this.options.defaultColor }
      }),
      parseDOM: [
        {
          tag: "span[".concat(TEXT_COLOR_ATTRIBUTE, "]"),
          getAttrs: (dom) => {
            if (!(0, import_core2.isElementDomNode)(dom)) {
              return null;
            }
            const color = dom.getAttribute(TEXT_COLOR_ATTRIBUTE);
            if (!color) {
              return null;
            }
            return __spreadProps(__spreadValues({}, extra.parse(dom)), { color });
          }
        },
        {
          // Get the color from the css style property. This is useful for pasted content.
          style: "color",
          priority: import_core2.ExtensionPriority.Low,
          getAttrs: (color) => {
            if (!(0, import_core2.isString)(color)) {
              return null;
            }
            return { color };
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (mark) => {
        const _a3 = (0, import_core2.omitExtraAttributes)(mark.attrs, extra), { color } = _a3, other = __objRest(_a3, ["color"]);
        const extraAttrs = extra.dom(mark);
        let style = extraAttrs.style;
        if (color) {
          style = (0, import_core2.joinStyles)({ color }, style);
        }
        return ["span", __spreadProps(__spreadValues(__spreadValues({}, other), extraAttrs), { style, [TEXT_COLOR_ATTRIBUTE]: color }), 0];
      }
    });
  }
  setTextColor(color, options) {
    return this.store.commands.applyMark.original(this.type, { color }, options == null ? void 0 : options.selection);
  }
  removeTextColor(options) {
    return this.store.commands.removeMark.original(__spreadProps(__spreadValues({ type: this.type }, options), { expand: true }));
  }
  getHexColor(color) {
    const match = color.match(CSS_VAR_REGEX);
    const cssVar = match == null ? void 0 : match[1];
    if (cssVar) {
      color = getComputedStyle(this.store.view.dom).getPropertyValue(cssVar);
    }
    return (0, import_color2k.toHex)(color);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "setTextColor", _setTextColor_dec, TextColorExtension);
__decorateElement(_init, 1, "removeTextColor", _removeTextColor_dec, TextColorExtension);
__decorateElement(_init, 1, "getHexColor", _getHexColor_dec, TextColorExtension);
TextColorExtension = __decorateElement(_init, 0, "TextColorExtension", _TextColorExtension_decorators, TextColorExtension);
__runInitializers(_init, 1, TextColorExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CSS_VAR_REGEX,
  TEXT_COLOR_ATTRIBUTE,
  TextColorExtension,
  palette,
  setTextColorOptions
});
