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
  var _a6;
  return [, , , __create((_a6 = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a6 : null)];
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
  BulletListExtension: () => BulletListExtension,
  ListItemExtension: () => ListItemExtension,
  ListItemSharedExtension: () => ListItemSharedExtension,
  OrderedListExtension: () => OrderedListExtension,
  TaskListExtension: () => TaskListExtension,
  TaskListItemExtension: () => TaskListItemExtension,
  dedentList: () => dedentList,
  indentList: () => indentList,
  sharedLiftListItem: () => sharedLiftListItem,
  sharedSinkListItem: () => sharedSinkListItem,
  toggleList: () => toggleList,
  wrapSelectedItems: () => wrapSelectedItems
});
module.exports = __toCommonJS(src_exports);

// src/bullet-list-extension.ts
var import_core5 = require("@remirror/core");
var import_messages = require("@remirror/messages");
var import_inputrules = require("@remirror/pm/inputrules");
var import_state4 = require("@remirror/pm/state");
var import_theme3 = require("@remirror/theme");

// src/list-commands.ts
var import_core2 = require("@remirror/core");
var import_commands = require("@remirror/pm/commands");
var import_model = require("@remirror/pm/model");
var import_schema_list = require("@remirror/pm/schema-list");
var import_state = require("@remirror/pm/state");
var import_transform = require("@remirror/pm/transform");

// src/list-utils.ts
var import_core = require("@remirror/core");
function isList(type) {
  var _a6;
  return !!((_a6 = type.spec.group) == null ? void 0 : _a6.includes(import_core.ExtensionTag.ListContainerNode));
}
function isListItem(type) {
  var _a6;
  return !!((_a6 = type.spec.group) == null ? void 0 : _a6.includes(import_core.ExtensionTag.ListItemNode));
}
function isListNode(node) {
  return isList(node.type);
}
function isListItemNode(node) {
  return isListItem(node.type);
}

