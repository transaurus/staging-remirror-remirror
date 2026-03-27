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
  ImageExtension: () => ImageExtension,
  ResizableImageView: () => ResizableImageView,
  isImageFileType: () => isImageFileType
});
module.exports = __toCommonJS(src_exports);

// src/image-extension.ts
var import_core2 = require("@remirror/core");
var import_transform = require("@remirror/pm/transform");
var import_theme = require("@remirror/theme");

// src/resizable-image-view.ts
var import_prosemirror_resizable_view = require("prosemirror-resizable-view");
var import_core = require("@remirror/core");
var ResizableImageView = class extends import_prosemirror_resizable_view.ResizableNodeView {
  constructor(node, view, getPos) {
    super({ node, view, getPos, aspectRatio: import_prosemirror_resizable_view.ResizableRatioType.Fixed });
  }
  createElement({ node }) {
    const inner = document.createElement("img");
    inner.setAttribute("src", node.attrs.src);
    (0, import_core.setStyle)(inner, {
      width: "100%",
      minWidth: "50px",
      objectFit: "contain"
      // maintain image's aspect ratio
    });
    return inner;
  }
};

// src/image-extension.ts
var _uploadImage_dec, _insertImage_dec, _a, _ImageExtension_decorators, _init;
_ImageExtension_decorators = [(0, import_core2.extension)({
  defaultOptions: {
    createPlaceholder,
    updatePlaceholder: () => {
    },
    destroyPlaceholder: () => {
    },
    uploadHandler,
    enableResizing: false,
    preferPastedTextContent: true
  }
})];
var ImageExtension = class extends (_a = import_core2.NodeExtension, _insertImage_dec = [(0, import_core2.command)()], _uploadImage_dec = [(0, import_core2.command)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "image";
  }
  createTags() {
    return [import_core2.ExtensionTag.InlineNode, import_core2.ExtensionTag.Media];
  }
  createNodeSpec(extra, override) {
    var _a2;
    const { preferPastedTextContent } = this.options;
    return __spreadProps(__spreadValues({
      inline: true,
      draggable: true,
      selectable: false
    }, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        alt: { default: "" },
        crop: { default: null },
        height: { default: null },
        width: { default: null },
        rotate: { default: null },
        src: { default: null },
        title: { default: "" },
        fileName: { default: null },
        resizable: { default: false }
      }),
      parseDOM: [
        {
          tag: "img[src]",
          getAttrs: (element) => {
            var _a3;
            if ((0, import_core2.isElementDomNode)(element)) {
              const attrs = getImageAttributes({ element, parse: extra.parse });
              if (preferPastedTextContent && ((_a3 = attrs.src) == null ? void 0 : _a3.startsWith("file:///"))) {
                return false;
              }
              return attrs;
            }
            return {};
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (node) => {
        const attrs = (0, import_core2.omitExtraAttributes)(node.attrs, extra);
        return ["img", __spreadValues(__spreadValues({}, extra.dom(node)), attrs)];
      }
    });
  }
  insertImage(attributes, selection) {
    return ({ tr, dispatch }) => {
      const { from, to } = (0, import_core2.getTextSelection)(selection != null ? selection : tr.selection, tr.doc);
      const node = this.type.create(attributes);
      dispatch == null ? void 0 : dispatch(tr.replaceRangeWith(from, to, node));
      return true;
    };
  }
  uploadImage(value, onElement) {
    const { updatePlaceholder, destroyPlaceholder, createPlaceholder: createPlaceholder2 } = this.options;
    return (props) => {
      const { tr } = props;
      let pos = tr.selection.from;
      return this.store.createPlaceholderCommand({
        promise: value,
        placeholder: {
          type: "widget",
          get pos() {
            return pos;
          },
          createElement: (view, pos2) => {
            const element = createPlaceholder2(view, pos2);
            onElement == null ? void 0 : onElement(element);
            return element;
          },
          onUpdate: (view, pos2, element, data) => {
            updatePlaceholder(view, pos2, element, data);
          },
          onDestroy: (view, element) => {
            destroyPlaceholder(view, element);
          }
        },
        onSuccess: (value2, range, commandProps) => this.insertImage(value2, range)(commandProps)
      }).validate(({ tr: tr2, dispatch }) => {
        const insertPos = (0, import_transform.insertPoint)(tr2.doc, pos, this.type);
        if (insertPos == null) {
          return false;
        }
        pos = insertPos;
        if (!tr2.selection.empty) {
          dispatch == null ? void 0 : dispatch(tr2.deleteSelection());
        }
        return true;
      }, "unshift").generateCommand()(props);
    };
  }
  fileUploadFileHandler(files, event, pos) {
    var _a2;
    const { preferPastedTextContent, uploadHandler: uploadHandler2 } = this.options;
    if (preferPastedTextContent && isClipboardEvent(event) && ((_a2 = event.clipboardData) == null ? void 0 : _a2.getData("text/plain"))) {
      return false;
    }
    const { commands, chain } = this.store;
    const filesWithProgress = files.map((file, index) => ({
      file,
      progress: (progress) => {
        commands.updatePlaceholder(uploads[index], progress);
      }
    }));
    const uploads = uploadHandler2(filesWithProgress);
    if ((0, import_core2.isNumber)(pos)) {
      chain.selectText(pos);
    }
    for (const upload of uploads) {
      chain.uploadImage(upload);
    }
    chain.run();
    return true;
  }
  createPasteRules() {
    return [
      {
        type: "file",
        regexp: /image/i,
        fileHandler: (props) => {
          const pos = props.type === "drop" ? props.pos : void 0;
          return this.fileUploadFileHandler(props.files, props.event, pos);
        }
      }
    ];
  }
  createNodeViews() {
    if (this.options.enableResizing) {
      return (node, view, getPos) => new ResizableImageView(node, view, getPos);
    }
    return {};
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "insertImage", _insertImage_dec, ImageExtension);
__decorateElement(_init, 1, "uploadImage", _uploadImage_dec, ImageExtension);
ImageExtension = __decorateElement(_init, 0, "ImageExtension", _ImageExtension_decorators, ImageExtension);
__runInitializers(_init, 1, ImageExtension);
var IMAGE_FILE_TYPES = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/jpg",
  "image/svg",
  "image/webp"
]);
function isImageFileType(file) {
  return IMAGE_FILE_TYPES.has(file.type);
}
function getDimensions(element) {
  let { width, height } = element.style;
  width = width || element.getAttribute("width") || "";
  height = height || element.getAttribute("height") || "";
  return { width, height };
}
function getImageAttributes({
  element,
  parse
}) {
  var _a2, _b, _c, _d;
  const { width, height } = getDimensions(element);
  return __spreadProps(__spreadValues({}, parse(element)), {
    alt: (_a2 = element.getAttribute("alt")) != null ? _a2 : "",
    height: Number.parseInt(height || "0", 10) || null,
    src: (_b = element.getAttribute("src")) != null ? _b : null,
    title: (_c = element.getAttribute("title")) != null ? _c : "",
    width: Number.parseInt(width || "0", 10) || null,
    fileName: (_d = element.getAttribute("data-file-name")) != null ? _d : null
  });
}
function createPlaceholder(_, __) {
  const element = document.createElement("div");
  element.classList.add(import_theme.ExtensionImageTheme.IMAGE_LOADER);
  return element;
}
function uploadHandler(files) {
  (0, import_core2.invariant)(files.length > 0, {
    code: import_core2.ErrorConstant.EXTENSION,
    message: "The upload handler was applied for the image extension without any valid files"
  });
  let completed = 0;
  const promises = [];
  for (const { file, progress } of files) {
    promises.push(
      () => new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener(
          "load",
          (readerEvent) => {
            var _a2;
            completed += 1;
            progress(completed / files.length);
            resolve({ src: (_a2 = readerEvent.target) == null ? void 0 : _a2.result, fileName: file.name });
          },
          { once: true }
        );
        reader.readAsDataURL(file);
      })
    );
  }
  return promises;
}
function isClipboardEvent(event) {
  return event.clipboardData !== void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImageExtension,
  ResizableImageView,
  isImageFileType
});
