"use strict";
var __create = Object.create;
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BaselineButtonGroup: () => BaselineButtonGroup,
  BasicFormattingButtonGroup: () => BasicFormattingButtonGroup,
  CalloutTypeButtonGroup: () => CalloutTypeButtonGroup,
  CenterAlignButton: () => CenterAlignButton,
  CodeBlockFormatButton: () => CodeBlockFormatButton,
  CodeBlockLanguageSelect: () => CodeBlockLanguageSelect,
  CodeBlockTools: () => CodeBlockTools,
  CommandButton: () => CommandButton,
  CommandButtonGroup: () => CommandButtonGroup,
  CommandMenuItem: () => CommandMenuItem,
  CopyButton: () => CopyButton,
  CreateTableButton: () => CreateTableButton,
  CutButton: () => CutButton,
  DataTransferButtonGroup: () => DataTransferButtonGroup,
  DecreaseFontSizeButton: () => DecreaseFontSizeButton,
  DecreaseIndentButton: () => DecreaseIndentButton,
  DropdownButton: () => DropdownButton,
  FindButton: () => FindButton,
  FindReplaceComponent: () => FindReplaceComponent,
  FloatingToolbar: () => FloatingToolbar,
  FormattingButtonGroup: () => FormattingButtonGroup,
  HeadingLevelButtonGroup: () => HeadingLevelButtonGroup,
  HistoryButtonGroup: () => HistoryButtonGroup,
  IncreaseFontSizeButton: () => IncreaseFontSizeButton,
  IncreaseIndentButton: () => IncreaseIndentButton,
  IndentationButtonGroup: () => IndentationButtonGroup,
  InsertHorizontalRuleButton: () => InsertHorizontalRuleButton,
  JustifyAlignButton: () => JustifyAlignButton,
  LeftAlignButton: () => LeftAlignButton,
  ListButtonGroup: () => ListButtonGroup,
  MarkdownToolbar: () => MarkdownToolbar,
  PasteButton: () => PasteButton,
  RedoButton: () => RedoButton,
  RightAlignButton: () => RightAlignButton,
  TextAlignmentButtonGroup: () => TextAlignmentButtonGroup,
  ToggleBlockquoteButton: () => ToggleBlockquoteButton,
  ToggleBoldButton: () => ToggleBoldButton,
  ToggleBulletListButton: () => ToggleBulletListButton,
  ToggleCalloutButton: () => ToggleCalloutButton,
  ToggleCalloutMenuItem: () => ToggleCalloutMenuItem,
  ToggleCodeBlockButton: () => ToggleCodeBlockButton,
  ToggleCodeButton: () => ToggleCodeButton,
  ToggleColumnsButton: () => ToggleColumnsButton,
  ToggleHeadingButton: () => ToggleHeadingButton,
  ToggleHeadingMenuItem: () => ToggleHeadingMenuItem,
  ToggleItalicButton: () => ToggleItalicButton,
  ToggleOrderedListButton: () => ToggleOrderedListButton,
  ToggleStrikeButton: () => ToggleStrikeButton,
  ToggleSubscriptButton: () => ToggleSubscriptButton,
  ToggleSuperscriptButton: () => ToggleSuperscriptButton,
  ToggleTaskListButton: () => ToggleTaskListButton,
  ToggleUnderlineButton: () => ToggleUnderlineButton,
  ToggleWhitespaceButton: () => ToggleWhitespaceButton,
  Toolbar: () => Toolbar,
  UndoButton: () => UndoButton,
  VerticalDivider: () => VerticalDivider,
  WysiwygToolbar: () => WysiwygToolbar
});
module.exports = __toCommonJS(src_exports);

// src/button-groups/baseline-button-group.tsx
var import_react46 = __toESM(require("react"), 1);

// src/buttons/center-align-button.tsx
var import_react4 = __toESM(require("react"), 1);
var import_react_core2 = require("@remirror/react-core");

// src/buttons/command-button.tsx
var import_material2 = require("@mui/material");
var import_react3 = __toESM(require("react"), 1);
var import_core3 = require("@remirror/core");

// src/use-command-option-values.ts
var import_react = require("react");
var import_react_core = require("@remirror/react-core");

// src/react-component-utils.ts
var import_core = require("@remirror/core");
function getCommandOptionValue(value, commandProps) {
  return (0, import_core.isFunction)(value) ? value(commandProps) : value;
}
function isStringArray(array) {
  return (0, import_core.isString)(array[0]);
}
function getUiShortcutString(uiShortcut, attrs) {
  var _a2, _b, _c, _d;
  if ((0, import_core.isString)(uiShortcut)) {
    return uiShortcut;
  }
  if (!(0, import_core.isArray)(uiShortcut)) {
    return uiShortcut.shortcut;
  }
  if (isStringArray(uiShortcut)) {
    return (_a2 = uiShortcut[0]) != null ? _a2 : "";
  }
  return (_d = (_c = (_b = uiShortcut.find((shortcut) => (0, import_core.isEqual)(shortcut.attrs, attrs))) != null ? _b : uiShortcut[0]) == null ? void 0 : _c.shortcut) != null ? _d : "";
}
var CASINGS = {
  title: (value) => (0, import_core.capitalize)(value),
  upper: (value) => value.toLocaleUpperCase(),
  lower: (value) => value.toLocaleLowerCase()
};
function getShortcutString(shortcut, options) {
  var _a2;
  const {
    casing = "title",
    namedAsSymbol = false,
    modifierAsSymbol = true,
    separator = " ",
    t
  } = options;
  const symbols = (0, import_core.getShortcutSymbols)(shortcut);
  const stringSymbols = [];
  const transform = CASINGS[casing];
  for (const sym of symbols) {
    if (sym.type === "char") {
      stringSymbols.push(transform(sym.key));
      continue;
    }
    if (sym.type === "named") {
      const value2 = namedAsSymbol === true || (0, import_core.isArray)(namedAsSymbol) && (0, import_core.includes)(namedAsSymbol, sym.key) ? (_a2 = sym.symbol) != null ? _a2 : t(sym.i18n) : t(sym.i18n);
      stringSymbols.push(transform(value2));
      continue;
    }
    const value = modifierAsSymbol === true || (0, import_core.isArray)(modifierAsSymbol) && (0, import_core.includes)(modifierAsSymbol, sym.key) ? sym.symbol : t(sym.i18n);
    stringSymbols.push(transform(value));
  }
  return stringSymbols.join(separator);
}

// src/use-command-option-values.ts
var useCommandOptionValues = ({
  commandName,
  active,
  enabled,
  attrs
}) => {
  const t = (0, import_react_core.useI18n)();
  const { getCommandOptions } = (0, import_react_core.useHelpers)();
  const options = getCommandOptions(commandName);
  const { description, label, icon, shortcut } = options || {};
  const commandProps = (0, import_react.useMemo)(
    () => ({ active, attrs, enabled, t }),
    [active, attrs, enabled, t]
  );
  const shortcutString = (0, import_react.useMemo)(() => {
    if (!shortcut) {
      return;
    }
    return getShortcutString(getUiShortcutString(shortcut, attrs != null ? attrs : {}), { t, separator: "" });
  }, [shortcut, attrs, t]);
  return (0, import_react.useMemo)(
    () => ({
      description: getCommandOptionValue(description, commandProps),
      label: getCommandOptionValue(label, commandProps),
      icon: getCommandOptionValue(icon, commandProps),
      shortcut: shortcutString
    }),
    [commandProps, description, label, icon, shortcutString]
  );
};

// src/buttons/command-button-icon.tsx
var import_material = require("@mui/material");
var import_react2 = __toESM(require("react"), 1);
var import_core2 = require("@remirror/core");
var import_react_components = require("@remirror/react-components");
var isCommandUiIcon = (val) => {
  if (!(0, import_core2.isPlainObject)(val)) {
    return false;
  }
  return !!val.name;
};
var CommandButtonIcon = ({ icon }) => {
  if ((0, import_core2.isString)(icon)) {
    return /* @__PURE__ */ import_react2.default.createElement(import_react_components.Icon, { name: icon, size: "1rem" });
  }
  return icon;
};
var CommandButtonBadge = ({ icon, children }) => {
  if (!isCommandUiIcon(icon)) {
    return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, children);
  }
  const { sub, sup } = icon;
  const value = sub != null ? sub : sup;
  const isBottom = sub !== void 0;
  if (value === void 0) {
    return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, children);
  }
  return /* @__PURE__ */ import_react2.default.createElement(
    import_material.Badge,
    {
      anchorOrigin: {
        vertical: isBottom ? "bottom" : "top",
        horizontal: "right"
      },
      badgeContent: value,
      sx: {
        "& > .MuiBadge-badge": {
          bgcolor: "background.paper",
          color: "text.secondary",
          minWidth: 12,
          height: 12,
          margin: "2px 0",
          padding: "1px"
        }
      }
    },
    children
  );
};

