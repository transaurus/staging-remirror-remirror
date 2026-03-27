var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// src/jest-remirror-editor.ts
import { prettyDOM } from "@testing-library/dom";
import {
  backspace,
  copyContent,
  dispatchTextSelection,
  fireEventAtPosition,
  forwardDelete,
  insertText,
  pasteContent,
  press,
  shortcut
} from "jest-prosemirror";
import {
  getTextSelection,
  invariant as invariant2,
  isFunction,
  isMarkExtension,
  isNodeExtension,
  object as object2,
  pick,
  range
} from "@remirror/core";
import { createDomEditor, createDomManager } from "@remirror/dom";

// src/jest-remirror-builder.ts
import {
  findMatches,
  flattenArray,
  hasOwnProperty,
  invariant,
  isArray,
  isInstanceOf,
  isProsemirrorNode,
  isString,
  keys,
  object
} from "@remirror/core";
import { Fragment, Node as ProsemirrorNode, Slice } from "@remirror/pm/model";

// src/jest-remirror-types.ts
var TagTracker = class {
  constructor() {
    __publicField(this, "tags");
  }
};

// src/jest-remirror-builder.ts
function isOdd(n) {
  return n % 2 === 1;
}
function text(value, schema) {
  const matches = findMatches(value, /(\\+)?<(\w+)>/g);
  const tags = object();
  let stripped = "";
  let textIndex = 0;
  for (const match of matches) {
    const [taggedToken, escapeCharacters, tagName] = match;
    let { index } = match;
    const skipLength = escapeCharacters == null ? void 0 : escapeCharacters.length;
    if (!(taggedToken && tagName)) {
      continue;
    }
    if (skipLength) {
      if (isOdd(skipLength)) {
        stripped += value.slice(textIndex, index + (skipLength - 1) / 2);
        stripped += value.slice(index + skipLength, index + taggedToken.length);
        textIndex = index + taggedToken.length;
        continue;
      }
      index += skipLength / 2;
    }
    stripped += value.slice(textIndex, index);
    tags[tagName] = stripped.length;
    textIndex = index + taggedToken.length;
  }
  stripped += value.slice(textIndex);
  const node = stripped === "" ? new TagTracker() : schema.text(stripped);
  node.tags = tags;
  return node;
}
function offsetTags(tags, offset) {
  const result = object();
  for (const [name, value] of Object.entries(tags)) {
    result[name] = value + offset;
  }
  return result;
}
var isTagTracker = isInstanceOf(TagTracker);
function isTaggedProsemirrorNode(value) {
  return isProsemirrorNode(value) && !isTagTracker(value);
}
function sequence(...content) {
  let position = 0;
  let tags = object();
  const nodes = [];
  for (const node of content) {
    if (isTagTracker(node)) {
      tags = __spreadValues(__spreadValues({}, tags), offsetTags(node.tags, position));
    }
    if (isTaggedProsemirrorNode(node)) {
      const thickness = node.isText ? 0 : 1;
      tags = __spreadValues(__spreadValues({}, tags), offsetTags(node.tags, position + thickness));
      position += node.nodeSize;
      nodes.push(node);
    }
  }
  return { nodes, tags };
}
function coerce(props) {
  const { content, schema } = props;
  const taggedContent = content.map(
    (item) => isString(item) ? text(item, schema) : item
  );
  return sequence(...flattenArray(taggedContent));
}
function nodeFactory(props) {
  const { name, schema, attrs, marks } = props;
  const nodeBuilder = hasOwnProperty(schema.nodes, name) ? schema.nodes[name] : void 0;
  invariant(nodeBuilder, {
    message: 'Node: "'.concat(name, "\" doesn't exist in the schema. The current schema contains the following nodes: ").concat(keys(
      schema.nodes
    ).join(", "))
  });
  return (...content) => {
    const { nodes, tags } = coerce({ content, schema });
    const node = nodeBuilder.createChecked(attrs, nodes, marks);
    node.tags = tags;
    return node;
  };
}
function markFactory(props) {
  const { name, schema, attrs, allowDupes = false } = props;
  const markBuilder = hasOwnProperty(schema.marks, name) ? schema.marks[name] : void 0;
  invariant(markBuilder, {
    message: 'Mark: "'.concat(name, "\" doesn't exist in the schema. The current schema contains the following marks: ").concat(keys(
      schema.marks
    ).join(", "))
  });
  return (...content) => {
    const mark = markBuilder.create(attrs);
    const { nodes } = coerce({ content, schema });
    return nodes.map((node) => {
      if (!allowDupes && mark.type.isInSet(node.marks)) {
        return node;
      }
      const taggedNode = node.mark(mark.addToSet(node.marks));
      taggedNode.tags = node.tags;
      return taggedNode;
    });
  };
}

