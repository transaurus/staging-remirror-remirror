var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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

// src/social/social-editor.tsx
import React3, { useCallback, useMemo, useState } from "react";
import {
  EmojiExtension,
  MentionAtomExtension,
  PlaceholderExtension,
  wysiwygPreset
} from "remirror/extensions";
import data from "svgmoji/emoji.json";
import { TableComponents, TableExtension } from "@remirror/extension-react-tables";
import { i18nFormat } from "@remirror/i18n";
import {
  EditorComponent,
  EmojiPopupComponent,
  MentionAtomPopupComponent,
  Remirror,
  ThemeProvider,
  useRemirror
} from "@remirror/react";
import { AllStyledComponent } from "@remirror/styles/emotion";

// src/components/bubble-menu.tsx
import React from "react";
import { FloatingToolbar } from "@remirror/react-ui";
var BubbleMenu = () => /* @__PURE__ */ React.createElement(FloatingToolbar, null);

// src/components/top-toolbar.tsx
import React2 from "react";
import { WysiwygToolbar } from "@remirror/react-ui";
var TopToolbar = () => /* @__PURE__ */ React2.createElement(WysiwygToolbar, null);

// src/social/social-editor.tsx
var extraAttributes = [
  {
    identifiers: ["mention", "emoji"],
    attributes: { role: { default: "presentation" } }
  },
  { identifiers: ["mention"], attributes: { href: { default: null } } }
];
function MentionComponent({ users, tags }) {
  const [mentionState, setMentionState] = useState();
  const tagItems = useMemo(
    () => (tags != null ? tags : []).map((tag) => ({ id: tag, label: "#".concat(tag) })),
    [tags]
  );
  const items = useMemo(() => {
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
  return /* @__PURE__ */ React3.createElement(MentionAtomPopupComponent, { onChange: setMentionState, items });
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
  const extensions = useCallback(
    () => [
      new PlaceholderExtension({ placeholder }),
      new TableExtension(),
      new MentionAtomExtension({
        matchers: [
          { name: "at", char: "@" },
          { name: "tag", char: "#" }
        ]
      }),
      new EmojiExtension({ plainText: false, data, moji: "noto" }),
      ...wysiwygPreset()
    ],
    [placeholder]
  );
  const { manager } = useRemirror({
    extensions,
    extraAttributes,
    stringHandler
  });
  return /* @__PURE__ */ React3.createElement(AllStyledComponent, null, /* @__PURE__ */ React3.createElement(ThemeProvider, { theme }, /* @__PURE__ */ React3.createElement(Remirror, __spreadValues({ manager, i18nFormat }, rest), /* @__PURE__ */ React3.createElement(TopToolbar, null), /* @__PURE__ */ React3.createElement(EditorComponent, null), /* @__PURE__ */ React3.createElement(EmojiPopupComponent, null), /* @__PURE__ */ React3.createElement(MentionComponent, { users, tags }), /* @__PURE__ */ React3.createElement(TableComponents, null), /* @__PURE__ */ React3.createElement(BubbleMenu, null), children)));
};
export {
  SocialEditor
};
