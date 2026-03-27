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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/iframe-extension.ts
import { parse, stringify } from "querystringify";
import {
  command,
  cx,
  extension,
  ExtensionTag,
  findSelectedNodeOfType,
  NodeExtension,
  object,
  omitExtraAttributes
} from "@remirror/core";

// src/resizable-iframe-view.ts
import { ResizableNodeView, ResizableRatioType } from "prosemirror-resizable-view";
var ResizableIframeView = class extends ResizableNodeView {
  constructor(node, view, getPos, iframeOptions) {
    const { width, height } = node.attrs;
    const initialSize = width && height ? { width, height } : void 0;
    super({
      node,
      view,
      getPos,
      aspectRatio: ResizableRatioType.Flexible,
      options: iframeOptions,
      initialSize
    });
    __publicField(this, "options");
    this.options = iframeOptions;
  }
  createElement({ node, options }) {
    const { src, type, allowFullScreen, frameBorder } = node.attrs;
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", src);
    iframe.dataset.embedType = type;
    iframe.setAttribute("allowfullscreen", allowFullScreen ? "true" : "false");
    iframe.setAttribute("frameBorder", frameBorder == null ? void 0 : frameBorder.toString());
    if (options == null ? void 0 : options.class) {
      iframe.classList.add(options.class);
      iframe.classList.add("".concat(options.class, "-").concat(type));
    }
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    return iframe;
  }
};

// src/iframe-extension.ts
var _updateYouTubeVideo_dec, _updateIframeSource_dec, _addYouTubeVideo_dec, _addIframe_dec, _a, _IframeExtension_decorators, _init;
_IframeExtension_decorators = [extension({
  defaultOptions: {
    defaultSource: "",
    class: "remirror-iframe",
    enableResizing: false
  },
  staticKeys: ["defaultSource", "class"]
})];
var IframeExtension = class extends (_a = NodeExtension, _addIframe_dec = [command()], _addYouTubeVideo_dec = [command()], _updateIframeSource_dec = [command()], _updateYouTubeVideo_dec = [command()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "iframe";
  }
  createTags() {
    return [ExtensionTag.Block];
  }
  createNodeViews() {
    const iframeOptions = __spreadValues({}, this.options);
    if (this.options.enableResizing) {
      return (node, view, getPos) => new ResizableIframeView(node, view, getPos, iframeOptions);
    }
    return {};
  }
  createNodeSpec(extra, override) {
    var _a2;
    const { defaultSource } = this.options;
    return __spreadProps(__spreadValues({
      selectable: false
    }, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        src: defaultSource ? { default: defaultSource } : {},
        allowFullScreen: { default: true },
        frameBorder: { default: 0 },
        type: { default: "custom" },
        width: { default: null },
        height: { default: null }
      }),
      parseDOM: [
        {
          tag: "iframe",
          getAttrs: (dom) => {
            var _a3, _b;
            const frameBorder = dom.getAttribute("frameborder");
            const width = dom.getAttribute("width");
            const height = dom.getAttribute("height");
            return __spreadProps(__spreadValues({}, extra.parse(dom)), {
              type: (_a3 = dom.getAttribute("data-embed-type")) != null ? _a3 : void 0,
              height: height && Number.parseInt(height, 10) || void 0,
              width: width && Number.parseInt(width, 10) || void 0,
              allowFullScreen: dom.getAttribute("allowfullscreen") === "false" ? false : true,
              frameBorder: frameBorder ? Number.parseInt(frameBorder, 10) : 0,
              src: (_b = dom.getAttribute("src")) != null ? _b : ""
            });
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (node) => {
        const _a3 = omitExtraAttributes(
          node.attrs,
          extra
        ), { frameBorder, allowFullScreen, src, type } = _a3, rest = __objRest(_a3, ["frameBorder", "allowFullScreen", "src", "type"]);
        const { class: className } = this.options;
        return [
          "iframe",
          __spreadProps(__spreadValues(__spreadValues({}, extra.dom(node)), rest), {
            class: cx(className, "".concat(className, "-").concat(type)),
            src,
            "data-embed-type": type,
            allowfullscreen: allowFullScreen ? "true" : "false",
            frameBorder: frameBorder == null ? void 0 : frameBorder.toString()
          })
        ];
      }
    });
  }
  addIframe(attributes) {
    return ({ tr, dispatch }) => {
      dispatch == null ? void 0 : dispatch(tr.replaceSelectionWith(this.type.create(attributes)));
      return true;
    };
  }
  addYouTubeVideo(props) {
    return this.addIframe({
      src: createYouTubeUrl(props),
      frameBorder: 0,
      type: "youtube",
      allowFullScreen: "true"
    });
  }
  updateIframeSource(src) {
    return ({ tr, dispatch }) => {
      const iframeNode = findSelectedNodeOfType({ selection: tr.selection, types: this.type });
      if (!iframeNode) {
        return false;
      }
      dispatch == null ? void 0 : dispatch(tr.setNodeMarkup(iframeNode.pos, void 0, __spreadProps(__spreadValues({}, iframeNode.node.attrs), { src })));
      return true;
    };
  }
  updateYouTubeVideo(props) {
    return this.updateIframeSource(createYouTubeUrl(props));
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "addIframe", _addIframe_dec, IframeExtension);
__decorateElement(_init, 1, "addYouTubeVideo", _addYouTubeVideo_dec, IframeExtension);
__decorateElement(_init, 1, "updateIframeSource", _updateIframeSource_dec, IframeExtension);
__decorateElement(_init, 1, "updateYouTubeVideo", _updateYouTubeVideo_dec, IframeExtension);
IframeExtension = __decorateElement(_init, 0, "IframeExtension", _IframeExtension_decorators, IframeExtension);
__runInitializers(_init, 1, IframeExtension);
function parseUrl(url) {
  const parser = document.createElement("a");
  parser.href = url;
  const searchObject = parse(parser.search);
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject,
    hash: parser.hash
  };
}
function createYouTubeUrl(props) {
  var _a2, _b, _c;
  const { video, enhancedPrivacy = true, showControls = true, startAt = 0 } = props;
  const id = (_c = (_b = (_a2 = parseUrl(video)) == null ? void 0 : _a2.searchObject) == null ? void 0 : _b.v) != null ? _c : video;
  const urlStart = enhancedPrivacy ? "https://www.youtube-nocookie.com" : "https://www.youtube.com";
  const searchObject = object();
  if (!showControls) {
    searchObject.controls = "0";
  }
  if (startAt) {
    searchObject["amp;start"] = startAt;
  }
  return "".concat(urlStart, "/embed/").concat(id, "?").concat(stringify(searchObject));
}
export {
  IframeExtension
};