// src/jest-remirror-utils.ts
import {
  isNumber,
  isObject,
  isProsemirrorNode as isProsemirrorNode2
} from "@remirror/core";
import { AllSelection, NodeSelection, TextSelection } from "@remirror/pm/state";
function processText({ schema, content }) {
  return coerce({ content, schema });
}
function processNodeMark(content) {
  const nodes = content;
  return { nodes, tags: __spreadValues({}, content.tags) };
}
function replaceSelection(props) {
  const { view, content } = props;
  const { state } = view;
  const { from, to } = state.selection;
  const { nodes, tags } = Array.isArray(content) ? processText({ schema: state.schema, content }) : processNodeMark(content);
  const tr = state.tr.replaceWith(from, to, nodes);
  view.dispatch(tr);
  return offsetTags(tags, from);
}
function createSelectionFromTaggedDocument(doc, tags) {
  const { cursor, node, start, end, all, anchor, head } = tags;
  if (isNumber(cursor)) {
    return TextSelection.near(doc.resolve(cursor));
  } else if (isNumber(start)) {
    return TextSelection.between(
      doc.resolve(start),
      doc.resolve(isNumber(end) && start <= end ? end : doc.resolve(start).end())
    );
  } else if (isNumber(head) && isNumber(anchor)) {
    return TextSelection.between(doc.resolve(anchor), doc.resolve(head));
  } else if (isNumber(node)) {
    return NodeSelection.create(doc, doc.resolve(node).before());
  } else if (isNumber(all)) {
    return new AllSelection(doc);
  }
  return null;
}

