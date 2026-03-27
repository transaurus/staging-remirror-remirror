"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
  WhitespaceExtension: () => WhitespaceExtension
});
module.exports = __toCommonJS(src_exports);

// src/whitespace-extension.ts
var import_core2 = require("@remirror/core");
var import_view2 = require("@remirror/pm/view");

// src/whitespace-utils.ts
var import_core = require("@remirror/core");
var import_messages = require("@remirror/messages");
var import_view = require("@remirror/pm/view");
function generateDecorations(props) {
  const { from, to, doc, decorators } = props;
  let { decorationSet = import_view.DecorationSet.empty } = props;
  for (const decorator of decorators) {
    decorationSet = decorator({ decorationSet, doc, from, to });
  }
  return decorationSet;
}
function createWidget(pos, key) {
  const span = document.createElement("span");
  span.classList.add("whitespace", "whitespace--".concat(key));
  return import_view.Decoration.widget(pos, span, {
    marks: [],
    key
  });
}
function createNodeBuilder(builderOptions) {
  return (details) => {
    const { calculatePosition, key, predicate } = builderOptions;
    const { decorationSet, doc, from, to } = details;
    const added = [];
    const removed = [];
    doc.nodesBetween(from, to, (node, pos) => {
      if (predicate(node)) {
        const widgetPos = calculatePosition({ node, pos });
        added.push(createWidget(widgetPos, key));
        removed.push(...decorationSet.find(widgetPos, widgetPos, (spec) => spec.key === key));
      }
    });
    return decorationSet.remove(removed).add(doc, added);
  };
}
function createCharacterBuilder(builderOptions) {
  return (details) => {
    const { key, predicate } = builderOptions;
    const { decorationSet, doc, from, to } = details;
    const textRanges = (0, import_core.textBetween)({ from, to, doc });
    const decorations = [];
    for (const { pos, text } of textRanges) {
      for (const [index, char] of [...text].entries()) {
        if (!predicate(char)) {
          continue;
        }
        decorations.push(createWidget(pos + index, key));
      }
    }
    return decorationSet.add(doc, decorations);
  };
}
function createDefaultWhitespaceDecorators(settings) {
  const {
    breakNodes = ["hardBreak"],
    paragraphNodes = ["paragraph"],
    spaceCharacters = [" "]
  } = settings;
  return {
    // Characters for the hard break character.
    hardBreak: createNodeBuilder({
      calculatePosition: ({ pos }) => pos,
      key: "br",
      predicate: (node) => (0, import_core.isNodeOfType)({ node, types: breakNodes })
    }),
    // Create decorations for paragraphs
    paragraph: createNodeBuilder({
      key: "p",
      calculatePosition: ({ node, pos }) => pos + node.nodeSize - 1,
      predicate: (node) => (0, import_core.isNodeOfType)({ node, types: paragraphNodes })
    }),
    // Create character decorations for space characters
    space: createCharacterBuilder({
      key: "s",
      predicate: (char) => spaceCharacters.includes(char)
    })
  };
}
var toggleWhitespaceOptions = {
  icon: "paragraph",
  description: ({ t }) => t(import_messages.ExtensionWhitespaceMessages.DESCRIPTION),
  label: ({ t }) => t(import_messages.ExtensionWhitespaceMessages.LABEL)
};

