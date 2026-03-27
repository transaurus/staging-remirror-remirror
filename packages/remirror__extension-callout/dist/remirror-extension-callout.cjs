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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CalloutExtension: () => CalloutExtension
});
module.exports = __toCommonJS(src_exports);

// src/callout-extension.ts
var import_core2 = require("@remirror/core");
var import_model = require("@remirror/pm/model");
var import_state = require("@remirror/pm/state");
var import_theme = require("@remirror/theme");

// src/callout-utils.ts
var import_core = require("@remirror/core");
var import_messages = require("@remirror/messages");
var dataAttributeType = "data-callout-type";
var dataAttributeEmoji = "data-callout-emoji";
function isValidCalloutExtensionAttributes(attributes) {
  if (attributes && (0, import_core.isObject)(attributes)) {
    const attributesChecklist = Object.entries(attributes).map(([key, value]) => {
      switch (key) {
        case "type":
          return !!((0, import_core.isString)(value) && value.length > 0);
        case "emoji":
          return !!((0, import_core.isString)(value) && value.length > 0);
        default:
          return true;
      }
    });
    return attributesChecklist.every((attr) => !!attr);
  }
  return false;
}
function updateNodeAttributes(type) {
  return (attributes, pos) => ({ state: { tr, selection, doc }, dispatch }) => {
    if (!isValidCalloutExtensionAttributes(attributes)) {
      throw new Error("Invalid attrs passed to the updateAttributes method");
    }
    const parent = (0, import_core.findParentNodeOfType)({
      types: type,
      selection: pos ? doc.resolve(pos) : selection
    });
    if (!parent || (0, import_core.isEqual)(attributes, parent.node.attrs)) {
      return false;
    }
    tr.setNodeMarkup(parent.pos, type, __spreadValues(__spreadValues({}, parent.node.attrs), attributes));
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}
var { DESCRIPTION, LABEL } = import_messages.ExtensionCalloutMessages;
var toggleCalloutOptions = {
  icon: ({ attrs }) => {
    switch (attrs == null ? void 0 : attrs.type) {
      case "error":
        return "closeCircleLine";
      case "success":
        return "checkboxCircleLine";
      case "warning":
        return "errorWarningLine";
      default:
        return "informationLine";
    }
  },
  description: ({ t, attrs }) => t(DESCRIPTION, { type: attrs == null ? void 0 : attrs.type }),
  label: ({ t, attrs }) => t(LABEL, { type: attrs == null ? void 0 : attrs.type })
};
function getCalloutType(value, validTypes, defaultType) {
  return (0, import_core.includes)(validTypes, value) ? value : defaultType;
}
function defaultEmojiRender(node) {
  const emoji = document.createElement("span");
  emoji.textContent = node.attrs.emoji;
  return emoji;
}

// src/callout-extension.ts
var _handleBackspace_dec, _handleEnterKey_dec, _updateCallout_dec, _toggleCallout_dec, _a, _CalloutExtension_decorators, _init;
_CalloutExtension_decorators = [(0, import_core2.extension)({
  defaultOptions: {
    defaultType: "info",
    validTypes: ["info", "warning", "error", "success", "blank"],
    defaultEmoji: "",
    renderEmoji: defaultEmojiRender
  },
  staticKeys: ["defaultType", "validTypes", "defaultEmoji"]
})];
var CalloutExtension = class extends (_a = import_core2.NodeExtension, _toggleCallout_dec = [(0, import_core2.command)(toggleCalloutOptions)], _updateCallout_dec = [(0, import_core2.command)(toggleCalloutOptions)], _handleEnterKey_dec = [(0, import_core2.keyBinding)({ shortcut: "Enter" })], _handleBackspace_dec = [(0, import_core2.keyBinding)({ shortcut: "Backspace" })], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "tags", [import_core2.ExtensionTag.Block]);
  }
  get name() {
    return "callout";
  }
  /**
   * Defines the callout html structure.
   * Adds the returned DOM node form `renderEmoji`  into it.
   */
  createNodeViews() {
    return (node, view, getPos) => {
      const { type, emoji } = node.attrs;
      const { renderEmoji } = this.options;
      const dom = document.createElement("div");
      const contentDOM = document.createElement("div");
      dom.setAttribute(dataAttributeType, type);
      if (emoji) {
        const emojiWrapper = document.createElement("div");
        const emojiNode = renderEmoji(node, view, getPos);
        dom.setAttribute(dataAttributeEmoji, emoji);
        emojiWrapper.classList.add(import_theme.ExtensionCalloutTheme.CALLOUT_EMOJI_WRAPPER);
        if (emojiNode) {
          emojiWrapper.append(emojiNode);
          dom.append(emojiWrapper);
        }
      }
      dom.append(contentDOM);
      return { dom, contentDOM };
    };
  }
  createNodeSpec(extra, override) {
    var _a2;
    const { defaultType, validTypes, defaultEmoji } = this.options;
    return __spreadProps(__spreadValues({
      content: "block+",
      defining: true,
      draggable: false
    }, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        type: { default: defaultType },
        emoji: { default: defaultEmoji }
      }),
      parseDOM: [
        {
          tag: "div[".concat(dataAttributeType, "]"),
          getAttrs: (node) => {
            var _a3;
            if (!(0, import_core2.isElementDomNode)(node)) {
              return false;
            }
            const rawType = node.getAttribute(dataAttributeType);
            const emoji = (_a3 = node.getAttribute(dataAttributeEmoji)) != null ? _a3 : "";
            const type = getCalloutType(rawType, validTypes, defaultType);
            const content = node.textContent;
            return __spreadProps(__spreadValues({}, extra.parse(node)), { type, emoji, content });
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (node) => {
        const _a3 = (0, import_core2.omitExtraAttributes)(node.attrs, extra), { type, emoji } = _a3, rest = __objRest(_a3, ["type", "emoji"]);
        const emojiAttributes = emoji ? { [dataAttributeEmoji]: emoji } : {};
        const attributes = __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, extra.dom(node)), rest), {
          [dataAttributeType]: type
        }), emojiAttributes);
        return ["div", attributes, 0];
      }
    });
  }
  /**
   * Create an input rule that listens for input of 3 colons followed
   * by a valid callout type, to create a callout node
   * If the callout type is invalid, the defaultType callout is created
   */
  createInputRules() {
    return [
      (0, import_core2.nodeInputRule)({
        regexp: /^:::([\dA-Za-z]*) $/,
        type: this.type,
        beforeDispatch: ({ tr, start }) => {
          const $pos = tr.doc.resolve(start);
          tr.setSelection(import_state.TextSelection.near($pos));
        },
        getAttributes: (match) => {
          const { defaultType, validTypes } = this.options;
          return { type: getCalloutType((0, import_core2.getMatchString)(match, 1), validTypes, defaultType) };
        }
      })
    ];
  }
  toggleCallout(attributes = {}) {
    return (0, import_core2.toggleWrap)(this.type, attributes);
  }
  updateCallout(attributes, pos) {
    return updateNodeAttributes(this.type)(attributes, pos);
  }
  handleEnterKey({ dispatch, tr }) {
    if (!((0, import_core2.isTextSelection)(tr.selection) && tr.selection.empty)) {
      return false;
    }
    const { nodeBefore, parent } = tr.selection.$from;
    if (!(nodeBefore == null ? void 0 : nodeBefore.isText) || !parent.type.isTextblock) {
      return false;
    }
    const regex = /^:::([A-Za-z]*)?$/;
    const { text, nodeSize } = nodeBefore;
    const { textContent } = parent;
    if (!text) {
      return false;
    }
    const matchesNodeBefore = text.match(regex);
    const matchesParent = textContent.match(regex);
    if (!matchesNodeBefore || !matchesParent) {
      return false;
    }
    const { defaultType, validTypes } = this.options;
    const type = getCalloutType(matchesNodeBefore[1], validTypes, defaultType);
    const pos = tr.selection.$from.before();
    const end = pos + nodeSize + 1;
    if (dispatch) {
      const slice = new import_model.Slice(import_model.Fragment.from(this.type.create({ type })), 0, 1);
      tr.replace(pos, end, slice);
      tr.setSelection(import_state.TextSelection.near(tr.doc.resolve(pos + 1)));
      dispatch(tr);
    }
    return true;
  }
  handleBackspace({ dispatch, tr }) {
    if (!tr.selection.empty) {
      return false;
    }
    const { $from } = tr.selection;
    if ($from.parentOffset !== 0) {
      return false;
    }
    const previousPosition = $from.before($from.depth) - 1;
    if (previousPosition < 1) {
      return false;
    }
    const previousPos = tr.doc.resolve(previousPosition);
    if (!(previousPos == null ? void 0 : previousPos.parent)) {
      return false;
    }
    const previousNode = previousPos.parent;
    const { node, pos } = (0, import_core2.findNodeAtSelection)(tr.selection);
    if (node.type !== this.type && previousNode.type === this.type) {
      const { content, nodeSize } = node;
      tr.delete(pos, pos + nodeSize);
      tr.setSelection(import_state.TextSelection.near(tr.doc.resolve(previousPosition - 1)));
      tr.insert(previousPosition - 1, content);
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    }
    return false;
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "toggleCallout", _toggleCallout_dec, CalloutExtension);
__decorateElement(_init, 1, "updateCallout", _updateCallout_dec, CalloutExtension);
__decorateElement(_init, 1, "handleEnterKey", _handleEnterKey_dec, CalloutExtension);
__decorateElement(_init, 1, "handleBackspace", _handleBackspace_dec, CalloutExtension);
CalloutExtension = __decorateElement(_init, 0, "CalloutExtension", _CalloutExtension_decorators, CalloutExtension);
__runInitializers(_init, 1, CalloutExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalloutExtension
});
