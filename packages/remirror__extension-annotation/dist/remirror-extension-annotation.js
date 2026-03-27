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

// src/annotation-extension.ts
import {
  assert,
  command,
  environment,
  extension,
  ExtensionPriority,
  getTextSelection,
  helper,
  isEmptyObject,
  PlainExtension,
  within
} from "@remirror/core";

// src/annotation-plugin.ts
import { Decoration, DecorationSet } from "@remirror/pm/view";

// src/annotation-segments.ts
import { sort } from "@remirror/core";
function toSegments(annotations) {
  var _a2, _b;
  const segments = [];
  const positionMap = /* @__PURE__ */ new Map();
  for (const annotation of annotations) {
    const currentFrom = (_a2 = positionMap.get(annotation.from)) != null ? _a2 : [];
    const currentTo = (_b = positionMap.get(annotation.to)) != null ? _b : [];
    positionMap.set(annotation.from, [...currentFrom, { type: "start", annotation }]);
    positionMap.set(annotation.to, [...currentTo, { type: "end", annotation }]);
  }
  const sortedPositions = sort([...positionMap.entries()], ([a], [z]) => a - z);
  let activeAnnotations = [];
  let from = 0;
  for (const [to, items] of sortedPositions) {
    const startAnnotations = items.filter((item) => item.type === "start").map((item) => item.annotation);
    const endIds = new Set(
      items.filter((item) => item.type === "end").map((item) => item.annotation.id)
    );
    if (activeAnnotations.length > 0) {
      segments.push({ from, to, annotations: activeAnnotations });
    }
    from = to;
    activeAnnotations = [...activeAnnotations, ...startAnnotations].filter(
      // Remove any annotation that is at the end of the annotation group.
      (annotation) => !endIds.has(annotation.id)
    );
  }
  return segments;
}

// src/annotation-plugin.ts
var AnnotationState = class {
  constructor(getStyle, store) {
    this.getStyle = getStyle;
    this.store = store;
    /**
     * Cache of annotations being currently shown
     */
    __publicField(this, "annotations", []);
    /**
     * Decorations are computed based on the annotations. The state contains a
     * copy of the decoration for performance optimization.
     */
    __publicField(this, "decorationSet", DecorationSet.empty);
  }
  addAnnotation(addAction) {
    const annotation = __spreadValues({
      from: addAction.from,
      to: addAction.to
    }, addAction.annotationData);
    this.store.addAnnotation(annotation);
  }
  updateAnnotation(updateAction) {
    this.store.updateAnnotation(updateAction.annotationId, updateAction.annotationData);
  }
  removeAnnotations(removeAction) {
    this.store.removeAnnotations(removeAction.annotationIds);
  }
  setAnnotations(setAction) {
    this.store.setAnnotations(setAction.annotations);
  }
  formatAnnotations() {
    return this.store.formatAnnotations();
  }
  createDecorations(tr, annotations = []) {
    const decos = toSegments(annotations).map((segment) => {
      const classNames = segment.annotations.map((a) => a.className).filter((className) => className);
      const style = this.getStyle(segment.annotations);
      return Decoration.inline(segment.from, segment.to, {
        class: classNames.length > 0 ? classNames.join(" ") : void 0,
        style
      });
    });
    return DecorationSet.create(tr.doc, decos);
  }
  apply({ tr, action }) {
    const actionType = action == null ? void 0 : action.type;
    if (!action && !tr.docChanged) {
      return this;
    }
    if (actionType !== void 0) {
      if (actionType === 0 /* ADD_ANNOTATION */) {
        this.addAnnotation(action);
      }
      if (actionType === 4 /* UPDATE_ANNOTATION */) {
        this.updateAnnotation(action);
      }
      if (actionType === 2 /* REMOVE_ANNOTATIONS */) {
        this.removeAnnotations(action);
      }
      if (actionType === 3 /* SET_ANNOTATIONS */) {
        this.setAnnotations(action);
      }
      this.annotations = this.formatAnnotations();
      this.decorationSet = this.createDecorations(tr, this.annotations);
    } else {
      this.annotations = this.annotations.map((annotation) => __spreadProps(__spreadValues({}, annotation), {
        // 1 indicates that the annotation isn't extended when the user types
        // at the beginning of the annotation
        from: tr.mapping.map(annotation.from, 1),
        // -1 indicates that the annotation isn't extended when the user types
        // at the end of the annotation
        to: tr.mapping.map(annotation.to, -1)
      })).filter((annotation) => annotation.to !== annotation.from);
      this.store.setAnnotations(this.annotations);
      this.decorationSet = this.decorationSet.map(tr.mapping, tr.doc);
    }
    return this;
  }
};