// src/whitespace-extension.ts
var _isWhitespaceVisible_dec, _hideWhitespace_dec, _showWhitespace_dec, _toggleWhitespace_dec, _a, _WhitespaceExtension_decorators, _init;
_WhitespaceExtension_decorators = [(0, import_core2.extension)({
  defaultOptions: {
    initialVisibility: false,
    breakNodes: ["hardBreak"],
    paragraphNodes: ["paragraph"],
    spaceCharacters: [" "],
    decorators: ["hardBreak", "paragraph", "space"]
  },
  staticKeys: ["initialVisibility"]
})];
var WhitespaceExtension = class extends (_a = import_core2.PlainExtension, _toggleWhitespace_dec = [(0, import_core2.command)(toggleWhitespaceOptions)], _showWhitespace_dec = [(0, import_core2.command)()], _hideWhitespace_dec = [(0, import_core2.command)()], _isWhitespaceVisible_dec = [(0, import_core2.helper)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "active", this.options.initialVisibility);
    /**
     * Set this to true to force updates to the decorationSet even if the editor
     * doc hasn't been changed. This is set to true when running commands.
     */
    __publicField(this, "forcedUpdate", false);
    /**
     * The white space decorations to be applied.
     */
    __publicField(this, "decorationSet", import_view2.DecorationSet.empty);
    /**
     * The decorator methods which are used to produce the whitespace characters
     * in for the provided ranges.
     */
    __publicField(this, "decorators", []);
  }
  get name() {
    return "whitespace";
  }
  // Setup the initial decorators.
  onCreate() {
    this.updateDecorators();
  }
  /**
   * Create the initial decoration state.
   */
  onInitState(state) {
    if (this.active) {
      this.decorationSet = this.createFullDecorationSet(state.doc);
    }
  }
  /**
   * Update the whitespace decorations for each state update.
   */
  onApplyState(props) {
    const { tr } = props;
    if (!tr.docChanged && !this.forcedUpdate) {
      return;
    }
    if (this.forcedUpdate) {
      this.forcedUpdate = false;
      this.decorationSet = this.active ? this.createFullDecorationSet(tr.doc) : import_view2.DecorationSet.empty;
      return;
    }
    const changedRanges = (0, import_core2.getChangedRanges)(tr);
    this.decorationSet = this.decorationSet.map(tr.mapping, tr.doc);
    for (const { from, to } of changedRanges) {
      this.decorationSet = generateDecorations({
        from,
        to,
        doc: tr.doc,
        decorationSet: this.decorationSet,
        decorators: this.decorators
      });
    }
  }
  createDecorations() {
    return this.decorationSet;
  }
  /**
   * When the decorators are updated we should update trigger an update to the
   * editor state.
   */
  onSetOptions(props) {
    const { pickChanged } = props;
    const allUpdates = pickChanged([
      "breakNodes",
      "decorators",
      "paragraphNodes",
      "spaceCharacters"
    ]);
    if ((0, import_core2.isEmptyObject)(allUpdates)) {
      return;
    }
    this.updateDecorators();
    this.store.commands.emptyUpdate(() => {
      this.forcedUpdate = true;
    });
  }
  /**
   * Generate the whitespace decorations for the full .
   */
  createFullDecorationSet(doc) {
    const { from, to } = (0, import_core2.getDocRange)(doc);
    return generateDecorations({ from, to, doc, decorators: this.decorators });
  }
  /**
   * Create the decorators array.
   */
  updateDecorators() {
    const decorators = [];
    const { breakNodes, paragraphNodes, spaceCharacters } = this.options;
    const defaultDecorators = createDefaultWhitespaceDecorators({
      breakNodes,
      paragraphNodes,
      spaceCharacters
    });
    for (const decorator of this.options.decorators) {
      decorators.push((0, import_core2.isString)(decorator) ? defaultDecorators[decorator] : decorator);
    }
    this.decorators = decorators;
  }
  toggleWhitespace() {
    return (props) => this.store.commands.emptyUpdate.original(() => {
      this.forcedUpdate = true;
      this.active = !this.active;
    })(props);
  }
  showWhitespace() {
    return (props) => {
      if (this.active) {
        return false;
      }
      return this.store.commands.emptyUpdate.original(() => {
        this.forcedUpdate = true;
        this.active = true;
      })(props);
    };
  }
  hideWhitespace() {
    return (props) => {
      if (!this.active) {
        return false;
      }
      return this.store.commands.emptyUpdate.original(() => {
        this.forcedUpdate = true;
        this.active = false;
      })(props);
    };
  }
  isWhitespaceVisible() {
    return this.active;
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "toggleWhitespace", _toggleWhitespace_dec, WhitespaceExtension);
__decorateElement(_init, 1, "showWhitespace", _showWhitespace_dec, WhitespaceExtension);
__decorateElement(_init, 1, "hideWhitespace", _hideWhitespace_dec, WhitespaceExtension);
__decorateElement(_init, 1, "isWhitespaceVisible", _isWhitespaceVisible_dec, WhitespaceExtension);
WhitespaceExtension = __decorateElement(_init, 0, "WhitespaceExtension", _WhitespaceExtension_decorators, WhitespaceExtension);
__runInitializers(_init, 1, WhitespaceExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WhitespaceExtension
});
