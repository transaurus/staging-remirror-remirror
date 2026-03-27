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

// src/entity-reference-extension.ts
import {
  assert,
  command,
  extension,
  getTextSelection,
  helper,
  isElementDomNode,
  MarkExtension,
  uniqueId,
  within
} from "@remirror/core";
import { TextSelection } from "@remirror/pm/state";
import { DecorationSet } from "@remirror/pm/view";

// src/utils/decorate-entity-references.tsx
import { Decoration } from "@remirror/pm/view";

// src/utils/ranges.ts
var findMinMaxRange = (array) => {
  const min = Math.min(...array.map((a) => a.from));
  const max = Math.max(...array.map((a) => a.to));
  return [min, max];
};

// src/utils/decorate-entity-references.tsx
var decorateEntityReferences = (entityReferences) => {
  if (entityReferences.length === 0) {
    return [];
  }
  const decorations = entityReferences.map((overlappingEntityReferences) => {
    const backgroundShade = Math.min(overlappingEntityReferences.length, 5) / 5;
    const notBlue = 200 * (1 - backgroundShade) + 55;
    const style = "background: rgb(".concat(notBlue, ", ").concat(notBlue, ", 255);padding: 6px 0;");
    const [from, to] = findMinMaxRange(overlappingEntityReferences);
    const specs = {
      inclusiveStart: true,
      inclusiveEnd: true
    };
    return Decoration.inline(from, to, { style }, specs);
  });
  return [...decorations];
};

// src/utils/disjoined-entity-references.ts
function getDisjoinedEntityReferencesFromNode(node, pos, markTypeName) {
  const isEntityReference = (mark) => mark.type.name === markTypeName;
  return node.marks.filter(isEntityReference).map((mark) => {
    const _a2 = mark.attrs, { id } = _a2, rest = __objRest(_a2, ["id"]);
    const metaData = {
      from: pos,
      to: pos + Math.max(node.textContent.length, 1),
      id,
      text: node.textContent
    };
    if (Object.keys(rest).length > 0) {
      metaData.attrs = rest;
    }
    return metaData;
  });
}

// src/utils/joined-entity-references.ts
function partitionEntityReferences(array, filter) {
  const matches = array.filter((e) => filter(e));
  const notMatches = array.filter((e) => !filter(e));
  return [matches, notMatches];
}
var joinDisjoinedEntityReference = (entityReferences, entityReference) => {
  const { id, text } = entityReference;
  if (entityReference.from >= entityReference.to) {
    return entityReferences;
  }
  const [same, diff] = partitionEntityReferences(entityReferences, (h) => h.id === id);
  const [from, to] = findMinMaxRange([...same, entityReference]);
  const fullText = same.map((h) => h.text).join(" ");
  const newEntityReference = __spreadProps(__spreadValues({}, entityReference), {
    from,
    to,
    text: fullText + text
  });
  return [...diff, newEntityReference];
};
var joinDisjoinedEntityReferences = (disjoinedEntityReferences) => {
  let joinedEntityReferences = [];
  for (const disjoinedEntityReference of disjoinedEntityReferences) {
    joinedEntityReferences = joinDisjoinedEntityReference(
      joinedEntityReferences,
      disjoinedEntityReference
    );
  }
  return joinedEntityReferences;
};

// src/utils/shortest-entity-reference.ts
var getShortestEntityReference = (entityReferences) => entityReferences.sort(({ text: a }, { text: b }) => a.length - b.length)[0];