// src/list-commands.ts
function toggleList(listType, itemType) {
  return (props) => {
    const { dispatch, tr } = props;
    const state = (0, import_core2.chainableEditorState)(tr, props.state);
    const { $from, $to } = tr.selection;
    const range = $from.blockRange($to);
    if (!range) {
      return false;
    }
    const parentList = (0, import_core2.findParentNode)({
      predicate: (node) => isList(node.type),
      selection: tr.selection
    });
    if (
      // the selection range is right inside the list
      parentList && range.depth - parentList.depth <= 1 && // the selectron range is the first child of the list
      range.startIndex === 0
    ) {
      if (parentList.node.type === listType) {
        return liftListItemOutOfList(itemType)(props);
      }
      if (isList(parentList.node.type)) {
        if (listType.validContent(parentList.node.content)) {
          dispatch == null ? void 0 : dispatch(tr.setNodeMarkup(parentList.pos, listType));
          return true;
        }
        if (deepChangeListType(tr, parentList, listType, itemType)) {
          dispatch == null ? void 0 : dispatch(tr.scrollIntoView());
          return true;
        }
        return false;
      }
    }
    return (0, import_schema_list.wrapInList)(listType)(state, dispatch);
  };
}
function splitListItem(listItemTypeOrName, ignoreAttrs = ["checked"]) {
  return function({ tr, dispatch, state }) {
    var _a6, _b;
    const listItemType = (0, import_core2.getNodeType)(listItemTypeOrName, state.schema);
    const { $from, $to } = tr.selection;
    if (
      // Don't apply to node selection where the selected node is a block (inline nodes might be okay)
      // eslint-disable-next-line unicorn/consistent-destructuring
      (0, import_core2.isNodeSelection)(tr.selection) && tr.selection.node.isBlock || // List items can only exists at a depth of 2 or greater
      $from.depth < 2 || // Don't apply to a selection which spans multiple nodes.
      !$from.sameParent($to)
    ) {
      return false;
    }
    const grandParent = $from.node(-1);
    if (grandParent.type !== listItemType) {
      return false;
    }
    if ($from.parent.content.size === 0 && $from.node(-1).childCount === $from.indexAfter(-1)) {
      if ($from.depth === 2 || $from.node(-3).type !== listItemType || $from.index(-2) !== $from.node(-2).childCount - 1) {
        return false;
      }
      if (dispatch) {
        const keepItem = $from.index(-1) > 0;
        let wrap = import_model.Fragment.empty;
        for (let depth = $from.depth - (keepItem ? 1 : 2); depth >= $from.depth - 3; depth--) {
          wrap = import_model.Fragment.from($from.node(depth).copy(wrap));
        }
        const content = ((_a6 = listItemType.contentMatch.defaultType) == null ? void 0 : _a6.createAndFill()) || void 0;
        wrap = wrap.append(import_model.Fragment.from(listItemType.createAndFill(null, content) || void 0));
        const depthAfter = $from.indexAfter(-1) < $from.node(-2).childCount ? 1 : $from.indexAfter(-2) < $from.node(-3).childCount ? 2 : 3;
        tr.replace(
          $from.before(keepItem ? void 0 : -1),
          $from.after(-depthAfter),
          new import_model.Slice(wrap, keepItem ? 3 : 2, 2)
        );
        tr.setSelection(
          tr.selection.constructor.near(
            tr.doc.resolve($from.pos + (keepItem ? 3 : 2))
          )
        );
        dispatch(tr.scrollIntoView());
      }
      return true;
    }
    if (grandParent.attrs.closed && $from.sameParent($to) && $to.pos === $to.end()) {
      if (dispatch) {
        const newListItemStartPos = $from.after(-1);
        const content = ((_b = listItemType.contentMatch.defaultType) == null ? void 0 : _b.createAndFill()) || void 0;
        const newListItem = listItemType.createAndFill(null, content);
        if (newListItem) {
          tr.insert(newListItemStartPos, newListItem);
          tr.setSelection(import_state.TextSelection.near(tr.doc.resolve(newListItemStartPos + 1)));
        }
        tr.delete($from.pos, $to.pos);
        dispatch(tr.scrollIntoView());
      }
      return true;
    }
    const listItemAttributes = Object.fromEntries(
      Object.entries(grandParent.attrs).filter(([attr]) => !ignoreAttrs.includes(attr))
    );
    const contentType = $to.pos === $from.end() ? grandParent.contentMatchAt(0).defaultType : null;
    const contentAttributes = __spreadValues({}, $from.node().attrs);
    tr.delete($from.pos, $to.pos);
    const types = contentType ? [
      { type: listItemType, attrs: listItemAttributes },
      { type: contentType, attrs: contentAttributes }
    ] : [{ type: listItemType, attrs: listItemAttributes }];
    if (!(0, import_transform.canSplit)(tr.doc, $from.pos, 2)) {
      return false;
    }
    if (dispatch) {
      dispatch(tr.split($from.pos, 2, types).scrollIntoView());
    }
    return true;
  };
}
function getAllListItemNames(allExtensions) {
  return allExtensions.filter((extension4) => extension4.tags.includes(import_core2.ExtensionTag.ListItemNode)).map((extension4) => extension4.name);
}
function getOrderedListItemTypes(listItemNames, state) {
  const { $from, $to } = state.selection;
  const sharedDepth = $from.sharedDepth($to.pos);
  const listItemTypes = /* @__PURE__ */ new Map();
  for (let depth = sharedDepth; depth >= 0; depth--) {
    const type = $from.node(depth).type;
    if (listItemNames.includes(type.name) && !listItemTypes.has(type.name)) {
      listItemTypes.set(type.name, type);
    }
  }
  return listItemTypes;
}
function sharedSinkListItem(allExtensions) {
  const listItemNames = getAllListItemNames(allExtensions);
  return ({ dispatch, state }) => {
    const listItemTypes = getOrderedListItemTypes(listItemNames, state);
    for (const type of listItemTypes.values()) {
      if ((0, import_schema_list.sinkListItem)(type)(state, dispatch)) {
        return true;
      }
    }
    return listItemTypes.size > 0;
  };
}
function sharedLiftListItem(allExtensions) {
  const listItemNames = getAllListItemNames(allExtensions);
  return ({ dispatch, state }) => {
    const listItemTypes = getOrderedListItemTypes(listItemNames, state);
    for (const type of listItemTypes.values()) {
      if ((0, import_schema_list.liftListItem)(type)(state, dispatch)) {
        return true;
      }
    }
    return listItemTypes.size > 0;
  };
}
function deepChangeListType(tr, foundList, listType, itemType) {
  const oldList = foundList.node;
  const $start = tr.doc.resolve(foundList.start);
  const listParent = $start.node(-1);
  const indexBefore = $start.index(-1);
  if (!listParent) {
    return false;
  }
  if (!listParent.canReplace(indexBefore, indexBefore + 1, import_model.Fragment.from(listType.create()))) {
    return false;
  }
  const newItems = [];
  for (let index = 0; index < oldList.childCount; index++) {
    const oldItem = oldList.child(index);
    if (!itemType.validContent(oldItem.content)) {
      return false;
    }
    const newItem = itemType.createChecked(null, oldItem.content);
    newItems.push(newItem);
  }
  const newList = listType.createChecked(null, newItems);
  const start = foundList.pos;
  const end = start + oldList.nodeSize;
  const from = tr.selection.from;
  tr.replaceRangeWith(start, end, newList);
  tr.setSelection(tr.selection.constructor.near(tr.doc.resolve(from)));
  return true;
}
function wrapItems({
  listType,
  itemType,
  tr,
  range
}) {
  var _a6;
  const oldList = range.parent;
  const slice = tr.doc.slice(range.start, range.end);
  if (oldList.type === listType && ((_a6 = slice.content.firstChild) == null ? void 0 : _a6.type) === itemType) {
    return false;
  }
  const newItems = [];
  for (let i = 0; i < slice.content.childCount; i++) {
    const oldItem = slice.content.child(i);
    if (!itemType.validContent(oldItem.content)) {
      return false;
    }
    const newItem = itemType.createChecked(null, oldItem.content);
    newItems.push(newItem);
  }
  const newList = listType.createChecked(null, newItems);
  tr.replaceRange(range.start, range.end, new import_model.Slice(import_model.Fragment.from(newList), 0, 0));
  return true;
}
function wrapSelectedItems({
  listType,
  itemType,
  tr
}) {
  const range = calculateItemRange(tr.selection);
  if (!range) {
    return false;
  }
  const atStart = range.startIndex === 0;
  const { from, to } = tr.selection;
  if (!wrapItems({ listType, itemType, tr, range })) {
    return false;
  }
  tr.setSelection(
    import_state.TextSelection.between(
      tr.doc.resolve(atStart ? from : from + 2),
      tr.doc.resolve(atStart ? to : to + 2)
    )
  );
  tr.scrollIntoView();
  return true;
}
function liftOutOfList(state, dispatch, range) {
  const tr = state.tr, list = range.parent;
  const originMappingLength = tr.mapping.maps.length;
  for (let pos = range.end, i = range.endIndex - 1, e = range.startIndex; i > e; i--) {
    pos -= list.child(i).nodeSize;
    tr.delete(pos - 1, pos + 1);
  }
  const $start = tr.doc.resolve(range.start), item = $start.nodeAfter;
  if (!item) {
    return false;
  }
  if (tr.mapping.slice(originMappingLength).map(range.end) !== range.start + item.nodeSize) {
    return false;
  }
  const atStart = range.startIndex === 0, atEnd = range.endIndex === list.childCount;
  const parent = $start.node(-1), indexBefore = $start.index(-1);
  if (!parent.canReplace(
    indexBefore + (atStart ? 0 : 1),
    indexBefore + 1,
    item.content.append(atEnd ? import_model.Fragment.empty : import_model.Fragment.from(list))
  )) {
    return false;
  }
  const start = $start.pos, end = start + item.nodeSize;
  tr.step(
    new import_transform.ReplaceAroundStep(
      start - (atStart ? 1 : 0),
      end + (atEnd ? 1 : 0),
      start + 1,
      end - 1,
      new import_model.Slice(
        (atStart ? import_model.Fragment.empty : import_model.Fragment.from(list.copy(import_model.Fragment.empty))).append(
          atEnd ? import_model.Fragment.empty : import_model.Fragment.from(list.copy(import_model.Fragment.empty))
        ),
        atStart ? 0 : 1,
        atEnd ? 0 : 1
      ),
      atStart ? 0 : 1
    )
  );
  dispatch(tr.scrollIntoView());
  return true;
}
function maybeJoinList(tr, $pos) {
  const $from = $pos || tr.selection.$from;
  let joinable = [];
  let index;
  let parent;
  let before;
  let after;
  for (let depth = $from.depth; depth >= 0; depth--) {
    parent = $from.node(depth);
    index = $from.index(depth);
    before = parent.maybeChild(index - 1);
    after = parent.maybeChild(index);
    if (before && after && before.type.name === after.type.name && isListNode(before)) {
      const pos = $from.before(depth + 1);
      joinable.push(pos);
    }
    index = $from.indexAfter(depth);
    before = parent.maybeChild(index - 1);
    after = parent.maybeChild(index);
    if (before && after && before.type.name === after.type.name && isListNode(before)) {
      const pos = $from.after(depth + 1);
      joinable.push(pos);
    }
  }
  joinable = [...new Set(joinable)].sort((a, b) => b - a);
  let updated = false;
  for (const pos of joinable) {
    if ((0, import_transform.canJoin)(tr.doc, pos)) {
      tr.join(pos);
      updated = true;
    }
  }
  return updated;
}
function liftListItemOutOfList(itemType) {
  return (props) => {
    const { dispatch, tr } = props;
    const state = (0, import_core2.chainableEditorState)(tr, props.state);
    const range = getItemRange(itemType, tr.selection);
    if (!range) {
      return false;
    }
    if (!dispatch) {
      return true;
    }
    liftOutOfList(state, dispatch, range);
    return true;
  };
}
function getItemRange(itemType, selection) {
  const { $from, $to } = selection;
  const range = $from.blockRange($to, (node) => {
    var _a6;
    return ((_a6 = node.firstChild) == null ? void 0 : _a6.type) === itemType;
  });
  return range;
}
function calculateItemRange(selection) {
  const { $from, $to } = selection;
  return $from.blockRange($to, isListNode);
}
function wrapListBackward(tr) {
  const $cursor = tr.selection.$from;
  const range = $cursor.blockRange();
  if (!range || !isListItemNode(range.parent) || range.startIndex !== 0) {
    return false;
  }
  const root = $cursor.node(range.depth - 2);
  const itemIndex = $cursor.index(range.depth);
  const listIndex = $cursor.index(range.depth - 1);
  const rootIndex = $cursor.index(range.depth - 2);
  const previousList = root.maybeChild(rootIndex - 1);
  const previousListItem = previousList == null ? void 0 : previousList.lastChild;
  if (
    // current node must be the first node in its parent list item;
    itemIndex !== 0 || // current list item must be the first list item in its parent list;
    listIndex !== 0
  ) {
    return false;
  }
  if (
    // there is a list before current list;
    previousList && isListNode(previousList) && // we can find the list item type for previousList;
    previousListItem && isListItemNode(previousListItem)
  ) {
    return wrapSelectedItems({
      listType: previousList.type,
      itemType: previousListItem.type,
      tr
    });
  }
  if (isListItemNode(root)) {
    const parentListItem = root;
    const parentList = $cursor.node(range.depth - 3);
    if (isListNode(parentList)) {
      return wrapSelectedItems({
        listType: parentList.type,
        itemType: parentListItem.type,
        tr
      });
    }
  }
  return false;
}
function listBackspace({ view }) {
  if (!view) {
    return false;
  }
  {
    const $cursor = view.state.selection.$cursor;
    if (!$cursor || $cursor.parentOffset > 0) {
      return false;
    }
    const range = $cursor.blockRange();
    if (!range || !isListItemNode(range.parent) || range.startIndex !== 0) {
      return false;
    }
  }
  {
    const tr = view.state.tr;
    if (wrapListBackward(tr)) {
      view.dispatch(tr);
    }
  }
  {
    const $cursor = view.state.selection.$cursor;
    if (!$cursor || $cursor.parentOffset > 0) {
      return false;
    }
    const range = $cursor.blockRange();
    if (!range || !isListItemNode(range.parent) || range.startIndex !== 0) {
      return false;
    }
    const itemIndex = $cursor.index(range.depth);
    const listIndex = $cursor.index(range.depth - 1);
    const rootIndex = $cursor.index(range.depth - 2);
    const isNestedList = range.depth - 2 >= 1 && isListItemNode($cursor.node(range.depth - 2));
    if (itemIndex === 0 && listIndex === 0 && rootIndex <= 1 && isNestedList) {
      (0, import_schema_list.liftListItem)(range.parent.type)(view.state, view.dispatch);
    }
  }
  (0, import_commands.joinBackward)(view.state, view.dispatch, view);
  return true;
}

