var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));

// src/jest-prosemirror-editor.ts
import { fireEvent, prettyDOM } from "@testing-library/dom";
import { Keyboard } from "test-keyboard";
import { object, pick } from "@remirror/core-helpers";
import {
  findElementAtPosition,
  getTextSelection,
  isElementDomNode,
  isProsemirrorNode,
  isTextDomNode,
  prosemirrorNodeToHtml
} from "@remirror/core-utils";
import { inputRules } from "@remirror/pm/inputrules";
import { AllSelection as AllSelection2, NodeSelection as NodeSelection2, TextSelection as TextSelection2 } from "@remirror/pm/state";
import { cellAround as cellAround2, CellSelection as CellSelection2 } from "@remirror/pm/tables";
import {
  __parseFromClipboard,
  EditorView
} from "@remirror/pm/view";

// src/jest-prosemirror-events.ts
var rawEventMap = {
  // Clipboard Events
  copy: {
    Constructor: "ClipboardEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  cut: {
    Constructor: "ClipboardEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  paste: {
    Constructor: "ClipboardEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  // Composition Events
  compositionEnd: {
    Constructor: "CompositionEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  compositionStart: {
    Constructor: "CompositionEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  compositionUpdate: {
    Constructor: "CompositionEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  // Keyboard Events
  keyDown: {
    Constructor: "KeyboardEvent",
    defaultProperties: { bubbles: true, cancelable: true, charCode: 0 }
  },
  keyPress: {
    Constructor: "KeyboardEvent",
    defaultProperties: { bubbles: true, cancelable: true, charCode: 0 }
  },
  keyUp: {
    Constructor: "KeyboardEvent",
    defaultProperties: { bubbles: true, cancelable: true, charCode: 0 }
  },
  // Focus Events
  focus: {
    Constructor: "FocusEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  blur: {
    Constructor: "FocusEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  focusIn: {
    Constructor: "FocusEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  focusOut: {
    Constructor: "FocusEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  // Form Events
  change: {
    Constructor: "InputEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  input: {
    Constructor: "InputEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  invalid: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: true }
  },
  submit: {
    Constructor: "Event",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  reset: {
    Constructor: "Event",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  // Mouse Events
  click: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true, button: 0 }
  },
  contextMenu: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  dblClick: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  drag: {
    Constructor: "DragEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  dragEnd: {
    Constructor: "DragEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  dragEnter: {
    Constructor: "DragEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  dragExit: {
    Constructor: "DragEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  dragLeave: {
    Constructor: "DragEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  dragOver: {
    Constructor: "DragEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  dragStart: {
    Constructor: "DragEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  drop: {
    Constructor: "DragEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  mouseDown: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  mouseEnter: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  mouseLeave: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  mouseMove: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  mouseOut: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  mouseOver: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  mouseUp: {
    Constructor: "MouseEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  // Selection Events
  select: {
    Constructor: "Event",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  // Touch Events
  touchCancel: {
    Constructor: "TouchEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  touchEnd: {
    Constructor: "TouchEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  touchMove: {
    Constructor: "TouchEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  touchStart: {
    Constructor: "TouchEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  // UI Events
  scroll: {
    Constructor: "UIEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  // Wheel Events
  wheel: {
    Constructor: "WheelEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  // Media Events
  abort: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  canPlay: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  canPlayThrough: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  durationChange: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  emptied: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  encrypted: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  ended: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  // error: {
  //   Constructor: Event,
  //   defaultProperties: {bubbles: false, cancelable: false},
  // },
  loadedData: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  loadedMetadata: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  loadStart: {
    Constructor: "ProgressEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  pause: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  play: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  playing: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  progress: {
    Constructor: "ProgressEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  rateChange: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  seeked: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  seeking: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  stalled: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  suspend: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  timeUpdate: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  volumeChange: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  waiting: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  // Image Events
  load: {
    Constructor: "UIEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  error: {
    Constructor: "Event",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  // Animation Events
  animationStart: {
    Constructor: "AnimationEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  animationEnd: {
    Constructor: "AnimationEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  animationIteration: {
    Constructor: "AnimationEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  // Transition Events
  transitionEnd: {
    Constructor: "TransitionEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  // Pointer events
  pointerOver: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  pointerEnter: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  pointerDown: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  pointerMove: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  pointerUp: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  pointerCancel: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: true, cancelable: false }
  },
  pointerOut: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: true, cancelable: true }
  },
  pointerLeave: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  gotPointerCapture: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  },
  lostPointerCapture: {
    Constructor: "PointerEvent",
    defaultProperties: { bubbles: false, cancelable: false }
  }
};
var eventMap = rawEventMap;
function createEvents(event, options) {
  const { Constructor, defaultProperties } = event in eventMap ? eventMap[event] : {
    Constructor: "Event",
    defaultProperties: { bubbles: true, cancelable: true }
  };
  let eventName = event.toLowerCase();
  const properties = __spreadValues(__spreadValues({}, defaultProperties), options);
  if (event === "doubleClick") {
    eventName = "dblclick";
  }
  let EventConstructor;
  if (event === "tripleClick") {
    EventConstructor = MouseEvent;
    return [
      new EventConstructor("click", __spreadProps(__spreadValues({}, options), { detail: 1 })),
      new EventConstructor("click", __spreadProps(__spreadValues({}, options), { detail: 2 })),
      new EventConstructor("click", __spreadProps(__spreadValues({}, options), { detail: 3 }))
    ];
  }
  EventConstructor = window[Constructor] || Event;
  return [new EventConstructor(eventName, properties)];
}

// src/jest-prosemirror-nodes.ts
import * as pm from "prosemirror-test-builder";
import { Cast, isNumber, keys } from "@remirror/core-helpers";
import { GapCursor } from "@remirror/pm/gapcursor";
import {
  AllSelection,
  EditorState,
  NodeSelection,
  Selection,
  TextSelection
} from "@remirror/pm/state";
import { cellAround, CellSelection } from "@remirror/pm/tables";

// src/jest-prosemirror-schema.ts
import { marks, nodes } from "prosemirror-schema-basic";
import { tableNodes } from "prosemirror-tables";
import { ExtensionTag } from "@remirror/core-constants";
import { Schema } from "@remirror/pm/model";
import {
  bulletList as baseBulletList,
  listItem as baseListItem,
  orderedList as baseOrderedList
} from "@remirror/pm/schema-list";
var {
  doc,
  paragraph,
  text,
  horizontal_rule: horizontalRule,
  blockquote,
  heading,
  code_block,
  hard_break,
  image
} = nodes;
var { link, em, strong, code } = marks;
var { table, table_cell, table_header, table_row } = tableNodes({
  tableGroup: "block",
  cellContent: "block+",
  cellAttributes: {
    pretty: { default: true },
    ugly: { default: false }
  }
});
var listGroup = "block";
var itemContent = "paragraph block*";
var orderedList = __spreadValues(__spreadValues({}, baseOrderedList), { content: "listItem+", group: listGroup });
var bulletList = __spreadValues(__spreadValues({}, baseBulletList), { content: "listItem+", group: listGroup });
var listItem = __spreadValues(__spreadValues({}, baseListItem), { content: itemContent });
var atomInline = {
  inline: true,
  group: "inline",
  atom: true,
  selectable: true,
  parseDOM: [
    {
      tag: 'span[data-node-type="atomInline"]'
    }
  ],
  toDOM: () => ["span", { "data-node-type": "atomInline" }]
};
var atomBlock = {
  inline: false,
  group: ExtensionTag.Block,
  atom: true,
  selectable: true,
  parseDOM: [
    {
      tag: 'div[data-node-type="atomBlock"]'
    }
  ],
  toDOM: () => ["div", { "data-node-type": "atomBlock" }]
};
var atomContainer = {
  inline: false,
  group: ExtensionTag.Block,
  content: "atomBlock+",
  parseDOM: [
    {
      tag: 'div[data-node-type="atomBlockContainer"]'
    }
  ],
  toDOM: () => ["div", { "data-node-type": "atomBlockContainer" }]
};
var containerWithRestrictedContent = {
  inline: false,
  group: ExtensionTag.Block,
  content: "paragraph+",
  parseDOM: [
    {
      tag: 'div[data-node-type="containerWithRestrictedContent"]'
    }
  ],
  toDOM: () => ["div", { "data-node-type": "containerWithRestrictedContent" }]
};
var strike = {
  parseDOM: [
    {
      tag: "s"
    },
    {
      tag: "del"
    },
    {
      tag: "strike"
    },
    {
      style: "text-decoration",
      getAttrs: (node) => node === "line-through" ? {} : false
    }
  ],
  toDOM: () => ["s", 0]
};
var schema = new Schema({
  nodes: {
    doc,
    orderedList,
    bulletList,
    listItem,
    paragraph,
    text,
    horizontalRule,
    atomInline,
    atomBlock,
    atomContainer,
    containerWithRestrictedContent,
    table,
    table_row,
    table_cell,
    table_header,
    blockquote,
    heading,
    code_block,
    hard_break,
    image
  },
  marks: {
    link,
    em,
    strong,
    code,
    strike
  }
});

// src/jest-prosemirror-nodes.ts
function resolveCell(taggedDoc, tag) {
  if (!tag) {
    return null;
  }
  return cellAround(taggedDoc.resolve(tag));
}
function createTextSelection({ taggedDoc, start, end }) {
  const $start = taggedDoc.resolve(start);
  const $end = end && start <= end ? taggedDoc.resolve(end) : taggedDoc.resolve($start.end());
  return TextSelection.between($start, $end);
}
var supportedTags = /* @__PURE__ */ new Set(["cursor", "node", "start", "end", "anchor", "all", "gap"]);
function taggedDocHasSelection(taggedDoc) {
  var _a2;
  const tag = (_a2 = taggedDoc == null ? void 0 : taggedDoc.tag) != null ? _a2 : {};
  return keys(tag).some((tag2) => supportedTags.has(tag2));
}
function initSelection(taggedDoc) {
  var _a2, _b;
  const tag = (_a2 = taggedDoc == null ? void 0 : taggedDoc.tag) != null ? _a2 : {};
  const { cursor, node, start, end, anchor, head, all, gap } = tag;
  if (isNumber(all)) {
    return new AllSelection(taggedDoc);
  }
  if (isNumber(node)) {
    return NodeSelection.create(taggedDoc, taggedDoc.resolve(node).before());
  }
  if (isNumber(cursor)) {
    return TextSelection.near(taggedDoc.resolve(cursor));
  }
  if (isNumber(gap)) {
    const $pos = taggedDoc.resolve(gap);
    return new GapCursor($pos);
  }
  if (isNumber(anchor) && isNumber(head)) {
    return TextSelection.between(taggedDoc.resolve(anchor), taggedDoc.resolve(head));
  }
  if (isNumber(start)) {
    return createTextSelection({ taggedDoc, start, end });
  }
  if (isNumber(anchor)) {
    const $anchor = resolveCell(taggedDoc, anchor);
    if ($anchor) {
      return Cast(new CellSelection($anchor, (_b = resolveCell(taggedDoc, head)) != null ? _b : void 0));
    }
  }
  return void 0;
}
function selectionFor(taggedDoc) {
  var _a2;
  return (_a2 = initSelection(taggedDoc)) != null ? _a2 : Selection.atStart(taggedDoc);
}
function createState(taggedDoc, plugins = []) {
  return EditorState.create({
    doc: taggedDoc,
    selection: initSelection(taggedDoc),
    schema,
    plugins
  });
}
function pmBuild(testSchema, names) {
  const builder = pm.builders;
  const types = __spreadValues({
    doc: { nodeType: "doc" },
    p: { nodeType: "paragraph" },
    text: { nodeType: "text" }
  }, names);
  return builder(testSchema, types);
}
var built = pmBuild(schema, {
  doc: { nodeType: "doc" },
  p: { nodeType: "paragraph" },
  text: { nodeType: "text" },
  atomInline: { nodeType: "atomInline" },
  atomBlock: { nodeType: "atomBlock" },
  atomContainer: { nodeType: "atomContainer" },
  li: { nodeType: "listItem" },
  ul: { nodeType: "bulletList" },
  ol: { nodeType: "orderedList" },
  table: { nodeType: "table" },
  tr: { nodeType: "table_row" },
  td: { nodeType: "table_cell" },
  th: { nodeType: "table_cell" },
  blockquote: { nodeType: "blockquote" },
  h1: { nodeType: "heading", level: 1 },
  h2: { nodeType: "heading", level: 2 },
  h3: { nodeType: "heading", level: 3 },
  h4: { nodeType: "heading", level: 4 },
  h5: { nodeType: "heading", level: 5 },
  h6: { nodeType: "heading", level: 6 },
  a: { markType: "link", href: "foo" },
  strong: { markType: "strong" },
  em: { markType: "em" },
  code: { markType: "code" }
});
var {
  a,
  li,
  ul,
  ol,
  atomBlock: atomBlock2,
  atomContainer: atomContainer2,
  atomInline: atomInline2,
  blockquote: blockquote2,
  code: code2,
  doc: doc2,
  em: em2,
  a: link2,
  p,
  p: paragraph2,
  strong: strong2,
  table: table2,
  td,
  text: text2,
  th,
  tr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  td: tableCell,
  th: tableHeaderCell,
  tr: tableRow
} = built;
var b = built;
var code_block2 = b.code_block;
var pre = b.pre;
var img = b.img;
var hr = b.hr;
var br = b.br;
var codeBlock = b.code_block;
var hardBreak = b.hard_break;
var heading2 = b.heading;
var horizontalRule2 = b.horizontalRule;
var image2 = b.image;
var tdEmpty = td(p());
var thEmpty = th(p());
var tdCursor = td(p("<cursor>"));
var thCursor = th(p("<cursor>"));

// src/jest-prosemirror-editor.ts
var parseFromClipboard = __parseFromClipboard;
function serializeForClipboard(view, slice) {
  return view.serializeForClipboard(slice);
}
var cleanupItems = /* @__PURE__ */ new Set();
afterEach(() => {
  for (const [view, element] of cleanupItems) {
    view.destroy();
    if (element.parentNode) {
      element.remove();
    }
  }
});
function createEditor(taggedDocument, options = object()) {
  const _a2 = options, { plugins = [], rules = [], autoClean = true } = _a2, editorOptions = __objRest(_a2, ["plugins", "rules", "autoClean"]);
  const element = document.createElement("div");
  document.body.append(element);
  const state = createState(taggedDocument, [...plugins, inputRules({ rules })]);
  const view = new EditorView(element, __spreadValues({
    state,
    plugins: []
  }, editorOptions));
  if (autoClean) {
    cleanupItems.add([view, element]);
  }
  return new ProsemirrorTestChain(view);
}
function flush(view) {
  view.domObserver.flush();
}
function pasteContent(props) {
  var _a2;
  const { view, content } = props;
  let text3 = "";
  let html = "";
  let plainText = false;
  if (typeof content === "string") {
    text3 = content;
  } else if (isProsemirrorNode(content)) {
    text3 = content.textContent;
    html = prosemirrorNodeToHtml(content);
  } else {
    text3 = content.text;
    html = content.html;
    plainText = (_a2 = content.plainText) != null ? _a2 : false;
  }
  const slice = parseFromClipboard(view, text3, html, plainText, view.state.selection.$head);
  if (slice) {
    view.dispatch(view.state.tr.replaceSelection(slice));
  }
}
function copyContent(props) {
  const { view } = props;
  const { dom, text: text3 } = view.serializeForClipboard(view.state.selection.content());
  const html = dom.innerHTML;
  return { html, text: text3 };
}
function insertText(props) {
  const { view, text: text3, start } = props;
  const keys2 = Keyboard.create({
    target: view.dom
  }).start();
  let pos = start;
  [...text3].forEach((character) => {
    keys2.char({ text: character, typing: true });
    if (!view.someProp("handleTextInput", (f) => f(view, pos, pos, character))) {
      view.dispatch(view.state.tr.insertText(character, pos, pos));
    }
    pos = view.state.selection.anchor;
  });
  keys2.end();
}
function dispatchTextSelection(props) {
  const { view, start, end } = props;
  const { state } = view;
  const tr2 = state.tr.setSelection(
    TextSelection2.between(state.doc.resolve(start), state.doc.resolve(end != null ? end : start))
  );
  view.dispatch(tr2);
}
function dispatchAnchorTextSelection(props) {
  const { view, anchor, head } = props;
  const { state } = view;
  const tr2 = state.tr.setSelection(
    TextSelection2.between(state.doc.resolve(anchor), state.doc.resolve(head))
  );
  view.dispatch(tr2);
}
function dispatchAllSelection(view) {
  const { tr: tr2, doc: doc3 } = view.state;
  view.dispatch(tr2.setSelection(new AllSelection2(doc3)));
}
function dispatchNodeSelection(props) {
  const { view, pos } = props;
  const { state } = view;
  const tr2 = state.tr.setSelection(
    // Node selections should always be at the start of their nodes. This is
    // impossible to annotate since the first text position is always the `node
    // + 1` place.
    NodeSelection2.create(state.doc, state.doc.resolve(pos).before())
  );
  view.dispatch(tr2);
}
function dispatchCellSelection(props) {
  const { view, pos } = props;
  const { state } = view;
  const $anchor = cellAround2(state.doc.resolve(pos));
  if (!$anchor) {
    return;
  }
  const tr2 = state.tr.setSelection(new CellSelection2($anchor));
  view.dispatch(tr2);
}
function press(props) {
  const { view, char } = props;
  Keyboard.create({
    target: view.dom,
    batch: true
  }).start().char({ text: char }).forEach(({ event }) => {
    view.dispatchEvent(event);
    flush(view);
  });
}
function backspace(props) {
  const { view, times = 1 } = props;
  const { selection, tr: tr2 } = view.state;
  const { from, empty } = selection;
  if (empty) {
    view.dispatch(tr2.delete(from - times, from));
    return;
  }
  tr2.deleteSelection();
  if (times > 1) {
    tr2.delete(from - (times - 1), from);
  }
  view.dispatch(tr2);
}
function forwardDelete(props) {
  const { view, times = 1 } = props;
  const { selection, tr: tr2 } = view.state;
  const { from, empty } = selection;
  if (empty) {
    view.dispatch(tr2.delete(from, from + times));
    return;
  }
  tr2.deleteSelection();
  if (times > 1) {
    tr2.delete(from, from + (times - 1));
  }
  view.dispatch(tr2);
}
function shortcut(props) {
  const { view, shortcut: text3 } = props;
  Keyboard.create({
    target: view.dom,
    batch: true
  }).start().mod({ text: text3 }).forEach(({ event }) => {
    view.dispatchEvent(event);
    flush(view);
  });
}
function fireEventAtPosition(props) {
  const { view, event, options = object(), position = view.state.selection.anchor } = props;
  const element = findElementAtPosition(position, view);
  const syntheticEvents = createEvents(event, options);
  syntheticEvents.forEach((syntheticEvent) => fireEvent(element, syntheticEvent));
  if (event === "tripleClick" && !view.someProp("handleTripleClick", (f) => f(view, position, syntheticEvents[2]))) {
    syntheticEvents.forEach((syntheticEvent) => view.dispatchEvent(syntheticEvent));
  }
  if (event === "dblClick" && !view.someProp("handleDoubleClick", (f) => f(view, position, syntheticEvents[0]))) {
    syntheticEvents.forEach((syntheticEvent) => view.dispatchEvent(syntheticEvent));
  }
  if (event === "click" && !view.someProp("handleClick", (f) => f(view, position, syntheticEvents[0]))) {
    syntheticEvents.forEach((syntheticEvent) => view.dispatchEvent(syntheticEvent));
  }
  flush(view);
}
var ProsemirrorTestChain = class _ProsemirrorTestChain {
  constructor(view) {
    /**
     * The prosemirror view.
     */
    __publicField(this, "view");
    /**
     * Takes any remirror command as an input and dispatches it within the
     * document context.
     *
     * @param command - the command function to run with the current state and
     * view
     */
    __publicField(this, "remirrorCommand", (command) => {
      command({
        state: this.state,
        dispatch: this.view.dispatch,
        view: this.view,
        tr: this.state.tr
      });
      return this;
    });
    /**
     * Selects the text between the provided selection primitive.
     */
    __publicField(this, "selectText", (selection) => {
      const tr2 = this.state.tr;
      const textSelection = getTextSelection(selection, tr2.doc);
      this.view.dispatch(tr2.setSelection(textSelection));
      return this;
    });
    /**
     * Logs to the dom for help debugging your tests.
     */
    __publicField(this, "debug", () => {
      console.log(prettyDOM(this.view.dom));
      return this;
    });
    this.view = view;
  }
  /**
   * A static helper utility for creating new TestReturn values.
   */
  static of(view) {
    return new _ProsemirrorTestChain(view);
  }
  /**
   * The current prosemirror node document
   */
  get doc() {
    return this.state.doc;
  }
  /**
   * The prosemirror schema.
   */
  get schema() {
    return this.state.schema;
  }
  /**
   * The prosemirror state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * The prosemirror selection.
   */
  get selection() {
    return this.state.selection;
  }
  /**
   * The start of the current selection.
   */
  get start() {
    return this.state.selection.from;
  }
  /**
   * The end of the current selection.
   */
  get end() {
    return this.state.selection.to;
  }
  /**
   * The content to write to the clipboard if copy the current selection.
   */
  get copied() {
    return copyContent({ view: this.view });
  }
  /**
   * Overwrite all the current content within the editor.
   *
   * @param newDoc - the new content to use
   */
  overwrite(newDocument) {
    const tr2 = this.state.tr.replaceWith(0, this.view.state.doc.nodeSize - 2, newDocument);
    tr2.setMeta("addToHistory", false);
    this.view.dispatch(tr2);
    return this;
  }
  /**
   * Run the command within the prosemirror editor.
   *
   * @remarks
   *
   * ```ts
   * test('commands are run', () => {
   *   createEditor(doc(p('<cursor>')))
   *     .command((state, dispatch) => {
   *        if (dispatch) {
   *          dispatch(state.tr.insertText('hello'));
   *        }
   *     })
   *     .callback(content => {
   *       expect(content.state.doc).toEqualProsemirrorDocument(doc(p('hello')));
   *     })
   * })
   * ```
   *
   * @param command - the command function to run
   */
  command(command) {
    command(this.state, this.view.dispatch, this.view);
    return this;
  }
  /**
   * Insert text into the editor at the current position.
   *
   * @param text - the text to insert
   */
  insertText(text3) {
    const { from } = this.selection;
    insertText({ start: from, text: text3, view: this.view });
    return this;
  }
  /**
   * Type a keyboard shortcut - e.g. `Mod-Enter`.
   *
   * **NOTE** This only simulates the events. For example an `Mod-Enter` would
   * run all enter key handlers but not actually create a new line.
   *
   * @param mod - the keyboard shortcut to type
   */
  shortcut(mod) {
    shortcut({ shortcut: mod, view: this.view });
    return this;
  }
  /**
   * Simulate a keypress which is run through the editor's key handlers.
   *
   * **NOTE** This only simulates the events. For example an `Enter` would run
   * all enter key handlers but not actually create a new line.
   *
   * @param char - the character to type
   */
  press(char) {
    press({ char, view: this.view });
    return this;
  }
  /**
   * Simulates a backspace keypress and deletes text backwards.
   */
  backspace(times) {
    backspace({ view: this.view, times });
    return this;
  }
  /**
   * Fire an event in the editor (very hit and miss).
   *
   * @param props - the props when firing an event
   */
  fire(props) {
    fireEventAtPosition(__spreadValues({ view: this.view }, props));
    return this;
  }
  /**
   * Callback function which receives the `start`, `end`, `state`, `view`,
   * `schema` and `selection` properties and allows for easier testing of the
   * current state of the editor.
   */
  callback(fn) {
    fn(pick(this, ["start", "end", "state", "view", "schema", "selection", "doc", "debug"]));
    return this;
  }
  /**
   * Paste text into the editor.
   */
  paste(content) {
    pasteContent({ view: this.view, content });
    return this;
  }
};
function apply(taggedDocument, command, result) {
  const { state, view } = createEditor(taggedDocument);
  let newState = state;
  let pass = true;
  let doc3 = newState.doc;
  command(state, (tr2) => newState = state.apply(tr2), view);
  if (!pm.eq(newState.doc, result || taggedDocument)) {
    pass = false;
  }
  if (result && taggedDocHasSelection(result)) {
    pass = pm.eq(newState.selection, selectionFor(result));
    doc3 = result;
  }
  return { pass, taggedDoc: doc3, state: newState };
}
function findTextNode(node, text3) {
  if (isTextDomNode(node)) {
    return node;
  } else if (isElementDomNode(node)) {
    for (let ch = node.firstChild; ch; ch = ch.nextSibling) {
      const found = findTextNode(ch, text3);
      if (found) {
        return found;
      }
    }
  }
  return;
}

// src/jest-prosemirror-matchers.ts
import stringifyObject from "stringify-object";
import { isEmptyObject, isString } from "@remirror/core-helpers";

// src/jest-prosemirror-messages.ts
import chalk from "chalk";
import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";
var _a;
var transformsNodePassMessage = (actual, expected, shouldChange) => () => "".concat(matcherHint(".not.toTransformNode"), "\n\n").concat(shouldChange) ? "".concat(chalk(_a || (_a = __template(["Expected the node {bold not} to be:\n"], ["Expected the node {bold not} to be:\\n"])))).concat(printExpected(expected.toString()), "\n") + "Position: { from: ".concat(selectionFor(expected).from, ", to: ").concat(selectionFor(expected).to, " }\n\n") + "Received:\n" + "".concat(printReceived(actual.toString()), "\n") + "Position: { from: ".concat(selectionFor(actual).from, ", to: ").concat(selectionFor(actual).to, " }\n\n") : "Expected the node to be different from:\n" + "".concat(printExpected(expected.toString()), "\n\n") + "Position: { from: ".concat(selectionFor(expected).from, " to: ").concat(selectionFor(expected).to, " }\n\n") + "Received:\n" + "".concat(printReceived(actual.toString()), "\n") + "Position: { from: ".concat(selectionFor(actual).from, ", to: ").concat(selectionFor(actual).to, " }\n\n");
var transformsNodeFailMessage = (actual, expected, shouldChange) => () => "".concat(matcherHint(".toTransformNode"), "\n\n").concat(shouldChange) ? "Expected the node to be transformed to:\n" + "".concat(printExpected(expected.toString()), "\n") + "Position: { from: ".concat(selectionFor(expected).from, ", to: ").concat(selectionFor(expected).to, " }\n\n") + "Received:\n" + "".concat(printReceived(actual.toString()), "\n") + "Position: { from: ".concat(selectionFor(actual).from, ", to: ").concat(selectionFor(actual).to, " }\n\n") : "Expected the node not to be changed from:\n" + "".concat(printExpected(expected.toString()), "\n") + "Position: { from: ".concat(selectionFor(expected).from, " to: ").concat(selectionFor(expected).to, " }\n\n") + "Received:\n" + "".concat(printReceived(actual.toString()), "\n") + "Position: { from: ".concat(selectionFor(actual).from, ", to: ").concat(selectionFor(actual).to, " }\n\n");

// src/jest-prosemirror-matchers.ts
var prosemirrorMatchers = {
  toTransformNode(command, { from, to }) {
    if (typeof command !== "function") {
      return {
        message: () => "Please specify a valid command",
        pass: false
      };
    }
    if (!from) {
      return {
        message: () => "Please specify the 'from' node which this command: ".concat(command.name, " should transform"),
        pass: false
      };
    }
    const expected = to ? to : from;
    const shouldChange = !!to;
    const { pass, taggedDoc: actual } = apply(from, command, to);
    if (pass) {
      return {
        pass,
        message: transformsNodePassMessage(actual, expected, shouldChange)
      };
    }
    return {
      pass,
      message: transformsNodeFailMessage(actual, expected, shouldChange)
    };
  },
  toTransform(command, { from, to }) {
    if (typeof command !== "function") {
      return {
        message: () => "Please specify a valid command",
        pass: false
      };
    }
    if (!from) {
      return {
        message: () => "Please specify the 'from' node which this command: ".concat(command.name, " should transform"),
        pass: false
      };
    }
    const expected = to ? to : from;
    const shouldChange = !!to;
    const { pass, taggedDoc: actual } = apply(
      from,
      (state, dispatch, view) => command({ state, dispatch, view, tr: state.tr }),
      to
    );
    if (pass) {
      return { pass, message: transformsNodePassMessage(actual, expected, shouldChange) };
    }
    return { pass, message: transformsNodeFailMessage(actual, expected, shouldChange) };
  },
  toEqualProsemirrorNode(actual, expected) {
    const actualJSON = actual.toJSON();
    const expectedJSON = expected.toJSON();
    const actualDoc = pad(jsonToProsemirrorDoc(actualJSON));
    const expectedDoc = pad(jsonToProsemirrorDoc(expectedJSON));
    const pass = this.equals(actualJSON, expectedJSON);
    const message = pass ? () => "".concat(this.utils.matcherHint(".not.toEqualProsemirrorNode"), "\n\n") + "Expected value of document to not equal:\n  ".concat(this.utils.printExpected(expectedDoc), "\n") + "Actual:\n  ".concat(this.utils.printReceived(actualDoc)) : () => {
      const diffString = this.utils.diff(expectedDoc, actualDoc, {
        expand: this.expand
      });
      return "".concat(this.utils.matcherHint(".toEqualProsemirrorNode"), "\n\n") + "Expected value of document to equal:\n".concat(this.utils.printExpected(expectedDoc), "\n") + "Actual:\n".concat(this.utils.printReceived(actualDoc)) + "".concat(diffString ? "\n\nDifference:\n\n".concat(diffString) : "");
    };
    return { pass, message };
  },
  toBeValidNode(actual) {
    let pass = true;
    let errorMessage = "";
    try {
      actual.check();
    } catch (error) {
      if (error instanceof RangeError) {
        pass = false;
        errorMessage = error.message;
      }
    }
    const message = pass ? () => "".concat(this.utils.matcherHint(".not.toBeValidNode"), "\n\n") + "Expected Prosemirror node not to conform to schema, but it was valid." : () => "this.utils.matcherHint('.toBeValidNode')}\n\nExpected Prosemirror node to conform to schema, but an error was thrown.\n" + "Error: ".concat(this.utils.printReceived(errorMessage));
    return { pass, message };
  }
};
var renamedTypes = {
  paragraph: "p",
  heading: "h",
  horizontalRule: "hr",
  hardBreak: "br"
};
var pad = (content) => "\n".concat(content, "\n");
function jsonToProsemirrorDoc(json, indentation = "") {
  var _a2, _b, _c, _d, _e;
  const nextIndentation = "".concat(indentation, "  ");
  if (json.type === "text") {
    return "".concat(indentation).concat(getMarks(json.marks, json.text || ""));
  }
  const type = (_a2 = renamedTypes[json.type]) != null ? _a2 : json.type;
  const content = [];
  const hasAttrs = json.attrs && !isEmptyObject(json.attrs);
  if (hasAttrs) {
    content.push(stringifyObject(json.attrs, { indent: "  ", inlineCharacterLimit: 1e3 }));
  }
  for (const item of (_b = json.content) != null ? _b : []) {
    content.push(jsonToProsemirrorDoc(item, nextIndentation));
  }
  if (!hasAttrs && content.length === 1 && ((_d = (_c = json.content) == null ? void 0 : _c[0]) == null ? void 0 : _d.type) === "text") {
    return "".concat(indentation).concat(type, "(").concat(jsonToProsemirrorDoc((_e = json.content) == null ? void 0 : _e[0], ""), ")");
  }
  const joiner = ",\n";
  const prefix = hasAttrs ? "\n".concat(nextIndentation) : content.length > 0 ? "\n" : "";
  const postfix = content.length > 0 ? "\n".concat(indentation) : "";
  return "".concat(indentation).concat(type, "(").concat(prefix).concat(content.join(joiner)).concat(postfix, ")");
}
function getMarks(marks2, content) {
  content = "'".concat(content, "'");
  if (!marks2) {
    return content;
  }
  for (const mark of [...marks2 != null ? marks2 : []].reverse()) {
    if (isString(mark)) {
      content = "".concat(mark, "(").concat(content, ")");
      continue;
    }
    const hasAttrs = mark.attrs && !isEmptyObject(mark.attrs);
    const items = [content];
    if (hasAttrs) {
      items.unshift(stringifyObject(mark.attrs, { indent: "  ", inlineCharacterLimit: 1e3 }));
    }
    content = "".concat(mark.type, "(").concat(items.join(", "), ")");
  }
  return content;
}

// src/jest-prosemirror-environment.ts
var setupProsemirrorEnvironment = () => {
  expect.extend(prosemirrorMatchers);
};

// src/jest-prosemirror-serializer.ts
import { object as object2 } from "@remirror/core-helpers";
import { isEditorSchema, isEditorState, isProsemirrorNode as isProsemirrorNode2 } from "@remirror/core-utils";
var prosemirrorSerializer = {
  test: (value) => isProsemirrorNode2(value) || isEditorState(value) || isEditorSchema(value),
  print: (value) => {
    if (isEditorState(value)) {
      return "Prosemirror doc: ".concat(JSON.stringify(
        value.doc.toJSON(),
        null,
        2
      ), "\nProsemirror selection: ").concat(JSON.stringify(value.selection, null, 2));
    }
    if (isEditorSchema(value)) {
      const nodes2 = object2();
      const marks2 = object2();
      for (const [name, { spec }] of Object.entries(value.nodes)) {
        nodes2[name] = spec;
      }
      for (const [name, { spec }] of Object.entries(value.marks)) {
        marks2[name] = spec;
      }
      return "Prosemirror schema: ".concat(JSON.stringify({ nodes: nodes2, marks: marks2 }, null, 2));
    }
    return "Prosemirror node: ".concat(JSON.stringify(value, null, 2));
  }
};
export {
  ProsemirrorTestChain,
  a,
  apply,
  atomBlock2 as atomBlock,
  atomContainer2 as atomContainer,
  atomInline2 as atomInline,
  backspace,
  blockquote2 as blockquote,
  br,
  code2 as code,
  codeBlock,
  code_block2 as code_block,
  copyContent,
  createEditor,
  createEvents,
  createState,
  dispatchAllSelection,
  dispatchAnchorTextSelection,
  dispatchCellSelection,
  dispatchNodeSelection,
  dispatchTextSelection,
  doc2 as doc,
  em2 as em,
  findTextNode,
  fireEventAtPosition,
  flush,
  forwardDelete,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hardBreak,
  heading2 as heading,
  horizontalRule2 as horizontalRule,
  hr,
  image2 as image,
  img,
  initSelection,
  insertText,
  li,
  link2 as link,
  ol,
  p,
  paragraph2 as paragraph,
  parseFromClipboard,
  pasteContent,
  pm,
  pmBuild,
  pre,
  press,
  prosemirrorMatchers,
  prosemirrorSerializer,
  schema,
  selectionFor,
  serializeForClipboard,
  setupProsemirrorEnvironment,
  shortcut,
  strong2 as strong,
  table2 as table,
  tableCell,
  tableHeaderCell,
  tableRow,
  taggedDocHasSelection,
  td,
  tdCursor,
  tdEmpty,
  text2 as text,
  th,
  thCursor,
  thEmpty,
  tr,
  ul
};