// src/annotation-store.ts
var MapLikeAnnotationStore = class {
  /**
   * @param map a custom map-like object for storing internal annotations
   */
  constructor(map = /* @__PURE__ */ new Map(), positionToStored = (pos) => pos, positionFromStored = (storedPos) => storedPos) {
    this.map = map;
    this.positionToStored = positionToStored;
    this.positionFromStored = positionFromStored;
  }
  addAnnotation(_a2) {
    var _b = _a2, { from, to } = _b, annotation = __objRest(_b, ["from", "to"]);
    const storedAnnotation = __spreadValues({
      from: this.positionToStored(from),
      to: this.positionToStored(to)
    }, annotation);
    this.map.set(annotation.id, storedAnnotation);
  }
  updateAnnotation(id, data) {
    const existing = this.map.get(id);
    if (!existing) {
      return;
    }
    this.map.set(id, __spreadValues(__spreadValues({}, existing), data));
  }
  removeAnnotations(ids) {
    ids.forEach((id) => {
      this.map.delete(id);
    });
  }
  setAnnotations(annotations) {
    if (typeof this.map.clear === "function") {
      this.map.clear();
    } else {
      this.map.forEach((annotation) => this.map.delete(annotation.id));
    }
    annotations.forEach((annotation) => {
      this.addAnnotation(annotation);
    });
  }
  formatAnnotations() {
    const annotations = [];
    this.map.forEach((_a2) => {
      var _b = _a2, { from: storedFrom, to: storedTo } = _b, storedData = __objRest(_b, ["from", "to"]);
      const from = this.positionFromStored(storedFrom);
      const to = this.positionFromStored(storedTo);
      if (!from || !to) {
        return;
      }
      const annotation = __spreadValues({
        from,
        to
      }, storedData);
      annotations.push(annotation);
    });
    return annotations;
  }
};