// src/list-item-extension.ts
var import_core4 = require("@remirror/core");
var import_state3 = require("@remirror/pm/state");
var import_theme2 = require("@remirror/theme");

// src/list-item-node-view.ts
var import_theme = require("@remirror/theme");
function createCustomMarkListItemNodeView({
  node,
  mark,
  updateDOM,
  updateMark
}) {
  const markContainer = document.createElement("label");
  markContainer.contentEditable = "false";
  markContainer.classList.add(import_theme.ExtensionListTheme.LIST_ITEM_MARKER_CONTAINER);
  markContainer.append(mark);
  const contentDOM = document.createElement("div");
  const dom = document.createElement("li");
  dom.classList.add(import_theme.ExtensionListTheme.LIST_ITEM_WITH_CUSTOM_MARKER);
  dom.append(markContainer);
  dom.append(contentDOM);
  const update = (newNode) => {
    if (newNode.type !== node.type) {
      return false;
    }
    node = newNode;
    updateDOM(node, dom);
    updateMark(node, mark);
    return true;
  };
  update(node);
  return { dom, contentDOM, update };
}

// src/list-item-shared-extension.ts
var import_core3 = require("@remirror/core");

// src/list-command-dedent.ts
var import_model2 = require("@remirror/pm/model");
var import_transform2 = require("@remirror/pm/transform");
function findParentItem($from, range) {
  const parentItem = $from.node(range.depth - 1);
  const parentList = $from.node(range.depth - 2);
  if (!isListItemNode(parentItem) || !isListNode(parentList)) {
    return false;
  }
  return { parentItem, parentList };
}
function indentSiblingsOfItems(tr, range) {
  const selectedList = range.parent;
  const lastSelectedItem = range.parent.child(range.endIndex - 1);
  const endOfRange = range.end;
  const endOfSelectedList = range.$to.end(range.depth);
  if (endOfRange < endOfSelectedList) {
    tr.step(
      new import_transform2.ReplaceAroundStep(
        endOfRange - 1,
        endOfSelectedList,
        endOfRange,
        endOfSelectedList,
        new import_model2.Slice(import_model2.Fragment.from(lastSelectedItem.type.create(null, selectedList.copy())), 1, 0),
        1,
        true
      )
    );
    return new import_model2.NodeRange(
      tr.doc.resolve(range.$from.pos),
      tr.doc.resolve(endOfSelectedList),
      range.depth
    );
  }
  return range;
}
function indentSiblingsOfList(tr, range) {
  const selectedList = range.parent;
  const lastSelectedItem = range.parent.child(range.endIndex - 1);
  const endOfSelectedList = range.end;
  const endOfParentListItem = range.$to.end(range.depth - 1);
  if (endOfSelectedList + 1 < endOfParentListItem) {
    tr.step(
      new import_transform2.ReplaceAroundStep(
        endOfSelectedList - 1,
        endOfParentListItem,
        endOfSelectedList + 1,
        endOfParentListItem,
        new import_model2.Slice(
          import_model2.Fragment.from(selectedList.type.create(null, lastSelectedItem.type.create(null))),
          2,
          0
        ),
        0,
        true
      )
    );
    return new import_model2.NodeRange(tr.selection.$from, tr.selection.$to, range.depth);
  }
  return range;
}
function changeItemsType(tr, range, parentList, parentItem) {
  const wrapped = wrapSelectedItems({
    listType: parentList.type,
    itemType: parentItem.type,
    tr
  });
  if (wrapped) {
    return new import_model2.NodeRange(tr.selection.$from, tr.selection.$to, range.depth);
  }
  return range;
}
function dedentList(tr) {
  let range = calculateItemRange(tr.selection);
  if (!range) {
    return false;
  }
  const findParentItemResult = findParentItem(tr.selection.$from, range);
  if (!findParentItemResult) {
    return false;
  }
  const { parentItem, parentList } = findParentItemResult;
  range = indentSiblingsOfItems(tr, range);
  range = indentSiblingsOfList(tr, range);
  range = changeItemsType(tr, range, parentList, parentItem);
  const target = (0, import_transform2.liftTarget)(range);
  if (typeof target !== "number") {
    return true;
  }
  tr.lift(range, target);
  range = calculateItemRange(tr.selection);
  if (range) {
    maybeJoinList(tr, tr.doc.resolve(range.end - 2));
  }
  return true;
}
var dedentListCommand = ({ tr, dispatch }) => {
  if (dedentList(tr)) {
    dispatch == null ? void 0 : dispatch(tr.scrollIntoView());
    return true;
  }
  return false;
};

