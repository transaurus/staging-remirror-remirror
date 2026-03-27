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

// src/markdown-extension.ts
import {
  command,
  extension,
  ExtensionTag,
  helper,
  PlainExtension
} from "@remirror/core";
import { DOMSerializer } from "@remirror/pm/model";

// src/html-to-markdown.ts
import _TurndownService from "turndown";
import { defaultImport, ErrorConstant, invariant, isElementDomNode } from "@remirror/core";
var TurndownService = defaultImport(_TurndownService);
function htmlToMarkdown(html) {
  return turndownService.turndown(html);
}
function isHeadingRow(tableRow) {
  const parentNode = tableRow.parentNode;
  if (!isElementDomNode(parentNode)) {
    return false;
  }
  if (parentNode.nodeName === "THEAD") {
    return true;
  }
  if (parentNode.nodeName !== "TABLE" && !isFirstTbody(parentNode)) {
    return false;
  }
  const childNodes = [...tableRow.childNodes];
  return childNodes.every((n) => n.nodeName === "TH") && childNodes.some((n) => !!n.textContent);
}
function isControllerHeadingCell(cell2) {
  return isElementDomNode(cell2) && cell2.matches("th[data-controller-cell]");
}
function isControllerHeadingRow(tableRow) {
  const parentNode = tableRow.parentNode;
  if (!isElementDomNode(parentNode)) {
    return false;
  }
  if (parentNode.nodeName !== "TABLE" && !isFirstTbody(parentNode)) {
    return false;
  }
  const childNodes = [...tableRow.childNodes];
  return childNodes.every((n) => isControllerHeadingCell(n));
}
function isFirstTbody(element) {
  var _a2;
  if (element.nodeName !== "TBODY") {
    return false;
  }
  const previousSibling = element.previousSibling;
  if (!previousSibling) {
    return true;
  }
  return isElementDomNode(previousSibling) && previousSibling.nodeName === "THEAD" && !((_a2 = previousSibling.textContent) == null ? void 0 : _a2.trim());
}
function isNestedTable(element) {
  const currentTable = element.closest("table");
  if (!currentTable) {
    return false;
  }
  const { parentNode } = currentTable;
  if (!parentNode) {
    return true;
  }
  return !!parentNode.closest("table");
}
function cell(content, node) {
  var _a2, _b;
  const childNodes = [];
  for (const n of (_b = (_a2 = node.parentNode) == null ? void 0 : _a2.childNodes) != null ? _b : []) {
    if (isControllerHeadingCell(n)) {
      continue;
    }
    childNodes.push(n);
  }
  const index = childNodes.indexOf(node);
  const prefix = index === 0 ? "| " : " ";
  return "".concat(prefix + content.trim(), " |");
}
var turndownService = new TurndownService({ codeBlockStyle: "fenced", headingStyle: "atx" }).addRule("taskListItems", {
  filter: (node) => node.nodeName === "LI" && node.hasAttribute("data-task-list-item"),
  replacement: (content, node) => {
    const isChecked = node.hasAttribute("data-checked");
    return "- ".concat(isChecked ? "[x]" : "[ ]", " ").concat(content.trimStart());
  }
}).addRule("tableCell", {
  filter: ["th", "td"],
  replacement: (content, node) => {
    if (isControllerHeadingCell(node)) {
      return "";
    }
    return cell(content, node);
  }
}).addRule("tableRow", {
  filter: "tr",
  replacement: (content, node) => {
    var _a2;
    let borderCells = "";
    const alignMap = { left: ":--", right: "--:", center: ":-:" };
    const childNodes = [...node.childNodes].filter((n) => !isControllerHeadingCell(n));
    if (isHeadingRow(node)) {
      for (const childNode of childNodes) {
        if (!isElementDomNode(childNode)) {
          continue;
        }
        let border = "---";
        const align = ((_a2 = childNode.getAttribute("align")) != null ? _a2 : "").toLowerCase();
        if (align) {
          border = alignMap[align] || border;
        }
        borderCells += cell(border, childNode);
      }
    }
    return "\n".concat(content).concat(borderCells ? "\n".concat(borderCells) : "");
  }
}).addRule("table", {
  // Only convert tables with a heading row. Tables with no heading row are kept
  // using `keep` (see below).
  filter: (node) => {
    if (node.nodeName !== "TABLE") {
      return false;
    }
    if (isNestedTable(node)) {
      return false;
    }
    const rows = [...node.rows].filter(
      (r) => (
        // Remove controller rows
        !isControllerHeadingRow(r)
      )
    );
    return isHeadingRow(rows[0]);
  },
  replacement: (content) => {
    content = content.replace("\n\n", "\n");
    return "\n\n".concat(content, "\n\n");
  }
}).addRule("tableSection", {
  filter: ["thead", "tbody", "tfoot"],
  replacement: function(content) {
    return content;
  }
}).keep(
  (node) => node.nodeName === "TABLE" && !isHeadingRow(node.rows[0])
).keep((node) => node.nodeName === "TABLE" && isNestedTable(node)).addRule("strikethrough", {
  filter: ["del", "s", "strike"],
  replacement: function(content) {
    return "~".concat(content, "~");
  }
}).addRule("fencedCodeBlock", {
  filter: (node, options) => !!(options.codeBlockStyle === "fenced" && node.nodeName === "PRE" && node.firstChild && node.firstChild.nodeName === "CODE"),
  replacement: (_, node, options) => {
    var _a2, _b, _c, _d, _e;
    invariant(isElementDomNode(node.firstChild), {
      code: ErrorConstant.EXTENSION,
      message: "Invalid node `".concat((_a2 = node.firstChild) == null ? void 0 : _a2.nodeName, "` encountered for codeblock when converting html to markdown.")
    });
    const className = (_b = node.firstChild.getAttribute("class")) != null ? _b : "";
    const language = (_e = (_d = (_c = className.match(/(?:lang|language)-(\S+)/)) == null ? void 0 : _c[1]) != null ? _d : node.firstChild.getAttribute("data-code-block-language")) != null ? _e : "";
    return "\n\n".concat(options.fence).concat(language, "\n").concat(node.firstChild.textContent, "\n").concat(options.fence, "\n\n");
  }
});