// src/jest-remirror-editor.ts
var elements = /* @__PURE__ */ new Set();
function renderEditor(extensions, _a = object2()) {
  var _b = _a, { props, autoClean } = _b, options = __objRest(_b, ["props", "autoClean"]);
  const element = createElement(props == null ? void 0 : props.element, autoClean);
  const manager = createDomManager(extensions, options);
  createDomEditor(__spreadProps(__spreadValues({}, props), { element, manager }));
  return RemirrorTestChain.create(manager);
}
var _manager, _tags;
var _RemirrorTestChain = class _RemirrorTestChain {
  constructor(manager) {
    /** The editor manager */
    __privateAdd(this, _manager);
    /** Additional custom tags */
    __privateAdd(this, _tags);
    /**
     * The nodes available for building the prosemirror document.
     */
    __publicField(this, "nodes", object2());
    /**
     * The marks available for building up the prosemirror document.
     */
    __publicField(this, "marks", object2());
    /**
     * This is similar to the `node` except that each function returned here is
     * able to receive custom attributes.
     *
     * ```ts
     * import { HeadingExtension } from 'remirror/extensions';
     *
     * const editor = renderEditor<HeadingExtension>([new HeadingExtension()])
     * const { heading } = editor.attributeNodes;
     *
     * heading({ level: 4, id: '1223' })('My custom heading');
     * ```
     *
     * This attaches the attributes `level` and `id` to the `heading` node and the
     * content `My custom heading` and would be rendered to HTML as:
     * ```html
     * <h4 id="1224">My custom heading</h4>
     * ```
     *
     * Use this when testing nodes that can take custom attributes.
     */
    __publicField(this, "attributeNodes", object2());
    /**
     * This is very similar to the `attributeNodes` except for marks which can
     * need to provide custom attributes.
     *
     * Use this when testing marks that can take custom attributes.
     */
    __publicField(this, "attributeMarks", object2());
    /**
     * Add content to the editor.
     *
     * If content already exists it will be overwritten.
     */
    __publicField(this, "add", (taggedDocument) => {
      const { schema } = taggedDocument.type;
      invariant2(taggedDocument.type === schema.topNodeType, {
        message: 'Expected a top level "'.concat(schema.topNodeType.name, '" node but received a "').concat(taggedDocument.type.name, '" node'),
        disableLogging: true
      });
      const { content } = taggedDocument;
      const _a = taggedDocument.tags, { cursor, node, start, end, all, anchor, head } = _a, tags = __objRest(_a, ["cursor", "node", "start", "end", "all", "anchor", "head"]);
      const view = this.view;
      __privateSet(this, _tags, tags);
      const tr = this.tr.replaceWith(0, this.doc.nodeSize - 2, content);
      tr.setMeta("addToHistory", false);
      view.dispatch(tr);
      const selection = createSelectionFromTaggedDocument(view.state.doc, taggedDocument.tags);
      if (selection) {
        view.dispatch(view.state.tr.setSelection(selection));
      }
      return this;
    });
    /**
     * Alias for add.
     */
    __publicField(this, "overwrite", (taggedDocument) => this.add(taggedDocument));
    /**
     * Updates the tags.
     */
    __publicField(this, "update", (tags) => {
      __privateSet(this, _tags, __spreadValues(__spreadValues({}, this.tags), tags));
      return this;
    });
    /**
     * Selects the text between the provided start and end.
     */
    __publicField(this, "selectText", (selection) => {
      const tr = this.tr;
      const textSelection = getTextSelection(selection, tr.doc);
      this.view.dispatch(tr.setSelection(textSelection));
      return this;
    });
    /**
     * Allows for the chaining of calls and is useful for running tests after
     * actions.
     *
     * You shouldn't use it to call any mutative functions that would change the
     * editor state.
     *
     * ```ts
     * const create = () => renderEditor({ plainNodes: [], others: [new EmojiExtension()] });
     * const {
     *   nodes: { p, doc },
     *   add,
     * } = create();
     *
     * add(doc(p('<cursor>'))).insertText(':-)')
     *   .callback(content => {
     *     expect(content.state.doc).toEqualRemirrorDocument(doc(p('😃')));
     *   })
     *   .insertText(' awesome')
     *   .callback(content => {
     *      expect(content.state.doc).toEqualRemirrorDocument(doc(p('😃 awesome')));
     *   });
     * ```
     */
    __publicField(this, "callback", (fn) => {
      fn(pick(this, ["helpers", "commands", "to", "state", "tags", "from", "doc", "view"]));
      return this;
    });
    /**
     * Runs a keyboard shortcut. e.g. `Mod-X`
     *
     * @param text
     */
    __publicField(this, "shortcut", (text2) => {
      shortcut({ shortcut: text2, view: this.view });
      return this;
    });
    /**
     * A simplistic implementation of pasting content into the editor. Underneath
     * it calls the paste handler `transformPaste` and that is all.
     *
     * @param content - The text or node to paste into the document at the current
     * —ion.
     */
    __publicField(this, "paste", (content) => {
      pasteContent({ view: this.view, content });
      return this;
    });
    /**
     * Presses a key on the keyboard. e.g. `Mod-X`
     *
     * @param key - the key to press (or string representing a key)
     */
    __publicField(this, "press", (char, times = 1) => {
      for (const _ of range(times)) {
        press({ char, view: this.view });
      }
      return this;
    });
    /**
     * Simulates a backspace keypress and deletes text backwards.
     */
    __publicField(this, "backspace", (times) => {
      backspace({ view: this.view, times });
      return this;
    });
    /**
     * Simulates a forward deletion.
     */
    __publicField(this, "forwardDelete", (times) => {
      forwardDelete({ view: this.view, times });
      return this;
    });
    /**
     * Takes any command as an input and dispatches it within the document
     * context.
     *
     * @param command - the command function to run with the current state and
     * view
     */
    __publicField(this, "dispatchCommand", (command) => {
      command({ state: this.state, dispatch: this.view.dispatch, view: this.view, tr: this.tr });
      return this;
    });
    /**
     * Fires a custom event at the specified dom node. e.g. `click`
     *
     * @param shortcut - the shortcut to type
     */
    __publicField(this, "fire", (parameters) => {
      fireEventAtPosition(__spreadValues({ view: this.view }, parameters));
      return this;
    });
    /**
     * Set selection in the document to a certain position
     */
    __publicField(this, "jumpTo", (pos, endPos) => {
      if (pos === "start") {
        dispatchTextSelection({ view: this.view, start: 1 });
        return this;
      }
      if (pos === "end") {
        dispatchTextSelection({ view: this.view, start: this.doc.content.size - 1 });
        return this;
      }
      dispatchTextSelection({ view: this.view, start: pos, end: endPos });
      return this;
    });
    /**
     * A function which replaces the current selection with the new content.
     *
     * This should be used to add new content to the dom.
     */
    __publicField(this, "replace", (...replacement) => {
      replaceSelection({ view: this.view, content: replacement });
      return this;
    });
    /**
     * Insert text at the current starting point for the cursor. Text will be
     * typed out with keys each firing a keyboard event.
     *
     * ! This doesn't currently support the use of tags and cursors.
     *
     * ! Adding multiple strings which create nodes creates an out of
     * position error
     */
    __publicField(this, "insertText", (text2) => {
      const { from } = this.state.selection;
      insertText({ start: from, text: text2, view: this.view });
      return this;
    });
    /**
     * Logs the view to the dom for help debugging the html in your tests.
     */
    __publicField(this, "debug", (element = this.view.dom) => {
      console.log(prettyDOM(element));
      return this;
    });
    /**
     * Cleanup the element from the dom. Use this if you decide against automatic
     * cleanup after tests.
     */
    __publicField(this, "cleanup", () => {
      var _a;
      (_a = this.view.dom.parentElement) == null ? void 0 : _a.remove();
    });
    __privateSet(this, _manager, manager);
    this.createDocBuilders();
    this.setupCloneListener();
  }
  /**
   * A static method for creating the test helpers when testing your remirror
   * models.
   */
  static create(manager) {
    return new _RemirrorTestChain(manager);
  }
  /**
   * Provide access to the editor manager.
   */
  get manager() {
    return __privateGet(this, _manager);
  }
  /**
   * The editor view.
   */
  get view() {
    return this.manager.view;
  }
  /**
   * The editor state.
   */
  get state() {
    return this.view.state;
  }
  /**
   * The editor state.
   */
  get tr() {
    return this.view.state.tr;
  }
  /**
   * The editor schema.
   */
  get schema() {
    return this.manager.schema;
  }
  /**
   * The root node for the editor.
   */
  get doc() {
    return this.state.doc;
  }
  /**
   * The commands available in the editor. When updating the content of the
   * TestEditor make sure not to use a stale copy of the actions otherwise it
   * will throw errors due to using an outdated state.
   */
  get commands() {
    return __privateGet(this, _manager).store.commands;
  }
  /**
   * The chainable commands available in the editor. When updating the content of the
   * TestEditor make sure not to use a stale copy of the actions otherwise it
   * will throw errors due to using an outdated state.
   */
  get chain() {
    return __privateGet(this, _manager).store.chain;
  }
  /**
   * Access to which nodes and marks are active under the current selection.
   */
  get active() {
    return __privateGet(this, _manager).store.active;
  }
  /**
   * The helpers available in the editor. When updating the content of the
   * TestEditor make sure not to use a stale copy of the helpers object
   * otherwise it will throw errors due to using an outdated state.
   */
  get helpers() {
    return __privateGet(this, _manager).store.helpers;
  }
  /**
   * The start of the current selection
   */
  get from() {
    return this.state.selection.from;
  }
  /**
   * The end of the current selection. For a cursor selection this will be the
   * same as the start.
   */
  get to() {
    return this.state.selection.to;
  }
  /**
   * The content to write to the clipboard if copy the current selection.
   */
  get copied() {
    return copyContent({ view: this.view });
  }
  /**
   * All custom tags that have been added  *not including* the following
   * - `<start>`
   * - `<end>`
   * - `<node>`
   * - `<cursor>`
   * - `<all>`
   * - `<anchor>`
   *
   * Which are all part of the formal cursor and selection API.
   */
  get tags() {
    var _a;
    return (_a = __privateGet(this, _tags)) != null ? _a : {};
  }
  /**
   * The dom node holding the view.
   */
  get dom() {
    return this.view.dom;
  }
  /**
   * The innerHTML for the editor.
   */
  get innerHTML() {
    return this.dom.innerHTML;
  }
  /**
   * Replace the manager with the newly cloned manager when cloned.
   */
  setupCloneListener() {
    const dispose = __privateGet(this, _manager).addHandler("clone", (newManager) => {
      __privateSet(this, _manager, newManager);
      dispose();
      this.setupCloneListener();
    });
  }
  /**
   * Create the node and mark document builders.
   */
  createDocBuilders() {
    this.nodes.p = nodeFactory({ name: "paragraph", schema: this.schema });
    for (const extension of __privateGet(this, _manager).extensions) {
      if (isMarkExtension(extension)) {
        this.marks[extension.name] = markFactory({
          name: extension.name,
          schema: this.schema
        });
        this.attributeMarks[extension.name] = (attrs = object2()) => markFactory({ name: extension.name, schema: this.schema, attrs });
      }
      if (isNodeExtension(extension)) {
        this.nodes[extension.name] = nodeFactory({
          name: extension.name,
          schema: this.schema
        });
        this.attributeNodes[extension.name] = (attrs = object2()) => nodeFactory({ name: extension.name, schema: this.schema, attrs });
      }
    }
  }
};
_manager = new WeakMap();
_tags = new WeakMap();
var RemirrorTestChain = _RemirrorTestChain;
function isInPage(node) {
  return node === document.body ? false : document.body.contains(node);
}
function createElement(element, autoClean = true) {
  if (!element) {
    element = document.createElement("div");
  }
  if (!isInPage(element)) {
    document.body.append(element);
  }
  if (autoClean) {
    elements.add(element);
  }
  return element;
}
function cleanup() {
  for (const element of elements) {
    if (element.parentNode === document.body) {
      element.remove();
    }
    elements.delete(element);
  }
}
if (isFunction(afterEach)) {
  afterEach(() => {
    cleanup();
  });
}