// src/list-command-indent.ts
var import_model3 = require("@remirror/pm/model");
var import_state2 = require("@remirror/pm/state");
function findPreviousItem(selectedList, $from, range) {
  let previousItem;
  let previousList;
  let previousItemStart;
  let previousListStart;
  const doc = $from.doc;
  if (range.startIndex >= 1) {
    previousItem = selectedList.child(range.startIndex - 1);
    previousList = selectedList;
    previousListStart = doc.resolve(range.start).start(range.depth);
    previousItemStart = previousListStart + 1;
    for (let i = 0; i < range.startIndex - 1; i++) {
      previousItemStart += previousList.child(i).nodeSize;
    }
  } else {
    const listIndex = $from.index(range.depth - 1);
    if (listIndex >= 1) {
      const listParent = $from.node(range.depth - 1);
      const listParentStart = $from.start(range.depth - 1);
      previousList = listParent.child(listIndex - 1);
      if (!isListNode(previousList)) {
        return false;
      }
      previousListStart = listParentStart + 1;
      for (let i = 0; i < listIndex - 1; i++) {
        previousListStart += listParent.child(i).nodeSize;
      }
      previousItem = previousList.child(previousList.childCount - 1);
      previousItemStart = previousListStart + previousList.nodeSize - previousItem.nodeSize - 1;
      if (!isListItemNode(previousItem)) {
        return false;
      }
    } else {
      return false;
    }
  }
  return {
    previousItem,
    previousList,
    previousItemStart,
    previousListStart
  };
}
function sliceSelectedItems(doc, $to, range) {
  let selectedSlice;
  let unselectedSlice;
  const start = range.start;
  const mid = $to.depth >= range.depth + 2 ? $to.end(range.depth + 2) : range.end - 1;
  const end = range.end;
  if (mid + 1 >= end) {
    selectedSlice = doc.slice(start, end);
    unselectedSlice = null;
  } else {
    selectedSlice = doc.slice(start, mid);
    unselectedSlice = doc.slice(mid + 1, end - 1);
  }
  return { selectedSlice, unselectedSlice };
}
function indentList(tr) {
  const { $from, $to } = tr.selection;
  const range = calculateItemRange(tr.selection);
  if (!range) {
    return false;
  }
  const selectedList = tr.doc.resolve(range.start).node();
  if (!isListNode(selectedList)) {
    return false;
  }
  const findPreviousItemResult = findPreviousItem(selectedList, $from, range);
  if (!findPreviousItemResult) {
    return false;
  }
  const { previousItem, previousList, previousItemStart } = findPreviousItemResult;
  const { selectedSlice, unselectedSlice } = sliceSelectedItems(tr.doc, $to, range);
  const newPreviousItemContent = previousItem.content.append(import_model3.Fragment.fromArray([selectedList.copy(selectedSlice.content)])).append(unselectedSlice ? unselectedSlice.content : import_model3.Fragment.empty);
  tr.deleteRange(range.start, range.end);
  const previousItemEnd = previousItemStart + previousItem.nodeSize - 2;
  const newPreviousItem = previousItem.copy(newPreviousItemContent);
  newPreviousItem.check();
  tr.replaceRangeWith(previousItemStart - 1, previousItemEnd + 1, newPreviousItem);
  tr.setSelection(
    previousList === selectedList ? import_state2.TextSelection.between(tr.doc.resolve($from.pos), tr.doc.resolve($to.pos)) : import_state2.TextSelection.between(tr.doc.resolve($from.pos - 2), tr.doc.resolve($to.pos - 2))
  );
  return true;
}
var indentListCommand = ({ tr, dispatch }) => {
  if (indentList(tr)) {
    dispatch == null ? void 0 : dispatch(tr.scrollIntoView());
    return true;
  }
  return false;
};

