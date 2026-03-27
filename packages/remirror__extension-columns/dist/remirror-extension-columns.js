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

// src/columns-extension.ts
import {
  command,
  extension,
  ExtensionTag,
  isElementDomNode,
  joinStyles,
  NodeExtension,
  omitExtraAttributes
} from "@remirror/core";
import { ExtensionColumnsMessages as Messages } from "@remirror/messages";
var toggleColumnsOptions = {
  icon: ({ attrs }) => ({
    name: "layoutColumnLine",
    sup: attrs == null ? void 0 : attrs.count
  }),
  label: ({ t, attrs }) => t(Messages.LABEL, { count: attrs == null ? void 0 : attrs.count }),
  description: ({ t, attrs }) => t(Messages.DESCRIPTION, { count: attrs == null ? void 0 : attrs.count })
};
var DEFAULT_COLUMN_ATTRIBUTES = {
  count: 2,
  fill: "auto",
  gap: "inherit",
  ruleColor: "inherit",
  ruleStyle: "none",
  ruleWidth: "inherit",
  width: "inherit"
};
var COLUMN_DATA_ATTRIBUTE = "data-column-type";
var _toggleColumns_dec, _a, _ColumnsExtension_decorators, _init;
_ColumnsExtension_decorators = [extension({
  defaultOptions: {
    defaults: DEFAULT_COLUMN_ATTRIBUTES
  },
  staticKeys: ["defaults"]
})];
var ColumnsExtension = class extends (_a = NodeExtension, _toggleColumns_dec = [command(toggleColumnsOptions)], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "columns";
  }
  createTags() {
    return [ExtensionTag.Block];
  }
  createNodeSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({}, override), {
      content: "block+",
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        count: {
          default: this.options.defaults.count
        },
        fill: {
          default: this.options.defaults.fill
        },
        gap: {
          default: this.options.defaults.gap
        },
        ruleColor: {
          default: this.options.defaults.ruleColor
        },
        ruleStyle: {
          default: this.options.defaults.ruleStyle
        },
        ruleWidth: {
          default: this.options.defaults.ruleWidth
        },
        width: {
          default: this.options.defaults.width
        }
      }),
      parseDOM: [
        {
          tag: "div[".concat(COLUMN_DATA_ATTRIBUTE, "]"),
          getAttrs: (node) => {
            if (!isElementDomNode(node)) {
              return false;
            }
            const {
              columnCount,
              columnFill,
              columnGap,
              columnRuleColor,
              columnRuleStyle,
              columnRuleWidth,
              columnWidth
            } = node.style;
            return __spreadProps(__spreadValues({}, extra.parse(node)), {
              count: columnCount,
              fill: columnFill,
              gap: columnGap,
              ruleColor: columnRuleColor,
              ruleStyle: columnRuleStyle,
              ruleWidth: columnRuleWidth,
              width: columnWidth
            });
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (node) => {
        const _a3 = omitExtraAttributes(node.attrs, extra), { count, fill, gap, ruleColor, ruleStyle, ruleWidth, width } = _a3, other = __objRest(_a3, ["count", "fill", "gap", "ruleColor", "ruleStyle", "ruleWidth", "width"]);
        const _b = extra.dom(node), { style: currentStyle = "" } = _b, rest = __objRest(_b, ["style"]);
        const style = joinStyles(
          {
            columnCount: count,
            columnFill: fill,
            columnGap: gap,
            columnRuleColor: ruleColor,
            columnRuleStyle: ruleStyle,
            columnRuleWidth: ruleWidth,
            columnWidth: width
          },
          currentStyle
        );
        const attributes = __spreadProps(__spreadValues(__spreadValues({}, rest), other), {
          style,
          [COLUMN_DATA_ATTRIBUTE]: "true"
        });
        return ["div", attributes, 0];
      }
    });
  }
  /**
   * Add a column span attribute to all block nodes within the editor.
   */
  createSchemaAttributes() {
    const columnSpan = {
      default: null,
      parseDOM: (node) => {
        var _a2;
        return (_a2 = node.getAttribute("column-span")) != null ? _a2 : "none";
      },
      toDOM: (attrs) => attrs.columnSpan ? ["column-span", attrs.columnSpan === "all" ? "all" : "none"] : null
    };
    return [
      {
        identifiers: {
          tags: [ExtensionTag.Block],
          type: "node",
          excludeNames: ["columns"]
        },
        attributes: {
          columnSpan
        }
      }
    ];
  }
  toggleColumns(attrs = {}, options = {}) {
    return this.store.commands.toggleWrappingNode.original(this.type, attrs, options.selection);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "toggleColumns", _toggleColumns_dec, ColumnsExtension);
ColumnsExtension = __decorateElement(_init, 0, "ColumnsExtension", _ColumnsExtension_decorators, ColumnsExtension);
__runInitializers(_init, 1, ColumnsExtension);
export {
  ColumnsExtension,
  DEFAULT_COLUMN_ATTRIBUTES,
  toggleColumnsOptions
};