// src/jest-remirror-environment.ts
import { environment as environment2 } from "@remirror/core";

// src/jest-remirror-matchers.ts
import { isEditorState, isProsemirrorNode as isProsemirrorNode3 } from "@remirror/core";
var remirrorMatchers = {
  toContainRemirrorDocument(state, value) {
    var _a;
    if (!isProsemirrorNode3(value)) {
      return {
        pass: false,
        message: () => "The expected value should be an instance of ProsemirrorNode."
      };
    }
    if (!isEditorState(state)) {
      return {
        pass: false,
        message: () => "Expected the value passed in to be an EditorState"
      };
    }
    if (value.type.schema !== state.schema) {
      return {
        pass: false,
        message: () => "Expected both values to be using the same schema."
      };
    }
    const expected = (_a = value == null ? void 0 : value.toJSON) == null ? void 0 : _a.call(value);
    const pass = this.equals(state.doc.content.child(0).toJSON(), expected);
    const message = pass ? () => "".concat(this.utils.matcherHint(".not.toContainRemirrorDocument"), "\n\n") + "Expected JSON value of document to not contain:\n  ".concat(this.utils.printExpected(
      value
    ), "\n") + "Actual JSON:\n  ".concat(this.utils.printReceived(state.doc.content.child(0))) : () => {
      const diffString = this.utils.diff(value, state.doc.content.child(0), {
        expand: this.expand
      });
      return "".concat(this.utils.matcherHint(".toContainRemirrorDocument"), "\n\n") + "Expected JSON value of document to contain:\n".concat(this.utils.printExpected(value), "\n") + "Actual JSON:\n  ".concat(this.utils.printReceived(state.doc.content.child(0))) + "".concat(diffString ? "\n\nDifference:\n\n".concat(diffString) : "");
    };
    return {
      pass,
      message
    };
  },
  toEqualRemirrorState(state, value) {
    var _a, _b, _c;
    if (!isProsemirrorNode3(value)) {
      return {
        pass: false,
        message: () => "The expected value should be an instance of ProsemirrorNode."
      };
    }
    if (!isEditorState(state)) {
      return {
        pass: false,
        message: () => "Expected the value passed in to be an EditorState"
      };
    }
    if (value.type.schema !== state.schema) {
      return {
        pass: false,
        message: () => "Expected both values to be using the same schema."
      };
    }
    const expectedDocument = (_a = value == null ? void 0 : value.toJSON) == null ? void 0 : _a.call(value);
    const expectedSelection = (_c = createSelectionFromTaggedDocument(
      state.doc,
      (_b = value == null ? void 0 : value.tags) != null ? _b : {}
    )) == null ? void 0 : _c.toJSON();
    if (!isProsemirrorNode3(value)) {
      return {
        pass: false,
        message: () => "The expected value should be an instance of ProsemirrorNode."
      };
    }
    if (!isEditorState(state)) {
      return {
        pass: false,
        message: () => "Expected the value passed in to be an EditorState"
      };
    }
    if (value.type.schema !== state.schema) {
      return {
        pass: false,
        message: () => "Expected both values to be using the same schema."
      };
    }
    const passDocuement = this.equals(state.doc.toJSON(), expectedDocument);
    let passSelection = true;
    if (passDocuement && expectedSelection) {
      passSelection = this.equals(state.selection.toJSON(), expectedSelection);
    }
    const pass = passDocuement && passSelection;
    const message = pass ? () => "".concat(this.utils.matcherHint(".not.toContainRemirrorDocument"), "\n\n") + "Expected JSON value of document to not contain:\n  ".concat(this.utils.printExpected(
      value
    ), "\n") + "Actual JSON value of document:\n  ".concat(this.utils.printReceived(state.doc), "\n") + "Expected JSON value of selection to not contain:\n  ".concat(this.utils.printExpected(
      expectedSelection
    ), "\n") + "Actual JSON value of selection:\n  ".concat(this.utils.printReceived(state.selection), "\n") : () => {
      const diffString = this.utils.diff(value, state.doc, {
        expand: this.expand
      });
      return "".concat(this.utils.matcherHint(".toContainRemirrorDocument"), "\n\n") + "Expected JSON value of document to contain:\n".concat(this.utils.printExpected(value), "\n") + "Actual JSON value of document:\n  ".concat(this.utils.printReceived(state.doc), "\n") + "Expected JSON value of selection to contain:\n".concat(this.utils.printExpected(
        expectedSelection
      ), "\n") + "Actual JSON value of selection:\n  ".concat(this.utils.printReceived(state.selection)) + "".concat(diffString ? "\n\nDifference:\n\n".concat(diffString) : "");
    };
    return {
      pass,
      message
    };
  },
  toEqualRemirrorDocument(doc, value) {
    if (!isProsemirrorNode3(value) || !isProsemirrorNode3(doc)) {
      return {
        pass: false,
        message: () => "Expected both values to be instance of prosemirror-model Node."
      };
    }
    if (value.type.schema !== doc.type.schema) {
      return {
        pass: false,
        message: () => "Expected both values to be using the same schema."
      };
    }
    const pass = this.equals(doc.toJSON(), value.toJSON());
    const message = pass ? () => "".concat(this.utils.matcherHint(".not.toEqualRemirrorDocument"), "\n\n") + "Expected JSON value of document to not equal:\n  ".concat(this.utils.printExpected(value), "\n") + "Actual JSON:\n  ".concat(this.utils.printReceived(doc)) : () => {
      const diffString = this.utils.diff(value, doc, {
        expand: this.expand
      });
      return "".concat(this.utils.matcherHint(".toEqualRemirrorDocument"), "\n\n") + "Expected JSON value of document to equal:\n".concat(this.utils.printExpected(value), "\n") + "Actual JSON:\n  ".concat(this.utils.printReceived(doc)) + "".concat(diffString ? "\n\nDifference:\n\n".concat(diffString) : "");
    };
    return {
      pass,
      message
    };
  }
};

