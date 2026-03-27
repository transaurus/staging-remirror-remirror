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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CodeMirrorExtension: () => CodeMirrorExtension2
});
module.exports = __toCommonJS(src_exports);

// src/codemirror-extension.ts
var import_core2 = require("@remirror/core");
var import_state4 = require("@remirror/pm/state");

// src/codemirror-node-view.ts
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var import_core = require("@remirror/core");
var import_commands = require("@remirror/pm/commands");
var import_state2 = require("@remirror/pm/state");
var CodeMirror6NodeView = class {
  constructor({
    node,
    view,
    getPos,
    extensions,
    loadLanguage,
    toggleName
  }) {
    __publicField(this, "dom");
    __publicField(this, "node");
    __publicField(this, "view");
    __publicField(this, "getPos");
    __publicField(this, "schema");
    __publicField(this, "cm");
    __publicField(this, "updating", false);
    __publicField(this, "loadLanguage");
    __publicField(this, "languageConf");
    __publicField(this, "languageName");
    __publicField(this, "toggleName");
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.schema = node.type.schema;
    this.loadLanguage = loadLanguage;
    this.languageConf = new import_state.Compartment();
    this.languageName = "";
    this.toggleName = toggleName;
    const changeFilter = import_state.EditorState.changeFilter.of((tr) => {
      if (!tr.docChanged && !this.updating) {
        this.forwardSelection();
      }
      return true;
    });
    const startState = import_state.EditorState.create({
      doc: this.node.textContent,
      extensions: [
        import_view.keymap.of(this.codeMirrorKeymap()),
        changeFilter,
        this.languageConf.of([]),
        ...extensions != null ? extensions : []
      ]
    });
    this.cm = new import_view.EditorView({
      state: startState,
      dispatch: this.valueChanged.bind(this)
    });
    this.dom = this.cm.dom;
    this.updateLanguage();
  }
  update(node) {
    if (node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    this.updateLanguage();
    const change = computeChange(this.cm.state.doc.toString(), node.textContent);
    if (change) {
      this.updating = true;
      this.cm.dispatch({
        changes: { from: change.from, to: change.to, insert: change.text }
      });
      this.updating = false;
    }
    return true;
  }
  updateLanguage() {
    const languageName = this.node.attrs.language;
    if (languageName === this.languageName) {
      return;
    }
    const language = this.loadLanguage(languageName);
    if (!language) {
      return;
    }
    if ((0, import_core.isPromise)(language)) {
      language.then((lang) => {
        this.setLanguage(lang);
        this.languageName = languageName;
      });
      return;
    }
    this.setLanguage(language);
    this.languageName = languageName;
  }
  setLanguage(language) {
    this.cm.dispatch({
      effects: this.languageConf.reconfigure(language)
    });
  }
  /**
   * Synchronize the selections from ProseMirror to CodeMirrror
   */
  setSelection(anchor, head) {
    this.cm.focus();
    this.updating = true;
    this.cm.dispatch({ selection: { anchor, head } });
    this.updating = false;
  }
  selectNode() {
    this.focus();
  }
  focus() {
    this.cm.focus();
    this.forwardSelection();
  }
  stopEvent() {
    return true;
  }
  destroy() {
    this.cm.destroy();
  }
  /**
   * When the code editor is focused, we can keep the selection of the outer
   * editor synchronized with the inner one, so that any commands executed on
   * the outer editor see an accurate selection.
   */
  forwardSelection() {
    if (!this.cm.hasFocus) {
      return;
    }
    const state = this.view.state;
    const selection = this.asProseMirrorSelection(state.doc);
    if (!selection.eq(state.selection)) {
      this.view.dispatch(state.tr.setSelection(selection));
    }
  }
  /**
   * This helper function translates from a CodeMirror selection to a
   * ProseMirror selection.
   */
  asProseMirrorSelection(doc) {
    const start = this.getPos() + 1;
    const { anchor, head } = this.cm.state.selection.main;
    return import_state2.TextSelection.between(doc.resolve(anchor + start), doc.resolve(head + start));
  }
  /**
   * A somewhat tricky aspect of nesting editor like this is handling cursor
   * motion across the edges of the inner editor. This node view will have to
   * take care of allowing the user to move the selection out of the code
   * editor. For that purpose, it binds the arrow keys to handlers that check if
   * further motion would ‘escape’ the editor, and if so, return the selection
   * and focus to the outer editor.
   *
   * The keymap also binds ctrl-enter, which, in ProseMirror's base keymap,
   * creates a  new paragraph after a code block.
   */
  codeMirrorKeymap() {
    return [
      {
        key: "ArrowUp",
        run: this.maybeEscape("line", -1)
      },
      {
        key: "ArrowLeft",
        run: this.maybeEscape("char", -1)
      },
      {
        key: "ArrowDown",
        run: this.maybeEscape("line", 1)
      },
      {
        key: "ArrowRight",
        run: this.maybeEscape("char", 1)
      },
      {
        key: "Ctrl-Enter",
        run: () => {
          if ((0, import_commands.exitCode)(this.view.state, this.view.dispatch)) {
            this.view.focus();
            return true;
          }
          return false;
        }
      },
      {
        key: "Backspace",
        run: () => {
          const ranges = this.cm.state.selection.ranges;
          if (ranges.length > 1) {
            return false;
          }
          const selection = ranges[0];
          if (selection && (!selection.empty || selection.anchor > 0)) {
            return false;
          }
          if (this.cm.state.doc.lines >= 2) {
            return false;
          }
          const state = this.view.state;
          const toggleNode = (0, import_core.assertGet)(state.schema.nodes, this.toggleName);
          const pos = this.getPos();
          const tr = (0, import_core.replaceNodeAtPosition)({
            pos,
            tr: state.tr,
            content: toggleNode.createChecked({}, this.node.content)
          });
          tr.setSelection(import_state2.TextSelection.near(tr.doc.resolve(pos)));
          this.view.dispatch(tr);
          this.view.focus();
          return true;
        }
      }
    ];
  }
  /**
   * When the actual content of the code editor is changed, the event handler
   * registered in the node view's constructor calls this method. It'll compare
   * the code block node's current value to the value in the editor, and
   * dispatch a transaction if there is a difference.
   */
  valueChanged(tr) {
    this.cm.update([tr]);
    if (!tr.docChanged || this.updating) {
      return;
    }
    const change = computeChange(this.node.textContent, tr.state.doc.toString());
    if (change) {
      const start = this.getPos() + 1;
      const tr2 = this.view.state.tr.replaceWith(
        start + change.from,
        start + change.to,
        change.text ? this.schema.text(change.text) : []
      );
      this.view.dispatch(tr2);
    }
  }
  maybeEscape(unit, dir) {
    return (view) => {
      const { state } = view;
      if (state.selection.ranges.some((range) => !range.empty)) {
        return false;
      }
      const anchor = state.selection.main.anchor;
      const line = state.doc.lineAt(anchor);
      const lineOffset = anchor - line.from;
      if (line.number !== (dir < 0 ? 1 : state.doc.lines) || unit === "char" && lineOffset !== (dir < 0 ? 0 : line.length)) {
        return false;
      }
      const targetPos = this.getPos() + (dir < 0 ? 0 : this.node.nodeSize);
      const selection = import_state2.Selection.near(this.view.state.doc.resolve(targetPos), dir);
      this.view.dispatch(this.view.state.tr.setSelection(selection).scrollIntoView());
      this.view.focus();
      return true;
    };
  }
};
function computeChange(oldVal, newVal) {
  if (oldVal === newVal) {
    return null;
  }
  let start = 0;
  let oldEnd = oldVal.length;
  let newEnd = newVal.length;
  while (start < oldEnd && oldVal.charCodeAt(start) === newVal.charCodeAt(start)) {
    ++start;
  }
  while (oldEnd > start && newEnd > start && oldVal.charCodeAt(oldEnd - 1) === newVal.charCodeAt(newEnd - 1)) {
    oldEnd--;
    newEnd--;
  }
  return { from: start, to: oldEnd, text: newVal.slice(start, newEnd) };
}

// src/codemirror-utils.ts
var import_state3 = require("@remirror/pm/state");
function arrowHandler(dir) {
  return ({ dispatch, view, tr }) => {
    if (!view) {
      return false;
    }
    if (!(tr.selection.empty && view.endOfTextblock(dir))) {
      return false;
    }
    const side = dir === "left" || dir === "up" ? -1 : 1;
    const $head = tr.selection.$head;
    const nextPos = import_state3.Selection.near(tr.doc.resolve(side > 0 ? $head.after() : $head.before()), side);
    if (nextPos.$head && nextPos.$head.parent.type.name === "codeMirror") {
      dispatch == null ? void 0 : dispatch(tr.setSelection(nextPos));
      return true;
    }
    return false;
  };
}

// src/codemirror-extension.ts
var _updateCodeMirror_dec, _createCodeMirror_dec, _enterKey_dec, _a, _CodeMirrorExtension_decorators, _init;
_CodeMirrorExtension_decorators = [(0, import_core2.extension)({
  defaultOptions: {
    extensions: null,
    languages: null,
    toggleName: "paragraph"
  }
})];
var CodeMirrorExtension2 = class extends (_a = import_core2.NodeExtension, _enterKey_dec = [(0, import_core2.keyBinding)({ shortcut: "Enter" })], _createCodeMirror_dec = [(0, import_core2.command)()], _updateCodeMirror_dec = [(0, import_core2.command)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "languageMap", null);
  }
  get name() {
    return "codeMirror";
  }
  createNodeSpec(extra, override) {
    var _a2;
    return __spreadProps(__spreadValues({
      group: "block",
      content: "text*",
      marks: "",
      defining: true
    }, override), {
      code: true,
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        language: { default: "" }
      }),
      parseDOM: [
        {
          tag: "pre",
          getAttrs: (node) => (0, import_core2.isElementDomNode)(node) ? extra.parse(node) : false
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM() {
        return ["pre", ["code", 0]];
      },
      isolating: true
    });
  }
  createNodeViews() {
    return (node, view, getPos) => new CodeMirror6NodeView({
      node,
      view,
      getPos,
      extensions: this.options.extensions,
      loadLanguage: this.loadLanguage.bind(this),
      toggleName: this.options.toggleName
    });
  }
  createKeymap() {
    return {
      ArrowLeft: arrowHandler("left"),
      ArrowRight: arrowHandler("right"),
      ArrowUp: arrowHandler("up"),
      ArrowDown: arrowHandler("down")
    };
  }
  /**
   * Create an input rule that listens converts the code fence into a code block
   * when typing triple back tick followed by a space.
   */
  createInputRules() {
    const regexp = /^```(\S+) $/;
    const getAttributes = (match) => {
      var _a2;
      const language = (_a2 = match[1]) != null ? _a2 : "";
      return { language };
    };
    return [
      (0, import_core2.nodeInputRule)({
        regexp,
        type: this.type,
        beforeDispatch: ({ tr, start }) => {
          const $pos = tr.doc.resolve(start);
          tr.setSelection(import_state4.TextSelection.near($pos));
        },
        getAttributes
      })
    ];
  }
  enterKey({ dispatch, tr }) {
    var _a2;
    if (!((0, import_core2.isTextSelection)(tr.selection) && tr.selection.empty)) {
      return false;
    }
    const { nodeBefore, parent } = tr.selection.$anchor;
    if (!(nodeBefore == null ? void 0 : nodeBefore.isText) || !parent.type.isTextblock) {
      return false;
    }
    const regex = /^```(\S*)?$/;
    const { text, nodeSize } = nodeBefore;
    const { textContent } = parent;
    if (!text) {
      return false;
    }
    const matchesNodeBefore = text.match(regex);
    const matchesParent = textContent.match(regex);
    if (!matchesNodeBefore || !matchesParent) {
      return false;
    }
    const language = (_a2 = matchesNodeBefore[1]) != null ? _a2 : "";
    const pos = tr.selection.$from.before();
    const end = pos + nodeSize + 1;
    tr.replaceWith(pos, end, this.type.create({ language }));
    tr.setSelection(import_state4.TextSelection.near(tr.doc.resolve(pos + 1)));
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  }
  getLanguageMap() {
    var _a2;
    if (!this.languageMap) {
      this.languageMap = {};
      for (const language of (_a2 = this.options.languages) != null ? _a2 : []) {
        for (const alias of language.alias) {
          this.languageMap[alias] = language;
        }
      }
    }
    return this.languageMap;
  }
  loadLanguage(languageName) {
    if (typeof languageName !== "string") {
      return void 0;
    }
    const languageMap = this.getLanguageMap();
    const language = languageMap[languageName.toLowerCase()];
    if (!language) {
      return void 0;
    }
    return language.support || language.load();
  }
  createCodeMirror(attributes) {
    return (0, import_core2.setBlockType)(this.type, attributes);
  }
  updateCodeMirror(attributes) {
    const type = this.type;
    return ({ state, dispatch, tr }) => {
      const parent = (0, import_core2.findParentNodeOfType)({ types: type, selection: state.selection });
      if (!parent || (0, import_core2.isEqual)(attributes, parent.node.attrs)) {
        return false;
      }
      tr.setNodeMarkup(parent.pos, type, __spreadValues(__spreadValues({}, parent.node.attrs), attributes));
      if (dispatch) {
        dispatch(tr);
      }
      return true;
    };
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "enterKey", _enterKey_dec, CodeMirrorExtension2);
__decorateElement(_init, 1, "createCodeMirror", _createCodeMirror_dec, CodeMirrorExtension2);
__decorateElement(_init, 1, "updateCodeMirror", _updateCodeMirror_dec, CodeMirrorExtension2);
CodeMirrorExtension2 = __decorateElement(_init, 0, "CodeMirrorExtension", _CodeMirrorExtension_decorators, CodeMirrorExtension2);
__runInitializers(_init, 1, CodeMirrorExtension2);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodeMirrorExtension
});
