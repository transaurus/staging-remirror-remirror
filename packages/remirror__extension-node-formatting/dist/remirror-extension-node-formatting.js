var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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

// src/node-formatting-extension.ts
import {
  clamp as clamp2,
  command,
  extension,
  ExtensionPriority,
  ExtensionTag,
  isEmptyArray,
  joinStyles,
  keyBinding,
  NamedShortcut,
  PlainExtension
} from "@remirror/core";

// src/node-formatting-utils.ts
import {
  clamp,
  extractPixelSize,
  isNumber,
  last
} from "@remirror/core";
import { ExtensionNodeFormattingMessages as Messages } from "@remirror/messages";
var increaseIndentOptions = {
  label: ({ t }) => t(Messages.INCREASE_INDENT_LABEL),
  icon: "indentIncrease"
};
var decreaseIndentOptions = {
  label: ({ t }) => t(Messages.DECREASE_INDENT_LABEL),
  icon: "indentDecrease"
};
var centerAlignOptions = {
  label: ({ t }) => t(Messages.CENTER_ALIGN_LABEL),
  icon: "alignCenter",
  active: createActiveCheck(({ node }) => node.attrs.nodeTextAlignment === "center")
};
var justifyAlignOptions = {
  label: ({ t }) => t(Messages.JUSTIFY_ALIGN_LABEL),
  icon: "alignJustify",
  active: createActiveCheck(({ node }) => node.attrs.nodeTextAlignment === "justify")
};
var rightAlignOptions = {
  label: ({ t }) => t(Messages.RIGHT_ALIGN_LABEL),
  icon: "alignRight",
  active: createActiveCheck(({ node }) => node.attrs.nodeTextAlignment === "right")
};
var leftAlignOptions = {
  label: ({ t }) => t(Messages.LEFT_ALIGN_LABEL),
  icon: "alignLeft",
  active: createActiveCheck(({ node }) => {
    const { nodeTextAlignment } = node.attrs;
    return nodeTextAlignment === "left" || nodeTextAlignment === "";
  })
};
function createActiveCheck(predicate) {
  return ({ excludeNodes }, store) => {
    const { getState, nodeTags } = store;
    const gatheredNodes = gatherNodes(getState(), nodeTags.formattingNode, excludeNodes);
    return gatheredNodes.some(predicate);
  };
}
function isValidNodeType(type, included, excluded) {
  if (excluded.includes(type.name)) {
    return false;
  }
  return included.includes(type.name);
}
function gatherNodes(state, included, excluded) {
  const gatheredNodes = [];
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to);
  if (!range) {
    return [];
  }
  const { parent, start, end } = range;
  const isRangeEntireParentContent = parent.nodeSize - 2 === end - start;
  if (isRangeEntireParentContent && isValidNodeType(parent.type, included, excluded)) {
    return [
      {
        node: parent,
        pos: start - 1
      }
    ];
  }
  state.doc.nodesBetween(start, end, (node, pos) => {
    if (pos < start || pos > end) {
      return;
    }
    if (isValidNodeType(node.type, included, excluded)) {
      gatheredNodes.push({ node, pos });
      return false;
    }
    return;
  });
  return gatheredNodes;
}
var NODE_INDENT_ATTRIBUTE = "data-node-indent";
var NODE_TEXT_ALIGNMENT_ATTRIBUTE = "data-node-text-align";
var NODE_LINE_HEIGHT_ATTRIBUTE = "data-line-height-align";
function extractIndent(indents, marginLeft) {
  var _a2;
  const largestIndent = extractPixelSize(last(indents));
  const value = extractPixelSize(marginLeft != null ? marginLeft : "0");
  const max = (_a2 = indents.length) != null ? _a2 : 1;
  const indentIncrement = largestIndent / max;
  return clamp({ max, min: 0, value: Math.floor(value / indentIncrement) });
}
var NUMERIC_REGEX = /^\d+(?:\.\d+)?$/;
var PERCENT_REGEX = /^(\d+(?:\.\d+)?)%$/;
function extractLineHeight(lineHeight) {
  if (isNumber(lineHeight)) {
    return lineHeight;
  }
  if (!lineHeight) {
    return null;
  }
  const lineHeightStr = lineHeight.trim();
  const percentMatch = lineHeightStr.match(PERCENT_REGEX);
  if (percentMatch) {
    return Number.parseFloat(percentMatch[1]) / 100;
  }
  const numberMatch = lineHeightStr.match(NUMERIC_REGEX);
  if (numberMatch) {
    return Number.parseFloat(numberMatch[0]);
  }
  return null;
}