// src/entity-reference-extension.ts
var getEntityReferencesFromPluginState = (props) => {
  const { extension: extension2, state } = props;
  const { entityReferences } = extension2.getPluginState(state);
  return entityReferences;
};
var createDecorationSet = (props) => {
  const { extension: extension2, state } = props;
  const entityReferences = getEntityReferencesFromPluginState(props);
  return DecorationSet.create(state.doc, extension2.options.getStyle(entityReferences));
};
var _getEntityReferencesAt_dec, _getEntityReferenceById_dec, _getEntityReferences_dec, _getDisjoinedEntityReferences_dec, _scrollToEntityReference_dec, _removeEntityReference_dec, _addEntityReference_dec, _a, _EntityReferenceExtension_decorators, _init;
_EntityReferenceExtension_decorators = [extension({
  defaultOptions: {
    getStyle: decorateEntityReferences,
    blockSeparator: void 0,
    onClickMark: () => {
    }
  },
  handlerKeys: ["onClick"]
})];
var EntityReferenceExtension = class extends (_a = MarkExtension, _addEntityReference_dec = [command()], _removeEntityReference_dec = [command()], _scrollToEntityReference_dec = [command()], _getDisjoinedEntityReferences_dec = [helper()], _getEntityReferences_dec = [helper()], _getEntityReferenceById_dec = [helper()], _getEntityReferencesAt_dec = [helper()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "entity-reference";
  }
  createMarkSpec(extra, override) {
    var _a2;
    const idAttr = "data-entity-reference";
    return __spreadProps(__spreadValues({}, override), {
      excludes: "",
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        id: { default: "" }
      }),
      toDOM: (mark) => [
        "span",
        __spreadProps(__spreadValues({}, extra.dom(mark)), {
          [idAttr]: mark.attrs.id
        }),
        0
      ],
      parseDOM: [
        {
          tag: "span[".concat(idAttr, "]"),
          getAttrs: (node) => {
            if (!isElementDomNode(node)) {
              return false;
            }
            const id = node.getAttribute(idAttr);
            return __spreadProps(__spreadValues({}, extra.parse(node)), { id });
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ]
    });
  }
  /**
   * Track click events passed through to the editor.
   */
  createEventHandlers() {
    return {
      /**
       * listens to click events and call the "onClickMark" handler with any of:
       * 1. no argument if the text clicked is not an entity reference
       * 2. the id of the clicked entity reference
       * 3. id of the shortest entity reference in case of overlapping entities
       */
      click: (_event, clickState) => {
        const entityReferences = this.getEntityReferencesAt(clickState.pos);
        if (entityReferences.length === 0) {
          return this.options.onClickMark();
        }
        const shortest = getShortestEntityReference(entityReferences);
        if (shortest) {
          this.options.onClick(shortest);
        }
        return this.options.onClickMark(entityReferences);
      }
    };
  }
  /**
   * Create the extension plugin for inserting decorations into the editor.
   */
  createPlugin() {
    return {
      state: {
        init: (_, state) => {
          const entityReferences = this.getDisjoinedEntityReferences(state.doc);
          return { entityReferences };
        },
        apply: (_tr, _value, _oldState, newState) => {
          const entityReferences = this.getDisjoinedEntityReferences(newState.doc);
          return { entityReferences };
        }
      },
      props: {
        decorations: (state) => createDecorationSet({ state, extension: this })
      }
    };
  }
  addEntityReference(id, attrs = {}) {
    return ({ state, tr, dispatch }) => {
      const { from, to } = state.selection;
      const newMark = this.type.create(__spreadProps(__spreadValues({}, attrs), { id: id != null ? id : uniqueId() }));
      try {
        tr = tr.addMark(from, to, newMark);
      } catch (error) {
        throw new Error(
          "Can't add entityReference ".concat(JSON.stringify(
            newMark
          ), " to range {from: ").concat(from, ", to: ").concat(to, "}: ").concat(error.message)
        );
      }
      dispatch == null ? void 0 : dispatch(tr);
      return true;
    };
  }
  removeEntityReference(entityReferenceId) {
    return ({ tr, dispatch }) => {
      assert(entityReferenceId, "EntityReference can't be removed without specifying tags its ID!");
      const singleMark = this.type.create({ id: entityReferenceId });
      try {
        tr = tr.removeMark(1, tr.doc.content.size, singleMark);
      } catch (error) {
        throw new Error("Can't remove entityReference ".concat(entityReferenceId, ": ").concat(error.message));
      }
      dispatch == null ? void 0 : dispatch(tr);
      return true;
    };
  }
  scrollToEntityReference(entityReferenceId) {
    return ({ tr, dispatch }) => {
      const entityReference = this.getEntityReferenceById(entityReferenceId);
      if (!entityReference) {
        return false;
      }
      const { doc } = tr;
      const resolvedFrom = doc.resolve(entityReference.from);
      const resolvedTo = doc.resolve(entityReference.to);
      const entityReferenceSelection = TextSelection.between(resolvedFrom, resolvedTo);
      dispatch == null ? void 0 : dispatch(tr.setSelection(entityReferenceSelection).scrollIntoView());
      return true;
    };
  }
  getDisjoinedEntityReferences(doc) {
    const disjoinedEntityReferences = [];
    doc.descendants((node, pos) => {
      const subDisjoinedEntityReferences = getDisjoinedEntityReferencesFromNode(
        node,
        pos,
        this.name
      );
      if (subDisjoinedEntityReferences.length === 0) {
        return true;
      }
      disjoinedEntityReferences.push(subDisjoinedEntityReferences);
      return true;
    });
    return disjoinedEntityReferences;
  }
  getEntityReferences(state = this.store.getState()) {
    const entityReferences = getEntityReferencesFromPluginState({
      extension: this,
      state
    }).flat();
    return joinDisjoinedEntityReferences(entityReferences);
  }
  getEntityReferenceById(entityReferenceId, state = this.store.getState()) {
    const entityReferences = getEntityReferencesFromPluginState({
      extension: this,
      state
    }).flat();
    return joinDisjoinedEntityReferences(entityReferences).find(
      (entityReference) => entityReference.id === entityReferenceId
    );
  }
  getEntityReferencesAt(pos, state = this.store.getState()) {
    const { doc, selection } = state;
    const { from, to } = getTextSelection(pos != null ? pos : selection, doc);
    const disjointedEntityReferences = getEntityReferencesFromPluginState({
      extension: this,
      state
    }).flat();
    const entityReferenceIdsInPos = new Set(
      disjointedEntityReferences.filter(
        (entityReference) => within(from, entityReference.from, entityReference.to) || within(to, entityReference.from, entityReference.to) || within(entityReference.from, from, to) || within(entityReference.to, from, to)
      ).map((h) => h.id)
    );
    return joinDisjoinedEntityReferences(disjointedEntityReferences).filter(
      (h) => entityReferenceIdsInPos.has(h.id)
    );
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "addEntityReference", _addEntityReference_dec, EntityReferenceExtension);
__decorateElement(_init, 1, "removeEntityReference", _removeEntityReference_dec, EntityReferenceExtension);
__decorateElement(_init, 1, "scrollToEntityReference", _scrollToEntityReference_dec, EntityReferenceExtension);
__decorateElement(_init, 1, "getDisjoinedEntityReferences", _getDisjoinedEntityReferences_dec, EntityReferenceExtension);
__decorateElement(_init, 1, "getEntityReferences", _getEntityReferences_dec, EntityReferenceExtension);
__decorateElement(_init, 1, "getEntityReferenceById", _getEntityReferenceById_dec, EntityReferenceExtension);
__decorateElement(_init, 1, "getEntityReferencesAt", _getEntityReferencesAt_dec, EntityReferenceExtension);
EntityReferenceExtension = __decorateElement(_init, 0, "EntityReferenceExtension", _EntityReferenceExtension_decorators, EntityReferenceExtension);
__runInitializers(_init, 1, EntityReferenceExtension);

// src/entity-reference-positioners.ts
import { selectionPositioner } from "@remirror/extension-positioner";
var centeredEntityReferencePositioner = selectionPositioner.clone({
  getActive: (props) => {
    const { state, view, helpers } = props;
    if (!state.selection.empty) {
      return [];
    }
    const entityReferences = helpers.getEntityReferencesAt(
      state.selection.from
    );
    if (entityReferences.length === 0) {
      return [];
    }
    const shortestEntityReference = entityReferences.sort(
      (entityReference1, entityReference2) => {
        var _a2, _b;
        return ((_a2 = entityReference1.text) != null ? _a2 : "").length - ((_b = entityReference2.text) != null ? _b : "").length;
      }
    )[0];
    if (!shortestEntityReference) {
      return [];
    }
    const from = view.coordsAtPos(shortestEntityReference.from);
    const to = view.coordsAtPos(shortestEntityReference.to);
    return [{ from, to }];
  }
});
export {
  EntityReferenceExtension,
  centeredEntityReferencePositioner,
  findMinMaxRange,
  getShortestEntityReference
};