// src/jsdom-polyfills.ts
import sanitizeHtml from "sanitize-html";
import warning from "tiny-warning";
import { environment, isFunction as isFunction2, noop } from "@remirror/core";
function jsdomPolyfill() {
  if (!environment.isJSDOM) {
    return;
  }
  supportBoundingClientRect();
  supportCancelAnimationFrame();
  supportInnerTextInAnchors();
  supportRanges();
  supportAdjustableSizes();
  supportScrollIntoView();
}
function ignoreJSDOMWarnings(shouldIgnore = true) {
  if (!environment.isJSDOM) {
    return;
  }
  window.ignoreAllJSDOMWarnings = shouldIgnore;
}
function supportBoundingClientRect() {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect.bind(
    Element.prototype
  );
  if (!window.DOMRect) {
    global.DOMRect = window.DOMRect = class DOMRect {
      constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        __publicField(this, "left");
        __publicField(this, "right");
        __publicField(this, "top");
        __publicField(this, "bottom");
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
      }
      fromRect(_) {
        return new DOMRect();
      }
    };
  }
  Element.prototype.getBoundingClientRect = function() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    if (isFunction2(originalGetBoundingClientRect)) {
      try {
        return originalGetBoundingClientRect();
      } catch (e) {
      }
    }
    return {
      toJSON() {
        return {};
      },
      width: (_b = Number.parseFloat((_a = this.style) == null ? void 0 : _a.width)) != null ? _b : 0,
      height: (_d = Number.parseFloat((_c = this.style) == null ? void 0 : _c.height)) != null ? _d : 0,
      top: (_f = Number.parseFloat((_e = this.style) == null ? void 0 : _e.marginTop)) != null ? _f : 0,
      left: (_h = Number.parseFloat((_g = this.style) == null ? void 0 : _g.marginLeft)) != null ? _h : 0,
      x: (_j = Number.parseFloat((_i = this.style) == null ? void 0 : _i.marginLeft)) != null ? _j : 0,
      y: (_l = Number.parseFloat((_k = this.style) == null ? void 0 : _k.marginTop)) != null ? _l : 0,
      right: (_n = Number.parseFloat((_m = this.style) == null ? void 0 : _m.width)) != null ? _n : 0,
      bottom: (_p = Number.parseFloat((_o = this.style) == null ? void 0 : _o.height)) != null ? _p : 0
    };
  };
  const originalGetClientRects = Element.prototype.getClientRects;
  Element.prototype.getClientRects = function() {
    if (isFunction2(originalGetClientRects)) {
      try {
        return originalGetClientRects();
      } catch (e) {
      }
    }
    const rects = [];
    rects.item = (_) => null;
    return rects;
  };
}
function supportCancelAnimationFrame() {
  if (isFunction2(window.cancelAnimationFrame)) {
    return;
  }
  window.cancelAnimationFrame = () => {
    if (!window.ignoreAllJSDOMWarnings && !window.hasWarnedAboutCancelAnimationFramePolyfill) {
      window.hasWarnedAboutCancelAnimationFramePolyfill = true;
      warning(
        true,
        "Warning! Test uses DOM cancelAnimationFrame API which is not available in JSDOM/Node environment."
      );
    }
  };
}
function supportInnerTextInAnchors() {
  if ("innerText" in document.createElement("a")) {
    return;
  }
  Object.defineProperty(Element.prototype, "innerText", {
    get() {
      return sanitizeHtml(this.textContent, {
        allowedTags: [],
        // remove all tags and return text content only
        allowedAttributes: {}
        // remove all tags and return text content only
      });
    },
    configurable: true
    // make it so that it doesn't blow chunks on re-running tests with things like --watch
  });
}
function supportRanges() {
  var _a;
  if (window.Range) {
    window.Range.prototype.getClientRects = Element.prototype.getClientRects;
    window.Range.prototype.getBoundingClientRect = Element.prototype.getBoundingClientRect;
  }
  function fakeCreateRange() {
    return {
      setStart: noop,
      setEnd: noop,
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document
      },
      getClientRects: Element.prototype.getClientRects,
      getBoundingClientRect: Element.prototype.getBoundingClientRect
    };
  }
  document.createRange = (_a = document.createRange) != null ? _a : fakeCreateRange;
}
function supportAdjustableSizes() {
  var _a, _b;
  Object.defineProperties(document.documentElement, {
    clientWidth: {
      writable: true,
      value: (_a = document.documentElement.clientWidth) != null ? _a : window.innerWidth
    },
    clientHeight: {
      writable: true,
      value: (_b = document.documentElement.clientHeight) != null ? _b : window.innerHeight
    },
    scrollWidth: {
      writable: true,
      value: document.documentElement.scrollWidth
    },
    scrollHeight: {
      writable: true,
      value: document.documentElement.scrollHeight
    }
  });
}
function supportScrollIntoView() {
  Element.prototype.scrollIntoView = () => {
  };
}

