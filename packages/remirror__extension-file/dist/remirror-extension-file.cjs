"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
  DataUrlFileUploader: () => DataUrlFileUploader,
  FileExtension: () => FileExtension,
  createBaseuploadFileUploader: () => createBaseuploadFileUploader,
  createDataUrlFileUploader: () => createDataUrlFileUploader,
  createObjectUrlFileUploader: () => createObjectUrlFileUploader,
  createSlowFileUploader: () => createSlowFileUploader,
  getDefaultFileAttrs: () => getDefaultFileAttrs
});
module.exports = __toCommonJS(src_exports);

// src/file-extension.tsx
var import_core = require("@remirror/core");

// src/file-component.tsx
var import_react2 = __toESM(require("react"), 1);
var import_react_core = require("@remirror/react-core");
var import_theme = require("@remirror/theme");

// src/file-icons.tsx
var import_react = __toESM(require("react"), 1);
var FileIcon = () => /* @__PURE__ */ import_react.default.createElement(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ import_react.default.createElement("path", { fill: "none", d: "M0 0h24v24H0z" }),
  /* @__PURE__ */ import_react.default.createElement("path", { d: "M3 8l6.003-6h10.995C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8zm7-4v5H5v11h14V4h-9z" })
);
var DownloadIcon = () => /* @__PURE__ */ import_react.default.createElement(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ import_react.default.createElement("path", { fill: "none", d: "M0 0h24v24H0z" }),
  /* @__PURE__ */ import_react.default.createElement("path", { d: "M3 19h18v2H3v-2zm10-5.828L19.071 7.1l1.414 1.414L12 17 3.515 8.515 4.929 7.1 11 13.17V2h2v11.172z" })
);
var DeleteIcon = () => /* @__PURE__ */ import_react.default.createElement(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ import_react.default.createElement("path", { fill: "none", d: "M0 0h24v24H0z" }),
  /* @__PURE__ */ import_react.default.createElement("path", { d: "M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" })
);
var StopIcon = () => /* @__PURE__ */ import_react.default.createElement(
  "svg",
  {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg"
  },
  /* @__PURE__ */ import_react.default.createElement("path", { fill: "none", d: "M0 0h24v24H0z" }),
  /* @__PURE__ */ import_react.default.createElement("path", { d: "M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" })
);

