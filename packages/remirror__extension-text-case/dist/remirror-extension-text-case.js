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

// src/text-case-extension.ts
import {
  command,
  extension,
  ExtensionPriority,
  ExtensionTag,
  isElementDomNode,
  joinStyles,
  MarkExtension,
  omitExtraAttributes
} from "@remirror/core";

// src/text-case-utils.ts
import { includes } from "@remirror/core";
import { ExtensionTextCaseMessages as Messages } from "@remirror/messages";
var toggleTextCaseOptions = {
  icon: "fontSize2",
  label: ({ t }) => t(Messages.TOGGLE_LABEL)
};
var TEXT_CASE_ATTRIBUTE = "data-text-case";
var VALID_CASING = ["uppercase", "lowercase", "capitalize", "small-caps"];
function isValidCasing(value) {
  return includes(VALID_CASING, value);
}

// src/text-case-extension.ts
var _setTextCase_dec, _toggleTextCase_dec, _a, _TextCaseExtension_decorators, _init;
_TextCaseExtension_decorators = [extension({
  defaultOptions: {
    defaultCasing: "none"
  },
  staticKeys: ["defaultCasing"]
})];
var TextCaseExtension = class extends (_a = MarkExtension, _toggleTextCase_dec = [command(toggleTextCaseOptions)], _setTextCase_dec = [command()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "textCase";
  }
  createTags() {
    return [ExtensionTag.FontStyle, ExtensionTag.FormattingMark];
  }
  createMarkSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({}, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        casing: { default: this.options.defaultCasing }
      }),
      parseDOM: [
        {
          tag: "span[".concat(TEXT_CASE_ATTRIBUTE, "]"),
          getAttrs: (dom) => {
            if (!isElementDomNode(dom)) {
              return false;
            }
            const casing = dom.getAttribute(TEXT_CASE_ATTRIBUTE);
            if (!casing || casing === "none") {
              return false;
            }
            return __spreadProps(__spreadValues({}, extra.parse(dom)), { casing });
          }
        },
        {
          // Get the color from the css style property. This is useful for pasted content.
          style: "text-transform",
          priority: ExtensionPriority.Low,
          getAttrs: (casing) => {
            if (!isValidCasing(casing)) {
              return false;
            }
            return { casing };
          }
        },
        {
          // Get the color from the css style property. This is useful for pasted content.
          style: "font-variant",
          priority: ExtensionPriority.Low,
          getAttrs: (casing) => {
            if (!isValidCasing(casing)) {
              return false;
            }
            return { casing };
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (mark) => {
        let { casing } = omitExtraAttributes(mark.attrs, extra);
        const extraAttrs = extra.dom(mark);
        let style = extraAttrs.style;
        if (!isValidCasing(casing)) {
          casing = "none";
        }
        const property = casing === "small-caps" ? "fontVariant" : "textTransform";
        style = joinStyles({ [property]: casing }, style);
        return ["span", __spreadProps(__spreadValues({}, extraAttrs), { style, [TEXT_CASE_ATTRIBUTE]: casing }), 0];
      }
    });
  }
  toggleTextCase() {
    return this.store.commands.toggleMark.original({
      type: this.type,
      attrs: { casing: this.options.defaultCasing }
    });
  }
  setTextCase(casing, selection) {
    const attrs = typeof casing === "string" ? { casing } : casing;
    return this.store.commands.applyMark.original(this.type, attrs, selection);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "toggleTextCase", _toggleTextCase_dec, TextCaseExtension);
__decorateElement(_init, 1, "setTextCase", _setTextCase_dec, TextCaseExtension);
TextCaseExtension = __decorateElement(_init, 0, "TextCaseExtension", _TextCaseExtension_decorators, TextCaseExtension);
__runInitializers(_init, 1, TextCaseExtension);
export {
  TextCaseExtension
};