// src/node-formatting-extension.ts
var _decreaseIndentShortcut_dec, _increaseIndentShortcut_dec, _rightAlignShortcut_dec, _leftAlignShortcut_dec, _justifyAlignShortcut_dec, _centerAlignShortcut_dec, _decreaseIndent_dec, _increaseIndent_dec, _rightAlign_dec, _leftAlign_dec, _justifyAlign_dec, _centerAlign_dec, _setIndent_dec, _setTextAlignment_dec, _setLineHeight_dec, _a, _NodeFormattingExtension_decorators, _init;
_NodeFormattingExtension_decorators = [extension({
  defaultOptions: {
    indents: [
      "0",
      "20px",
      "40px",
      "60px",
      "80px",
      "100px",
      "120px",
      "140px",
      "160px",
      "180px",
      "200px"
    ],
    excludeNodes: []
  },
  staticKeys: ["indents"]
})];
var NodeFormattingExtension = class extends (_a = PlainExtension, _setLineHeight_dec = [command()], _setTextAlignment_dec = [command()], _setIndent_dec = [command()], _centerAlign_dec = [command(centerAlignOptions)], _justifyAlign_dec = [command(justifyAlignOptions)], _leftAlign_dec = [command(leftAlignOptions)], _rightAlign_dec = [command(rightAlignOptions)], _increaseIndent_dec = [command(increaseIndentOptions)], _decreaseIndent_dec = [command(decreaseIndentOptions)], _centerAlignShortcut_dec = [keyBinding({ shortcut: NamedShortcut.CenterAlignment, command: "centerAlign" })], _justifyAlignShortcut_dec = [keyBinding({ shortcut: NamedShortcut.JustifyAlignment, command: "justifyAlign" })], _leftAlignShortcut_dec = [keyBinding({ shortcut: NamedShortcut.LeftAlignment, command: "leftAlign" })], _rightAlignShortcut_dec = [keyBinding({ shortcut: NamedShortcut.RightAlignment, command: "rightAlign" })], _increaseIndentShortcut_dec = [keyBinding({
  shortcut: NamedShortcut.IncreaseIndent,
  command: "increaseIndent",
  // Ensure this has lower priority than the indent keybinding in @remirror/extension-list
  priority: ExtensionPriority.Low
})], _decreaseIndentShortcut_dec = [keyBinding({
  shortcut: NamedShortcut.DecreaseIndent,
  command: "decreaseIndent",
  // Ensure this has higher priority than the dedent keybinding in @remirror/extension-list
  priority: ExtensionPriority.Medium
})], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "nodeFormatting";
  }
  /**
   * Set up the extra attributes which are applied to the formattable node
   * blocks.
   */
  createSchemaAttributes() {
    return [
      {
        identifiers: {
          type: "node",
          tags: [ExtensionTag.FormattingNode],
          excludeNames: this.options.excludeNodes
        },
        attributes: {
          nodeIndent: this.nodeIndent(),
          nodeTextAlignment: this.nodeTextAlignment(),
          nodeLineHeight: this.nodeLineHeight(),
          style: {
            default: "",
            parseDOM: () => "",
            toDOM: ({ nodeIndent, nodeTextAlignment, nodeLineHeight, style }) => {
              const marginLeft = nodeIndent ? this.options.indents[nodeIndent] : void 0;
              const textAlign = nodeTextAlignment && nodeTextAlignment !== "none" ? nodeTextAlignment : void 0;
              const lineHeight = nodeLineHeight ? nodeLineHeight : void 0;
              return {
                // Compose the style string together with the currently set style.
                style: joinStyles({ marginLeft, textAlign, lineHeight }, style)
              };
            }
          }
        }
      }
    ];
  }
  setLineHeight(lineHeight) {
    return this.setNodeAttribute(({ node }) => {
      if (lineHeight === node.attrs.nodeLineHeight) {
        return;
      }
      return { nodeLineHeight: lineHeight };
    });
  }
  setTextAlignment(alignment) {
    return this.setNodeAttribute(({ node }) => {
      if (alignment === node.attrs.nodeTextAlignment) {
        return;
      }
      return { nodeTextAlignment: alignment };
    });
  }
  setIndent(level) {
    return this.setNodeAttribute(({ node }) => {
      var _a2;
      const currentIndent = (_a2 = node.attrs.nodeIndent) != null ? _a2 : 0;
      const value = level === "-1" ? currentIndent - 1 : level === "+1" ? currentIndent + 1 : level;
      const indent = clamp2({ min: 0, max: this.options.indents.length - 1, value });
      if (indent === currentIndent) {
        return;
      }
      return { nodeIndent: indent };
    });
  }
  centerAlign() {
    return this.setTextAlignment("center");
  }
  justifyAlign() {
    return this.setTextAlignment("justify");
  }
  leftAlign() {
    return this.setTextAlignment("left");
  }
  rightAlign() {
    return this.setTextAlignment("right");
  }
  increaseIndent() {
    return (props) => this.setIndent("+1")(props);
  }
  decreaseIndent() {
    return (props) => this.setIndent("-1")(props);
  }
  centerAlignShortcut(props) {
    return this.centerAlign()(props);
  }
  justifyAlignShortcut(props) {
    return this.justifyAlign()(props);
  }
  leftAlignShortcut(props) {
    return this.leftAlign()(props);
  }
  rightAlignShortcut(props) {
    return this.rightAlign()(props);
  }
  increaseIndentShortcut(props) {
    return this.increaseIndent()(props);
  }
  decreaseIndentShortcut(props) {
    return this.decreaseIndent()(props);
  }
  /**
   * Add an indentation attribute to the formattable node blocks.
   */
  nodeIndent() {
    return {
      default: null,
      parseDOM: (element) => {
        var _a2;
        return (_a2 = element.getAttribute(NODE_INDENT_ATTRIBUTE)) != null ? _a2 : extractIndent(this.options.indents, element.style.marginLeft);
      },
      toDOM: (attrs) => {
        if (!attrs.nodeIndent) {
          return;
        }
        const indentIndex = "".concat(attrs.nodeIndent);
        const marginLeft = this.options.indents[attrs.nodeIndent];
        if (!marginLeft) {
          return;
        }
        return {
          [NODE_INDENT_ATTRIBUTE]: indentIndex
        };
      }
    };
  }
  /**
   * Add the `nodeTextAlignment` attribute to the formattable block nodes.
   */
  nodeTextAlignment() {
    return {
      default: null,
      parseDOM: (element) => {
        var _a2;
        return (_a2 = element.getAttribute(NODE_TEXT_ALIGNMENT_ATTRIBUTE)) != null ? _a2 : element.style.textAlign;
      },
      toDOM: (attrs) => {
        const textAlign = attrs.nodeTextAlignment;
        if (!textAlign || textAlign === "none") {
          return;
        }
        return {
          [NODE_TEXT_ALIGNMENT_ATTRIBUTE]: textAlign
        };
      }
    };
  }
  /**
   * Add a `line height` attribute to all the formattable block nodes selected.
   */
  nodeLineHeight() {
    return {
      default: null,
      parseDOM: (element) => {
        var _a2;
        const val = element.getAttribute(NODE_LINE_HEIGHT_ATTRIBUTE);
        return (_a2 = extractLineHeight(val)) != null ? _a2 : extractLineHeight(element.style.lineHeight);
      },
      toDOM: (attrs) => {
        const lineHeight = attrs.nodeLineHeight;
        if (!lineHeight) {
          return;
        }
        return {
          [NODE_LINE_HEIGHT_ATTRIBUTE]: lineHeight.toString()
        };
      }
    };
  }
  setNodeAttribute(getAttributes) {
    return (props) => {
      const { tr, dispatch } = props;
      const gatheredNodes = gatherNodes(
        tr,
        this.store.nodeTags.formattingNode,
        this.options.excludeNodes
      );
      if (isEmptyArray(gatheredNodes)) {
        return false;
      }
      if (!dispatch) {
        return true;
      }
      const updates = [];
      for (const nodeWithPos of gatheredNodes) {
        const { node, pos } = nodeWithPos;
        const attrs = getAttributes(nodeWithPos);
        if (!attrs) {
          continue;
        }
        updates.push([pos, __spreadValues(__spreadValues({}, node.attrs), attrs)]);
      }
      if (isEmptyArray(updates)) {
        return false;
      }
      if (!dispatch) {
        return true;
      }
      for (const [pos, attrs] of updates) {
        tr.setNodeMarkup(pos, void 0, attrs);
      }
      dispatch(tr);
      return true;
    };
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "setLineHeight", _setLineHeight_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "setTextAlignment", _setTextAlignment_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "setIndent", _setIndent_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "centerAlign", _centerAlign_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "justifyAlign", _justifyAlign_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "leftAlign", _leftAlign_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "rightAlign", _rightAlign_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "increaseIndent", _increaseIndent_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "decreaseIndent", _decreaseIndent_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "centerAlignShortcut", _centerAlignShortcut_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "justifyAlignShortcut", _justifyAlignShortcut_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "leftAlignShortcut", _leftAlignShortcut_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "rightAlignShortcut", _rightAlignShortcut_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "increaseIndentShortcut", _increaseIndentShortcut_dec, NodeFormattingExtension);
__decorateElement(_init, 1, "decreaseIndentShortcut", _decreaseIndentShortcut_dec, NodeFormattingExtension);
NodeFormattingExtension = __decorateElement(_init, 0, "NodeFormattingExtension", _NodeFormattingExtension_decorators, NodeFormattingExtension);
__runInitializers(_init, 1, NodeFormattingExtension);
export {
  NodeFormattingExtension
};
