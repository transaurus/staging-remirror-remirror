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
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CodeBlockExtension: () => CodeBlockExtension,
  codeBlockPositioner: () => codeBlockPositioner,
  getLanguage: () => getLanguage
});
module.exports = __toCommonJS(src_exports);

// src/code-block-extension.ts
var import_core4 = __toESM(require("refractor/core.js"), 1);
var import_core5 = require("@remirror/core");
var import_keymap = require("@remirror/pm/keymap");
var import_state = require("@remirror/pm/state");
var import_theme = require("@remirror/theme");

// src/code-block-plugin.ts
var import_core3 = require("@remirror/core");
var import_view2 = require("@remirror/pm/view");

// src/code-block-utils.ts
var import_core = __toESM(require("refractor/core.js"), 1);
var import_core2 = require("@remirror/core");
var import_messages = require("@remirror/messages");
var import_view = require("@remirror/pm/view");
var LANGUAGE_ATTRIBUTE = "data-code-block-language";
function parseRefractorNodes(refractorNodes, plainTextClassName, className = []) {
  return refractorNodes.map((node) => {
    const classes = [...className];
    if (node.type === "element" && node.properties.className) {
      classes.push(...node.properties.className);
    } else if (node.type === "text" && classes.length === 0 && plainTextClassName) {
      classes.push(plainTextClassName);
    }
    if (node.type === "element") {
      return parseRefractorNodes(node.children, plainTextClassName, classes);
    }
    return {
      text: node.value,
      classes
    };
  });
}
function getPositionedRefractorNodes(nodeWithPos, plainTextClassName) {
  var _a2, _b;
  const { node, pos } = nodeWithPos;
  const language = getLanguage({
    language: (_a2 = node.attrs.language) == null ? void 0 : _a2.replace("language-", ""),
    fallback: "markup"
  });
  const refractorNodes = import_core.default.highlight((_b = node.textContent) != null ? _b : "", language);
  const parsedRefractorNodes = parseRefractorNodes(refractorNodes, plainTextClassName);
  let startPos = pos + 1;
  function mapper(refractorNode) {
    const from = startPos;
    const to = from + refractorNode.text.length;
    startPos = to;
    return __spreadProps(__spreadValues({}, refractorNode), {
      from,
      to
    });
  }
  return (0, import_core2.flattenArray)(parsedRefractorNodes).map(mapper);
}
function createDecorations(props) {
  const { blocks, skipLast, plainTextClassName } = props;
  const decorations = [];
  for (const block of blocks) {
    const positionedRefractorNodes = getPositionedRefractorNodes(block, plainTextClassName);
    const lastBlockLength = skipLast ? positionedRefractorNodes.length - 1 : positionedRefractorNodes.length;
    for (const index of (0, import_core2.range)(lastBlockLength)) {
      const positionedRefractorNode = positionedRefractorNodes[index];
      const classes = positionedRefractorNode == null ? void 0 : positionedRefractorNode.classes;
      if (!positionedRefractorNode || !(classes == null ? void 0 : classes.length)) {
        continue;
      }
      const decoration = import_view.Decoration.inline(
        positionedRefractorNode.from,
        positionedRefractorNode.to,
        {
          class: classes.join(" ")
        }
      );
      decorations.push(decoration);
    }
  }
  return decorations;
}
function isValidCodeBlockAttributes(attributes) {
  return !!(attributes && (0, import_core2.isObject)(attributes) && (0, import_core2.isString)(attributes.language) && attributes.language.length > 0);
}
function updateNodeAttributes(type) {
  return (attributes) => ({ state: { tr, selection }, dispatch }) => {
    if (!isValidCodeBlockAttributes(attributes)) {
      throw new Error("Invalid attrs passed to the updateAttributes method");
    }
    const parent = (0, import_core2.findParentNodeOfType)({ types: type, selection });
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
function getLanguage(props) {
  const { language, fallback } = props;
  if (!language) {
    return fallback;
  }
  const supportedLanguages = import_core.default.listLanguages();
  for (const name of supportedLanguages) {
    if (name.toLowerCase() === language.toLowerCase()) {
      return name;
    }
  }
  return fallback;
}
function codeBlockToDOM(node, extra) {
  const { language, wrap } = (0, import_core2.omitExtraAttributes)(node.attrs, extra);
  const _a2 = extra.dom(node), { style: _ } = _a2, extraAttrs = __objRest(_a2, ["style"]);
  let style = extraAttrs.style;
  if (wrap) {
    style = (0, import_core2.joinStyles)({ whiteSpace: "pre-wrap", wordBreak: "break-all" }, style);
  }
  const attributes = __spreadProps(__spreadValues({
    spellcheck: "false"
  }, extraAttrs), {
    class: (0, import_core2.cx)(extraAttrs.class, "language-".concat(language))
  });
  return ["pre", attributes, ["code", { [LANGUAGE_ATTRIBUTE]: language, style }, 0]];
}
async function formatCode(props) {
  const { type, formatter, defaultLanguage: fallback, pos, tr } = props;
  const { selection, doc } = tr;
  const codeBlock = (0, import_core2.findParentNodeOfType)({
    types: type,
    selection: pos !== void 0 ? doc.resolve(pos) : selection
  });
  const {
    node: { attrs, textContent },
    start
  } = codeBlock;
  const { from, to } = pos !== void 0 ? { from: pos, to: pos } : selection;
  const offsetStart = from - start;
  const offsetEnd = to - start;
  const language = getLanguage({ language: attrs.language, fallback });
  const formatStartPromise = formatter({
    source: textContent,
    language,
    cursorOffset: offsetStart
  });
  const formatEndPromise = offsetEnd !== offsetStart ? formatter({ source: textContent, language, cursorOffset: offsetEnd }) : Promise.resolve();
  const [formatStart, formatEnd] = await Promise.all([formatStartPromise, formatEndPromise]);
  if (!formatStart) {
    return;
  }
  if (formatStart.formatted === textContent) {
    return;
  }
  return {
    formatted: formatStart.formatted,
    range: {
      from: start,
      to: start + textContent.length
    },
    selection: {
      anchor: start + formatStart.cursorOffset,
      head: formatEnd ? start + formatEnd.cursorOffset : void 0
    }
  };
}
function getLanguageFromDom(codeElement) {
  var _a2, _b;
  return (_b = (_a2 = codeElement.getAttribute(LANGUAGE_ATTRIBUTE)) != null ? _a2 : codeElement.classList[0]) == null ? void 0 : _b.replace(
    "language-",
    ""
  );
}
var { DESCRIPTION, LABEL } = import_messages.ExtensionCodeBlockMessages;
var toggleCodeBlockOptions = {
  icon: "bracesLine",
  description: ({ t }) => t(DESCRIPTION),
  label: ({ t }) => t(LABEL)
};

// src/code-block-plugin.ts
var _extension, _type, _deleted;
var CodeBlockState = class {
  constructor(type, extension2) {
    __privateAdd(this, _extension);
    /**
     * Keep track of the node type of the `codeBlock`
     */
    __privateAdd(this, _type);
    /**
     * Tracks whether or not a deletion has occurred.
     */
    __privateAdd(this, _deleted, false);
    /**
     * The set of cached decorations to minimize dom updates
     */
    __publicField(this, "decorationSet");
    __privateSet(this, _type, type);
    __privateSet(this, _extension, extension2);
  }
  /**
   * Creates the initial set of decorations
   */
  init(state) {
    const blocks = (0, import_core3.findChildrenByNode)({ node: state.doc, type: __privateGet(this, _type) });
    this.refreshDecorationSet(state.doc, blocks);
    return this;
  }
  /**
   * Recreate all the decorations again for all the provided blocks.
   */
  refreshDecorationSet(doc, blocks) {
    var _a2;
    const decorations = createDecorations({
      blocks,
      skipLast: __privateGet(this, _deleted),
      defaultLanguage: __privateGet(this, _extension).options.defaultLanguage,
      plainTextClassName: (_a2 = __privateGet(this, _extension).options.plainTextClassName) != null ? _a2 : void 0
    });
    this.decorationSet = import_view2.DecorationSet.create(doc, decorations);
  }
  /**
   * Apply the state and update decorations when a change has happened in the
   * editor.
   */
  apply(tr, _) {
    if (!tr.docChanged) {
      return this;
    }
    this.decorationSet = this.decorationSet.map(tr.mapping, tr.doc);
    const changedNodes = (0, import_core3.getChangedNodes)(tr, {
      descend: true,
      predicate: (node) => node.type === __privateGet(this, _type),
      StepTypes: []
    });
    this.updateDecorationSet(tr, changedNodes);
    return this;
  }
  /**
   * Removes all decorations which relate to the changed block node before creating new decorations
   * and adding them to the decorationSet.
   */
  updateDecorationSet(tr, blocks) {
    var _a2;
    if (blocks.length === 0) {
      return;
    }
    let decorationSet = this.decorationSet;
    for (const { node, pos } of blocks) {
      decorationSet = this.decorationSet.remove(this.decorationSet.find(pos, pos + node.nodeSize));
    }
    this.decorationSet = decorationSet.add(
      tr.doc,
      createDecorations({
        blocks,
        skipLast: __privateGet(this, _deleted),
        defaultLanguage: __privateGet(this, _extension).options.defaultLanguage,
        plainTextClassName: (_a2 = __privateGet(this, _extension).options.plainTextClassName) != null ? _a2 : void 0
      })
    );
  }
  /**
   * Flags that a deletion has just occurred.
   */
  setDeleted(deleted) {
    __privateSet(this, _deleted, deleted);
  }
};
_extension = new WeakMap();
_type = new WeakMap();
_deleted = new WeakMap();

// src/code-block-extension.ts
var _formatShortcut_dec, _enterKey_dec, _backspaceKey_dec, _tabKey_dec, _formatCodeBlock_dec, _updateCodeBlock_dec, _createCodeBlock_dec, _toggleCodeBlock_dec, _a, _CodeBlockExtension_decorators, _init;
_CodeBlockExtension_decorators = [(0, import_core5.extension)({
  defaultOptions: {
    supportedLanguages: [],
    toggleName: "paragraph",
    formatter: async ({ source }) => ({ cursorOffset: 0, formatted: source }),
    syntaxTheme: "a11y_dark",
    defaultLanguage: "markup",
    defaultWrap: false,
    // See https://github.com/remirror/remirror/issues/624 for the ''
    plainTextClassName: "",
    getLanguageFromDom
  },
  staticKeys: ["getLanguageFromDom"]
})];
var CodeBlockExtension = class extends (_a = import_core5.NodeExtension, _toggleCodeBlock_dec = [(0, import_core5.command)(toggleCodeBlockOptions)], _createCodeBlock_dec = [(0, import_core5.command)()], _updateCodeBlock_dec = [(0, import_core5.command)()], _formatCodeBlock_dec = [(0, import_core5.command)({
  disableChaining: true
})], _tabKey_dec = [(0, import_core5.keyBinding)({ shortcut: "Tab" })], _backspaceKey_dec = [(0, import_core5.keyBinding)({ shortcut: "Backspace" })], _enterKey_dec = [(0, import_core5.keyBinding)({ shortcut: "Enter" })], _formatShortcut_dec = [(0, import_core5.keyBinding)({ shortcut: import_core5.NamedShortcut.Format })], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    /**
     * Create delayed format command.
     */
    __publicField(this, "createFormatCodeBlockCommand", (props) => {
      const { pos, promise, onFailure, onSuccess } = props;
      return new import_core5.DelayedCommand(promise).validate(({ tr }) => {
        const codeBlock = (0, import_core5.findParentNodeOfType)({
          types: this.type,
          selection: pos !== void 0 ? tr.doc.resolve(pos) : tr.selection
        });
        return !!codeBlock;
      }).success((props2) => {
        const _a2 = props2, { value } = _a2, commandProps = __objRest(_a2, ["value"]);
        return onSuccess(value, commandProps);
      }).failure((props2) => {
        var _a2;
        return (_a2 = onFailure == null ? void 0 : onFailure(props2)) != null ? _a2 : false;
      });
    });
  }
  get name() {
    return "codeBlock";
  }
  createTags() {
    return [import_core5.ExtensionTag.Block, import_core5.ExtensionTag.Code];
  }
  /**
   * Add the languages to the environment if they have not yet been added.
   */
  init() {
    this.registerLanguages();
  }
  createNodeSpec(extra, override) {
    var _a2;
    const githubHighlightRegExp = /highlight-(?:text|source)-([\da-z]+)/;
    return __spreadProps(__spreadValues({
      content: "text*",
      marks: "",
      defining: true,
      draggable: false
    }, override), {
      code: true,
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        language: { default: this.options.defaultLanguage },
        wrap: { default: this.options.defaultWrap }
      }),
      parseDOM: [
        // Add support for github code blocks.
        {
          tag: "div.highlight",
          preserveWhitespace: "full",
          getAttrs: (node) => {
            var _a3, _b;
            if (!(0, import_core5.isElementDomNode)(node)) {
              return false;
            }
            const codeElement = node.querySelector("pre.code");
            if (!(0, import_core5.isElementDomNode)(codeElement)) {
              return false;
            }
            const wrap = (0, import_core5.getStyle)(codeElement, "white-space") === "pre-wrap";
            const language = (_b = (_a3 = node.className.match(githubHighlightRegExp)) == null ? void 0 : _a3[1]) == null ? void 0 : _b.replace("language-", "");
            return __spreadProps(__spreadValues({}, extra.parse(node)), { language, wrap });
          }
        },
        {
          tag: "pre",
          preserveWhitespace: "full",
          getAttrs: (node) => {
            if (!(0, import_core5.isElementDomNode)(node)) {
              return false;
            }
            const codeElement = node.querySelector("code");
            if (!(0, import_core5.isElementDomNode)(codeElement)) {
              return false;
            }
            const wrap = (0, import_core5.getStyle)(codeElement, "white-space") === "pre-wrap";
            const language = this.options.getLanguageFromDom(codeElement, node);
            return __spreadProps(__spreadValues({}, extra.parse(node)), { language, wrap });
          }
        },
        ...(_a2 = override.parseDOM) != null ? _a2 : []
      ],
      toDOM: (node) => codeBlockToDOM(node, extra)
    });
  }
  /**
   * Add the syntax theme class to the editor.
   */
  createAttributes() {
    return { class: import_theme.ExtensionCodeBlockTheme[this.options.syntaxTheme.toUpperCase()] };
  }
  /**
   * Create an input rule that listens converts the code fence into a code block
   * when typing triple back tick followed by a space.
   */
  createInputRules() {
    const regexp = /^```([\dA-Za-z]*) $/;
    const getAttributes = (match) => {
      const language = getLanguage({
        language: (0, import_core5.getMatchString)(match, 1),
        fallback: this.options.defaultLanguage
      });
      return { language };
    };
    return [
      (0, import_core5.nodeInputRule)({
        regexp,
        type: this.type,
        beforeDispatch: ({ tr, start }) => {
          const $pos = tr.doc.resolve(start);
          tr.setSelection(import_state.TextSelection.near($pos));
        },
        getAttributes
      })
    ];
  }
  onSetOptions(props) {
    const { changes } = props;
    if (changes.supportedLanguages.changed) {
      this.registerLanguages();
    }
    if (changes.syntaxTheme.changed) {
      this.store.updateAttributes();
    }
  }
  /**
   * Create the custom code block plugin which handles the delete key amongst other things.
   */
  createPlugin() {
    const pluginState = new CodeBlockState(this.type, this);
    const handler = () => {
      pluginState.setDeleted(true);
      return false;
    };
    return {
      state: {
        init(_, state) {
          return pluginState.init(state);
        },
        apply(tr, _, __, state) {
          return pluginState.apply(tr, state);
        }
      },
      props: {
        handleKeyDown: (0, import_keymap.keydownHandler)({
          Backspace: handler,
          "Mod-Backspace": handler,
          Delete: handler,
          "Mod-Delete": handler,
          "Ctrl-h": handler,
          "Alt-Backspace": handler,
          "Ctrl-d": handler,
          "Ctrl-Alt-Backspace": handler,
          "Alt-Delete": handler,
          "Alt-d": handler
        }),
        decorations() {
          pluginState.setDeleted(false);
          return pluginState.decorationSet;
        }
      }
    };
  }
  toggleCodeBlock(attributes = {}) {
    return (0, import_core5.toggleBlockItem)({
      type: this.type,
      toggleType: this.options.toggleName,
      attrs: __spreadValues({ language: this.options.defaultLanguage }, attributes)
    });
  }
  createCodeBlock(attributes) {
    return (0, import_core5.setBlockType)(this.type, attributes);
  }
  updateCodeBlock(attributes) {
    return updateNodeAttributes(this.type)(attributes);
  }
  formatCodeBlock({ pos } = {}) {
    const command2 = this.createFormatCodeBlockCommand({
      pos,
      promise: (props) => formatCode(__spreadValues({
        type: this.type,
        formatter: this.options.formatter,
        defaultLanguage: this.options.defaultLanguage,
        pos
      }, props)),
      onSuccess(value, { tr, dispatch }) {
        var _a2;
        if (!value) {
          return true;
        }
        const { formatted, range: range2, selection } = value;
        tr.insertText(formatted, range2.from, range2.to);
        tr.setSelection(
          import_state.TextSelection.between(
            tr.doc.resolve(selection.anchor),
            tr.doc.resolve((_a2 = selection.head) != null ? _a2 : selection.anchor)
          )
        );
        dispatch == null ? void 0 : dispatch(tr);
        return true;
      }
    }).generateCommand();
    return (0, import_core5.nonChainable)(command2);
  }
  tabKey({ state, dispatch }) {
    const { selection, tr, schema } = state;
    const { node } = (0, import_core5.findNodeAtSelection)(selection);
    if (!(0, import_core5.isNodeOfType)({ node, types: this.type })) {
      return false;
    }
    if (selection.empty) {
      tr.insertText("	");
    } else {
      const { from, to } = selection;
      tr.replaceWith(from, to, schema.text("	"));
    }
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  }
  backspaceKey({ dispatch, tr, state }) {
    if (!tr.selection.empty) {
      return false;
    }
    const parent = (0, import_core5.findParentNodeOfType)({ types: this.type, selection: tr.selection });
    if ((parent == null ? void 0 : parent.start) !== tr.selection.from) {
      return false;
    }
    const { pos, node, start } = parent;
    const toggleNode = (0, import_core5.assertGet)(state.schema.nodes, this.options.toggleName);
    if (node.textContent.trim() === "") {
      if (tr.doc.lastChild === node && tr.doc.firstChild === node) {
        (0, import_core5.replaceNodeAtPosition)({ pos, tr, content: toggleNode.create() });
      } else {
        (0, import_core5.removeNodeAtPosition)({ pos, tr });
      }
    } else if (start > 2) {
      tr.setSelection(import_state.TextSelection.near(tr.doc.resolve(start - 2)));
    } else {
      tr.insert(0, toggleNode.create());
      tr.setSelection(import_state.TextSelection.near(tr.doc.resolve(1)));
    }
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  }
  enterKey({ dispatch, tr }) {
    if (!((0, import_core5.isTextSelection)(tr.selection) && tr.selection.empty)) {
      return false;
    }
    const { nodeBefore, parent } = tr.selection.$anchor;
    if (!(nodeBefore == null ? void 0 : nodeBefore.isText) || !parent.type.isTextblock) {
      return false;
    }
    const regex = /^```([A-Za-z]*)?$/;
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
    const [, lang] = matchesNodeBefore;
    const language = getLanguage({
      language: lang,
      fallback: this.options.defaultLanguage
    });
    const pos = tr.selection.$from.before();
    const end = pos + nodeSize + 1;
    tr.replaceWith(pos, end, this.type.create({ language }));
    tr.setSelection(import_state.TextSelection.near(tr.doc.resolve(pos + 1)));
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  }
  formatShortcut({ tr }) {
    const commands = this.store.commands;
    if (!(0, import_core5.isNodeActive)({ type: this.type, state: tr })) {
      return false;
    }
    const enabled = commands.formatCodeBlock.enabled();
    if (enabled) {
      commands.formatCodeBlock();
    }
    return enabled;
  }
  /**
   * Register passed in languages.
   */
  registerLanguages() {
    for (const language of this.options.supportedLanguages) {
      import_core4.default.register(language);
    }
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "toggleCodeBlock", _toggleCodeBlock_dec, CodeBlockExtension);
__decorateElement(_init, 1, "createCodeBlock", _createCodeBlock_dec, CodeBlockExtension);
__decorateElement(_init, 1, "updateCodeBlock", _updateCodeBlock_dec, CodeBlockExtension);
__decorateElement(_init, 1, "formatCodeBlock", _formatCodeBlock_dec, CodeBlockExtension);
__decorateElement(_init, 1, "tabKey", _tabKey_dec, CodeBlockExtension);
__decorateElement(_init, 1, "backspaceKey", _backspaceKey_dec, CodeBlockExtension);
__decorateElement(_init, 1, "enterKey", _enterKey_dec, CodeBlockExtension);
__decorateElement(_init, 1, "formatShortcut", _formatShortcut_dec, CodeBlockExtension);
CodeBlockExtension = __decorateElement(_init, 0, "CodeBlockExtension", _CodeBlockExtension_decorators, CodeBlockExtension);
__runInitializers(_init, 1, CodeBlockExtension);

