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
  var _a;
  return [, , , __create((_a = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a : null)];
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

// src/link-extension.ts
import extractDomain from "extract-domain";
import {
  command,
  composeTransactionSteps,
  extension,
  ExtensionPriority,
  ExtensionTag,
  findMatches,
  getChangedRanges,
  getMarkRange,
  getMatchString,
  getSelectedWord,
  includes,
  isAllSelection,
  isElementDomNode,
  isMarkActive,
  isSelectionEmpty,
  isTextSelection,
  keyBinding,
  last,
  MarkExtension,
  NamedShortcut,
  omitExtraAttributes,
  removeMark,
  updateMark
} from "@remirror/core";
import { undoDepth } from "@remirror/pm/history";
import { ReplaceAroundStep, ReplaceStep } from "@remirror/pm/transform";

// src/link-extension-utils.ts
var TOP_50_TLDS = [
  "com",
  "de",
  "net",
  "org",
  "uk",
  "cn",
  "ga",
  "nl",
  "cf",
  "ml",
  "tk",
  "ru",
  "br",
  "gq",
  "xyz",
  "fr",
  "eu",
  "info",
  "co",
  "au",
  "ca",
  "it",
  "in",
  "ch",
  "pl",
  "es",
  "online",
  "us",
  "top",
  "be",
  "jp",
  "biz",
  "se",
  "at",
  "dk",
  "cz",
  "za",
  "me",
  "ir",
  "icu",
  "shop",
  "kr",
  "site",
  "mx",
  "hu",
  "io",
  "cc",
  "club",
  "no",
  "cyou"
];

// src/link-extension.ts
var UPDATE_LINK = "updateLink";
var DEFAULT_AUTO_LINK_REGEX = /(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?:[\da-z\u00A1-\uFFFF][\w\u00A1-\uFFFF-]{0,62})?[\da-z\u00A1-\uFFFF]\.)*(?:(?:\d(?!\.)|[a-z\u00A1-\uFFFF])(?:[\da-z\u00A1-\uFFFF][\w\u00A1-\uFFFF-]{0,62})?[\da-z\u00A1-\uFFFF]\.)+[a-z\u00A1-\uFFFF]{2,}(?::\d{2,5})?(?:[#/?]\S*)?/gi;
var _removeLink_dec, _selectLink_dec, _updateLink_dec, _shortcut_dec, _c, _LinkExtension_decorators, _init;
_LinkExtension_decorators = [extension({
  defaultOptions: {
    autoLink: false,
    defaultProtocol: "",
    selectTextOnClick: false,
    openLinkOnClick: false,
    autoLinkRegex: DEFAULT_AUTO_LINK_REGEX,
    autoLinkAllowedTLDs: TOP_50_TLDS,
    findAutoLinks: void 0,
    isValidUrl: void 0,
    defaultTarget: null,
    supportedTargets: [],
    extractHref
  },
  staticKeys: ["autoLinkRegex"],
  handlerKeyOptions: { onClick: { earlyReturnValue: true } },
  handlerKeys: ["onActivateLink", "onShortcut", "onUpdateLink", "onClick"],
  defaultPriority: ExtensionPriority.Medium
})];
var LinkExtension = class extends (_c = MarkExtension, _shortcut_dec = [keyBinding({ shortcut: NamedShortcut.InsertLink })], _updateLink_dec = [command()], _selectLink_dec = [command()], _removeLink_dec = [command()], _c) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    /**
     * The autoLinkRegex option with the global flag removed, ensure no "lastIndex" state is maintained over multiple matches
     * @private
     */
    __publicField(this, "_autoLinkRegexNonGlobal");
  }
  get name() {
    return "link";
  }
  createTags() {
    return [ExtensionTag.Link, ExtensionTag.ExcludeInputRules];
  }
  createMarkSpec(extra, override) {
    var _a;
    const AUTO_ATTRIBUTE = "data-link-auto";
    const getTargetObject = (target) => {
      const { defaultTarget, supportedTargets } = this.options;
      const targets = defaultTarget ? [...supportedTargets, defaultTarget] : supportedTargets;
      return target && includes(targets, target) ? { target } : void 0;
    };
    return __spreadProps(__spreadValues({
      inclusive: false,
      excludes: "_"
    }, override), {
      attrs: __spreadProps(__spreadValues({}, extra.defaults()), {
        href: {},
        target: { default: this.options.defaultTarget },
        auto: { default: false }
      }),
      parseDOM: [
        {
          tag: "a[href]",
          getAttrs: (node) => {
            if (!isElementDomNode(node)) {
              return false;
            }
            const href = node.getAttribute("href");
            const text = node.textContent;
            const auto = this.options.autoLink && (node.hasAttribute(AUTO_ATTRIBUTE) || href === text || (href == null ? void 0 : href.replace("".concat(this.options.defaultProtocol, "//"), "")) === text);
            return __spreadValues(__spreadProps(__spreadValues({}, extra.parse(node)), {
              href,
              auto
            }), getTargetObject(node.getAttribute("target")));
          }
        },
        ...(_a = override.parseDOM) != null ? _a : []
      ],
      toDOM: (node) => {
        const _a2 = omitExtraAttributes(node.attrs, extra), { auto: _, target: __ } = _a2, rest = __objRest(_a2, ["auto", "target"]);
        const auto = node.attrs.auto ? { [AUTO_ATTRIBUTE]: "" } : {};
        const rel = "noopener noreferrer nofollow";
        const attrs = __spreadValues(__spreadValues(__spreadProps(__spreadValues(__spreadValues({}, extra.dom(node)), rest), {
          rel
        }), auto), getTargetObject(node.attrs.target));
        return ["a", attrs, 0];
      }
    });
  }
  onCreate() {
    const { autoLinkRegex } = this.options;
    this._autoLinkRegexNonGlobal = new RegExp(
      "^".concat(autoLinkRegex.source, "$"),
      autoLinkRegex.flags.replace("g", "")
    );
  }
  shortcut({ tr }) {
    let selectedText = "";
    let { from, to, empty, $from } = tr.selection;
    let expandedSelection = false;
    const mark = getMarkRange($from, this.type);
    if (empty) {
      const selectedWord = mark != null ? mark : getSelectedWord(tr);
      if (!selectedWord) {
        return false;
      }
      ({ text: selectedText, from, to } = selectedWord);
      expandedSelection = true;
    }
    if (from === to) {
      return false;
    }
    if (!expandedSelection) {
      selectedText = tr.doc.textBetween(from, to);
    }
    this.options.onActivateLink(selectedText);
    this.options.onShortcut({
      activeLink: mark ? { attrs: mark.mark.attrs, from: mark.from, to: mark.to } : void 0,
      selectedText,
      from,
      to
    });
    return true;
  }
  updateLink(attrs, range) {
    return (props) => {
      const { tr } = props;
      const selectionIsValid = isTextSelection(tr.selection) && !isSelectionEmpty(tr.selection) || isAllSelection(tr.selection) || isMarkActive({ trState: tr, type: this.type });
      if (!selectionIsValid && !range) {
        return false;
      }
      tr.setMeta(this.name, { command: UPDATE_LINK, attrs, range });
      return updateMark({ type: this.type, attrs, range })(props);
    };
  }
  selectLink() {
    return this.store.commands.selectMark.original(this.type);
  }
  removeLink(range) {
    return (props) => {
      const { tr } = props;
      if (!isMarkActive(__spreadValues({ trState: tr, type: this.type }, range))) {
        return false;
      }
      return removeMark({ type: this.type, expand: true, range })(props);
    };
  }
  /**
   * Create the paste rules that can transform a pasted link in the document.
   */
  createPasteRules() {
    return [
      {
        type: "mark",
        regexp: this.options.autoLinkRegex,
        markType: this.type,
        getAttributes: (url, isReplacement) => ({
          href: this.buildHref(getMatchString(url)),
          auto: !isReplacement
        }),
        transformMatch: (match) => {
          const url = getMatchString(match);
          if (!url) {
            return false;
          }
          if (!this.isValidUrl(url)) {
            return false;
          }
          return url;
        }
      }
    ];
  }
  /**
   * Track click events passed through to the editor.
   */
  createEventHandlers() {
    return {
      clickMark: (event, clickState) => {
        const markRange = clickState.getMark(this.type);
        if (!markRange) {
          return;
        }
        const attrs = markRange.mark.attrs;
        const data = __spreadValues(__spreadValues({}, attrs), markRange);
        if (this.options.onClick(event, data)) {
          return true;
        }
        if (!this.store.view.editable) {
          return;
        }
        let handled = false;
        if (this.options.openLinkOnClick) {
          handled = true;
          const href = attrs.href;
          window.open(href, "_blank");
        }
        if (this.options.selectTextOnClick) {
          handled = true;
          this.store.commands.selectText(markRange);
        }
        return handled;
      }
    };
  }
  createPlugin() {
    return {
      appendTransaction: (transactions, prevState, state) => {
        const transactionsWithLinkMeta = transactions.filter((tr2) => !!tr2.getMeta(this.name));
        transactionsWithLinkMeta.forEach((tr2) => {
          const trMeta = tr2.getMeta(this.name);
          if (trMeta.command === UPDATE_LINK) {
            const { range, attrs } = trMeta;
            const { selection, doc: doc2 } = state;
            const meta = { range, selection, doc: doc2, attrs };
            const { from, to } = range != null ? range : selection;
            this.options.onUpdateLink(doc2.textBetween(from, to), meta);
          }
        });
        if (!this.options.autoLink) {
          return;
        }
        const isUndo = undoDepth(prevState) - undoDepth(state) === 1;
        if (isUndo) {
          return;
        }
        const docChanged = transactions.some((tr2) => tr2.docChanged);
        if (!docChanged) {
          return;
        }
        const composedTransaction = composeTransactionSteps(transactions, prevState);
        const changes = getChangedRanges(composedTransaction, [ReplaceAroundStep, ReplaceStep]);
        const { mapping } = composedTransaction;
        const { tr, doc } = state;
        const { updateLink, removeLink } = this.store.chain(tr);
        changes.forEach(({ prevFrom, prevTo, from, to }) => {
          const onUpdateCallbacks = [];
          const isNodeSeparated = to - from === 2;
          const prevMarks = this.getLinkMarksInRange(prevState.doc, prevFrom, prevTo, true).filter((item) => item.mark.type === this.type).map(({ from: from2, to: to2, text }) => ({
            mappedFrom: mapping.map(from2),
            mappedTo: mapping.map(to2),
            text,
            from: from2,
            to: to2
          }));
          prevMarks.forEach(
            ({ mappedFrom: newFrom, mappedTo: newTo, from: prevMarkFrom, to: prevMarkTo }, i) => this.getLinkMarksInRange(doc, newFrom, newTo, true).filter((item) => item.mark.type === this.type).forEach((newMark) => {
              const prevLinkText = prevState.doc.textBetween(
                prevMarkFrom,
                prevMarkTo,
                void 0,
                " "
              );
              const newLinkText = doc.textBetween(newMark.from, newMark.to + 1, void 0, " ").trim();
              const wasLink = this.isValidUrl(prevLinkText);
              const isLink = this.isValidUrl(newLinkText);
              if (isLink) {
                return;
              }
              if (wasLink) {
                removeLink({ from: newMark.from, to: newMark.to }).tr();
                prevMarks.splice(i, 1);
              }
              if (isNodeSeparated) {
                return;
              }
              from === to && // Check newLinkText for a remaining valid link
              this.findAutoLinks(newLinkText).map(
                (link) => this.addLinkProperties(__spreadProps(__spreadValues({}, link), {
                  from: newFrom + link.start,
                  to: newFrom + link.end
                }))
              ).forEach(({ attrs, range, text }) => {
                updateLink(attrs, range).tr();
                onUpdateCallbacks.push({ attrs, range, text });
              });
            })
          );
          this.findTextBlocksInRange(doc, { from, to }).forEach(({ text, positionStart }) => {
            this.findAutoLinks(text).map(
              (link) => this.addLinkProperties(__spreadProps(__spreadValues({}, link), {
                // Calculate link position.
                from: positionStart + link.start + 1,
                to: positionStart + link.end + 1
              }))
            ).filter(({ range }) => {
              const fromIsInRange = from >= range.from && from <= range.to;
              const toIsInRange = to >= range.from && to <= range.to;
              return fromIsInRange || toIsInRange || isNodeSeparated;
            }).filter(
              ({ range }) => this.getLinkMarksInRange(tr.doc, range.from, range.to, false).length === 0
            ).filter(
              ({ range: { from: from2 }, text: text2 }) => !prevMarks.some(
                ({ text: prevMarkText, mappedFrom }) => mappedFrom === from2 && prevMarkText === text2
              )
            ).forEach(({ attrs, text: text2, range }) => {
              updateLink(attrs, range).tr();
              onUpdateCallbacks.push({ attrs, range, text: text2 });
            });
          });
          window.requestAnimationFrame(() => {
            onUpdateCallbacks.forEach(({ attrs, range, text }) => {
              const { doc: doc2, selection } = tr;
              this.options.onUpdateLink(text, { attrs, doc: doc2, range, selection });
            });
          });
        });
        if (tr.steps.length === 0) {
          return;
        }
        return tr;
      }
    };
  }
  buildHref(url) {
    return this.options.extractHref({
      url,
      defaultProtocol: this.options.defaultProtocol
    });
  }
  getLinkMarksInRange(doc, from, to, isAutoLink) {
    const linkMarks = [];
    if (from === to) {
      const resolveFrom = Math.max(from - 1, 0);
      const $pos = doc.resolve(resolveFrom);
      const range = getMarkRange($pos, this.type);
      if ((range == null ? void 0 : range.mark.attrs.auto) === isAutoLink) {
        linkMarks.push(range);
      }
    } else {
      doc.nodesBetween(from, to, (node, pos) => {
        var _a;
        const marks = (_a = node.marks) != null ? _a : [];
        const linkMark = marks.find(
          ({ type, attrs }) => type === this.type && attrs.auto === isAutoLink
        );
        if (linkMark) {
          linkMarks.push({
            from: pos,
            to: pos + node.nodeSize,
            mark: linkMark,
            text: node.textContent
          });
        }
      });
    }
    return linkMarks;
  }
  findTextBlocksInRange(node, range) {
    const nodesWithPos = [];
    node.nodesBetween(range.from, range.to, (node2, pos) => {
      if (!node2.isTextblock || !node2.type.allowsMarkType(this.type)) {
        return;
      }
      nodesWithPos.push({
        node: node2,
        pos
      });
    });
    return nodesWithPos.map((textBlock) => ({
      text: node.textBetween(
        textBlock.pos,
        textBlock.pos + textBlock.node.nodeSize,
        void 0,
        " "
      ),
      positionStart: textBlock.pos
    }));
  }
  addLinkProperties(_a) {
    var _b = _a, {
      from,
      to,
      href
    } = _b, link = __objRest(_b, [
      "from",
      "to",
      "href"
    ]);
    return __spreadProps(__spreadValues({}, link), {
      range: { from, to },
      attrs: { href, auto: true }
    });
  }
  findAutoLinks(str) {
    if (this.options.findAutoLinks) {
      return this.options.findAutoLinks(str, this.options.defaultProtocol);
    }
    const toAutoLink = [];
    for (const match of findMatches(str, this.options.autoLinkRegex)) {
      const text = getMatchString(match);
      if (!text) {
        continue;
      }
      const href = this.buildHref(text);
      if (!this.isValidTLD(href) && !href.startsWith("tel:")) {
        continue;
      }
      toAutoLink.push({
        text,
        href,
        start: match.index,
        end: match.index + text.length
      });
    }
    return toAutoLink;
  }
  isValidUrl(text) {
    var _a;
    if (this.options.isValidUrl) {
      return this.options.isValidUrl(text, this.options.defaultProtocol);
    }
    return this.isValidTLD(this.buildHref(text)) && !!((_a = this._autoLinkRegexNonGlobal) == null ? void 0 : _a.test(text));
  }
  isValidTLD(str) {
    const { autoLinkAllowedTLDs } = this.options;
    if (autoLinkAllowedTLDs.length === 0) {
      return true;
    }
    const domain = extractDomain(str);
    if (domain === "") {
      return true;
    }
    const tld = last(domain.split("."));
    return autoLinkAllowedTLDs.includes(tld);
  }
};
_init = __decoratorStart(_c);
__decorateElement(_init, 1, "shortcut", _shortcut_dec, LinkExtension);
__decorateElement(_init, 1, "updateLink", _updateLink_dec, LinkExtension);
__decorateElement(_init, 1, "selectLink", _selectLink_dec, LinkExtension);
__decorateElement(_init, 1, "removeLink", _removeLink_dec, LinkExtension);
LinkExtension = __decorateElement(_init, 0, "LinkExtension", _LinkExtension_decorators, LinkExtension);
__runInitializers(_init, 1, LinkExtension);
function extractHref({
  url,
  defaultProtocol
}) {
  const startsWithProtocol = /^((?:https?|ftp)?:)\/\//.test(url);
  const isEmail = !startsWithProtocol && url.includes("@");
  if (isEmail) {
    return "mailto:".concat(url);
  }
  return startsWithProtocol ? url : "".concat(defaultProtocol, "//").concat(url);
}
export {
  LinkExtension,
  TOP_50_TLDS,
  extractHref
};