// src/annotation-extension.ts
function defaultGetStyle(annotations) {
  const backgroundShade = Math.min(annotations.length, 5) / 5;
  const notBlue = 200 * (1 - backgroundShade) + 55;
  return "background: rgb(".concat(notBlue, ", ").concat(notBlue, ", 255);");
}
var _selectionHasAnnotation_dec, _getAnnotationsAt_dec, _getAnnotations_dec, _redrawAnnotations_dec, _setAnnotations_dec, _removeAnnotations_dec, _updateAnnotation_dec, _addAnnotation_dec, _a, _AnnotationExtension_decorators, _init;
_AnnotationExtension_decorators = [extension({
  defaultOptions: {
    getStyle: defaultGetStyle,
    blockSeparator: void 0,
    getStore: () => new MapLikeAnnotationStore(),
    // Obsolete options
    getMap: void 0,
    transformPosition: void 0,
    transformPositionBeforeRender: void 0
  },
  defaultPriority: ExtensionPriority.Low
})];
var _AnnotationExtension = class _AnnotationExtension extends (_a = PlainExtension, _addAnnotation_dec = [command()], _updateAnnotation_dec = [command()], _removeAnnotations_dec = [command()], _setAnnotations_dec = [command()], _redrawAnnotations_dec = [command()], _getAnnotations_dec = [helper()], _getAnnotationsAt_dec = [helper()], _selectionHasAnnotation_dec = [helper()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    /**
     * Enrich text at annotation
     */
    __publicField(this, "enrichText", (annotation) => {
      const { doc } = this.store.getState();
      const text = annotation.to <= doc.content.size ? doc.textBetween(annotation.from, annotation.to, this.options.blockSeparator) : void 0;
      return __spreadProps(__spreadValues({}, annotation), {
        text
      });
    });
  }
  get name() {
    return "annotation";
  }
  onSetOptions(props) {
    const { pickChanged } = props;
    const changedPluginOptions = pickChanged([
      "getStore",
      "getMap",
      "transformPosition",
      "transformPositionBeforeRender"
    ]);
    if (!isEmptyObject(changedPluginOptions)) {
      this.store.updateExtensionPlugins(this);
    }
  }
  /**
   * Create the custom code block plugin which handles the delete key amongst
   * other things.
   */
  createPlugin() {
    let store;
    if (this.options.getMap) {
      assert(
        environment.isProduction || !this.options.getStore,
        'Must not provide both "getMap" and "getStore"'
      );
      store = new MapLikeAnnotationStore(
        this.options.getMap(),
        this.options.transformPosition,
        this.options.transformPositionBeforeRender
      );
    } else {
      store = this.options.getStore();
    }
    const pluginState = new AnnotationState(this.options.getStyle, store);
    return {
      state: {
        init() {
          return pluginState;
        },
        apply(tr) {
          const action = tr.getMeta(_AnnotationExtension.name);
          return pluginState.apply({ tr, action });
        }
      },
      props: {
        decorations(state) {
          var _a2;
          return (_a2 = this.getState(state)) == null ? void 0 : _a2.decorationSet;
        }
      }
    };
  }
  addAnnotation(annotationData) {
    return ({ tr, dispatch }) => {
      const { empty, from, to } = tr.selection;
      if (empty) {
        return false;
      }
      dispatch == null ? void 0 : dispatch(
        tr.setMeta(_AnnotationExtension.name, {
          type: 0 /* ADD_ANNOTATION */,
          from,
          to,
          annotationData
        })
      );
      return true;
    };
  }
  updateAnnotation(id, annotationDataWithoutId) {
    return ({ tr, dispatch }) => {
      if (dispatch) {
        const annotationData = __spreadProps(__spreadValues({}, annotationDataWithoutId), {
          id
        });
        const action = {
          type: 4 /* UPDATE_ANNOTATION */,
          annotationId: id,
          annotationData
        };
        dispatch(tr.setMeta(_AnnotationExtension.name, action));
      }
      return true;
    };
  }
  removeAnnotations(annotationIds) {
    return ({ tr, dispatch }) => {
      dispatch == null ? void 0 : dispatch(
        tr.setMeta(_AnnotationExtension.name, {
          type: 2 /* REMOVE_ANNOTATIONS */,
          annotationIds
        })
      );
      return true;
    };
  }
  setAnnotations(annotations) {
    return ({ tr, dispatch }) => {
      dispatch == null ? void 0 : dispatch(
        tr.setMeta(_AnnotationExtension.name, { type: 3 /* SET_ANNOTATIONS */, annotations })
      );
      return true;
    };
  }
  redrawAnnotations() {
    return ({ tr, dispatch }) => {
      dispatch == null ? void 0 : dispatch(tr.setMeta(_AnnotationExtension.name, { type: 1 /* REDRAW_ANNOTATIONS */ }));
      return true;
    };
  }
  getAnnotations() {
    const state = this.getPluginState();
    return state.annotations.map(this.enrichText);
  }
  getAnnotationsAt(pos, includeEdges = true) {
    const annotations = [];
    const { doc, selection } = this.store.getState();
    const state = this.getPluginState();
    const { from, to } = getTextSelection(pos != null ? pos : selection, doc);
    for (const annotation of state.annotations) {
      if (within(from, annotation.from, annotation.to) || within(to, annotation.from, annotation.to) || within(annotation.from, from, to) || within(annotation.to, from, to)) {
        if (includeEdges) {
          annotations.push(this.enrichText(annotation));
        } else if (annotation.from !== from && annotation.to !== to) {
          annotations.push(this.enrichText(annotation));
        }
      }
    }
    return annotations;
  }
  selectionHasAnnotation(pos) {
    return this.getAnnotationsAt(pos).length > 0;
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "addAnnotation", _addAnnotation_dec, _AnnotationExtension);
__decorateElement(_init, 1, "updateAnnotation", _updateAnnotation_dec, _AnnotationExtension);
__decorateElement(_init, 1, "removeAnnotations", _removeAnnotations_dec, _AnnotationExtension);
__decorateElement(_init, 1, "setAnnotations", _setAnnotations_dec, _AnnotationExtension);
__decorateElement(_init, 1, "redrawAnnotations", _redrawAnnotations_dec, _AnnotationExtension);
__decorateElement(_init, 1, "getAnnotations", _getAnnotations_dec, _AnnotationExtension);
__decorateElement(_init, 1, "getAnnotationsAt", _getAnnotationsAt_dec, _AnnotationExtension);
__decorateElement(_init, 1, "selectionHasAnnotation", _selectionHasAnnotation_dec, _AnnotationExtension);
_AnnotationExtension = __decorateElement(_init, 0, "AnnotationExtension", _AnnotationExtension_decorators, _AnnotationExtension);
__runInitializers(_init, 1, _AnnotationExtension);
var AnnotationExtension = _AnnotationExtension;

// src/annotation-positioners.ts
import { selectionPositioner } from "@remirror/extension-positioner";
function createCenteredAnnotationPositioner(getAnnotationsAt) {
  return selectionPositioner.clone({
    getActive: (props) => {
      const { state, view } = props;
      if (!state.selection.empty) {
        return [];
      }
      const annotations = getAnnotationsAt(state.selection.from);
      if (annotations.length === 0) {
        return [];
      }
      const shortestAnnotation = annotations.sort(
        (annotation1, annotation2) => {
          var _a2, _b;
          return ((_a2 = annotation1.text) != null ? _a2 : "").length - ((_b = annotation2.text) != null ? _b : "").length;
        }
      )[0];
      if (!shortestAnnotation) {
        return [];
      }
      const from = view.coordsAtPos(shortestAnnotation.from);
      const to = view.coordsAtPos(shortestAnnotation.to);
      return [{ from, to }];
    }
  });
}
export {
  AnnotationExtension,
  createCenteredAnnotationPositioner
};