// src/list-item-shared-extension.ts
var ListItemSharedExtension = class extends import_core3.PlainExtension {
  get name() {
    return "listItemShared";
  }
  createKeymap() {
    const pcKeymap = {
      Tab: indentListCommand,
      "Shift-Tab": dedentListCommand,
      Backspace: listBackspace,
      "Mod-Backspace": listBackspace
    };
    if (import_core3.environment.isMac) {
      const macKeymap = {
        "Ctrl-h": pcKeymap["Backspace"],
        "Alt-Backspace": pcKeymap["Mod-Backspace"]
      };
      return __spreadValues(__spreadValues({}, pcKeymap), macKeymap);
    }
    return pcKeymap;
  }
  createPlugin() {
    return {
      appendTransaction: (_transactions, _oldState, newState) => {
        const tr = newState.tr;
        const updated = maybeJoinList(tr);
        return updated ? tr : null;
      }
    };
  }
};

// src/list-item-extension.ts
var _liftListItemOutOfList_dec, _toggleListItemClosed_dec, _a, _ListItemExtension_decorators, _init;
_ListItemExtension_decorators = [(0, import_core4.extension)({
  defaultOptions: { enableCollapsible: false },
  staticKeys: ["enableCollapsible"]
})];
var ListItemExtension = class extends (_a = import_core4.NodeExtension, _toggleListItemClosed_dec = [(0, import_core4.command)()], _liftListItemOutOfList_dec = [(0, import_core4.command)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "listItem";
  }
  createTags() {
    return [import_core4.ExtensionTag.ListItemNode];
  }
  createNodeSpec(extra, override) {
    var _a6;
    return __spreadProps(__spreadValues({
      content: "paragraph block*",
      defining: true,
      draggable: false
    }, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        closed: { default: false },
        nested: { default: false }
      }),
      parseDOM: [
        {
          tag: "li",
          getAttrs: extra.parse,
          priority: import_core4.ExtensionPriority.Lowest
          // Make sure this rule has lower priority then `TaskListItemExtension`'s
        },
        ...(_a6 = override.parseDOM) != null ? _a6 : []
      ],
      toDOM: (node) => {
        const attrs = extra.dom(node);
        return ["li", attrs, 0];
      }
    });
  }
  createNodeViews() {
    if (!this.options.enableCollapsible) {
      return {};
    }
    return (node, view, getPos) => {
      const mark = document.createElement("div");
      mark.classList.add(import_theme2.ExtensionListTheme.COLLAPSIBLE_LIST_ITEM_BUTTON);
      mark.contentEditable = "false";
      mark.addEventListener("click", () => {
        if (mark.classList.contains("disabled")) {
          return;
        }
        const pos = getPos();
        const selection = import_state3.NodeSelection.create(view.state.doc, pos);
        view.dispatch(view.state.tr.setSelection(selection));
        this.store.commands.toggleListItemClosed();
        return true;
      });
      return createCustomMarkListItemNodeView({
        mark,
        node,
        updateDOM: updateNodeViewDOM,
        updateMark: updateNodeViewMark
      });
    };
  }
  createKeymap() {
    return {
      Enter: splitListItem(this.type)
    };
  }
  createExtensions() {
    return [new ListItemSharedExtension()];
  }
  toggleListItemClosed(closed) {
    return ({ state: { tr, selection }, dispatch }) => {
      if (!(0, import_core4.isNodeSelection)(selection) || selection.node.type.name !== this.name) {
        return false;
      }
      const { node, from } = selection;
      closed = (0, import_core4.isBoolean)(closed) ? closed : !node.attrs.closed;
      dispatch == null ? void 0 : dispatch(tr.setNodeMarkup(from, void 0, __spreadProps(__spreadValues({}, node.attrs), { closed })));
      return true;
    };
  }
  liftListItemOutOfList(listItemType) {
    return liftListItemOutOfList(listItemType != null ? listItemType : this.type);
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "toggleListItemClosed", _toggleListItemClosed_dec, ListItemExtension);
__decorateElement(_init, 1, "liftListItemOutOfList", _liftListItemOutOfList_dec, ListItemExtension);
ListItemExtension = __decorateElement(_init, 0, "ListItemExtension", _ListItemExtension_decorators, ListItemExtension);
__runInitializers(_init, 1, ListItemExtension);
function updateNodeViewDOM(node, dom) {
  node.attrs.closed ? dom.classList.add(import_theme2.ExtensionListTheme.COLLAPSIBLE_LIST_ITEM_CLOSED) : dom.classList.remove(import_theme2.ExtensionListTheme.COLLAPSIBLE_LIST_ITEM_CLOSED);
}
function updateNodeViewMark(node, mark) {
  node.childCount <= 1 ? mark.classList.add("disabled") : mark.classList.remove("disabled");
}