// src/buttons/command-button.tsx
var CommandButton = (_a2) => {
  var _b = _a2, {
    commandName,
    active = false,
    enabled,
    attrs,
    onSelect,
    onChange,
    icon,
    displayShortcut = true,
    "aria-label": ariaLabel,
    label
  } = _b, rest = __objRest(_b, [
    "commandName",
    "active",
    "enabled",
    "attrs",
    "onSelect",
    "onChange",
    "icon",
    "displayShortcut",
    "aria-label",
    "label"
  ]);
  var _a3;
  const handleChange = (0, import_react3.useCallback)(
    (e, value) => {
      onSelect();
      onChange == null ? void 0 : onChange(e, value);
    },
    [onSelect, onChange]
  );
  const handleMouseDown = (0, import_react3.useCallback)((e) => {
    e.preventDefault();
  }, []);
  const commandOptions = useCommandOptionValues({ commandName, active, enabled, attrs });
  let fallbackIcon = null;
  if (commandOptions.icon) {
    fallbackIcon = (0, import_core3.isString)(commandOptions.icon) ? commandOptions.icon : commandOptions.icon.name;
  }
  const labelText = (_a3 = ariaLabel != null ? ariaLabel : commandOptions.label) != null ? _a3 : "";
  const tooltipText = label != null ? label : labelText;
  const shortcutText = displayShortcut && commandOptions.shortcut ? " (".concat(commandOptions.shortcut, ")") : "";
  return /* @__PURE__ */ import_react3.default.createElement(import_material2.Tooltip, { title: "".concat(tooltipText).concat(shortcutText) }, /* @__PURE__ */ import_react3.default.createElement(import_material2.Box, { component: "span", sx: { "&:not(:first-of-type)": { marginLeft: "-1px" } } }, /* @__PURE__ */ import_react3.default.createElement(
    import_material2.ToggleButton,
    __spreadProps(__spreadValues({
      "aria-label": labelText,
      selected: active,
      disabled: !enabled,
      onMouseDown: handleMouseDown,
      color: "primary",
      size: "small",
      sx: {
        padding: "6px 12px",
        "&.Mui-selected": {
          backgroundColor: "primary.main",
          color: "primary.contrastText"
        },
        "&.Mui-selected:hover": {
          backgroundColor: "primary.dark",
          color: "primary.contrastText"
        },
        "&:not(:first-of-type)": {
          borderLeft: "1px solid transparent",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        },
        "&:not(:last-of-type)": {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }
      }
    }, rest), {
      value: commandName,
      onChange: handleChange
    }),
    /* @__PURE__ */ import_react3.default.createElement(CommandButtonBadge, { icon: commandOptions.icon }, /* @__PURE__ */ import_react3.default.createElement(CommandButtonIcon, { icon: icon != null ? icon : fallbackIcon }))
  )));
};