// src/file-component.tsx
var FileComponent = ({
  node,
  getPosition,
  context,
  abort
}) => {
  var _a2;
  const attrs = node.attrs;
  const fileSize = formatFileSize((_a2 = attrs.fileSize) != null ? _a2 : 0);
  return /* @__PURE__ */ import_react2.default.createElement("div", { className: import_theme.ExtensionFileTheme.FILE_ROOT }, /* @__PURE__ */ import_react2.default.createElement(IconButton, null, /* @__PURE__ */ import_react2.default.createElement(FileIcon, null)), /* @__PURE__ */ import_react2.default.createElement("div", { className: import_theme.ExtensionFileTheme.FILE_NAME }, attrs.fileName), /* @__PURE__ */ import_react2.default.createElement("div", { className: import_theme.ExtensionFileTheme.FILE_SIZE }, fileSize), /* @__PURE__ */ import_react2.default.createElement("div", { style: { flex: 1, minWidth: "8px" } }), context ? /* @__PURE__ */ import_react2.default.createElement(UploadingFileAction, { context, abort }) : /* @__PURE__ */ import_react2.default.createElement(UploadedFileAction, { attrs, getPosition }));
};
var UploadingFileAction = ({
  context,
  abort
}) => {
  const progress = useProgress(context);
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement("div", { className: import_theme.ExtensionFileTheme.FILE_UPLOAD_PROGRESS }, progress), /* @__PURE__ */ import_react2.default.createElement(StopButton, { abort }));
};
var UploadedFileAction = ({ attrs, getPosition }) => /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, attrs.error ? /* @__PURE__ */ import_react2.default.createElement("div", { className: import_theme.ExtensionFileTheme.FILE_ERROR }, attrs.error) : /* @__PURE__ */ import_react2.default.createElement(DownloadFileButton, { attrs }), /* @__PURE__ */ import_react2.default.createElement("div", { style: { minWidth: "8px" } }), /* @__PURE__ */ import_react2.default.createElement(DeleteFileButton, { getPosition }));
var IconButton = (props) => /* @__PURE__ */ import_react2.default.createElement(
  "a",
  __spreadProps(__spreadValues({}, props), {
    className: import_theme.ExtensionFileTheme.FILE_ICON_BUTTON,
    style: {
      cursor: props.onClick || props.href ? "pointer" : "default"
    }
  }),
  props.children
);
var StopButton = ({ abort }) => /* @__PURE__ */ import_react2.default.createElement(IconButton, { onClick: abort }, /* @__PURE__ */ import_react2.default.createElement(StopIcon, null));
var DeleteFileButton = ({ getPosition }) => {
  const { deleteFile } = (0, import_react_core.useCommands)();
  return /* @__PURE__ */ import_react2.default.createElement(IconButton, { onClick: () => deleteFile(getPosition()) }, /* @__PURE__ */ import_react2.default.createElement(DeleteIcon, null));
};
var DownloadFileButton = ({ attrs }) => /* @__PURE__ */ import_react2.default.createElement(IconButton, { href: attrs.url, download: attrs.fileName, target: "_blank", rel: "noreferrer" }, /* @__PURE__ */ import_react2.default.createElement(DownloadIcon, null));
function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0";
  }
  const k = 1024, sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(bytes) / Math.log(k));
  return "".concat(Number.parseFloat((bytes / k ** i).toFixed(decimals)), " ").concat(sizes[i]);
}
function formatProgress(contextValues) {
  let loaded = contextValues["loaded"];
  let total = contextValues["total"];
  if (typeof loaded !== "number" || loaded < 0) {
    loaded = 0;
  }
  if (typeof total !== "number" || total <= 0) {
    total = 1;
  }
  const progress = loaded / total * 100;
  return Math.min(progress, 100);
}
function useProgress(context) {
  const [progress, setProgress] = (0, import_react2.useState)(0);
  (0, import_react2.useEffect)(() => {
    context.addListener((values) => {
      setProgress(formatProgress(values));
    });
  }, [context]);
  return "".concat(progress.toFixed(1), "%");
}

// src/file-uploaders/data-url-file-uploader.ts
var DataUrlFileUploader = class {
  constructor() {
    __publicField(this, "file", null);
    __publicField(this, "fileReader");
    this.fileReader = new FileReader();
  }
  insert(file) {
    this.file = file;
    return this.getBaseAttrs();
  }
  upload() {
    const fileReader = this.fileReader;
    const file = this.file;
    if (!file) {
      throw new Error("No file to upload");
    }
    fileReader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      fileReader.addEventListener(
        "load",
        () => resolve(__spreadProps(__spreadValues({}, this.getBaseAttrs()), { url: fileReader.result }))
      );
      fileReader.addEventListener("error", () => {
        reject(fileReader.error);
      });
    });
  }
  abort() {
    this.fileReader.abort();
  }
  getBaseAttrs() {
    if (!this.file) {
      throw new Error("No file to upload");
    }
    return getDefaultFileAttrs(this.file);
  }
};
function createDataUrlFileUploader() {
  return new DataUrlFileUploader();
}
function getDefaultFileAttrs(file) {
  return {
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size
  };
}

// src/file-uploaders/bashupload-file-uploader.ts
var BaseuploadFileUploader = class {
  constructor() {
    __publicField(this, "file", null);
    __publicField(this, "xhr");
    __publicField(this, "uploadPromise");
    this.xhr = new XMLHttpRequest();
    this.uploadPromise = new Promise((resolve, reject) => {
      this.xhr.addEventListener("load", () => {
        var _a2, _b;
        try {
          const response = this.xhr.responseText;
          const rawUrl = (_b = (_a2 = JSON.parse(response)) == null ? void 0 : _a2.file) == null ? void 0 : _b.url;
          if (!rawUrl) {
            throw new Error("incorrect response structure");
          }
          resolve("".concat(rawUrl, "?download=1"));
        } catch (error) {
          reject(new Error("something went wrong when parsing the server response: ".concat(error)));
        }
      });
      this.xhr.addEventListener("error", () => {
        reject(new Error("something went wrong when uploading the file"));
      });
      this.xhr.addEventListener("abort", () => {
        reject(new Error("Aborted"));
      });
    });
  }
  insert(file) {
    this.file = file;
    return getDefaultFileAttrs(file);
  }
  async upload(context) {
    const file = this.file;
    if (!file) {
      throw new Error("No file to upload");
    }
    this.xhr.addEventListener("progress", (event) => {
      context.set("loaded", event.loaded);
      context.set("total", event.total);
    });
    this.xhr.open("POST", "https://bashupload.com/upload");
    const form = new FormData();
    form.append("file", file, file.name);
    form.append("json", "true");
    this.xhr.send(form);
    const uploadUrl = await this.uploadPromise;
    return __spreadProps(__spreadValues({}, getDefaultFileAttrs(file)), { url: uploadUrl });
  }
  abort() {
    this.xhr.abort();
  }
};
function createBaseuploadFileUploader() {
  return new BaseuploadFileUploader();
}