// src/jest-remirror-environment.ts
function setupRemirrorEnvironment() {
  if (!environment2.isBrowser) {
    return;
  }
  expect.extend(remirrorMatchers);
  jsdomPolyfill();
}

// src/jest-remirror-validator.ts
import {
  isEmptyArray,
  isFunction as isFunction3,
  isMarkExtension as isMarkExtension2,
  isMarkType,
  isNodeExtension as isNodeExtension2,
  isNodeType,
  isPlainObject,
  mutateDefaultExtensionOptions,
  object as object3,
  omit,
  pick as pick2
} from "@remirror/core";

// src/simple-mock.ts
function simpleMockFn(implementation) {
  let calledTimes = 0;
  const mocked = (...args) => {
    calledTimes++;
    return implementation(...args);
  };
  const getCalledTimes = () => calledTimes;
  const getCalled = () => calledTimes > 0;
  mocked.getCalledTimes = getCalledTimes;
  mocked.getCalled = getCalled;
  return mocked;
}

// src/jest-remirror-validator.ts
function extensionValidityTest(Extension, ...[options]) {
  describe("`".concat(Extension.name, "`"), () => {
    it("has the right properties", () => {
      const extension2 = new Extension(options);
      expect(extension2.constructorName).toMatch(/Extension$/);
      expect(() => {
        extension2.name = "_CHANGE_";
      }).toThrow();
    });
    it("can safely set empty options", () => {
      const extension2 = new Extension(options);
      expect(() => extension2.setOptions({})).not.toThrow();
    });
    it("can safely be cloned", () => {
      const extension2 = new Extension(options);
      const dynamicKeys = [...extension2.dynamicKeys, ...Extension.staticKeys];
      const clonedExtension = extension2.clone(options);
      expect(pick2(clonedExtension.options, dynamicKeys)).toEqual(
        pick2(extension2.options, dynamicKeys)
      );
    });
    let defaultOptions = object3();
    mutateDefaultExtensionOptions((value) => {
      defaultOptions = value;
    });
    const handlerKeys = Extension.handlerKeys.map((key) => [key]);
    if (!isEmptyArray(handlerKeys)) {
      it.each(handlerKeys)("has valid handlerKey: %s", (handlerKey) => {
        const extension2 = new Extension(options);
        expect(isFunction3(extension2.options[handlerKey])).toBe(true);
      });
    }
    it("has the correct options", () => {
      const extension2 = new Extension(options);
      const expectedOptions = __spreadValues(__spreadValues(__spreadValues({}, defaultOptions), Extension.defaultOptions), options);
      expect(omit(extension2.options, Extension.handlerKeys)).toEqual(expectedOptions);
    });
    const extension = new Extension(options);
    if (isNodeExtension2(extension)) {
      it("creates a valid node spec", async () => {
        const extraAttributes = {
          defaults: simpleMockFn(() => ({})),
          dom: simpleMockFn(() => ({})),
          parse: simpleMockFn(() => ({}))
        };
        const spec = extension.createNodeSpec(extraAttributes, {});
        expect(isPlainObject(spec)).toBe(true);
        renderEditor([extension], {
          props: { initialContent: "" },
          stringHandler: "html"
        });
        expect(isNodeType(extension.type)).toBe(true);
        if (Extension.disableExtraAttributes) {
          return;
        }
        expect(extraAttributes.defaults.getCalled()).toBe(true);
      });
    }
    if (isMarkExtension2(extension)) {
      it("creates a valid mark spec", async () => {
        const extraAttributes = {
          defaults: simpleMockFn(() => ({})),
          dom: simpleMockFn(() => ({})),
          parse: simpleMockFn(() => ({}))
        };
        const spec = extension.createMarkSpec(extraAttributes, {});
        expect(isPlainObject(spec)).toBe(true);
        renderEditor([extension], {
          props: { initialContent: "" },
          stringHandler: "html"
        });
        expect(isMarkType(extension.type)).toBe(true);
        if (Extension.disableExtraAttributes) {
          return;
        }
        expect(extraAttributes.defaults.getCalled()).toBe(true);
      });
    }
  });
}
export {
  RemirrorTestChain,
  TagTracker,
  extensionValidityTest,
  ignoreJSDOMWarnings,
  jsdomPolyfill,
  remirrorMatchers,
  renderEditor,
  setupRemirrorEnvironment
};