// src/bullet-list-extension.ts
var _listShortcut_dec, _toggleBulletList_dec, _a2, _BulletListExtension_decorators, _init2;
_BulletListExtension_decorators = [(0, import_core5.extension)({
  defaultOptions: { enableSpine: false },
  staticKeys: ["enableSpine"]
})];
var BulletListExtension = class extends (_a2 = import_core5.NodeExtension, _toggleBulletList_dec = [(0, import_core5.command)({ icon: "listUnordered", label: ({ t }) => t(import_messages.ExtensionListMessages.BULLET_LIST_LABEL) })], _listShortcut_dec = [(0, import_core5.keyBinding)({ shortcut: import_core5.NamedShortcut.BulletList, command: "toggleBulletList" })], _a2) {
  constructor() {
    super(...arguments);
    __runInitializers(_init2, 5, this);
  }
  get name() {
    return "bulletList";
  }
  createTags() {
    return [import_core5.ExtensionTag.Block, import_core5.ExtensionTag.ListContainerNode];
  }
  createNodeSpec(extra, override) {
    var _a6;
    return __spreadProps(__spreadValues({
      content: "listItem+"
    }, override), {
      attrs: extra.defaults(),
      parseDOM: [{ tag: "ul", getAttrs: extra.parse }, ...(_a6 = override.parseDOM) != null ? _a6 : []],
      toDOM: (node) => ["ul", extra.dom(node), 0]
    });
  }
  createNodeViews() {
    if (!this.options.enableSpine) {
      return {};
    }
    return (_, view, getPos) => {
      var _a6;
      const dom = document.createElement("div");
      dom.style.position = "relative";
      const pos = getPos();
      const $pos = view.state.doc.resolve(pos + 1);
      const parentListItemNode = $pos.node($pos.depth - 1);
      const isFirstLevel = ((_a6 = parentListItemNode == null ? void 0 : parentListItemNode.type) == null ? void 0 : _a6.name) !== "listItem";
      if (!isFirstLevel) {
        const spine = document.createElement("div");
        spine.contentEditable = "false";
        spine.classList.add(import_theme3.ExtensionListTheme.LIST_SPINE);
        spine.addEventListener("click", (event) => {
          const pos2 = getPos();
          const $pos2 = view.state.doc.resolve(pos2 + 1);
          const parentListItemPos = $pos2.start($pos2.depth - 1);
          const selection = import_state4.NodeSelection.create(view.state.doc, parentListItemPos - 1);
          view.dispatch(view.state.tr.setSelection(selection));
          this.store.commands.toggleListItemClosed();
          event.preventDefault();
          event.stopPropagation();
        });
        dom.append(spine);
      }
      const contentDOM = document.createElement("ul");
      contentDOM.classList.add(import_theme3.ExtensionListTheme.UL_LIST_CONTENT);
      dom.append(contentDOM);
      return {
        dom,
        contentDOM
      };
    };
  }
  createExtensions() {
    return [
      new ListItemExtension({
        priority: import_core5.ExtensionPriority.Low,
        enableCollapsible: this.options.enableSpine
      })
    ];
  }
  toggleBulletList() {
    return toggleList(this.type, (0, import_core5.assertGet)(this.store.schema.nodes, "listItem"));
  }
  listShortcut(props) {
    return this.toggleBulletList()(props);
  }
  createInputRules() {
    const regexp = /^\s*([*+-])\s$/;
    return [
      (0, import_inputrules.wrappingInputRule)(regexp, this.type),
      new import_inputrules.InputRule(regexp, (state, _match, start, end) => {
        const tr = state.tr;
        tr.deleteRange(start, end);
        const canUpdate = wrapSelectedItems({
          listType: this.type,
          itemType: (0, import_core5.assertGet)(this.store.schema.nodes, "listItem"),
          tr
        });
        if (!canUpdate) {
          return null;
        }
        return tr;
      })
    ];
  }
};
_init2 = __decoratorStart(_a2);
__decorateElement(_init2, 1, "toggleBulletList", _toggleBulletList_dec, BulletListExtension);
__decorateElement(_init2, 1, "listShortcut", _listShortcut_dec, BulletListExtension);
BulletListExtension = __decorateElement(_init2, 0, "BulletListExtension", _BulletListExtension_decorators, BulletListExtension);
__runInitializers(_init2, 1, BulletListExtension);

