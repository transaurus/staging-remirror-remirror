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

// src/strike-extension.ts
import {
  command,
  extension,
  ExtensionTag,
  keyBinding,
  MarkExtension,
  markInputRule,
  NamedShortcut,
  toggleMark
} from "@remirror/core";

// src/strike-utils.ts
import { ExtensionStrikeMessages as Messages } from "@remirror/messages";
var toggleStrikeOptions = {
  icon: "strikethrough",
  label: ({ t }) => t(Messages.LABEL),
  description: ({ t }) => t(Messages.DESCRIPTION)
};

// src/strike-extension.ts
var _shortcut_dec, _toggleStrike_dec, _a, _StrikeExtension_decorators, _init;
_StrikeExtension_decorators = [extension({})];
var StrikeExtension = class extends (_a = MarkExtension, _toggleStrike_dec = [command(toggleStrikeOptions)], _shortcut_dec = [keyBinding({ shortcut: NamedShortcut.Strike, command: "toggleStrike" })], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "strike";
  }
  createTags() {
    return [ExtensionTag.FontStyle, ExtensionTag.FormattingMark];
  }
  createMarkSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({}, override), {
      attrs: extra.defaults(),
      parseDOM: [
        {
          tag: "s",
          getAttrs: extra.parse
        },
        {
          tag: "del",
          getAttrs: extra.parse
        },
        {
          tag: "strike",
          getAttrs: extra.parse
        },
        {
          style: "text-decoration",
          getAttrs: (node) => node === "line-through" ? {} : false
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (mark) => ["s", extra.dom(mark), 0]
    });
  }
  toggleStrike() {
    return toggleMark({ type: this.type });
  }
  shortcut(props) {
    return this.toggleStrike()(props);
  }
  createInputRules() {
    return [markInputRule({ regexp: /~([^~]+)~$/, type: this.type, ignoreWhitespace: true })];
  }
  createPasteRules() {
    return [{ regexp: /~([^~]+)~/g, type: "mark", markType: this.type }];
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "toggleStrike", _toggleStrike_dec, StrikeExtension);
__decorateElement(_init, 1, "shortcut", _shortcut_dec, StrikeExtension);
StrikeExtension = __decorateElement(_init, 0, "StrikeExtension", _StrikeExtension_decorators, StrikeExtension);
__runInitializers(_init, 1, StrikeExtension);
export {
  StrikeExtension
};