// src/file-uploaders/object-url-file-uploader.ts
function createObjectUrlFileUploader() {
  let file;
  return {
    insert: (f) => {
      file = f;
      return getDefaultFileAttrs(file);
    },
    upload: () => {
      const url = URL.createObjectURL(file);
      return Promise.resolve(__spreadProps(__spreadValues({}, getDefaultFileAttrs(file)), { url }));
    },
    // `URL.createObjectURL` is sychronous. There is no change to abort the loading process.
    abort: () => {
    }
  };
}

// src/file-uploaders/slow-file-uploader.ts
function createSlowFileUploader() {
  let file;
  let aborted = false;
  return {
    insert: (f) => {
      file = f;
      return getDefaultFileAttrs(file);
    },
    upload: async (context) => {
      const total = 8e3;
      const chunk = 200;
      let loaded = 0;
      context.set("total", total);
      context.set("loaded", loaded);
      while (loaded < total) {
        if (aborted) {
          throw new Error("Canceled");
        }
        await new Promise((resolve) => setTimeout(resolve, chunk));
        loaded += 2 * Math.random() * chunk;
        loaded = Math.min(total, loaded);
        context.set("loaded", loaded);
      }
      const url = "".concat(URL.createObjectURL(file), "#uploaded");
      return __spreadProps(__spreadValues({}, getDefaultFileAttrs(file)), { url });
    },
    abort: () => {
      aborted = true;
    }
  };
}

