"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ResizableNodeView: () => ResizableNodeView,
  ResizableRatioType: () => ResizableRatioType
});
module.exports = __toCommonJS(src_exports);

// src/prosemirror-resizable-view.ts
var import_core_helpers = require("@remirror/core-helpers");
var import_core_utils2 = require("@remirror/core-utils");

// src/resizable-view-handle.ts
var import_core_utils = require("@remirror/core-utils");

// src/corner-handle.ts
var leftCorner = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="22" height="22" fill="rgba(0, 0, 0, 0.65)" stroke="rgba(255, 255, 255, 0.5)" transform="rotate(90)" xmlns:v="https://vecta.io/nano"><path fill-rule="evenodd" d="M14 0a2 2 0 0 0-2 2v10H2a2 2 0 1 0 0 4h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/></svg>';
var rightCorner = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="22" height="22" fill="rgba(0, 0, 0, 0.65)" stroke="rgba(255, 255, 255, 0.5)" transform="matrix(0 1 1 0 0 0)" xmlns:v="https://vecta.io/nano"><path fill-rule="evenodd" d="M14 0a2 2 0 0 0-2 2v10H2a2 2 0 1 0 0 4h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/></svg>';
var leftCornerHandle = encodeURIComponent(leftCorner);
var rightCornerHandle = encodeURIComponent(rightCorner);

// src/resizable-view-handle.ts
var _handle;
var ResizableHandle = class {
  constructor(type) {
    __publicField(this, "dom");
    __privateAdd(this, _handle);
    __publicField(this, "type");
    const wrapper = document.createElement("div");
    const handle = document.createElement("div");
    this.dom = wrapper;
    __privateSet(this, _handle, handle);
    this.type = type;
    this.createHandle(type);
  }
  createHandle(type) {
    (0, import_core_utils.setStyle)(this.dom, {
      position: "absolute",
      pointerEvents: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "100"
    });
    (0, import_core_utils.setStyle)(__privateGet(this, _handle), {
      opacity: "0",
      transition: "opacity 300ms ease-in 0s"
    });
    __privateGet(this, _handle).dataset.dragging = "";
    switch (type) {
      case 0 /* Right */:
        (0, import_core_utils.setStyle)(this.dom, {
          right: "0px",
          top: "0px",
          height: "100%",
          width: "15px",
          cursor: "col-resize"
        });
        (0, import_core_utils.setStyle)(__privateGet(this, _handle), {
          width: " 4px",
          height: "36px",
          maxHeight: "50%",
          boxSizing: "content-box",
          background: "rgba(0, 0, 0, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "6px"
        });
        break;
      case 1 /* Left */:
        (0, import_core_utils.setStyle)(this.dom, {
          left: "0px",
          top: "0px",
          height: "100%",
          width: "15px",
          cursor: "col-resize"
        });
        (0, import_core_utils.setStyle)(__privateGet(this, _handle), {
          width: " 4px",
          height: "36px",
          maxHeight: "50%",
          boxSizing: "content-box",
          background: "rgba(0, 0, 0, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "6px"
        });
        break;
      case 2 /* Bottom */:
        (0, import_core_utils.setStyle)(this.dom, {
          bottom: "0px",
          width: "100%",
          height: "14px",
          cursor: "row-resize"
        });
        (0, import_core_utils.setStyle)(__privateGet(this, _handle), {
          width: " 42px",
          height: "4px",
          boxSizing: "content-box",
          maxWidth: "50%",
          background: "rgba(0, 0, 0, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "6px"
        });
        break;
      case 3 /* BottomRight */:
        (0, import_core_utils.setStyle)(this.dom, {
          right: "-1px",
          bottom: "-2px",
          width: "30px",
          height: "30px",
          cursor: "nwse-resize",
          zIndex: "101"
        });
        (0, import_core_utils.setStyle)(__privateGet(this, _handle), {
          height: "22px",
          width: "22px",
          backgroundRepeat: "no-repeat",
          backgroundImage: 'url("data:image/svg+xml,'.concat(rightCornerHandle, '") ')
        });
        break;
      case 4 /* BottomLeft */:
        (0, import_core_utils.setStyle)(this.dom, {
          left: "-1px",
          bottom: "-2px",
          width: "30px",
          height: "30px",
          cursor: "nesw-resize",
          zIndex: "101"
        });
        (0, import_core_utils.setStyle)(__privateGet(this, _handle), {
          height: "22px",
          width: "22px",
          backgroundRepeat: "no-repeat",
          backgroundImage: 'url("data:image/svg+xml,'.concat(leftCornerHandle, '") ')
        });
        break;
    }
    this.dom.append(__privateGet(this, _handle));
  }
  setHandleVisibility(visible) {
    const isVisible = visible || !!__privateGet(this, _handle).dataset.dragging;
    __privateGet(this, _handle).style.opacity = isVisible ? "1" : "0";
  }
  dataSetDragging(isDraging) {
    __privateGet(this, _handle).dataset.dragging = isDraging ? "true" : "";
  }
};
_handle = new WeakMap();

