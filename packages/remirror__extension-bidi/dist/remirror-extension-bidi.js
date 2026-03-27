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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/bidi-extension.ts
import direction from "direction";
import {
  command,
  extension,
  ExtensionTag,
  findParentNode,
  getTextSelection,
  hasTransactionChanged,
  isString,
  PlainExtension
} from "@remirror/core";
import { ExtensionBidiMessages } from "@remirror/messages";
var setTextDirectionOptions = {
  icon: ({ attrs }) => (attrs == null ? void 0 : attrs.dir) === "ltr" ? "textDirectionL" : "textDirectionR",
  description: ({ t, attrs }) => t(ExtensionBidiMessages.DESCRIPTION, { dir: attrs == null ? void 0 : attrs.dir }),
  label: ({ t, attrs }) => t(ExtensionBidiMessages.LABEL, { dir: attrs == null ? void 0 : attrs.dir })
};
var _setTextDirection_dec, _a, _BidiExtension_decorators, _init;
_BidiExtension_decorators = [extension({
  defaultOptions: {
    defaultDirection: void 0,
    autoUpdate: false,
    excludeNodes: []
  },
  staticKeys: ["excludeNodes"]
})];
var BidiExtension = class extends (_a = PlainExtension, _setTextDirection_dec = [command(setTextDirectionOptions)], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    /**
     * Whether to ignore next updated.
     */
    __publicField(this, "_ignoreNextUpdate", false);
  }
  get name() {
    return "bidi";
  }
  /**
   * Add the bidi property to the top level editor attributes `doc`.
   */
  createAttributes() {
    if (this.options.defaultDirection) {
      return { dir: this.options.defaultDirection };
    }
    return {};
  }
  /**
   * Add the `dir` to all the inner node types.
   */
  createSchemaAttributes() {
    const IGNORE_BIDI_AUTO_UPDATE = "data-ignore-bidi-auto";
    return [
      {
        identifiers: {
          type: "node",
          tags: [ExtensionTag.BlockNode],
          excludeNames: this.options.excludeNodes
        },
        attributes: {
          dir: this.dir(),
          ignoreBidiAutoUpdate: {
            default: null,
            parseDOM: IGNORE_BIDI_AUTO_UPDATE,
            toDOM: (attrs) => attrs.ignoreBidiAutoUpdate ? [IGNORE_BIDI_AUTO_UPDATE, "true"] : void 0
          }
        }
      }
    ];
  }
  /**
   * Create the plugin that ensures the node has the correct `dir` value on each
   * state update.
   */
  createPlugin() {
    return {
      state: {
        init: () => false,
        apply: (tr) => {
          if (this._ignoreNextUpdate) {
            this._ignoreNextUpdate = false;
            return false;
          }
          return hasTransactionChanged(tr);
        }
      },
      appendTransaction: (_, __, state) => {
        const shouldUpdate = this.getPluginState();
        const { autoUpdate, excludeNodes } = this.options;
        const tr = state.tr;
        if (!shouldUpdate || !autoUpdate) {
          return;
        }
        const parent = findParent(state.selection, excludeNodes);
        if (!parent) {
          return;
        }
        const { node, pos } = parent;
        const currentDirection = node.attrs.dir;
        const dir = this.getDirection(node.textContent);
        if (currentDirection === dir) {
          return;
        }
        if (node.attrs.ignoreBidiAutoUpdate) {
          return;
        }
        this._ignoreNextUpdate = true;
        return this.store.chain(tr).updateNodeAttributes(pos, __spreadProps(__spreadValues({}, node.attrs), {
          dir
        })).tr();
      }
    };
  }
  onSetOptions(props) {
    const { changes } = props;
    if (changes.defaultDirection.changed) {
      this.store.updateAttributes();
    }
  }
  /**
   * Create the `SchemaAttributesObject`
   */
  dir() {
    var _a2;
    return {
      default: (_a2 = this.options.defaultDirection) != null ? _a2 : null,
      parseDOM: (element) => {
        var _a3;
        return (_a3 = element.getAttribute("dir")) != null ? _a3 : this.getDirection(element.textContent);
      },
      toDOM: (_, { node }) => {
        var _a3;
        if (!node) {
          return;
        }
        if (!node.textContent) {
          return;
        }
        return (_a3 = this.getDirection(node.textContent)) != null ? _a3 : this.options.defaultDirection;
      }
    };
  }
  /**
   * Get the direction of the text.
   */
  getDirection(text) {
    if (!isString(text)) {
      return;
    }
    const dir = direction(text);
    if (dir === "neutral") {
      return this.options.defaultDirection;
    }
    return dir;
  }
  setTextDirection(dir, options = {}) {
    return (props) => {
      const { tr } = props;
      const { selection } = options;
      const cmd = this.store.commands.updateNodeAttributes.original;
      const parent = findParent(
        getTextSelection(selection != null ? selection : tr.selection, tr.doc),
        this.options.excludeNodes
      );
      if (!parent || parent.node.attrs.dir == dir) {
        return false;
      }
      return cmd(parent.pos, {
        dir,
        ignoreBidiAutoUpdate: dir ? true : dir
      })(props);
    };
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "setTextDirection", _setTextDirection_dec, BidiExtension);
BidiExtension = __decorateElement(_init, 0, "BidiExtension", _BidiExtension_decorators, BidiExtension);
__runInitializers(_init, 1, BidiExtension);
function findParent(selection, excludeNodes) {
  return findParentNode({
    predicate: (node) => !!(node.isTextblock && node.textContent && !excludeNodes.includes(node.type.name)),
    selection
  });
}
export {
  BidiExtension
};