// src/file-extension.tsx
var _backspaceShortcut_dec, _renameFile_dec, _deleteFile_dec, _insertFile_dec, _updateFile_dec, _uploadFiles_dec, _a, _FileExtension_decorators, _init;
_FileExtension_decorators = [(0, import_core.extension)({
  defaultOptions: {
    uploadFileHandler: createDataUrlFileUploader,
    render: FileComponent,
    pasteRuleRegexp: /^((?!image).)*$/i
  },
  handlerKeys: ["onDeleteFile"]
})];
var FileExtension = class extends (_a = import_core.NodeExtension, _uploadFiles_dec = [(0, import_core.command)()], _updateFile_dec = [(0, import_core.command)()], _insertFile_dec = [(0, import_core.command)()], _deleteFile_dec = [(0, import_core.command)()], _renameFile_dec = [(0, import_core.command)()], _backspaceShortcut_dec = [(0, import_core.keyBinding)({ shortcut: ["Backspace", "Delete"] })], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "ReactComponent", (props) => {
      const payload = (0, import_core.findUploadPlaceholderPayload)(props.view.state, props.node.attrs.id);
      const context = payload == null ? void 0 : payload.context;
      const abort = () => payload == null ? void 0 : payload.fileUploader.abort();
      return this.options.render(__spreadProps(__spreadValues({}, props), { context, abort }));
    });
  }
  get name() {
    return "file";
  }
  createTags() {
    return [import_core.ExtensionTag.Block];
  }
  createNodeSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        id: { default: null },
        url: { default: "" },
        fileName: { default: "" },
        fileType: { default: "" },
        fileSize: { default: 0 },
        error: { default: null }
      }),
      selectable: true,
      draggable: true,
      atom: true,
      content: ""
    }, override), {
      parseDOM: [
        {
          tag: "div[data-file]",
          priority: import_core.ExtensionPriority.Low,
          getAttrs: (dom) => {
            const anchor = dom;
            const url = anchor.getAttribute("data-url");
            const fileName = anchor.getAttribute("data-filename");
            const fileType = anchor.getAttribute("data-filetype");
            const fileSize = anchor.getAttribute("data-filesize");
            const id = anchor.getAttribute("data-id");
            return __spreadProps(__spreadValues({}, extra.parse(dom)), {
              url,
              fileName,
              fileType,
              fileSize,
              id
            });
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (node) => {
        const _a3 = (0, import_core.omitExtraAttributes)(node.attrs, extra), { url, error } = _a3, rest = __objRest(_a3, ["url", "error"]);
        const attrs = __spreadProps(__spreadValues(__spreadValues({}, extra.dom(node)), rest), {
          "data-url": url,
          "data-file": "",
          "data-filename": node.attrs.fileName,
          "data-filetype": node.attrs.fileType,
          "data-filesize": node.attrs.fileSize,
          "data-id": node.attrs.id
        });
        if (error) {
          attrs["data-error"] = error;
        }
        return ["div", attrs];
      }
    });
  }
  createPasteRules() {
    return [
      {
        type: "file",
        regexp: this.options.pasteRuleRegexp,
        fileHandler: (props) => {
          let pos;
          if (props.type === "drop") {
            pos = props.pos;
          }
          for (const file of props.files) {
            this.uploadFile(file, pos);
          }
          return true;
        }
      }
    ];
  }
  uploadFiles(files) {
    return () => {
      for (const file of files) {
        this.uploadFile(file);
      }
      return true;
    };
  }
  updateFile(pos, attrs) {
    return ({ tr, dispatch }) => {
      dispatch == null ? void 0 : dispatch(tr.setNodeMarkup(pos, void 0, attrs));
      return true;
    };
  }
  insertFile(attributes, selection) {
    return ({ tr, dispatch }) => {
      const { from, to } = (0, import_core.getTextSelection)(selection != null ? selection : tr.selection, tr.doc);
      const node = this.type.create(attributes);
      dispatch == null ? void 0 : dispatch(tr.replaceRangeWith(from, to, node));
      return true;
    };
  }
  deleteFile(pos) {
    return ({ tr, state, dispatch }) => {
      const node = state.doc.nodeAt(pos);
      if (node && node.type === this.type) {
        tr.delete(pos, pos + 1).scrollIntoView();
        this.options.onDeleteFile({ tr, pos, node });
        dispatch == null ? void 0 : dispatch(tr);
        return true;
      }
      return false;
    };
  }
  renameFile(pos, fileName) {
    return ({ tr, state, dispatch }) => {
      const node = state.doc.nodeAt(pos);
      if (node && node.type === this.type) {
        dispatch == null ? void 0 : dispatch(tr.setNodeMarkup(pos, void 0, __spreadProps(__spreadValues({}, node.attrs), { fileName })));
        return true;
      }
      return false;
    };
  }
  backspaceShortcut(props) {
    const { tr, state } = props;
    const { from, to, empty } = tr.selection;
    if (!this.hasHandlers("onDeleteFile") || empty) {
      return false;
    }
    const onDeleteFileCallbacks = [];
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type === this.type) {
        onDeleteFileCallbacks.push({ node, pos });
      }
      return true;
    });
    onDeleteFileCallbacks.forEach(({ node, pos }) => {
      this.options.onDeleteFile({ tr, node, pos });
    });
    return false;
  }
  uploadFile(file, pos) {
    return (0, import_core.uploadFile)({
      file,
      pos,
      view: this.store.view,
      fileType: this.type,
      uploadHandler: this.options.uploadFileHandler
    });
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "uploadFiles", _uploadFiles_dec, FileExtension);
__decorateElement(_init, 1, "updateFile", _updateFile_dec, FileExtension);
__decorateElement(_init, 1, "insertFile", _insertFile_dec, FileExtension);
__decorateElement(_init, 1, "deleteFile", _deleteFile_dec, FileExtension);
__decorateElement(_init, 1, "renameFile", _renameFile_dec, FileExtension);
__decorateElement(_init, 1, "backspaceShortcut", _backspaceShortcut_dec, FileExtension);
FileExtension = __decorateElement(_init, 0, "FileExtension", _FileExtension_decorators, FileExtension);
__runInitializers(_init, 1, FileExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataUrlFileUploader,
  FileExtension,
  createBaseuploadFileUploader,
  createDataUrlFileUploader,
  createObjectUrlFileUploader,
  createSlowFileUploader,
  getDefaultFileAttrs
});