// src/buttons/center-align-button.tsx
var CenterAlignButton = (props) => {
  var _a2;
  const { centerAlign } = (0, import_react_core2.useCommands)();
  (0, import_react_core2.useCurrentSelection)();
  const handleSelect = (0, import_react4.useCallback)(() => {
    if (centerAlign.enabled()) {
      centerAlign();
    }
  }, [centerAlign]);
  const active = (_a2 = centerAlign.active) == null ? void 0 : _a2.call(centerAlign);
  const enabled = centerAlign.enabled();
  return /* @__PURE__ */ import_react4.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "centerAlign",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/copy-button.tsx
var import_react5 = __toESM(require("react"), 1);
var import_react_core3 = require("@remirror/react-core");
var CopyButton = (props) => {
  const { copy } = (0, import_react_core3.useCommands)();
  (0, import_react_core3.useCurrentSelection)();
  const handleSelect = (0, import_react5.useCallback)(() => {
    if (copy.enabled()) {
      copy();
    }
  }, [copy]);
  const enabled = copy.enabled();
  return /* @__PURE__ */ import_react5.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "copy",
      active: false,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/create-table-button.tsx
var import_react6 = __toESM(require("react"), 1);
var import_react_core4 = require("@remirror/react-core");
var CreateTableButton = (props) => {
  const { createTable } = (0, import_react_core4.useCommands)();
  const handleSelect = (0, import_react6.useCallback)(() => {
    if (createTable.enabled()) {
      createTable();
    }
  }, [createTable]);
  const active = (0, import_react_core4.useActive)().table();
  const enabled = createTable.enabled();
  return /* @__PURE__ */ import_react6.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "createTable",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/cut-button.tsx
var import_react7 = __toESM(require("react"), 1);
var import_react_core5 = require("@remirror/react-core");
var CutButton = (props) => {
  const { cut } = (0, import_react_core5.useCommands)();
  (0, import_react_core5.useCurrentSelection)();
  const handleSelect = (0, import_react7.useCallback)(() => {
    if (cut.enabled()) {
      cut();
    }
  }, [cut]);
  const enabled = cut.enabled();
  return /* @__PURE__ */ import_react7.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "cut",
      active: false,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/decrease-font-size-button.tsx
var import_react8 = __toESM(require("react"), 1);
var import_react_core6 = require("@remirror/react-core");
var DecreaseFontSizeButton = (props) => {
  const { decreaseFontSize } = (0, import_react_core6.useCommands)();
  const handleSelect = (0, import_react8.useCallback)(() => {
    if (decreaseFontSize.enabled()) {
      decreaseFontSize();
    }
  }, [decreaseFontSize]);
  const enabled = decreaseFontSize.enabled();
  return /* @__PURE__ */ import_react8.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "decreaseFontSize",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/decrease-indent-button.tsx
var import_react9 = __toESM(require("react"), 1);
var import_react_core7 = require("@remirror/react-core");
var DecreaseIndentButton = (props) => {
  const { decreaseIndent } = (0, import_react_core7.useCommands)();
  const handleSelect = (0, import_react9.useCallback)(() => {
    if (decreaseIndent.enabled()) {
      decreaseIndent();
    }
  }, [decreaseIndent]);
  const enabled = decreaseIndent.enabled();
  return /* @__PURE__ */ import_react9.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "decreaseIndent",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/dropdown-button.tsx
var import_material3 = require("@mui/material");
var import_react10 = __toESM(require("react"), 1);
var import_core4 = require("@remirror/core");
var import_react_components2 = require("@remirror/react-components");
var ButtonIcon = ({ icon }) => {
  if ((0, import_core4.isString)(icon)) {
    return /* @__PURE__ */ import_react10.default.createElement(import_react_components2.Icon, { name: icon, size: "1rem" });
  }
  return icon;
};
var DropdownButton = (_a2) => {
  var _b = _a2, {
    label,
    "aria-label": ariaLabel,
    icon,
    children,
    onClose
  } = _b, rest = __objRest(_b, [
    "label",
    "aria-label",
    "icon",
    "children",
    "onClose"
  ]);
  const id = (0, import_react10.useRef)((0, import_core4.uniqueId)());
  const [anchorEl, setAnchorEl] = (0, import_react10.useState)(null);
  const open = Boolean(anchorEl);
  const handleMouseDown = (0, import_react10.useCallback)((e) => {
    e.preventDefault();
  }, []);
  const handleClick = (0, import_react10.useCallback)((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = (0, import_react10.useCallback)(
    (e, reason) => {
      setAnchorEl(null);
      onClose == null ? void 0 : onClose(e, reason);
    },
    [onClose]
  );
  return /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, /* @__PURE__ */ import_react10.default.createElement(import_material3.Tooltip, { title: label != null ? label : ariaLabel }, /* @__PURE__ */ import_react10.default.createElement(
    import_material3.IconButton,
    {
      "aria-label": ariaLabel,
      "aria-controls": open ? id.current : void 0,
      "aria-haspopup": true,
      "aria-expanded": open ? "true" : void 0,
      onMouseDown: handleMouseDown,
      onClick: handleClick,
      size: "small",
      sx: (theme) => ({
        border: "1px solid ".concat(theme.palette.divider),
        borderRadius: "".concat(theme.shape.borderRadius, "px"),
        padding: "6px 12px",
        "&:not(:first-of-type)": {
          marginLeft: "-1px",
          borderLeft: "1px solid transparent",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        },
        "&:not(:last-of-type)": {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }
      })
    },
    icon && /* @__PURE__ */ import_react10.default.createElement(ButtonIcon, { icon }),
    /* @__PURE__ */ import_react10.default.createElement(import_react_components2.Icon, { name: "arrowDownSFill", size: "1rem" })
  )), /* @__PURE__ */ import_react10.default.createElement(import_material3.Menu, __spreadProps(__spreadValues({}, rest), { id: id.current, anchorEl, open, onClose: handleClose }), children));
};

// src/buttons/find-button.tsx
var import_styled = __toESM(require("@emotion/styled"), 1);
var import_material10 = require("@mui/material");
var import_react19 = __toESM(require("react"), 1);
var import_react_components6 = require("@remirror/react-components");
var import_react_hooks = require("@remirror/react-hooks");

// src/find-replace/find-replace-component.tsx
var import_material9 = require("@mui/material");
var import_react18 = __toESM(require("react"), 1);
var import_react_components5 = require("@remirror/react-components");

// src/providers/ui-theme-provider.tsx
var import_material4 = require("@mui/material");
var import_system = require("@mui/system");
var import_react11 = __toESM(require("react"), 1);
var import_react_components3 = require("@remirror/react-components");
var import_theme = require("@remirror/theme");
function useRemirrorDefaultMuiTheme() {
  const { theme } = (0, import_react_components3.useTheme)();
  return (0, import_react11.useMemo)(
    () => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      return (0, import_material4.createTheme)({
        palette: {
          primary: {
            main: (_b = (_a2 = theme.color) == null ? void 0 : _a2.primary) != null ? _b : import_theme.defaultRemirrorTheme.color.primary,
            dark: (_e = (_d = (_c = theme.color) == null ? void 0 : _c.hover) == null ? void 0 : _d.primary) != null ? _e : import_theme.defaultRemirrorTheme.color.hover.primary,
            contrastText: (_g = (_f = theme.color) == null ? void 0 : _f.primaryText) != null ? _g : import_theme.defaultRemirrorTheme.color.primaryText
          },
          secondary: {
            main: (_i = (_h = theme.color) == null ? void 0 : _h.secondary) != null ? _i : import_theme.defaultRemirrorTheme.color.secondary,
            dark: (_l = (_k = (_j = theme.color) == null ? void 0 : _j.hover) == null ? void 0 : _k.secondary) != null ? _l : import_theme.defaultRemirrorTheme.color.hover.secondary,
            contrastText: (_n = (_m = theme.color) == null ? void 0 : _m.secondaryText) != null ? _n : import_theme.defaultRemirrorTheme.color.secondaryText
          }
        }
      });
    },
    [theme]
  );
}
var UiThemeProvider = (props) => {
  const { children } = props;
  const remirrorDefaultTheme = useRemirrorDefaultMuiTheme();
  const muiTheme = (0, import_system.useTheme)(remirrorDefaultTheme);
  return /* @__PURE__ */ import_react11.default.createElement(import_material4.ThemeProvider, { theme: muiTheme }, children);
};

// src/find-replace/find-controller.tsx
var import_material5 = require("@mui/material");
var import_react13 = __toESM(require("react"), 1);
var import_react_components4 = require("@remirror/react-components");

// src/find-replace/letter-icon.tsx
var import_react12 = __toESM(require("react"), 1);
var MdiFormatLetterCase = (props) => /* @__PURE__ */ import_react12.default.createElement("svg", __spreadValues({ width: "1em", height: "1em", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ import_react12.default.createElement(
  "path",
  {
    fill: "currentColor",
    d: "M20.06 18a3.99 3.99 0 0 1-.2-.89c-.67.7-1.48 1.05-2.41 1.05c-.83 0-1.52-.24-2.05-.71c-.53-.45-.8-1.06-.8-1.79c0-.88.33-1.56 1-2.05c.67-.49 1.61-.73 2.83-.73h1.4v-.64c0-.49-.15-.88-.45-1.17c-.3-.29-.75-.43-1.33-.43c-.52 0-.95.12-1.3.36c-.35.25-.52.54-.52.89h-1.46c0-.43.15-.84.45-1.24c.28-.4.71-.71 1.22-.94c.51-.21 1.06-.35 1.69-.35c.98 0 1.74.24 2.29.73s.84 1.16.86 2.02V16c0 .8.1 1.42.3 1.88V18h-1.52m-2.4-1.12c.45 0 .88-.11 1.29-.32c.4-.21.7-.49.88-.83v-1.57H18.7c-1.77 0-2.66.47-2.66 1.41c0 .43.15.73.46.96c.3.23.68.35 1.16.35m-12.2-3.17h4.07L7.5 8.29l-2.04 5.42M6.64 6h1.72l4.71 12h-1.93l-.97-2.57H4.82L3.86 18H1.93L6.64 6Z"
  }
));

// src/find-replace/find-controller.tsx
var FindController = ({ findPrev, findNext, stopFind, caseSensitive, toggleCaseSensitive, onDismiss }) => /* @__PURE__ */ import_react13.default.createElement(import_react13.default.Fragment, null, /* @__PURE__ */ import_react13.default.createElement(
  import_material5.IconButton,
  {
    onClick: findPrev,
    size: "small",
    title: "Next Match (Enter)",
    "aria-label": "Next Match (Enter)"
  },
  /* @__PURE__ */ import_react13.default.createElement(import_react_components4.Icon, { name: "arrowLeftSFill" })
), /* @__PURE__ */ import_react13.default.createElement(
  import_material5.IconButton,
  {
    onClick: findNext,
    size: "small",
    title: "Previous Match (Shift+Enter)",
    "aria-label": "Previous Match (Shift+Enter)"
  },
  /* @__PURE__ */ import_react13.default.createElement(import_react_components4.Icon, { name: "arrowRightSFill" })
), /* @__PURE__ */ import_react13.default.createElement(
  import_material5.IconButton,
  {
    onClick: toggleCaseSensitive,
    size: "small",
    color: caseSensitive ? "primary" : "default",
    title: "Match Case",
    "aria-label": "Match Case"
  },
  /* @__PURE__ */ import_react13.default.createElement(MdiFormatLetterCase, null)
), /* @__PURE__ */ import_react13.default.createElement(
  import_material5.IconButton,
  {
    onClick: () => {
      stopFind();
      onDismiss == null ? void 0 : onDismiss();
    },
    size: "small"
  },
  /* @__PURE__ */ import_react13.default.createElement(import_react_components4.Icon, { name: "closeFill" })
));

// src/find-replace/find-input.tsx
var import_material6 = require("@mui/material");
var import_react14 = __toESM(require("react"), 1);
var FindInput = ({ query, setQuery, total, activeIndex }) => {
  const counterLabel = "".concat(total && activeIndex != null ? activeIndex + 1 : 0, " of ").concat(total);
  return /* @__PURE__ */ import_react14.default.createElement(
    import_material6.OutlinedInput,
    {
      fullWidth: true,
      margin: "none",
      placeholder: "Find",
      value: query,
      onChange: (event) => setQuery(event.target.value),
      sx: {
        "& input": {
          paddingTop: "4px",
          paddingBottom: "4px"
        }
      },
      size: "small",
      inputProps: { "aria-label": "Find" },
      endAdornment: /* @__PURE__ */ import_react14.default.createElement(import_material6.InputAdornment, { position: "end" }, counterLabel)
    }
  );
};

// src/find-replace/replace-controller.tsx
var import_material7 = require("@mui/material");
var import_react15 = __toESM(require("react"), 1);
var ReplaceController = ({ replace, replaceAll }) => /* @__PURE__ */ import_react15.default.createElement(import_material7.ButtonGroup, { variant: "outlined", size: "small" }, /* @__PURE__ */ import_react15.default.createElement(import_material7.Button, { "aria-label": "Replace", sx: { textTransform: "none" }, onClick: replace }, "Replace"), /* @__PURE__ */ import_react15.default.createElement(import_material7.Button, { "aria-label": "Replace all", sx: { textTransform: "none" }, onClick: replaceAll }, "All"));

// src/find-replace/replace-input.tsx
var import_material8 = require("@mui/material");
var import_react16 = __toESM(require("react"), 1);
var ReplaceInput = ({ replacement, setReplacement }) => /* @__PURE__ */ import_react16.default.createElement(
  import_material8.OutlinedInput,
  {
    fullWidth: true,
    margin: "none",
    placeholder: "Replace",
    value: replacement,
    onChange: (event) => setReplacement(event.target.value),
    sx: {
      "& input": {
        paddingTop: "4px",
        paddingBottom: "4px"
      }
    },
    size: "small",
    inputProps: { "aria-label": "Replace" }
  }
);

// src/find-replace/use-find-replace.tsx
var import_react17 = require("react");
var import_react_core8 = require("@remirror/react-core");
function initialState() {
  return {
    query: "",
    replacement: "",
    activeIndex: null,
    total: 0,
    caseSensitive: false
  };
}
function useFindReplace() {
  const helpers = (0, import_react_core8.useHelpers)();
  const commands = (0, import_react_core8.useCommands)();
  const [state, setState] = (0, import_react17.useState)(initialState);
  const find = (0, import_react17.useCallback)(
    (indexDiff = 0) => {
      setState((state2) => {
        var _a2;
        const { query, caseSensitive, activeIndex } = state2;
        const result = helpers.findRanges({
          query,
          caseSensitive,
          activeIndex: activeIndex == null ? 0 : activeIndex + indexDiff
        });
        return __spreadProps(__spreadValues({}, state2), { total: result.ranges.length, activeIndex: (_a2 = result.activeIndex) != null ? _a2 : 0 });
      });
    },
    [helpers]
  );
  const findNext = (0, import_react17.useCallback)(() => find(1), [find]);
  const findPrev = (0, import_react17.useCallback)(() => find(-1), [find]);
  const stopFind = (0, import_react17.useCallback)(() => {
    setState(initialState());
    commands.stopFind();
  }, [commands]);
  const replace = (0, import_react17.useCallback)(() => {
    const { query, replacement, caseSensitive, activeIndex } = state;
    commands.findAndReplace({ query, replacement, caseSensitive, index: activeIndex != null ? activeIndex : void 0 });
    const isQuerySubsetOfReplacement = caseSensitive ? replacement.includes(query) : replacement.toLowerCase().includes(query.toLowerCase());
    if (isQuerySubsetOfReplacement) {
      findNext();
    } else {
      find();
    }
  }, [state, commands, findNext, find]);
  const replaceAll = (0, import_react17.useCallback)(() => {
    const { query, replacement, caseSensitive } = state;
    commands.findAndReplaceAll({ query, replacement, caseSensitive });
    find();
  }, [commands, state, find]);
  const toggleCaseSensitive = (0, import_react17.useCallback)(() => {
    setState((state2) => __spreadProps(__spreadValues({}, state2), { caseSensitive: !state2.caseSensitive }));
  }, []);
  const setQuery = (0, import_react17.useCallback)((query) => {
    setState((state2) => __spreadProps(__spreadValues({}, state2), { query }));
  }, []);
  const setReplacement = (0, import_react17.useCallback)((replacement) => {
    setState((state2) => __spreadProps(__spreadValues({}, state2), { replacement }));
  }, []);
  (0, import_react17.useEffect)(() => {
    find();
  }, [find, commands, state.query, state.caseSensitive]);
  return __spreadProps(__spreadValues({}, state), {
    findNext,
    findPrev,
    stopFind,
    replace,
    replaceAll,
    toggleCaseSensitive,
    setQuery,
    setReplacement
  });
}

// src/find-replace/find-replace-component.tsx
var FindReplaceComponent = ({
  canToggleReplace = false,
  onDismiss
}) => {
  const [isReplaceVisible, setIsReplaceVisible] = (0, import_react18.useState)(!canToggleReplace);
  const {
    query,
    setQuery,
    activeIndex,
    total,
    caseSensitive,
    replacement,
    setReplacement,
    toggleCaseSensitive,
    findNext,
    findPrev,
    stopFind,
    replace,
    replaceAll
  } = useFindReplace();
  const handleToggleReplace = (0, import_react18.useCallback)(() => {
    setIsReplaceVisible((bool) => !bool);
  }, []);
  (0, import_react18.useEffect)(() => {
    if (!isReplaceVisible) {
      setReplacement("");
    }
  }, [isReplaceVisible, setReplacement]);
  (0, import_react18.useEffect)(() => {
    return () => {
      stopFind();
    };
  }, [stopFind]);
  const label = isReplaceVisible ? "Hide replace field" : "Show replace field";
  return /* @__PURE__ */ import_react18.default.createElement(UiThemeProvider, null, /* @__PURE__ */ import_react18.default.createElement(
    import_material9.Box,
    {
      sx: {
        display: "grid",
        gridTemplateColumns: canToggleReplace ? "max-content 1fr max-content" : "1fr max-content",
        gridTemplateRows: isReplaceVisible ? "32px 32px" : "32px",
        rowGap: 1,
        columnGap: 1,
        alignItems: "center"
      }
    },
    canToggleReplace && /* @__PURE__ */ import_react18.default.createElement(import_material9.Box, null, /* @__PURE__ */ import_react18.default.createElement(import_material9.IconButton, { onClick: handleToggleReplace, size: "small", title: label, "aria-label": label }, /* @__PURE__ */ import_react18.default.createElement(import_react_components5.Icon, { name: "arrowRightSFill" }))),
    /* @__PURE__ */ import_react18.default.createElement(import_material9.Box, null, /* @__PURE__ */ import_react18.default.createElement(FindInput, { query, setQuery, total, activeIndex })),
    /* @__PURE__ */ import_react18.default.createElement(import_material9.Box, { sx: { justifySelf: "end" } }, /* @__PURE__ */ import_react18.default.createElement(
      FindController,
      {
        findPrev,
        findNext,
        toggleCaseSensitive,
        caseSensitive,
        stopFind,
        onDismiss
      }
    )),
    isReplaceVisible && /* @__PURE__ */ import_react18.default.createElement(import_react18.default.Fragment, null, canToggleReplace && /* @__PURE__ */ import_react18.default.createElement(import_material9.Box, null), /* @__PURE__ */ import_react18.default.createElement(import_material9.Box, null, /* @__PURE__ */ import_react18.default.createElement(ReplaceInput, { replacement, setReplacement })), /* @__PURE__ */ import_react18.default.createElement(import_material9.Box, { sx: { justifySelf: "end" } }, /* @__PURE__ */ import_react18.default.createElement(ReplaceController, { replace, replaceAll })))
  ));
};

// src/buttons/find-button.tsx
var _a;
var EditorViewport = import_styled.default.div(_a || (_a = __template(["\n  position: absolute;\n  pointer-events: none;\n  display: flex;\n  justify-content: flex-end;\n  align-items: flex-start;\n"])));
var FindButton = (props) => {
  const [showFind, setShowFind] = (0, import_react19.useState)(false);
  const { ref, x, y, width, height, active } = (0, import_react_hooks.usePositioner)("editor");
  const handleSelect = (0, import_react19.useCallback)(() => {
    setShowFind((bool) => !bool);
  }, []);
  const hideFind = (0, import_react19.useCallback)(() => {
    setShowFind(false);
  }, []);
  return /* @__PURE__ */ import_react19.default.createElement(import_react19.default.Fragment, null, /* @__PURE__ */ import_react19.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({
      "aria-label": "Search in document",
      icon: "searchLine"
    }, props), {
      commandName: "find",
      active: showFind,
      enabled: true,
      onSelect: handleSelect
    })
  ), /* @__PURE__ */ import_react19.default.createElement(import_react_components6.PositionerPortal, null, active && showFind && /* @__PURE__ */ import_react19.default.createElement(EditorViewport, { ref, style: { left: x, top: y, width, height } }, /* @__PURE__ */ import_react19.default.createElement(
    import_material10.Paper,
    {
      elevation: 3,
      sx: {
        m: 1,
        p: 1,
        width: "var(--rmr-space-8)",
        maxWidth: "100%",
        pointerEvents: "all"
      }
    },
    /* @__PURE__ */ import_react19.default.createElement(FindReplaceComponent, { canToggleReplace: true, onDismiss: hideFind })
  ))));
};

// src/buttons/increase-font-size-button.tsx
var import_react20 = __toESM(require("react"), 1);
var import_react_core9 = require("@remirror/react-core");
var IncreaseFontSizeButton = (props) => {
  const { increaseFontSize } = (0, import_react_core9.useCommands)();
  const handleSelect = (0, import_react20.useCallback)(() => {
    if (increaseFontSize.enabled()) {
      increaseFontSize();
    }
  }, [increaseFontSize]);
  const enabled = increaseFontSize.enabled();
  return /* @__PURE__ */ import_react20.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "increaseFontSize",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/increase-indent-button.tsx
var import_react21 = __toESM(require("react"), 1);
var import_react_core10 = require("@remirror/react-core");
var IncreaseIndentButton = (props) => {
  const { increaseIndent } = (0, import_react_core10.useCommands)();
  const handleSelect = (0, import_react21.useCallback)(() => {
    if (increaseIndent.enabled()) {
      increaseIndent();
    }
  }, [increaseIndent]);
  const enabled = increaseIndent.enabled();
  return /* @__PURE__ */ import_react21.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "increaseIndent",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/insert-horizontal-rule-button.tsx
var import_react22 = __toESM(require("react"), 1);
var import_react_core11 = require("@remirror/react-core");
var InsertHorizontalRuleButton = (props) => {
  const { insertHorizontalRule } = (0, import_react_core11.useCommands)();
  (0, import_react_core11.useCurrentSelection)();
  const handleSelect = (0, import_react22.useCallback)(() => {
    if (insertHorizontalRule.enabled()) {
      insertHorizontalRule();
    }
  }, [insertHorizontalRule]);
  const enabled = insertHorizontalRule.enabled();
  return /* @__PURE__ */ import_react22.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "insertHorizontalRule",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/justify-align-button.tsx
var import_react23 = __toESM(require("react"), 1);
var import_react_core12 = require("@remirror/react-core");
var JustifyAlignButton = (props) => {
  var _a2;
  const { justifyAlign } = (0, import_react_core12.useCommands)();
  (0, import_react_core12.useCurrentSelection)();
  const handleSelect = (0, import_react23.useCallback)(() => {
    if (justifyAlign.enabled()) {
      justifyAlign();
    }
  }, [justifyAlign]);
  const active = (_a2 = justifyAlign.active) == null ? void 0 : _a2.call(justifyAlign);
  const enabled = justifyAlign.enabled();
  return /* @__PURE__ */ import_react23.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "justifyAlign",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/left-align-button.tsx
var import_react24 = __toESM(require("react"), 1);
var import_react_core13 = require("@remirror/react-core");
var LeftAlignButton = (props) => {
  var _a2;
  const { leftAlign } = (0, import_react_core13.useCommands)();
  (0, import_react_core13.useCurrentSelection)();
  const handleSelect = (0, import_react24.useCallback)(() => {
    if (leftAlign.enabled()) {
      leftAlign();
    }
  }, [leftAlign]);
  const active = (_a2 = leftAlign.active) == null ? void 0 : _a2.call(leftAlign);
  const enabled = leftAlign.enabled();
  return /* @__PURE__ */ import_react24.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "leftAlign",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/paste-button.tsx
var import_react25 = __toESM(require("react"), 1);
var import_react_core14 = require("@remirror/react-core");
var PasteButton = (props) => {
  const { paste } = (0, import_react_core14.useCommands)();
  (0, import_react_core14.useEditorState)();
  const handleSelect = (0, import_react25.useCallback)(() => {
    if (paste.enabled()) {
      paste();
    }
  }, [paste]);
  const enabled = paste.enabled();
  return /* @__PURE__ */ import_react25.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "paste",
      active: false,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/redo-button.tsx
var import_react26 = __toESM(require("react"), 1);
var import_react_core15 = require("@remirror/react-core");
var RedoButton = (props) => {
  const { redo } = (0, import_react_core15.useCommands)();
  const { redoDepth } = (0, import_react_core15.useHelpers)(true);
  const handleSelect = (0, import_react26.useCallback)(() => {
    if (redo.enabled()) {
      redo();
    }
  }, [redo]);
  const enabled = redoDepth() > 0;
  return /* @__PURE__ */ import_react26.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "redo",
      active: false,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/right-align-button.tsx
var import_react27 = __toESM(require("react"), 1);
var import_react_core16 = require("@remirror/react-core");
var RightAlignButton = (props) => {
  var _a2;
  const { rightAlign } = (0, import_react_core16.useCommands)();
  (0, import_react_core16.useCurrentSelection)();
  const handleSelect = (0, import_react27.useCallback)(() => {
    if (rightAlign.enabled()) {
      rightAlign();
    }
  }, [rightAlign]);
  const active = (_a2 = rightAlign.active) == null ? void 0 : _a2.call(rightAlign);
  const enabled = rightAlign.enabled();
  return /* @__PURE__ */ import_react27.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "rightAlign",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-blockquote-button.tsx
var import_react28 = __toESM(require("react"), 1);
var import_react_core17 = require("@remirror/react-core");
var ToggleBlockquoteButton = (props) => {
  const { toggleBlockquote } = (0, import_react_core17.useCommands)();
  const handleSelect = (0, import_react28.useCallback)(() => {
    if (toggleBlockquote.enabled()) {
      toggleBlockquote();
    }
  }, [toggleBlockquote]);
  const active = (0, import_react_core17.useActive)().blockquote();
  const enabled = toggleBlockquote.enabled();
  return /* @__PURE__ */ import_react28.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleBlockquote",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-bold-button.tsx
var import_react29 = __toESM(require("react"), 1);
var import_react_core18 = require("@remirror/react-core");
var ToggleBoldButton = (props) => {
  const { toggleBold } = (0, import_react_core18.useCommands)();
  const handleSelect = (0, import_react29.useCallback)(() => {
    if (toggleBold.enabled()) {
      toggleBold();
    }
  }, [toggleBold]);
  const active = (0, import_react_core18.useActive)().bold();
  const enabled = toggleBold.enabled();
  return /* @__PURE__ */ import_react29.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleBold",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-bullet-list-button.tsx
var import_react30 = __toESM(require("react"), 1);
var import_react_core19 = require("@remirror/react-core");
var ToggleBulletListButton = (props) => {
  const { toggleBulletList } = (0, import_react_core19.useCommands)();
  const handleSelect = (0, import_react30.useCallback)(() => {
    if (toggleBulletList.enabled()) {
      toggleBulletList();
    }
  }, [toggleBulletList]);
  const active = (0, import_react_core19.useActive)().bulletList();
  const enabled = toggleBulletList.enabled();
  return /* @__PURE__ */ import_react30.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleBulletList",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-callout-button.tsx
var import_react31 = __toESM(require("react"), 1);
var import_react_core20 = require("@remirror/react-core");
var ToggleCalloutButton = (_a2) => {
  var _b = _a2, { attrs = {} } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleCallout } = (0, import_react_core20.useCommands)();
  const handleSelect = (0, import_react31.useCallback)(() => {
    if (toggleCallout.enabled(attrs)) {
      toggleCallout(attrs);
    }
  }, [toggleCallout, attrs]);
  const active = (0, import_react_core20.useActive)().callout(attrs);
  const enabled = toggleCallout.enabled(attrs);
  return /* @__PURE__ */ import_react31.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, rest), {
      commandName: "toggleCallout",
      active,
      enabled,
      attrs,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-code-block-button.tsx
var import_react32 = __toESM(require("react"), 1);
var import_react_core21 = require("@remirror/react-core");
var ToggleCodeBlockButton = (_a2) => {
  var _b = _a2, { attrs = {} } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleCodeBlock } = (0, import_react_core21.useCommands)();
  const handleSelect = (0, import_react32.useCallback)(() => {
    if (toggleCodeBlock.enabled(attrs)) {
      toggleCodeBlock(attrs);
    }
  }, [toggleCodeBlock, attrs]);
  const active = (0, import_react_core21.useActive)().codeBlock();
  const enabled = toggleCodeBlock.enabled(attrs);
  return /* @__PURE__ */ import_react32.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, rest), {
      commandName: "toggleCodeBlock",
      active,
      enabled,
      attrs,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-code-button.tsx
var import_react33 = __toESM(require("react"), 1);
var import_react_core22 = require("@remirror/react-core");
var ToggleCodeButton = (props) => {
  const { toggleCode } = (0, import_react_core22.useCommands)();
  const handleSelect = (0, import_react33.useCallback)(() => {
    if (toggleCode.enabled()) {
      toggleCode();
    }
  }, [toggleCode]);
  const active = (0, import_react_core22.useActive)().code();
  const enabled = toggleCode.enabled();
  return /* @__PURE__ */ import_react33.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleCode",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-columns-button.tsx
var import_react34 = __toESM(require("react"), 1);
var import_react_core23 = require("@remirror/react-core");
var ToggleColumnsButton = (_a2) => {
  var _b = _a2, { attrs = {} } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleColumns } = (0, import_react_core23.useCommands)();
  const handleSelect = (0, import_react34.useCallback)(() => {
    if (toggleColumns.enabled(attrs)) {
      toggleColumns(attrs);
    }
  }, [toggleColumns, attrs]);
  const active = (0, import_react_core23.useActive)().columns(attrs);
  const enabled = toggleColumns.enabled(attrs);
  return /* @__PURE__ */ import_react34.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, rest), {
      commandName: "toggleColumns",
      active,
      enabled,
      attrs,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-heading-button.tsx
var import_react35 = __toESM(require("react"), 1);
var import_react_core24 = require("@remirror/react-core");
var ToggleHeadingButton = (_a2) => {
  var _b = _a2, { attrs } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleHeading } = (0, import_react_core24.useCommands)();
  const handleSelect = (0, import_react35.useCallback)(() => {
    if (toggleHeading.enabled(attrs)) {
      toggleHeading(attrs);
    }
  }, [toggleHeading, attrs]);
  const active = (0, import_react_core24.useActive)().heading(attrs);
  const enabled = toggleHeading.enabled(attrs);
  return /* @__PURE__ */ import_react35.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, rest), {
      commandName: "toggleHeading",
      active,
      enabled,
      attrs,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-italic-button.tsx
var import_react36 = __toESM(require("react"), 1);
var import_react_core25 = require("@remirror/react-core");
var ToggleItalicButton = (props) => {
  const { toggleItalic } = (0, import_react_core25.useCommands)();
  const handleSelect = (0, import_react36.useCallback)(() => {
    if (toggleItalic.enabled()) {
      toggleItalic();
    }
  }, [toggleItalic]);
  const active = (0, import_react_core25.useActive)().italic();
  const enabled = toggleItalic.enabled();
  return /* @__PURE__ */ import_react36.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleItalic",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-ordered-list-button.tsx
var import_react37 = __toESM(require("react"), 1);
var import_react_core26 = require("@remirror/react-core");
var ToggleOrderedListButton = (props) => {
  const { toggleOrderedList } = (0, import_react_core26.useCommands)();
  const handleSelect = (0, import_react37.useCallback)(() => {
    if (toggleOrderedList.enabled()) {
      toggleOrderedList();
    }
  }, [toggleOrderedList]);
  const active = (0, import_react_core26.useActive)().orderedList();
  const enabled = toggleOrderedList.enabled();
  return /* @__PURE__ */ import_react37.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleOrderedList",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-strike-button.tsx
var import_react38 = __toESM(require("react"), 1);
var import_react_core27 = require("@remirror/react-core");
var ToggleStrikeButton = (props) => {
  const { toggleStrike } = (0, import_react_core27.useCommands)();
  const handleSelect = (0, import_react38.useCallback)(() => {
    if (toggleStrike.enabled()) {
      toggleStrike();
    }
  }, [toggleStrike]);
  const active = (0, import_react_core27.useActive)().strike();
  const enabled = toggleStrike.enabled();
  return /* @__PURE__ */ import_react38.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleStrike",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-subscript-button.tsx
var import_react39 = __toESM(require("react"), 1);
var import_react_core28 = require("@remirror/react-core");
var ToggleSubscriptButton = (props) => {
  const { toggleSubscript } = (0, import_react_core28.useCommands)();
  const handleSelect = (0, import_react39.useCallback)(() => {
    if (toggleSubscript.enabled()) {
      toggleSubscript();
    }
  }, [toggleSubscript]);
  const active = (0, import_react_core28.useActive)().sub();
  const enabled = toggleSubscript.enabled();
  return /* @__PURE__ */ import_react39.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleSubscript",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-superscript-button.tsx
var import_react40 = __toESM(require("react"), 1);
var import_react_core29 = require("@remirror/react-core");
var ToggleSuperscriptButton = (props) => {
  const { toggleSuperscript } = (0, import_react_core29.useCommands)();
  const handleSelect = (0, import_react40.useCallback)(() => {
    if (toggleSuperscript.enabled()) {
      toggleSuperscript();
    }
  }, [toggleSuperscript]);
  const active = (0, import_react_core29.useActive)().sup();
  const enabled = toggleSuperscript.enabled();
  return /* @__PURE__ */ import_react40.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleSuperscript",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-task-list-button.tsx
var import_react41 = __toESM(require("react"), 1);
var import_react_core30 = require("@remirror/react-core");
var ToggleTaskListButton = (props) => {
  const { toggleTaskList } = (0, import_react_core30.useCommands)();
  const handleSelect = (0, import_react41.useCallback)(() => {
    if (toggleTaskList.enabled()) {
      toggleTaskList();
    }
  }, [toggleTaskList]);
  const active = (0, import_react_core30.useActive)().taskList();
  const enabled = toggleTaskList.enabled();
  return /* @__PURE__ */ import_react41.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleTaskList",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-underline-button.tsx
var import_react42 = __toESM(require("react"), 1);
var import_react_core31 = require("@remirror/react-core");
var ToggleUnderlineButton = (props) => {
  const { toggleUnderline } = (0, import_react_core31.useCommands)();
  const handleSelect = (0, import_react42.useCallback)(() => {
    if (toggleUnderline.enabled()) {
      toggleUnderline();
    }
  }, [toggleUnderline]);
  const active = (0, import_react_core31.useActive)().underline();
  const enabled = toggleUnderline.enabled();
  return /* @__PURE__ */ import_react42.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleUnderline",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/toggle-whitespace-button.tsx
var import_react43 = __toESM(require("react"), 1);
var import_react_core32 = require("@remirror/react-core");
var ToggleWhitespaceButton = (props) => {
  const { toggleWhitespace } = (0, import_react_core32.useCommands)();
  const { isWhitespaceVisible } = (0, import_react_core32.useHelpers)(true);
  const handleSelect = (0, import_react43.useCallback)(() => {
    if (toggleWhitespace.enabled()) {
      toggleWhitespace();
    }
  }, [toggleWhitespace]);
  const active = isWhitespaceVisible();
  const enabled = toggleWhitespace.enabled();
  return /* @__PURE__ */ import_react43.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "toggleWhitespace",
      active,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/undo-button.tsx
var import_react44 = __toESM(require("react"), 1);
var import_react_core33 = require("@remirror/react-core");
var UndoButton = (props) => {
  const { undo } = (0, import_react_core33.useCommands)();
  const { undoDepth } = (0, import_react_core33.useHelpers)(true);
  const handleSelect = (0, import_react44.useCallback)(() => {
    if (undo.enabled()) {
      undo();
    }
  }, [undo]);
  const enabled = undoDepth() > 0;
  return /* @__PURE__ */ import_react44.default.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "undo",
      active: false,
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/button-groups/command-button-group.tsx
var import_material11 = require("@mui/material");
var import_react45 = __toESM(require("react"), 1);
var CommandButtonGroup = (props) => /* @__PURE__ */ import_react45.default.createElement(
  import_material11.Box,
  __spreadValues({
    sx: {
      display: "flex",
      alignItems: "center",
      width: "fit-content",
      bgcolor: "background.paper",
      color: "text.secondary"
    }
  }, props)
);

// src/button-groups/baseline-button-group.tsx
var BaselineButtonGroup = ({ children }) => /* @__PURE__ */ import_react46.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react46.default.createElement(ToggleSubscriptButton, null), /* @__PURE__ */ import_react46.default.createElement(ToggleSuperscriptButton, null), children);

// src/button-groups/basic-formatting-button-group.tsx
var import_react47 = __toESM(require("react"), 1);
var BasicFormattingButtonGroup = ({ children }) => /* @__PURE__ */ import_react47.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react47.default.createElement(ToggleBoldButton, null), /* @__PURE__ */ import_react47.default.createElement(ToggleItalicButton, null), /* @__PURE__ */ import_react47.default.createElement(ToggleUnderlineButton, null), children);

// src/button-groups/callout-type-button-group.tsx
var import_react48 = __toESM(require("react"), 1);
var INFO_CALLOUT = { type: "info" };
var WARNING_CALLOUT = { type: "warning" };
var ERROR_CALLOUT = { type: "error" };
var SUCCESS_CALLOUT = { type: "success" };
var CalloutTypeButtonGroup = ({ children }) => /* @__PURE__ */ import_react48.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react48.default.createElement(ToggleCalloutButton, { attrs: INFO_CALLOUT }), /* @__PURE__ */ import_react48.default.createElement(ToggleCalloutButton, { attrs: WARNING_CALLOUT }), /* @__PURE__ */ import_react48.default.createElement(ToggleCalloutButton, { attrs: ERROR_CALLOUT }), /* @__PURE__ */ import_react48.default.createElement(ToggleCalloutButton, { attrs: SUCCESS_CALLOUT }), children);

// src/button-groups/data-transfer-button-group.tsx
var import_react49 = __toESM(require("react"), 1);
var DataTransferButtonGroup = ({ children }) => /* @__PURE__ */ import_react49.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react49.default.createElement(CopyButton, null), /* @__PURE__ */ import_react49.default.createElement(CutButton, null), /* @__PURE__ */ import_react49.default.createElement(PasteButton, null), children);

// src/button-groups/formatting-button-group.tsx
var import_react50 = __toESM(require("react"), 1);
var FormattingButtonGroup = ({ children }) => /* @__PURE__ */ import_react50.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react50.default.createElement(ToggleBoldButton, null), /* @__PURE__ */ import_react50.default.createElement(ToggleItalicButton, null), /* @__PURE__ */ import_react50.default.createElement(ToggleUnderlineButton, null), /* @__PURE__ */ import_react50.default.createElement(ToggleStrikeButton, null), /* @__PURE__ */ import_react50.default.createElement(ToggleCodeButton, null), children);

// src/button-groups/heading-level-button-group.tsx
var import_react57 = __toESM(require("react"), 1);

// src/menus/code-block-tools/code-block-format-button.tsx
var import_material12 = require("@mui/material");
var import_react51 = __toESM(require("react"), 1);
var import_extension_code_block = require("@remirror/extension-code-block");
var import_react_core34 = require("@remirror/react-core");
var import_react_hooks2 = require("@remirror/react-hooks");
var defaultButtonText = "format";
var CodeBlockFormatButton = ({
  text = defaultButtonText,
  className = "",
  onClick
}) => {
  const { ref, data, active } = (0, import_react_hooks2.usePositioner)(import_extension_code_block.codeBlockPositioner, []);
  const { focus, formatCodeBlock } = (0, import_react_core34.useCommands)();
  const nodeLanguage = active ? data.node.attrs.language : void 0;
  const handleClick = (e) => {
    onClick == null ? void 0 : onClick(e);
    if (!nodeLanguage) {
      return;
    }
    formatCodeBlock();
    focus();
  };
  if (!active) {
    return null;
  }
  return /* @__PURE__ */ import_react51.default.createElement(import_material12.FormControl, { ref, margin: "none", size: "small", sx: { m: 1 }, className }, /* @__PURE__ */ import_react51.default.createElement(
    import_material12.Button,
    {
      type: "button",
      color: "primary",
      sx: {
        bgcolor: "background.paper",
        ":hover": {
          bgcolor: "background.paper"
        },
        textTransform: "none",
        fontSize: "1rem",
        color: "currentColor"
      },
      onClick: handleClick
    },
    text || defaultButtonText
  ));
};

// src/menus/code-block-tools/code-block-language-select.tsx
var import_material13 = require("@mui/material");
var import_react52 = __toESM(require("react"), 1);
var import_core5 = require("@remirror/core");
var import_extension_code_block2 = require("@remirror/extension-code-block");
var import_react_core35 = require("@remirror/react-core");
var import_react_hooks3 = require("@remirror/react-hooks");
var CodeBlockLanguageSelect = ({
  languages = [],
  className,
  onLanguageChange,
  onPointerDownSelect,
  onSelectChange
}) => {
  const { ref, element, data, active } = (0, import_react_hooks3.usePositioner)(import_extension_code_block2.codeBlockPositioner, []);
  const { focus, updateCodeBlock } = (0, import_react_core35.useCommands)();
  const { defaultLanguage, supportedLanguages } = (0, import_react_core35.useExtension)(import_extension_code_block2.CodeBlockExtension).options;
  const currentNodeLanguage = active ? data.node.attrs.language : void 0;
  const languageAliases = (0, import_react52.useMemo)(() => {
    const result = /* @__PURE__ */ new Map();
    const languagesDisplayNames = new Set(languages.map((lang) => lang.displayName));
    for (const { displayName, aliases } of supportedLanguages) {
      for (const alias of aliases) {
        if (!languagesDisplayNames.has(alias)) {
          result.set(alias, displayName);
        }
      }
    }
    return result;
  }, [supportedLanguages, languages]);
  const languageOptions = (0, import_react52.useMemo)(() => {
    const allLanguages = [
      ...languages,
      {
        displayName: defaultLanguage
      },
      ...supportedLanguages
    ];
    return (0, import_core5.uniqueBy)(allLanguages, (lang) => lang.displayName).sort(
      (a, b) => a.displayName.localeCompare(b.displayName)
    );
  }, [languages, defaultLanguage, supportedLanguages]);
  const currentDisplayLanguage = (0, import_react52.useMemo)(() => {
    if (!currentNodeLanguage) {
      return defaultLanguage;
    }
    const alias = languageAliases.get(currentNodeLanguage);
    if (alias) {
      return alias;
    }
    if (languageOptions.some((lang) => lang.displayName === currentNodeLanguage)) {
      return currentNodeLanguage;
    }
    return defaultLanguage;
  }, [languageAliases, languageOptions, defaultLanguage, currentNodeLanguage]);
  (0, import_react52.useEffect)(() => {
    onLanguageChange == null ? void 0 : onLanguageChange(currentDisplayLanguage, element);
  }, [onLanguageChange, currentDisplayLanguage, element]);
  const handleChange = (e) => {
    if (onSelectChange == null ? void 0 : onSelectChange(e)) {
      return;
    }
    updateCodeBlock({
      language: e.target.value
    });
  };
  if (!active) {
    return null;
  }
  return /* @__PURE__ */ import_react52.default.createElement(import_material13.FormControl, { ref, margin: "none", size: "small", sx: { m: 1 }, className }, /* @__PURE__ */ import_react52.default.createElement(
    import_material13.Select,
    {
      sx: {
        bgcolor: "background.paper"
      },
      onBlur: () => focus(),
      onChange: handleChange,
      onPointerDown: onPointerDownSelect,
      value: currentDisplayLanguage,
      autoWidth: true
    },
    languageOptions.map(({ displayName, value }) => /* @__PURE__ */ import_react52.default.createElement(import_material13.MenuItem, { key: displayName, value: value != null ? value : displayName }, displayName))
  ));
};

// src/menus/code-block-tools/code-block-tools.tsx
var import_react53 = __toESM(require("react"), 1);
var import_core6 = require("@remirror/core");
var import_extension_code_block3 = require("@remirror/extension-code-block");
var import_react_components7 = require("@remirror/react-components");
var import_react_hooks4 = require("@remirror/react-hooks");
var import_theme2 = require("@remirror/theme");
var CodeBlockTools = ({
  position = "right",
  offset = { x: 0, y: 0 },
  className = "",
  children
}) => {
  const positioner = (0, import_react_hooks4.usePositioner)(import_extension_code_block3.codeBlockPositioner, []);
  const { ref, x, y, width, active } = positioner;
  const { x: offsetX, y: offsetY } = offset;
  const styles = (0, import_react53.useMemo)(() => {
    if (!active) {
      return { display: "none" };
    }
    return {
      "--x": position === "right" ? "".concat(x + width + offsetX, "px") : "".concat(x + offsetX, "px"),
      "--y": "".concat(y + offsetY, "px"),
      "--translate-x": position === "right" ? "-100%" : "0",
      display: "flex"
    };
  }, [active, x, y, width, position, offsetX, offsetY]);
  return /* @__PURE__ */ import_react53.default.createElement(UiThemeProvider, null, /* @__PURE__ */ import_react53.default.createElement(import_react_components7.PositionerPortal, null, /* @__PURE__ */ import_react53.default.createElement(
    "div",
    {
      ref,
      className: (0, import_core6.cx)(import_theme2.ExtensionCodeBlockTheme.CODE_BLOCK_TOOLS_POSITIONER, className),
      style: styles
    },
    children
  )));
};

// src/menus/command-menu-item.tsx
var import_material14 = require("@mui/material");
var import_react54 = __toESM(require("react"), 1);
var import_core7 = require("@remirror/core");
var import_react_components8 = require("@remirror/react-components");
var MenuItemIcon = ({ icon }) => {
  if (icon) {
    return /* @__PURE__ */ import_react54.default.createElement(import_material14.ListItemIcon, null, (0, import_core7.isString)(icon) ? /* @__PURE__ */ import_react54.default.createElement(import_react_components8.Icon, { name: icon, size: "1rem" }) : /* @__PURE__ */ import_react54.default.createElement(import_react54.default.Fragment, null, icon));
  }
  return null;
};
var CommandMenuItem = (_a2) => {
  var _b = _a2, {
    commandName,
    active = false,
    enabled,
    attrs,
    onSelect,
    onClick,
    icon,
    displayShortcut = true,
    label,
    description,
    displayDescription = true
  } = _b, rest = __objRest(_b, [
    "commandName",
    "active",
    "enabled",
    "attrs",
    "onSelect",
    "onClick",
    "icon",
    "displayShortcut",
    "label",
    "description",
    "displayDescription"
  ]);
  var _a3;
  const handleClick = (0, import_react54.useCallback)(
    (e) => {
      onSelect();
      onClick == null ? void 0 : onClick(e);
    },
    [onSelect, onClick]
  );
  const handleMouseDown = (0, import_react54.useCallback)((e) => {
    e.preventDefault();
  }, []);
  const commandOptions = useCommandOptionValues({ commandName, active, enabled, attrs });
  let fallbackIcon = null;
  if (commandOptions.icon) {
    fallbackIcon = (0, import_core7.isString)(commandOptions.icon) ? commandOptions.icon : commandOptions.icon.name;
  }
  const primary = (_a3 = label != null ? label : commandOptions.label) != null ? _a3 : "";
  const secondary = displayDescription && (description != null ? description : commandOptions.description);
  return /* @__PURE__ */ import_react54.default.createElement(
    import_material14.MenuItem,
    __spreadProps(__spreadValues({
      selected: active,
      disabled: !enabled,
      onMouseDown: handleMouseDown
    }, rest), {
      onClick: handleClick
    }),
    icon !== null && /* @__PURE__ */ import_react54.default.createElement(MenuItemIcon, { icon: icon != null ? icon : fallbackIcon }),
    /* @__PURE__ */ import_react54.default.createElement(import_material14.ListItemText, { primary, secondary }),
    displayShortcut && commandOptions.shortcut && /* @__PURE__ */ import_react54.default.createElement(import_material14.Typography, { variant: "body2", color: "text.secondary", sx: { ml: 2 } }, commandOptions.shortcut)
  );
};

// src/menus/toggle-callout-menu-item.tsx
var import_react55 = __toESM(require("react"), 1);
var import_react_core36 = require("@remirror/react-core");
var ToggleCalloutMenuItem = (_a2) => {
  var _b = _a2, { attrs } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleCallout } = (0, import_react_core36.useCommands)();
  const handleSelect = (0, import_react55.useCallback)(() => {
    if (toggleCallout.enabled(attrs)) {
      toggleCallout(attrs);
    }
  }, [toggleCallout, attrs]);
  const active = (0, import_react_core36.useActive)().callout(attrs);
  const enabled = toggleCallout.enabled(attrs);
  return /* @__PURE__ */ import_react55.default.createElement(
    CommandMenuItem,
    __spreadProps(__spreadValues({}, rest), {
      commandName: "toggleCallout",
      active,
      enabled,
      attrs,
      onSelect: handleSelect
    })
  );
};

// src/menus/toggle-heading-menu-item.tsx
var import_react56 = __toESM(require("react"), 1);
var import_react_core37 = require("@remirror/react-core");
var ToggleHeadingMenuItem = (_a2) => {
  var _b = _a2, { attrs } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleHeading } = (0, import_react_core37.useCommands)();
  const handleSelect = (0, import_react56.useCallback)(() => {
    if (toggleHeading.enabled(attrs)) {
      toggleHeading(attrs);
    }
  }, [toggleHeading, attrs]);
  const active = (0, import_react_core37.useActive)().heading(attrs);
  const enabled = toggleHeading.enabled(attrs);
  return /* @__PURE__ */ import_react56.default.createElement(
    CommandMenuItem,
    __spreadProps(__spreadValues({}, rest), {
      commandName: "toggleHeading",
      active,
      enabled,
      attrs,
      onSelect: handleSelect
    })
  );
};

// src/button-groups/heading-level-button-group.tsx
var LEVEL_1 = { level: 1 };
var LEVEL_2 = { level: 2 };
var LEVEL_3 = { level: 3 };
var LEVEL_4 = { level: 4 };
var LEVEL_5 = { level: 5 };
var LEVEL_6 = { level: 6 };
var HeadingLevelButtonGroup = ({
  showAll = false,
  children
}) => /* @__PURE__ */ import_react57.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react57.default.createElement(ToggleHeadingButton, { attrs: LEVEL_1 }), /* @__PURE__ */ import_react57.default.createElement(ToggleHeadingButton, { attrs: LEVEL_2 }), !showAll ? /* @__PURE__ */ import_react57.default.createElement(ToggleHeadingButton, { attrs: LEVEL_3 }) : /* @__PURE__ */ import_react57.default.createElement(DropdownButton, { "aria-label": "More heading options" }, /* @__PURE__ */ import_react57.default.createElement(ToggleHeadingMenuItem, { attrs: LEVEL_3 }), /* @__PURE__ */ import_react57.default.createElement(ToggleHeadingMenuItem, { attrs: LEVEL_4 }), /* @__PURE__ */ import_react57.default.createElement(ToggleHeadingMenuItem, { attrs: LEVEL_5 }), /* @__PURE__ */ import_react57.default.createElement(ToggleHeadingMenuItem, { attrs: LEVEL_6 })), children);

// src/button-groups/history-button-group.tsx
var import_react58 = __toESM(require("react"), 1);
var HistoryButtonGroup = ({ children }) => /* @__PURE__ */ import_react58.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react58.default.createElement(UndoButton, null), /* @__PURE__ */ import_react58.default.createElement(RedoButton, null), children);

// src/button-groups/indentation-button-group.tsx
var import_react59 = __toESM(require("react"), 1);
var IndentationButtonGroup = ({ children }) => /* @__PURE__ */ import_react59.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react59.default.createElement(DecreaseIndentButton, null), /* @__PURE__ */ import_react59.default.createElement(IncreaseIndentButton, null), children);

// src/button-groups/list-button-group.tsx
var import_react61 = __toESM(require("react"), 1);
var import_extension_list = require("@remirror/extension-list");

// src/if-extension-present.tsx
var import_react60 = __toESM(require("react"), 1);
var import_react_core38 = require("@remirror/react-core");
var IfExtensionPresent = ({ children, extension }) => {
  const hasExtension = (0, import_react_core38.useHasExtension)(extension);
  return hasExtension ? /* @__PURE__ */ import_react60.default.createElement(import_react60.default.Fragment, null, children) : null;
};

// src/button-groups/list-button-group.tsx
var ListButtonGroup = ({ children }) => /* @__PURE__ */ import_react61.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react61.default.createElement(ToggleBulletListButton, null), /* @__PURE__ */ import_react61.default.createElement(ToggleOrderedListButton, null), /* @__PURE__ */ import_react61.default.createElement(IfExtensionPresent, { extension: import_extension_list.TaskListExtension }, /* @__PURE__ */ import_react61.default.createElement(ToggleTaskListButton, null)), children);

// src/button-groups/text-alignment-button-group.tsx
var import_react62 = __toESM(require("react"), 1);
var TextAlignmentButtonGroup = ({
  showAll = false,
  children
}) => /* @__PURE__ */ import_react62.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react62.default.createElement(LeftAlignButton, null), /* @__PURE__ */ import_react62.default.createElement(CenterAlignButton, null), /* @__PURE__ */ import_react62.default.createElement(RightAlignButton, null), showAll && /* @__PURE__ */ import_react62.default.createElement(JustifyAlignButton, null), children);

// src/toolbar/base-toolbar.tsx
var import_material15 = require("@mui/material");
var import_react63 = __toESM(require("react"), 1);
var Toolbar = (props) => /* @__PURE__ */ import_react63.default.createElement(UiThemeProvider, null, /* @__PURE__ */ import_react63.default.createElement(
  import_material15.Stack,
  __spreadValues({
    direction: "row",
    spacing: 1,
    sx: { backgroundColor: "background.paper", overflowX: "auto" }
  }, props)
));

// src/toolbar/floating-toolbar.tsx
var import_material16 = require("@mui/material");
var import_react64 = __toESM(require("react"), 1);
var import_extension_positioner = require("@remirror/extension-positioner");
var import_react_hooks5 = require("@remirror/react-hooks");
var DEFAULT_MODIFIERS = [
  {
    name: "offset",
    options: {
      offset: [0, 8]
    }
  }
];
var FloatingToolbar = (_a2) => {
  var _b = _a2, {
    positioner = "selection",
    children
  } = _b, rest = __objRest(_b, [
    "positioner",
    "children"
  ]);
  const { ref, x, y, width, height, active } = (0, import_react_hooks5.usePositioner)(
    () => (0, import_extension_positioner.getPositioner)(positioner),
    [positioner]
  );
  const [anchorEl, setAnchorEl] = (0, import_react64.useState)(null);
  const inlineStyle = (0, import_react64.useMemo)(
    () => ({
      position: "absolute",
      pointerEvents: "none",
      left: x,
      top: y,
      width,
      height
    }),
    [x, y, width, height]
  );
  const combinedSelectionRefs = (0, import_react64.useCallback)(
    (elem) => {
      setAnchorEl(elem);
      ref == null ? void 0 : ref(elem);
    },
    [ref]
  );
  return /* @__PURE__ */ import_react64.default.createElement(import_react64.default.Fragment, null, /* @__PURE__ */ import_react64.default.createElement("div", { ref: combinedSelectionRefs, style: inlineStyle }), /* @__PURE__ */ import_react64.default.createElement(
    import_material16.Popper,
    __spreadProps(__spreadValues({
      placement: "top",
      modifiers: DEFAULT_MODIFIERS
    }, rest), {
      open: active,
      anchorEl
    }),
    /* @__PURE__ */ import_react64.default.createElement(Toolbar, null, children ? /* @__PURE__ */ import_react64.default.createElement(import_react64.default.Fragment, null, children) : /* @__PURE__ */ import_react64.default.createElement(FormattingButtonGroup, null))
  ));
};

// src/toolbar/markdown-toolbar.tsx
var import_react66 = __toESM(require("react"), 1);

// src/toolbar/vertical-divider.tsx
var import_material17 = require("@mui/material");
var import_react65 = __toESM(require("react"), 1);
var VerticalDivider = (props) => /* @__PURE__ */ import_react65.default.createElement(import_material17.Divider, __spreadProps(__spreadValues({ flexItem: true, sx: { mx: 0.5 } }, props), { orientation: "vertical" }));

// src/toolbar/markdown-toolbar.tsx
var MarkdownToolbar = () => /* @__PURE__ */ import_react66.default.createElement(Toolbar, null, /* @__PURE__ */ import_react66.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react66.default.createElement(ToggleBoldButton, null), /* @__PURE__ */ import_react66.default.createElement(ToggleItalicButton, null), /* @__PURE__ */ import_react66.default.createElement(ToggleStrikeButton, null), /* @__PURE__ */ import_react66.default.createElement(ToggleCodeButton, null)), /* @__PURE__ */ import_react66.default.createElement(VerticalDivider, null), /* @__PURE__ */ import_react66.default.createElement(HeadingLevelButtonGroup, { showAll: true }), /* @__PURE__ */ import_react66.default.createElement(VerticalDivider, null), /* @__PURE__ */ import_react66.default.createElement(CommandButtonGroup, null, /* @__PURE__ */ import_react66.default.createElement(ToggleBlockquoteButton, null), /* @__PURE__ */ import_react66.default.createElement(ToggleCodeBlockButton, null)), /* @__PURE__ */ import_react66.default.createElement(VerticalDivider, null), /* @__PURE__ */ import_react66.default.createElement(HistoryButtonGroup, null));

// src/toolbar/wysiwyg-toolbar.tsx
var import_react67 = __toESM(require("react"), 1);
var WysiwygToolbar = () => /* @__PURE__ */ import_react67.default.createElement(Toolbar, null, /* @__PURE__ */ import_react67.default.createElement(HistoryButtonGroup, null), /* @__PURE__ */ import_react67.default.createElement(VerticalDivider, null), /* @__PURE__ */ import_react67.default.createElement(DataTransferButtonGroup, null), /* @__PURE__ */ import_react67.default.createElement(VerticalDivider, null), /* @__PURE__ */ import_react67.default.createElement(HeadingLevelButtonGroup, null), /* @__PURE__ */ import_react67.default.createElement(VerticalDivider, null), /* @__PURE__ */ import_react67.default.createElement(BasicFormattingButtonGroup, null), /* @__PURE__ */ import_react67.default.createElement(VerticalDivider, null), /* @__PURE__ */ import_react67.default.createElement(ListButtonGroup, null, /* @__PURE__ */ import_react67.default.createElement(CreateTableButton, null)));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaselineButtonGroup,
  BasicFormattingButtonGroup,
  CalloutTypeButtonGroup,
  CenterAlignButton,
  CodeBlockFormatButton,
  CodeBlockLanguageSelect,
  CodeBlockTools,
  CommandButton,
  CommandButtonGroup,
  CommandMenuItem,
  CopyButton,
  CreateTableButton,
  CutButton,
  DataTransferButtonGroup,
  DecreaseFontSizeButton,
  DecreaseIndentButton,
  DropdownButton,
  FindButton,
  FindReplaceComponent,
  FloatingToolbar,
  FormattingButtonGroup,
  HeadingLevelButtonGroup,
  HistoryButtonGroup,
  IncreaseFontSizeButton,
  IncreaseIndentButton,
  IndentationButtonGroup,
  InsertHorizontalRuleButton,
  JustifyAlignButton,
  LeftAlignButton,
  ListButtonGroup,
  MarkdownToolbar,
  PasteButton,
  RedoButton,
  RightAlignButton,
  TextAlignmentButtonGroup,
  ToggleBlockquoteButton,
  ToggleBoldButton,
  ToggleBulletListButton,
  ToggleCalloutButton,
  ToggleCalloutMenuItem,
  ToggleCodeBlockButton,
  ToggleCodeButton,
  ToggleColumnsButton,
  ToggleHeadingButton,
  ToggleHeadingMenuItem,
  ToggleItalicButton,
  ToggleOrderedListButton,
  ToggleStrikeButton,
  ToggleSubscriptButton,
  ToggleSuperscriptButton,
  ToggleTaskListButton,
  ToggleUnderlineButton,
  ToggleWhitespaceButton,
  Toolbar,
  UndoButton,
  VerticalDivider,
  WysiwygToolbar
});