// src/ordered-list-extension.ts
var import_core6 = require("@remirror/core");
var import_messages2 = require("@remirror/messages");
var import_inputrules2 = require("@remirror/pm/inputrules");
var _listShortcut_dec2, _toggleOrderedList_dec, _a3, _OrderedListExtension_decorators, _init3;
_OrderedListExtension_decorators = [(0, import_core6.extension)({})];
var OrderedListExtension = class extends (_a3 = import_core6.NodeExtension, _toggleOrderedList_dec = [(0, import_core6.command)({ icon: "listOrdered", label: ({ t }) => t(import_messages2.ExtensionListMessages.ORDERED_LIST_LABEL) })], _listShortcut_dec2 = [(0, import_core6.keyBinding)({ shortcut: import_core6.NamedShortcut.OrderedList, command: "toggleOrderedList" })], _a3) {
  constructor() {
    super(...arguments);
    __runInitializers(_init3, 5, this);
  }
  get name() {
    return "orderedList";
  }
  createTags() {
    return [import_core6.ExtensionTag.Block, import_core6.ExtensionTag.ListContainerNode];
  }
  createNodeSpec(extra, override) {
    var _a6;
    return __spreadProps(__spreadValues({
      content: "listItem+"
    }, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        order: {
          default: 1
        }
      }),
      parseDOM: [
        {
          tag: "ol",
          getAttrs: (node) => {
            var _a7;
            if (!(0, import_core6.isElementDomNode)(node)) {
              return {};
            }
            return __spreadProps(__spreadValues({}, extra.parse(node)), {
              order: +((_a7 = node.getAttribute("start")) != null ? _a7 : 1)
            });
          }
        },
        ...(_a6 = override.parseDOM) != null ? _a6 : []
      ],
      toDOM: (node) => {
        const extraAttributes = extra.dom(node);
        return node.attrs.order === 1 ? ["ol", extraAttributes, 0] : ["ol", __spreadProps(__spreadValues({}, extraAttributes), { start: node.attrs.order }), 0];
      }
    });
  }
  /**
   * Automatically add the `ListItemExtension` which is required here.
   */
  createExtensions() {
    return [new ListItemExtension({ priority: import_core6.ExtensionPriority.Low })];
  }
  toggleOrderedList() {
    return toggleList(this.type, (0, import_core6.assertGet)(this.store.schema.nodes, "listItem"));
  }
  listShortcut(props) {
    return this.toggleOrderedList()(props);
  }
  createInputRules() {
    const regexp = /^(\d+)\.\s$/;
    return [
      (0, import_inputrules2.wrappingInputRule)(
        regexp,
        this.type,
        (match) => ({ order: +(0, import_core6.assertGet)(match, 1) }),
        (match, node) => node.childCount + node.attrs.order === +(0, import_core6.assertGet)(match, 1)
      ),
      new import_inputrules2.InputRule(regexp, (state, match, start, end) => {
        const tr = state.tr;
        tr.deleteRange(start, end);
        const canUpdate = wrapSelectedItems({
          listType: this.type,
          itemType: (0, import_core6.assertGet)(this.store.schema.nodes, "listItem"),
          tr
        });
        if (!canUpdate) {
          return null;
        }
        const order = +(0, import_core6.assertGet)(match, 1);
        if (order !== 1) {
          const found = (0, import_core6.findParentNodeOfType)({ selection: tr.selection, types: this.type });
          if (found) {
            tr.setNodeMarkup(found.pos, void 0, { order });
          }
        }
        return tr;
      })
    ];
  }
};
_init3 = __decoratorStart(_a3);
__decorateElement(_init3, 1, "toggleOrderedList", _toggleOrderedList_dec, OrderedListExtension);
__decorateElement(_init3, 1, "listShortcut", _listShortcut_dec2, OrderedListExtension);
OrderedListExtension = __decorateElement(_init3, 0, "OrderedListExtension", _OrderedListExtension_decorators, OrderedListExtension);
__runInitializers(_init3, 1, OrderedListExtension);

// src/task-list-extension.ts
var import_core8 = require("@remirror/core");
var import_messages3 = require("@remirror/messages");