// src/markdown-to-html.ts
import { marked } from "marked";
marked.use({
  renderer: {
    list(body, isOrdered, start) {
      if (isOrdered) {
        const startAttr = start !== 1 ? 'start="'.concat(start, '"') : "";
        return "<ol ".concat(startAttr, ">\n").concat(body, "</ol>\n");
      }
      const taskListAttr = body.startsWith("<li data-task-list-item ") ? "data-task-list" : "";
      return "<ul ".concat(taskListAttr, ">\n").concat(body, "</ul>\n");
    },
    listitem(text, isTask, isChecked) {
      if (!isTask) {
        return "<li>".concat(text, "</li>\n");
      }
      const checkedAttr = isChecked ? "data-checked" : "";
      return "<li data-task-list-item ".concat(checkedAttr, ">").concat(text, "</li>\n");
    }
  }
});
function markdownToHtml(markdown, sanitizer) {
  const html = marked(markdown, { gfm: true, smartLists: true, xhtml: true });
  if (sanitizer) {
    return sanitizer(html);
  }
  return html;
}

// src/markdown-extension.ts
var _toggleBoldMarkdown_dec, _getMarkdown_dec, _insertMarkdown_dec, _a, _MarkdownExtension_decorators, _init;
_MarkdownExtension_decorators = [extension({
  defaultOptions: {
    htmlToMarkdown,
    markdownToHtml,
    htmlSanitizer: void 0,
    activeNodes: [ExtensionTag.Code],
    copyAsMarkdown: false
  },
  staticKeys: ["htmlToMarkdown", "markdownToHtml", "htmlSanitizer"]
})];
var MarkdownExtension = class extends (_a = PlainExtension, _insertMarkdown_dec = [command()], _getMarkdown_dec = [helper()], _toggleBoldMarkdown_dec = [command()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
  }
  get name() {
    return "markdown";
  }
  /**
   * Add the `markdown` string handler and `getMarkdown` state helper method.
   */
  onCreate() {
    this.store.setStringHandler("markdown", this.markdownToProsemirrorNode.bind(this));
  }
  createPlugin() {
    const clipboardTextSerializer = this.options.copyAsMarkdown ? (slice) => {
      const wrapper = document.createElement("div");
      const serializer = DOMSerializer.fromSchema(this.store.schema);
      wrapper.append(serializer.serializeFragment(slice.content));
      return this.options.htmlToMarkdown(wrapper.innerHTML);
    } : void 0;
    return {
      props: {
        clipboardTextSerializer
      }
    };
  }
  markdownToProsemirrorNode(options) {
    return this.store.stringHandlers.html(__spreadProps(__spreadValues({}, options), {
      content: this.options.markdownToHtml(options.content, this.options.htmlSanitizer)
    }));
  }
  insertMarkdown(markdown, options) {
    return (props) => {
      const { state } = props;
      let html = this.options.markdownToHtml(markdown, this.options.htmlSanitizer);
      html = !(options == null ? void 0 : options.alwaysWrapInBlock) && html.startsWith("<p><") && html.endsWith("</p>\n") ? html.slice(3, -5) : "<div>".concat(html, "</div>");
      const fragment = this.store.stringHandlers.html({
        content: html,
        schema: state.schema,
        fragment: true
      });
      return this.store.commands.insertNode.original(fragment, __spreadProps(__spreadValues({}, options), {
        replaceEmptyParentBlock: true
      }))(props);
    };
  }
  getMarkdown(state) {
    return this.options.htmlToMarkdown(this.store.helpers.getHTML(state));
  }
  toggleBoldMarkdown() {
    return (_) => false;
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "insertMarkdown", _insertMarkdown_dec, MarkdownExtension);
__decorateElement(_init, 1, "getMarkdown", _getMarkdown_dec, MarkdownExtension);
__decorateElement(_init, 1, "toggleBoldMarkdown", _toggleBoldMarkdown_dec, MarkdownExtension);
MarkdownExtension = __decorateElement(_init, 0, "MarkdownExtension", _MarkdownExtension_decorators, MarkdownExtension);
__runInitializers(_init, 1, MarkdownExtension);
export {
  MarkdownExtension
};
