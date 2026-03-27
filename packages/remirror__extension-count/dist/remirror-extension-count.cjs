"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
  CountExtension: () => CountExtension,
  CountStrategy: () => CountStrategy
});
module.exports = __toCommonJS(src_exports);

// src/count-extension.ts
var import_core2 = require("@remirror/core");
var import_state = require("@remirror/pm/state");
var import_view = require("@remirror/pm/view");

// src/count-utils.ts
var import_core = require("@remirror/core");
var WORDS_REGEX = /\S+/g;
function getTextLength(node) {
  if (node.type.isTextblock) {
    return 1;
  }
  if (node.type.isText) {
    return node.textBetween(0, node.nodeSize).length;
  }
  return 0;
}
function getCharacterExceededPosition({ doc }, maxCharacters) {
  let count = 0;
  let foundPos = 0;
  doc.nodesBetween(0, doc.nodeSize - 2, (node, pos) => {
    if (foundPos > 0) {
      return false;
    }
    const nodeTextLength = getTextLength(node);
    if (count + nodeTextLength > maxCharacters) {
      foundPos = pos + 1 + (maxCharacters - count);
      return false;
    }
    count += nodeTextLength;
    return true;
  });
  return foundPos;
}
function getWordExceededPosition({ doc }, maxWords) {
  let count = 0;
  let foundPos = 0;
  doc.nodesBetween(0, doc.nodeSize - 2, (node, pos) => {
    var _a2;
    if (foundPos > 0) {
      return false;
    }
    if (!node.type.isText) {
      return true;
    }
    const text = node.textBetween(0, node.nodeSize);
    const matches = (0, import_core.findMatches)(text, WORDS_REGEX);
    if (count + matches.length > maxWords) {
      const index = maxWords - count;
      const word = matches[index];
      foundPos = pos + ((_a2 = word == null ? void 0 : word.index) != null ? _a2 : 0);
      return false;
    }
    count += matches.length;
    return true;
  });
  return foundPos;
}

// src/count-extension.ts
var CountStrategy = /* @__PURE__ */ ((CountStrategy2) => {
  CountStrategy2["CHARACTERS"] = "CHARACTERS";
  CountStrategy2["WORDS"] = "WORDS";
  return CountStrategy2;
})(CountStrategy || {});
var _isCountValid_dec, _getWordCount_dec, _getCharacterCount_dec, _getCountMaximum_dec, _a, _CountExtension_decorators, _init;
_CountExtension_decorators = [(0, import_core2.extension)({
  defaultOptions: {
    maximum: -1,
    maximumExceededClassName: "remirror-max-count-exceeded",
    maximumStrategy: "CHARACTERS" /* CHARACTERS */
  },
  staticKeys: ["maximum", "maximumStrategy", "maximumExceededClassName"]
})];
var CountExtension = class extends (_a = import_core2.PlainExtension, _getCountMaximum_dec = [(0, import_core2.helper)()], _getCharacterCount_dec = [(0, import_core2.helper)()], _getWordCount_dec = [(0, import_core2.helper)()], _isCountValid_dec = [(0, import_core2.helper)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "count";
  }
  getCountMaximum() {
    return this.options.maximum;
  }
  getCharacterCount(state = this.store.getState()) {
    let count = 0;
    state.doc.nodesBetween(0, state.doc.nodeSize - 2, (node) => {
      count += getTextLength(node);
      return true;
    });
    return Math.max(count - 1, 0);
  }
  getWordCount(state = this.store.getState()) {
    const text = this.store.helpers.getText({ lineBreakDivider: " ", state });
    return (0, import_core2.findMatches)(text, WORDS_REGEX).length;
  }
  isCountValid(state = this.store.getState()) {
    const { maximumStrategy, maximum } = this.options;
    if (maximum < 1) {
      return true;
    }
    if (maximumStrategy === "CHARACTERS" /* CHARACTERS */) {
      const count = this.store.helpers.getCharacterCount(state);
      return count <= maximum;
    }
    return this.store.helpers.getWordCount(state) <= maximum;
  }
  createDecorationSet(state) {
    const { maximum = -1, maximumStrategy, maximumExceededClassName } = this.options;
    const isCharacterCountStrategy = maximumStrategy === "CHARACTERS" /* CHARACTERS */;
    const posStrategy = isCharacterCountStrategy ? getCharacterExceededPosition : getWordExceededPosition;
    const pos = posStrategy(state, maximum);
    return import_view.DecorationSet.create(state.doc, [
      import_view.Decoration.inline(pos, state.doc.nodeSize - 2, {
        class: maximumExceededClassName
      })
    ]);
  }
  createExternalPlugins() {
    const { maximum } = this.options;
    const plugin = new import_state.Plugin({
      state: {
        init: (_, state) => {
          if (this.isCountValid(state)) {
            return {
              decorationSet: import_view.DecorationSet.empty
            };
          }
          return {
            decorationSet: this.createDecorationSet(state)
          };
        },
        apply: (tr, pluginState, _, state) => {
          if (!tr.docChanged || maximum < 1) {
            return pluginState;
          }
          if (this.isCountValid(state)) {
            return {
              decorationSet: import_view.DecorationSet.empty
            };
          }
          return {
            decorationSet: this.createDecorationSet(state)
          };
        }
      },
      props: {
        decorations(state) {
          var _a2, _b;
          return (_b = (_a2 = plugin.getState(state)) == null ? void 0 : _a2.decorationSet) != null ? _b : null;
        }
      }
    });
    return [plugin];
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "getCountMaximum", _getCountMaximum_dec, CountExtension);
__decorateElement(_init, 1, "getCharacterCount", _getCharacterCount_dec, CountExtension);
__decorateElement(_init, 1, "getWordCount", _getWordCount_dec, CountExtension);
__decorateElement(_init, 1, "isCountValid", _isCountValid_dec, CountExtension);
CountExtension = __decorateElement(_init, 0, "CountExtension", _CountExtension_decorators, CountExtension);
__runInitializers(_init, 1, CountExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CountExtension,
  CountStrategy
});