// src/prosemirror-resizable-view.ts
var MIN_WIDTH = 50;
var ResizableRatioType = /* @__PURE__ */ ((ResizableRatioType2) => {
  ResizableRatioType2[ResizableRatioType2["Fixed"] = 0] = "Fixed";
  ResizableRatioType2[ResizableRatioType2["Flexible"] = 1] = "Flexible";
  return ResizableRatioType2;
})(ResizableRatioType || {});
var _element, _node, _destroyList, _width, _height;
var ResizableNodeView = class {
  constructor({
    node,
    view,
    getPos,
    aspectRatio = 0 /* Fixed */,
    options,
    initialSize
  }) {
    __publicField(this, "dom");
    __privateAdd(this, _element);
    __privateAdd(this, _node);
    __privateAdd(this, _destroyList, []);
    __publicField(this, "aspectRatio");
    // cache the current element's size so that we can compare with new node's
    // size when `update` method is called.
    __privateAdd(this, _width);
    __privateAdd(this, _height);
    const outer = this.createWrapper(node, initialSize);
    const element = this.createElement({ node, view, getPos, options });
    const types = aspectRatio === 1 /* Flexible */ ? [
      0 /* Right */,
      1 /* Left */,
      2 /* Bottom */,
      3 /* BottomRight */,
      4 /* BottomLeft */
    ] : [0 /* Right */, 1 /* Left */];
    const handles = types.map((type) => new ResizableHandle(type));
    for (const handle of handles) {
      const onMouseDown = (e) => {
        this.startResizing(e, view, getPos, handle);
      };
      handle.dom.addEventListener("mousedown", onMouseDown);
      __privateGet(this, _destroyList).push(() => handle.dom.removeEventListener("mousedown", onMouseDown));
      outer.append(handle.dom);
    }
    const setHandleVisibe = () => {
      handles.forEach((handle) => handle.setHandleVisibility(true));
    };
    const setHandleInvisible = () => {
      handles.forEach((handle) => handle.setHandleVisibility(false));
    };
    outer.addEventListener("mouseover", setHandleVisibe);
    outer.addEventListener("mouseout", setHandleInvisible);
    __privateGet(this, _destroyList).push(
      () => outer.removeEventListener("mouseover", setHandleVisibe),
      () => outer.removeEventListener("mouseout", setHandleInvisible)
    );
    outer.append(element);
    this.dom = outer;
    __privateSet(this, _node, node);
    __privateSet(this, _element, element);
    this.aspectRatio = aspectRatio;
  }
  createWrapper(node, initialSize) {
    const outer = document.createElement("div");
    outer.classList.add("remirror-resizable-view");
    outer.style.position = "relative";
    if (initialSize) {
      (0, import_core_utils2.setStyle)(outer, {
        width: normalizeSize(initialSize.width),
        aspectRatio: "".concat(initialSize.width, " / ").concat(initialSize.height)
      });
    } else {
      (0, import_core_utils2.setStyle)(outer, {
        width: normalizeSize(node.attrs.width),
        aspectRatio: "".concat(node.attrs.width, " / ").concat(node.attrs.height)
      });
    }
    (0, import_core_utils2.setStyle)(outer, {
      maxWidth: "100%",
      minWidth: "".concat(MIN_WIDTH, "px"),
      // By default, inline-block has "vertical-align: baseline", which makes
      // the outer wrapper slightly taller than the resizable view, which will
      // causes layout shift. So we need to set `vertical-align` to avoid this.
      verticalAlign: "bottom",
      display: "inline-block",
      // necessary so the bottom right handle is aligned nicely
      lineHeight: "0",
      // make sure transition time is larger then mousemove event's throttle time
      transition: "width 0.15s ease-out, height 0.15s ease-out"
    });
    return outer;
  }
  startResizing(e, view, getPos, handle) {
    var _a, _b;
    e.preventDefault();
    handle.dataSetDragging(true);
    __privateGet(this, _element).style.pointerEvents = "none";
    const startX = e.pageX;
    const startY = e.pageY;
    const startWidth = ((_a = __privateGet(this, _element)) == null ? void 0 : _a.getBoundingClientRect().width) || 0;
    const startHeight = ((_b = __privateGet(this, _element)) == null ? void 0 : _b.getBoundingClientRect().height) || 0;
    const onMouseMove = (0, import_core_helpers.throttle)(100, false, (e2) => {
      const currentX = e2.pageX;
      const currentY = e2.pageY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;
      let newWidth = null;
      let newHeight = null;
      if (this.aspectRatio === 0 /* Fixed */ && startWidth && startHeight) {
        switch (handle.type) {
          case 0 /* Right */:
          case 3 /* BottomRight */:
            newWidth = startWidth + diffX;
            newHeight = startHeight / startWidth * newWidth;
            break;
          case 1 /* Left */:
          case 4 /* BottomLeft */:
            newWidth = startWidth - diffX;
            newHeight = startHeight / startWidth * newWidth;
            break;
          case 2 /* Bottom */:
            newHeight = startHeight + diffY;
            newWidth = startWidth / startHeight * newHeight;
            break;
        }
      } else if (this.aspectRatio === 1 /* Flexible */) {
        switch (handle.type) {
          case 0 /* Right */:
            newWidth = startWidth + diffX;
            break;
          case 1 /* Left */:
            newWidth = startWidth - diffX;
            break;
          case 2 /* Bottom */:
            newHeight = startHeight + diffY;
            break;
          case 3 /* BottomRight */:
            newWidth = startWidth + diffX;
            newHeight = startHeight + diffY;
            break;
          case 4 /* BottomLeft */:
            newWidth = startWidth - diffX;
            newHeight = startHeight + diffY;
            break;
        }
      }
      if (typeof newWidth === "number" && newWidth < MIN_WIDTH) {
        if (this.aspectRatio === 0 /* Fixed */ && startWidth && startHeight) {
          newWidth = MIN_WIDTH;
          newHeight = startHeight / startWidth * newWidth;
        } else if (this.aspectRatio === 1 /* Flexible */) {
          newWidth = MIN_WIDTH;
        }
      }
      if (newWidth) {
        __privateSet(this, _width, Math.round(newWidth));
        this.dom.style.width = "".concat(__privateGet(this, _width), "px");
      }
      if (newHeight) {
        __privateSet(this, _height, Math.round(newHeight));
      }
      if (newWidth || newHeight) {
        this.dom.style.aspectRatio = "".concat(__privateGet(this, _width), " / ").concat(__privateGet(this, _height));
      }
    });
    const onMouseUp = (e2) => {
      e2.preventDefault();
      handle.dataSetDragging(false);
      handle.setHandleVisibility(false);
      __privateGet(this, _element).style.pointerEvents = "auto";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      const pos = getPos();
      const tr = view.state.tr.setNodeMarkup(pos, void 0, __spreadProps(__spreadValues({}, __privateGet(this, _node).attrs), {
        width: __privateGet(this, _width),
        height: __privateGet(this, _height)
      }));
      view.dispatch(tr);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    __privateGet(this, _destroyList).push(() => document.removeEventListener("mousemove", onMouseMove));
    __privateGet(this, _destroyList).push(() => document.removeEventListener("mouseup", onMouseUp));
  }
  /**
   * `update` will be called by Prosemirror, when the view is updating itself.
   */
  update(node) {
    if (node.type !== __privateGet(this, _node).type) {
      return false;
    }
    if (this.aspectRatio === 0 /* Fixed */ && node.attrs.width && node.attrs.width !== __privateGet(this, _width)) {
      return false;
    }
    if (this.aspectRatio === 1 /* Flexible */ && node.attrs.width && node.attrs.height && node.attrs.width !== __privateGet(this, _width) && node.attrs.height !== __privateGet(this, _height)) {
      return false;
    }
    if (!isEqualWithoutAttrs(__privateGet(this, _node), node, ["width", "height"])) {
      return false;
    }
    __privateSet(this, _node, node);
    __privateSet(this, _width, node.attrs.width);
    __privateSet(this, _height, node.attrs.height);
    return true;
  }
  destroy() {
    __privateGet(this, _destroyList).forEach((removeEventListener) => removeEventListener());
  }
};
_element = new WeakMap();
_node = new WeakMap();
_destroyList = new WeakMap();
_width = new WeakMap();
_height = new WeakMap();
function isEqualWithoutAttrs(node1, node2, ignoreAttrs) {
  return node1 === node2 || sameMarkup(node1, node2, ignoreAttrs) && node1.content.eq(node2.content);
}
function sameMarkup(node1, node2, ignoreAttrs) {
  const node1Attrs = node1.attrs;
  const node2Attrs = node2.attrs;
  const deltaAttrs = {};
  for (const attr of ignoreAttrs) {
    deltaAttrs[attr] = null;
  }
  node1.attrs = __spreadValues(__spreadValues({}, node1Attrs), deltaAttrs);
  node2.attrs = __spreadValues(__spreadValues({}, node2Attrs), deltaAttrs);
  const same = node1.sameMarkup(node2);
  node1.attrs = node1Attrs;
  node2.attrs = node2Attrs;
  return same;
}
function normalizeSize(size) {
  if (typeof size === "number") {
    return "".concat(size, "px");
  } else if (size) {
    return size;
  } else {
    return void 0;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResizableNodeView,
  ResizableRatioType
});
