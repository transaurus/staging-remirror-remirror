"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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

// src/social/index.ts
var social_exports = {};
__export(social_exports, {
  SocialEditor: () => SocialEditor
});
module.exports = __toCommonJS(social_exports);

// src/social/social-editor.tsx
var import_react3 = __toESM(require("react"), 1);
var import_extensions = require("remirror/extensions");
var import_emoji = __toESM(require("svgmoji/emoji.json"), 1);
var import_extension_react_tables = require("@remirror/extension-react-tables");
var import_i18n = require("@remirror/i18n");
var import_react4 = require("@remirror/react");
var import_emotion = require("@remirror/styles/emotion");

// src/components/bubble-menu.tsx
var import_react = __toESM(require("react"), 1);
var import_react_ui = require("@remirror/react-ui");
var BubbleMenu = () => /* @__PURE__ */ import_react.default.createElement(import_react_ui.FloatingToolbar, null);

// src/components/top-toolbar.tsx
var import_react2 = __toESM(require("react"), 1);
var import_react_ui2 = require("@remirror/react-ui");
var TopToolbar = () => /* @__PURE__ */ import_react2.default.createElement(import_react_ui2.WysiwygToolbar, null);

// src/social/social-editor.tsx
var extraAttributes = [
  {
    identifiers: ["mention", "emoji"],
    attributes: { role: { default: "presentation" } }
  },
  { identifiers: ["mention"], attributes: { href: { default: null } } }
];
function MentionComponent({ users, tags }) {
  const [mentionState, setMentionState] = (0, import_react3.useState)();
  const tagItems = (0, import_react3.useMemo)(
    () => (tags != null ? tags : []).map((tag) => ({ id: tag, label: "#".concat(tag) })),
    [tags]
  );
  const items = (0, import_react3.useMemo)(() => {
    var _a;
    if (!mentionState) {
      return [];
    }
    const allItems = mentionState.name === "at" ? users : tagItems;
    if (!allItems) {
      return [];
    }
    const query = (_a = mentionState.query.full.toLowerCase()) != null ? _a : "";
    return allItems.filter((item) => item.label.toLowerCase().includes(query)).sort();
  }, [mentionState, users, tagItems]);
  return /* @__PURE__ */ import_react3.default.createElement(import_react4.MentionAtomPopupComponent, { onChange: setMentionState, items });
}
var SocialEditor = (_a) => {
  var _b = _a, {
    placeholder,
    stringHandler,
    children,
    users,
    tags,
    theme
  } = _b, rest = __objRest(_b, [
    "placeholder",
    "stringHandler",
    "children",
    "users",
    "tags",
    "theme"
  ]);
  const extensions = (0, import_react3.useCallback)(
    () => [
      new import_extensions.PlaceholderExtension({ placeholder }),
      new import_extension_react_tables.TableExtension(),
      new import_extensions.MentionAtomExtension({
        matchers: [
          { name: "at", char: "@" },
          { name: "tag", char: "#" }
        ]
      }),
      new import_extensions.EmojiExtension({ plainText: false, data: import_emoji.default, moji: "noto" }),
      ...(0, import_extensions.wysiwygPreset)()
    ],
    [placeholder]
  );
  const { manager } = (0, import_react4.useRemirror)({
    extensions,
    extraAttributes,
    stringHandler
  });
  return /* @__PURE__ */ import_react3.default.createElement(import_emotion.AllStyledComponent, null, /* @__PURE__ */ import_react3.default.createElement(import_react4.ThemeProvider, { theme }, /* @__PURE__ */ import_react3.default.createElement(import_react4.Remirror, __spreadValues({ manager, i18nFormat: import_i18n.i18nFormat }, rest), /* @__PURE__ */ import_react3.default.createElement(TopToolbar, null), /* @__PURE__ */ import_react3.default.createElement(import_react4.EditorComponent, null), /* @__PURE__ */ import_react3.default.createElement(import_react4.EmojiPopupComponent, null), /* @__PURE__ */ import_react3.default.createElement(MentionComponent, { users, tags }), /* @__PURE__ */ import_react3.default.createElement(import_extension_react_tables.TableComponents, null), /* @__PURE__ */ import_react3.default.createElement(BubbleMenu, null), children)));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SocialEditor
});
