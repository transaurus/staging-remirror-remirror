var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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

// src/text-color-extension.ts
import { toHex } from "color2k";
import {
  command,
  extension,
  ExtensionPriority,
  ExtensionTag,
  helper,
  isElementDomNode,
  isString,
  joinStyles,
  MarkExtension,
  omitExtraAttributes
} from "@remirror/core";

// src/text-color-utils.ts
import { range } from "@remirror/core";
import { ExtensionTextColorMessages as Messages } from "@remirror/messages";
import { getThemeVar } from "@remirror/theme";
var setTextColorOptions = {
  icon: "fontColor",
  description: ({ t }) => t(Messages.SET_COLOR_DESCRIPTION),
  label: ({ t }) => t(Messages.SET_COLOR_LABEL)
};
var hueRange = range([10]);
function createHuePalette(props) {
  const { t, name, labelDescriptor, hueDescriptor } = props;
  const label = t(labelDescriptor);
  const hues = hueRange.map((hue) => ({
    label: t(hueDescriptor, { hue }),
    color: getThemeVar("hue", name, hue)
  }));
  return { label, hues };
}
function palette(t) {
  const black = {
    label: t(Messages.BLACK),
    color: "#000"
  };
  const white = {
    label: t(Messages.WHITE),
    color: "#fff"
  };
  const transparent = {
    label: t(Messages.TRANSPARENT),
    color: "transparent"
  };
  const hues = {
    gray: createHuePalette({
      t,
      name: "gray",
      labelDescriptor: Messages.GRAY,
      hueDescriptor: Messages.GRAY_HUE
    }),
    blue: createHuePalette({
      t,
      name: "blue",
      labelDescriptor: Messages.BLUE,
      hueDescriptor: Messages.BLUE_HUE
    }),
    cyan: createHuePalette({
      t,
      name: "cyan",
      labelDescriptor: Messages.CYAN,
      hueDescriptor: Messages.CYAN_HUE
    }),
    grape: createHuePalette({
      t,
      name: "grape",
      labelDescriptor: Messages.GRAPE,
      hueDescriptor: Messages.GRAPE_HUE
    }),
    green: createHuePalette({
      t,
      name: "green",
      labelDescriptor: Messages.GREEN,
      hueDescriptor: Messages.GREEN_HUE
    }),
    indigo: createHuePalette({
      t,
      name: "indigo",
      labelDescriptor: Messages.INDIGO,
      hueDescriptor: Messages.INDIGO_HUE
    }),
    lime: createHuePalette({
      t,
      name: "lime",
      labelDescriptor: Messages.LIME,
      hueDescriptor: Messages.LIME_HUE
    }),
    orange: createHuePalette({
      t,
      name: "orange",
      labelDescriptor: Messages.ORANGE,
      hueDescriptor: Messages.ORANGE_HUE
    }),
    pink: createHuePalette({
      t,
      name: "pink",
      labelDescriptor: Messages.PINK,
      hueDescriptor: Messages.PINK_HUE
    }),
    red: createHuePalette({
      t,
      name: "red",
      labelDescriptor: Messages.RED,
      hueDescriptor: Messages.RED_HUE
    }),
    teal: createHuePalette({
      t,
      name: "teal",
      labelDescriptor: Messages.TEAL,
      hueDescriptor: Messages.TEAL_HUE
    }),
    violet: createHuePalette({
      t,
      name: "violet",
      labelDescriptor: Messages.VIOLET,
      hueDescriptor: Messages.VIOLET_HUE
    }),
    yellow: createHuePalette({
      t,
      name: "yellow",
      labelDescriptor: Messages.YELLOW,
      hueDescriptor: Messages.YELLOW_HUE
    })
  };
  return { black, hues, transparent, white };
}
var CSS_VAR_REGEX = /^var\((--[A-Za-z-]+)\);?/;
var TEXT_COLOR_ATTRIBUTE = "data-text-color-mark";

// src/text-color-extension.ts
var _getHexColor_dec, _removeTextColor_dec, _setTextColor_dec, _a, _TextColorExtension_decorators, _init;
_TextColorExtension_decorators = [extension({
  defaultOptions: {
    defaultColor: "",
    palette
  },
  staticKeys: ["defaultColor"]
})];
var TextColorExtension = class extends (_a = MarkExtension, _setTextColor_dec = [command(setTextColorOptions)], _removeTextColor_dec = [command()], _getHexColor_dec = [helper()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "textColor";
  }
  createTags() {
    return [ExtensionTag.FormattingMark, ExtensionTag.FontStyle];
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
            if (!isElementDomNode(dom)) {
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
          priority: ExtensionPriority.Low,
          getAttrs: (color) => {
            if (!isString(color)) {
              return null;
            }
            return { color };
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (mark) => {
        const _a3 = omitExtraAttributes(mark.attrs, extra), { color } = _a3, other = __objRest(_a3, ["color"]);
        const extraAttrs = extra.dom(mark);
        let style = extraAttrs.style;
        if (color) {
          style = joinStyles({ color }, style);
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
    return toHex(color);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "setTextColor", _setTextColor_dec, TextColorExtension);
__decorateElement(_init, 1, "removeTextColor", _removeTextColor_dec, TextColorExtension);
__decorateElement(_init, 1, "getHexColor", _getHexColor_dec, TextColorExtension);
TextColorExtension = __decorateElement(_init, 0, "TextColorExtension", _TextColorExtension_decorators, TextColorExtension);
__runInitializers(_init, 1, TextColorExtension);
export {
  CSS_VAR_REGEX,
  TEXT_COLOR_ATTRIBUTE,
  TextColorExtension,
  palette,
  setTextColorOptions
};