// src/task-list-item-extension.ts
var import_core7 = require("@remirror/core");
var import_inputrules3 = require("@remirror/pm/inputrules");
var import_theme4 = require("@remirror/theme");
var _toggleCheckboxChecked_dec, _a4, _init4;
var TaskListItemExtension = class extends (_a4 = import_core7.NodeExtension, _toggleCheckboxChecked_dec = [(0, import_core7.command)()], _a4) {
  constructor() {
    super(...arguments);
    __runInitializers(_init4, 5, this);
  }
  get name() {
    return "taskListItem";
  }
  createTags() {
    return [import_core7.ExtensionTag.ListItemNode];
  }
  createNodeSpec(extra, override) {
    var _a6;
    return __spreadProps(__spreadValues({
      content: "paragraph block*",
      defining: true,
      draggable: false
    }, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        checked: { default: false }
      }),
      parseDOM: [
        {
          tag: "li[data-task-list-item]",
          getAttrs: (node) => {
            let checked = false;
            if ((0, import_core7.isElementDomNode)(node) && node.getAttribute("data-checked") !== null) {
              checked = true;
            }
            return __spreadValues({
              checked
            }, extra.parse(node));
          },
          // Make sure it has higher priority then ListItemExtension's parseDOM by default
          priority: import_core7.ExtensionPriority.Medium
        },
        ...(_a6 = override.parseDOM) != null ? _a6 : []
      ],
      toDOM: (node) => [
        "li",
        __spreadProps(__spreadValues({}, extra.dom(node)), {
          "data-task-list-item": "",
          "data-checked": node.attrs.checked ? "" : void 0
        }),
        0
      ]
    });
  }
  createNodeViews() {
    return (node, view, getPos) => {
      const mark = document.createElement("input");
      mark.type = "checkbox";
      mark.classList.add(import_theme4.ExtensionListTheme.LIST_ITEM_CHECKBOX);
      mark.contentEditable = "false";
      mark.addEventListener("click", (e) => {
        if (!view.editable) {
          e.preventDefault();
        }
      });
      mark.addEventListener("change", () => {
        const pos = getPos();
        const $pos = view.state.doc.resolve(pos + 1);
        this.store.commands.toggleCheckboxChecked({ $pos });
      });
      mark.checked = node.attrs.checked;
      return createCustomMarkListItemNodeView({
        node,
        mark,
        updateDOM: updateNodeViewDOM2,
        updateMark: updateNodeViewMark2
      });
    };
  }
  createKeymap() {
    return {
      Enter: splitListItem(this.type)
    };
  }
  createExtensions() {
    return [new ListItemSharedExtension()];
  }
  toggleCheckboxChecked(props) {
    let checked;
    let $pos;
    if (typeof props === "boolean") {
      checked = props;
    } else if (props) {
      checked = props.checked;
      $pos = props.$pos;
    }
    return ({ tr, dispatch }) => {
      const found = (0, import_core7.findParentNodeOfType)({
        selection: $pos != null ? $pos : tr.selection.$from,
        types: this.type
      });
      if (!found) {
        return false;
      }
      const { node, pos } = found;
      const attrs = __spreadProps(__spreadValues({}, node.attrs), { checked: checked != null ? checked : !node.attrs.checked });
      dispatch == null ? void 0 : dispatch(tr.setNodeMarkup(pos, void 0, attrs));
      return true;
    };
  }
  createInputRules() {
    const regexp = /^\s*(\[( ?|x|X)]\s)$/;
    return [
      (0, import_inputrules3.wrappingInputRule)(regexp, this.type, (match) => ({
        checked: ["x", "X"].includes((0, import_core7.getMatchString)(match, 2))
      })),
      new import_inputrules3.InputRule(regexp, (state, match, start, end) => {
        const tr = state.tr;
        tr.deleteRange(start, end);
        const canUpdate = wrapSelectedItems({
          listType: (0, import_core7.assertGet)(this.store.schema.nodes, "taskList"),
          itemType: this.type,
          tr
        });
        if (!canUpdate) {
          return null;
        }
        const checked = ["x", "X"].includes((0, import_core7.getMatchString)(match, 2));
        if (checked) {
          const found = (0, import_core7.findParentNodeOfType)({ selection: tr.selection, types: this.type });
          if (found) {
            tr.setNodeMarkup(found.pos, void 0, { checked });
          }
        }
        return tr;
      })
    ];
  }
};
_init4 = __decoratorStart(_a4);
__decorateElement(_init4, 1, "toggleCheckboxChecked", _toggleCheckboxChecked_dec, TaskListItemExtension);
__decoratorMetadata(_init4, TaskListItemExtension);
function updateNodeViewDOM2(node, dom) {
  node.attrs.checked ? dom.setAttribute("data-checked", "") : dom.removeAttribute("data-checked");
  dom.setAttribute("data-task-list-item", "");
}
function updateNodeViewMark2(node, mark) {
  mark.checked = !!node.attrs.checked;
}

// src/task-list-extension.ts
var _listShortcut_dec3, _toggleTaskList_dec, _a5, _init5;
var TaskListExtension = class extends (_a5 = import_core8.NodeExtension, _toggleTaskList_dec = [(0, import_core8.command)({ icon: "checkboxMultipleLine", label: ({ t }) => t(import_messages3.ExtensionListMessages.TASK_LIST_LABEL) })], _listShortcut_dec3 = [(0, import_core8.keyBinding)({ shortcut: import_core8.NamedShortcut.TaskList, command: "toggleTaskList" })], _a5) {
  constructor() {
    super(...arguments);
    __runInitializers(_init5, 5, this);
  }
  get name() {
    return "taskList";
  }
  createTags() {
    return [import_core8.ExtensionTag.Block, import_core8.ExtensionTag.ListContainerNode];
  }
  createNodeSpec(extra, override) {
    var _a6;
    return __spreadProps(__spreadValues({
      content: "taskListItem+"
    }, override), {
      attrs: extra.defaults(),
      parseDOM: [
        {
          tag: "ul[data-task-list]",
          getAttrs: extra.parse,
          // Make sure it has higher priority then BulletListExtension's parseDOM by default
          priority: import_core8.ExtensionPriority.Medium
        },
        ...(_a6 = override.parseDOM) != null ? _a6 : []
      ],
      toDOM: (node) => ["ul", __spreadProps(__spreadValues({}, extra.dom(node)), { "data-task-list": "" }), 0]
    });
  }
  createExtensions() {
    return [new TaskListItemExtension({})];
  }
  toggleTaskList() {
    return toggleList(this.type, (0, import_core8.assertGet)(this.store.schema.nodes, "taskListItem"));
  }
  listShortcut(props) {
    return this.toggleTaskList()(props);
  }
};
_init5 = __decoratorStart(_a5);
__decorateElement(_init5, 1, "toggleTaskList", _toggleTaskList_dec, TaskListExtension);
__decorateElement(_init5, 1, "listShortcut", _listShortcut_dec3, TaskListExtension);
__decoratorMetadata(_init5, TaskListExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BulletListExtension,
  ListItemExtension,
  ListItemSharedExtension,
  OrderedListExtension,
  TaskListExtension,
  TaskListItemExtension,
  dedentList,
  indentList,
  sharedLiftListItem,
  sharedSinkListItem,
  toggleList,
  wrapSelectedItems
});
