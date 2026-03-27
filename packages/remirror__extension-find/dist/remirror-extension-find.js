var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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

// src/find-extension.ts
import escapeStringRegex from "escape-string-regexp";
import matchAll from "string.prototype.matchall";
import {
  command,
  extension,
  helper,
  PlainExtension
} from "@remirror/core";
import { Decoration, DecorationSet } from "@remirror/pm/view";

// src/find-utils.ts
function rotateIndex(index, length) {
  if (length <= 0) {
    return 0;
  }
  return (index % length + length) % length;
}

// src/find-extension.ts
var _findRanges_dec, _findAndReplaceAll_dec, _findAndReplace_dec, _stopFind_dec, _find_dec, _a, _FindExtension_decorators, _init;
_FindExtension_decorators = [extension({
  defaultOptions: {
    decoration: { style: "background-color: yellow;" },
    activeDecoration: { style: "background-color: orange;" },
    alwaysFind: false
  }
})];
var FindExtension = class extends (_a = PlainExtension, _find_dec = [command()], _stopFind_dec = [command()], _findAndReplace_dec = [command()], _findAndReplaceAll_dec = [command()], _findRanges_dec = [helper()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "_updating", false);
    __publicField(this, "_query", "");
    __publicField(this, "_caseSensitive", true);
    __publicField(this, "_ranges", []);
    __publicField(this, "_activeIndex");
  }
  get name() {
    return "find";
  }
  find({ query, activeIndex, caseSensitive }) {
    if (!query) {
      return this.stopFind();
    }
    this.setProps({ query, activeIndex, caseSensitive });
    return ({ tr, dispatch }) => this.updateView(tr, dispatch);
  }
  stopFind() {
    return ({ tr, dispatch }) => {
      this._query = "";
      this._activeIndex = void 0;
      return this.updateView(tr, dispatch);
    };
  }
  findAndReplace({
    query,
    caseSensitive,
    replacement,
    index
  }) {
    return (props) => {
      var _a2;
      this.setProps({ query, caseSensitive });
      const { tr, dispatch } = props;
      const ranges = this.gatherFindResults(tr.doc);
      index = rotateIndex((_a2 = index != null ? index : this._activeIndex) != null ? _a2 : 0, ranges.length);
      const result = ranges[index];
      if (!result) {
        return false;
      }
      if (!dispatch) {
        return true;
      }
      tr.insertText(replacement, result.from, result.to);
      return this.updateView(tr, dispatch);
    };
  }
  findAndReplaceAll({
    query,
    caseSensitive,
    replacement
  }) {
    return (props) => {
      this.setProps({ query, caseSensitive });
      const { tr } = props;
      const ranges = this.gatherFindResults(tr.doc);
      for (let i = ranges.length - 1; i >= 0; i--) {
        const { from, to } = ranges[i];
        tr.insertText(replacement, from, to);
      }
      return this.stopFind()(props);
    };
  }
  findRanges(options) {
    this.store.commands.find(options);
    return {
      activeIndex: this._activeIndex,
      ranges: this._ranges
    };
  }
  /**
   * This plugin is responsible for do the searching and updating the
   * decorations.
   */
  createPlugin() {
    return {
      state: {
        init() {
          return DecorationSet.empty;
        },
        apply: (tr, old) => {
          if (this._updating || tr.docChanged && this.options.alwaysFind) {
            const doc = tr.doc;
            this._ranges = this.gatherFindResults(doc);
            this.normalizeActiveIndex();
            this.scrollToActiveResult();
            return this.createDecorationSet(doc);
          }
          if (tr.docChanged) {
            return old.map(tr.mapping, tr.doc);
          }
          return old;
        }
      },
      props: {
        decorations: (state) => this.getPluginState(state)
      }
    };
  }
  setProps({
    query,
    activeIndex,
    caseSensitive
  }) {
    this._query = escapeStringRegex(query);
    this._activeIndex = activeIndex;
    this._caseSensitive = caseSensitive != null ? caseSensitive : false;
  }
  gatherFindResults(doc) {
    if (!this._query) {
      return [];
    }
    const re = new RegExp(this._query, this._caseSensitive ? "gu" : "gui");
    const ranges = [];
    doc.descendants((node, pos) => {
      var _a2;
      if (!node.isTextblock) {
        return true;
      }
      const start = pos + 1;
      for (const match of matchAll(node.textContent, re)) {
        const from = start + ((_a2 = match.index) != null ? _a2 : 0);
        const to = from + match[0].length;
        ranges.push({ from, to });
      }
      return false;
    });
    return ranges;
  }
  normalizeActiveIndex() {
    if (this._activeIndex != null) {
      this._activeIndex = rotateIndex(this._activeIndex, this._ranges.length);
    }
  }
  createDecorationSet(doc) {
    const decorations = this._ranges.map(
      (deco, index) => Decoration.inline(
        deco.from,
        deco.to,
        index === this._activeIndex ? this.options.activeDecoration : this.options.decoration
      )
    );
    return DecorationSet.create(doc, decorations);
  }
  /**
   * Dispatch an empty transaction to trigger an update of the decoration.
   */
  updateView(tr, dispatch) {
    this._updating = true;
    if (dispatch) {
      dispatch(tr);
    }
    this._updating = false;
    return true;
  }
  scrollToActiveResult() {
    var _a2;
    if (this._activeIndex == null) {
      return;
    }
    const activeResult = this._ranges[this._activeIndex];
    if (!activeResult) {
      return;
    }
    const view = this.store.view;
    const maxSize = view.state.doc.content.size;
    const pos = activeResult.from;
    if (pos > maxSize) {
      return;
    }
    const dom = view.domAtPos(pos).node;
    (_a2 = dom == null ? void 0 : dom.scrollIntoView) == null ? void 0 : _a2.call(dom, { block: "nearest", behavior: "smooth" });
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "find", _find_dec, FindExtension);
__decorateElement(_init, 1, "stopFind", _stopFind_dec, FindExtension);
__decorateElement(_init, 1, "findAndReplace", _findAndReplace_dec, FindExtension);
__decorateElement(_init, 1, "findAndReplaceAll", _findAndReplaceAll_dec, FindExtension);
__decorateElement(_init, 1, "findRanges", _findRanges_dec, FindExtension);
FindExtension = __decorateElement(_init, 0, "FindExtension", _FindExtension_decorators, FindExtension);
__runInitializers(_init, 1, FindExtension);
export {
  FindExtension
};