// src/code-block-positioners.ts
var import_core6 = require("@remirror/core");
var import_extension_positioner = require("@remirror/extension-positioner");
var codeBlockPositioner = import_extension_positioner.Positioner.create({
  getActive(props) {
    const { selection, schema } = props.state;
    const parent = (0, import_core6.findParentNodeOfType)({
      selection,
      types: schema.nodes.codeBlock
    });
    if (!parent) {
      return import_extension_positioner.Positioner.EMPTY;
    }
    return [parent];
  },
  getPosition(props) {
    const { data, view } = props;
    const node = view.nodeDOM(data.pos);
    if (!(0, import_core6.isElementDomNode)(node)) {
      return import_extension_positioner.defaultAbsolutePosition;
    }
    const rect = node.getBoundingClientRect();
    const editorRect = view.dom.getBoundingClientRect();
    const left = view.dom.scrollLeft + rect.left - editorRect.left;
    const top = view.dom.scrollTop + rect.top - editorRect.top;
    return {
      x: left - 1,
      y: top - 1,
      width: rect.width,
      height: rect.height,
      rect,
      visible: (0, import_extension_positioner.isPositionVisible)(rect, view.dom)
    };
  },
  hasChanged: import_extension_positioner.hasStateChanged
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodeBlockExtension,
  codeBlockPositioner,
  getLanguage
});
