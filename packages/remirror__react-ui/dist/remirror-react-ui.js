var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));

// src/button-groups/baseline-button-group.tsx
import React44 from "react";

// src/buttons/center-align-button.tsx
import React3, { useCallback as useCallback2 } from "react";
import { useCommands, useCurrentSelection } from "@remirror/react-core";

// src/buttons/command-button.tsx
import { Box, ToggleButton, Tooltip } from "@mui/material";
import React2, { useCallback } from "react";
import { isString as isString3 } from "@remirror/core";

// src/use-command-option-values.ts
import { useMemo } from "react";
import { useHelpers, useI18n } from "@remirror/react-core";

// src/react-component-utils.ts
import {
  capitalize,
  getShortcutSymbols,
  includes,
  isArray,
  isEqual,
  isFunction,
  isString
} from "@remirror/core";
function getCommandOptionValue(value, commandProps) {
  return isFunction(value) ? value(commandProps) : value;
}
function isStringArray(array) {
  return isString(array[0]);
}
function getUiShortcutString(uiShortcut, attrs) {
  var _a2, _b, _c, _d;
  if (isString(uiShortcut)) {
    return uiShortcut;
  }
  if (!isArray(uiShortcut)) {
    return uiShortcut.shortcut;
  }
  if (isStringArray(uiShortcut)) {
    return (_a2 = uiShortcut[0]) != null ? _a2 : "";
  }
  return (_d = (_c = (_b = uiShortcut.find((shortcut) => isEqual(shortcut.attrs, attrs))) != null ? _b : uiShortcut[0]) == null ? void 0 : _c.shortcut) != null ? _d : "";
}
var CASINGS = {
  title: (value) => capitalize(value),
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
  const symbols = getShortcutSymbols(shortcut);
  const stringSymbols = [];
  const transform = CASINGS[casing];
  for (const sym of symbols) {
    if (sym.type === "char") {
      stringSymbols.push(transform(sym.key));
      continue;
    }
    if (sym.type === "named") {
      const value2 = namedAsSymbol === true || isArray(namedAsSymbol) && includes(namedAsSymbol, sym.key) ? (_a2 = sym.symbol) != null ? _a2 : t(sym.i18n) : t(sym.i18n);
      stringSymbols.push(transform(value2));
      continue;
    }
    const value = modifierAsSymbol === true || isArray(modifierAsSymbol) && includes(modifierAsSymbol, sym.key) ? sym.symbol : t(sym.i18n);
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
  const t = useI18n();
  const { getCommandOptions } = useHelpers();
  const options = getCommandOptions(commandName);
  const { description, label, icon, shortcut } = options || {};
  const commandProps = useMemo(
    () => ({ active, attrs, enabled, t }),
    [active, attrs, enabled, t]
  );
  const shortcutString = useMemo(() => {
    if (!shortcut) {
      return;
    }
    return getShortcutString(getUiShortcutString(shortcut, attrs != null ? attrs : {}), { t, separator: "" });
  }, [shortcut, attrs, t]);
  return useMemo(
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
import { Badge } from "@mui/material";
import React from "react";
import { isPlainObject, isString as isString2 } from "@remirror/core";
import { Icon } from "@remirror/react-components";
var isCommandUiIcon = (val) => {
  if (!isPlainObject(val)) {
    return false;
  }
  return !!val.name;
};
var CommandButtonIcon = ({ icon }) => {
  if (isString2(icon)) {
    return /* @__PURE__ */ React.createElement(Icon, { name: icon, size: "1rem" });
  }
  return icon;
};
var CommandButtonBadge = ({ icon, children }) => {
  if (!isCommandUiIcon(icon)) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  }
  const { sub, sup } = icon;
  const value = sub != null ? sub : sup;
  const isBottom = sub !== void 0;
  if (value === void 0) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  }
  return /* @__PURE__ */ React.createElement(
    Badge,
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
  const handleChange = useCallback(
    (e, value) => {
      onSelect();
      onChange == null ? void 0 : onChange(e, value);
    },
    [onSelect, onChange]
  );
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
  }, []);
  const commandOptions = useCommandOptionValues({ commandName, active, enabled, attrs });
  let fallbackIcon = null;
  if (commandOptions.icon) {
    fallbackIcon = isString3(commandOptions.icon) ? commandOptions.icon : commandOptions.icon.name;
  }
  const labelText = (_a3 = ariaLabel != null ? ariaLabel : commandOptions.label) != null ? _a3 : "";
  const tooltipText = label != null ? label : labelText;
  const shortcutText = displayShortcut && commandOptions.shortcut ? " (".concat(commandOptions.shortcut, ")") : "";
  return /* @__PURE__ */ React2.createElement(Tooltip, { title: "".concat(tooltipText).concat(shortcutText) }, /* @__PURE__ */ React2.createElement(Box, { component: "span", sx: { "&:not(:first-of-type)": { marginLeft: "-1px" } } }, /* @__PURE__ */ React2.createElement(
    ToggleButton,
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
    /* @__PURE__ */ React2.createElement(CommandButtonBadge, { icon: commandOptions.icon }, /* @__PURE__ */ React2.createElement(CommandButtonIcon, { icon: icon != null ? icon : fallbackIcon }))
  )));
};

// src/buttons/center-align-button.tsx
var CenterAlignButton = (props) => {
  var _a2;
  const { centerAlign } = useCommands();
  useCurrentSelection();
  const handleSelect = useCallback2(() => {
    if (centerAlign.enabled()) {
      centerAlign();
    }
  }, [centerAlign]);
  const active = (_a2 = centerAlign.active) == null ? void 0 : _a2.call(centerAlign);
  const enabled = centerAlign.enabled();
  return /* @__PURE__ */ React3.createElement(
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
import React4, { useCallback as useCallback3 } from "react";
import { useCommands as useCommands2, useCurrentSelection as useCurrentSelection2 } from "@remirror/react-core";
var CopyButton = (props) => {
  const { copy } = useCommands2();
  useCurrentSelection2();
  const handleSelect = useCallback3(() => {
    if (copy.enabled()) {
      copy();
    }
  }, [copy]);
  const enabled = copy.enabled();
  return /* @__PURE__ */ React4.createElement(
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
import React5, { useCallback as useCallback4 } from "react";
import { useActive, useCommands as useCommands3 } from "@remirror/react-core";
var CreateTableButton = (props) => {
  const { createTable } = useCommands3();
  const handleSelect = useCallback4(() => {
    if (createTable.enabled()) {
      createTable();
    }
  }, [createTable]);
  const active = useActive().table();
  const enabled = createTable.enabled();
  return /* @__PURE__ */ React5.createElement(
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
import React6, { useCallback as useCallback5 } from "react";
import { useCommands as useCommands4, useCurrentSelection as useCurrentSelection3 } from "@remirror/react-core";
var CutButton = (props) => {
  const { cut } = useCommands4();
  useCurrentSelection3();
  const handleSelect = useCallback5(() => {
    if (cut.enabled()) {
      cut();
    }
  }, [cut]);
  const enabled = cut.enabled();
  return /* @__PURE__ */ React6.createElement(
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
import React7, { useCallback as useCallback6 } from "react";
import { useCommands as useCommands5 } from "@remirror/react-core";
var DecreaseFontSizeButton = (props) => {
  const { decreaseFontSize } = useCommands5();
  const handleSelect = useCallback6(() => {
    if (decreaseFontSize.enabled()) {
      decreaseFontSize();
    }
  }, [decreaseFontSize]);
  const enabled = decreaseFontSize.enabled();
  return /* @__PURE__ */ React7.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "decreaseFontSize",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/decrease-indent-button.tsx
import React8, { useCallback as useCallback7 } from "react";
import { useCommands as useCommands6 } from "@remirror/react-core";
var DecreaseIndentButton = (props) => {
  const { decreaseIndent } = useCommands6();
  const handleSelect = useCallback7(() => {
    if (decreaseIndent.enabled()) {
      decreaseIndent();
    }
  }, [decreaseIndent]);
  const enabled = decreaseIndent.enabled();
  return /* @__PURE__ */ React8.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "decreaseIndent",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/dropdown-button.tsx
import { IconButton, Menu, Tooltip as Tooltip2 } from "@mui/material";
import React9, { useCallback as useCallback8, useRef, useState } from "react";
import { isString as isString4, uniqueId } from "@remirror/core";
import { Icon as Icon2 } from "@remirror/react-components";
var ButtonIcon = ({ icon }) => {
  if (isString4(icon)) {
    return /* @__PURE__ */ React9.createElement(Icon2, { name: icon, size: "1rem" });
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
  const id = useRef(uniqueId());
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMouseDown = useCallback8((e) => {
    e.preventDefault();
  }, []);
  const handleClick = useCallback8((event) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = useCallback8(
    (e, reason) => {
      setAnchorEl(null);
      onClose == null ? void 0 : onClose(e, reason);
    },
    [onClose]
  );
  return /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement(Tooltip2, { title: label != null ? label : ariaLabel }, /* @__PURE__ */ React9.createElement(
    IconButton,
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
    icon && /* @__PURE__ */ React9.createElement(ButtonIcon, { icon }),
    /* @__PURE__ */ React9.createElement(Icon2, { name: "arrowDownSFill", size: "1rem" })
  )), /* @__PURE__ */ React9.createElement(Menu, __spreadProps(__spreadValues({}, rest), { id: id.current, anchorEl, open, onClose: handleClose }), children));
};

// src/buttons/find-button.tsx
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import React17, { useCallback as useCallback11, useState as useState4 } from "react";
import { PositionerPortal } from "@remirror/react-components";
import { usePositioner } from "@remirror/react-hooks";

// src/find-replace/find-replace-component.tsx
import { Box as Box2, IconButton as IconButton3 } from "@mui/material";
import React16, { useCallback as useCallback10, useEffect as useEffect2, useState as useState3 } from "react";
import { Icon as Icon4 } from "@remirror/react-components";

// src/providers/ui-theme-provider.tsx
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/system";
import React10, { useMemo as useMemo2 } from "react";
import { useTheme } from "@remirror/react-components";
import { defaultRemirrorTheme } from "@remirror/theme";
function useRemirrorDefaultMuiTheme() {
  const { theme } = useTheme();
  return useMemo2(
    () => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
      return createTheme({
        palette: {
          primary: {
            main: (_b = (_a2 = theme.color) == null ? void 0 : _a2.primary) != null ? _b : defaultRemirrorTheme.color.primary,
            dark: (_e = (_d = (_c = theme.color) == null ? void 0 : _c.hover) == null ? void 0 : _d.primary) != null ? _e : defaultRemirrorTheme.color.hover.primary,
            contrastText: (_g = (_f = theme.color) == null ? void 0 : _f.primaryText) != null ? _g : defaultRemirrorTheme.color.primaryText
          },
          secondary: {
            main: (_i = (_h = theme.color) == null ? void 0 : _h.secondary) != null ? _i : defaultRemirrorTheme.color.secondary,
            dark: (_l = (_k = (_j = theme.color) == null ? void 0 : _j.hover) == null ? void 0 : _k.secondary) != null ? _l : defaultRemirrorTheme.color.hover.secondary,
            contrastText: (_n = (_m = theme.color) == null ? void 0 : _m.secondaryText) != null ? _n : defaultRemirrorTheme.color.secondaryText
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
  const muiTheme = useMuiTheme(remirrorDefaultTheme);
  return /* @__PURE__ */ React10.createElement(MuiThemeProvider, { theme: muiTheme }, children);
};

// src/find-replace/find-controller.tsx
import { IconButton as IconButton2 } from "@mui/material";
import React12 from "react";
import { Icon as Icon3 } from "@remirror/react-components";

// src/find-replace/letter-icon.tsx
import React11 from "react";
var MdiFormatLetterCase = (props) => /* @__PURE__ */ React11.createElement("svg", __spreadValues({ width: "1em", height: "1em", viewBox: "0 0 24 24" }, props), /* @__PURE__ */ React11.createElement(
  "path",
  {
    fill: "currentColor",
    d: "M20.06 18a3.99 3.99 0 0 1-.2-.89c-.67.7-1.48 1.05-2.41 1.05c-.83 0-1.52-.24-2.05-.71c-.53-.45-.8-1.06-.8-1.79c0-.88.33-1.56 1-2.05c.67-.49 1.61-.73 2.83-.73h1.4v-.64c0-.49-.15-.88-.45-1.17c-.3-.29-.75-.43-1.33-.43c-.52 0-.95.12-1.3.36c-.35.25-.52.54-.52.89h-1.46c0-.43.15-.84.45-1.24c.28-.4.71-.71 1.22-.94c.51-.21 1.06-.35 1.69-.35c.98 0 1.74.24 2.29.73s.84 1.16.86 2.02V16c0 .8.1 1.42.3 1.88V18h-1.52m-2.4-1.12c.45 0 .88-.11 1.29-.32c.4-.21.7-.49.88-.83v-1.57H18.7c-1.77 0-2.66.47-2.66 1.41c0 .43.15.73.46.96c.3.23.68.35 1.16.35m-12.2-3.17h4.07L7.5 8.29l-2.04 5.42M6.64 6h1.72l4.71 12h-1.93l-.97-2.57H4.82L3.86 18H1.93L6.64 6Z"
  }
));

// src/find-replace/find-controller.tsx
var FindController = ({ findPrev, findNext, stopFind, caseSensitive, toggleCaseSensitive, onDismiss }) => /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement(
  IconButton2,
  {
    onClick: findPrev,
    size: "small",
    title: "Next Match (Enter)",
    "aria-label": "Next Match (Enter)"
  },
  /* @__PURE__ */ React12.createElement(Icon3, { name: "arrowLeftSFill" })
), /* @__PURE__ */ React12.createElement(
  IconButton2,
  {
    onClick: findNext,
    size: "small",
    title: "Previous Match (Shift+Enter)",
    "aria-label": "Previous Match (Shift+Enter)"
  },
  /* @__PURE__ */ React12.createElement(Icon3, { name: "arrowRightSFill" })
), /* @__PURE__ */ React12.createElement(
  IconButton2,
  {
    onClick: toggleCaseSensitive,
    size: "small",
    color: caseSensitive ? "primary" : "default",
    title: "Match Case",
    "aria-label": "Match Case"
  },
  /* @__PURE__ */ React12.createElement(MdiFormatLetterCase, null)
), /* @__PURE__ */ React12.createElement(
  IconButton2,
  {
    onClick: () => {
      stopFind();
      onDismiss == null ? void 0 : onDismiss();
    },
    size: "small"
  },
  /* @__PURE__ */ React12.createElement(Icon3, { name: "closeFill" })
));

// src/find-replace/find-input.tsx
import { InputAdornment, OutlinedInput } from "@mui/material";
import React13 from "react";
var FindInput = ({ query, setQuery, total, activeIndex }) => {
  const counterLabel = "".concat(total && activeIndex != null ? activeIndex + 1 : 0, " of ").concat(total);
  return /* @__PURE__ */ React13.createElement(
    OutlinedInput,
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
      endAdornment: /* @__PURE__ */ React13.createElement(InputAdornment, { position: "end" }, counterLabel)
    }
  );
};

// src/find-replace/replace-controller.tsx
import { Button, ButtonGroup } from "@mui/material";
import React14 from "react";
var ReplaceController = ({ replace, replaceAll }) => /* @__PURE__ */ React14.createElement(ButtonGroup, { variant: "outlined", size: "small" }, /* @__PURE__ */ React14.createElement(Button, { "aria-label": "Replace", sx: { textTransform: "none" }, onClick: replace }, "Replace"), /* @__PURE__ */ React14.createElement(Button, { "aria-label": "Replace all", sx: { textTransform: "none" }, onClick: replaceAll }, "All"));

// src/find-replace/replace-input.tsx
import { OutlinedInput as OutlinedInput2 } from "@mui/material";
import React15 from "react";
var ReplaceInput = ({ replacement, setReplacement }) => /* @__PURE__ */ React15.createElement(
  OutlinedInput2,
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
import { useCallback as useCallback9, useEffect, useState as useState2 } from "react";
import { useCommands as useCommands7, useHelpers as useHelpers2 } from "@remirror/react-core";
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
  const helpers = useHelpers2();
  const commands = useCommands7();
  const [state, setState] = useState2(initialState);
  const find = useCallback9(
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
  const findNext = useCallback9(() => find(1), [find]);
  const findPrev = useCallback9(() => find(-1), [find]);
  const stopFind = useCallback9(() => {
    setState(initialState());
    commands.stopFind();
  }, [commands]);
  const replace = useCallback9(() => {
    const { query, replacement, caseSensitive, activeIndex } = state;
    commands.findAndReplace({ query, replacement, caseSensitive, index: activeIndex != null ? activeIndex : void 0 });
    const isQuerySubsetOfReplacement = caseSensitive ? replacement.includes(query) : replacement.toLowerCase().includes(query.toLowerCase());
    if (isQuerySubsetOfReplacement) {
      findNext();
    } else {
      find();
    }
  }, [state, commands, findNext, find]);
  const replaceAll = useCallback9(() => {
    const { query, replacement, caseSensitive } = state;
    commands.findAndReplaceAll({ query, replacement, caseSensitive });
    find();
  }, [commands, state, find]);
  const toggleCaseSensitive = useCallback9(() => {
    setState((state2) => __spreadProps(__spreadValues({}, state2), { caseSensitive: !state2.caseSensitive }));
  }, []);
  const setQuery = useCallback9((query) => {
    setState((state2) => __spreadProps(__spreadValues({}, state2), { query }));
  }, []);
  const setReplacement = useCallback9((replacement) => {
    setState((state2) => __spreadProps(__spreadValues({}, state2), { replacement }));
  }, []);
  useEffect(() => {
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
  const [isReplaceVisible, setIsReplaceVisible] = useState3(!canToggleReplace);
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
  const handleToggleReplace = useCallback10(() => {
    setIsReplaceVisible((bool) => !bool);
  }, []);
  useEffect2(() => {
    if (!isReplaceVisible) {
      setReplacement("");
    }
  }, [isReplaceVisible, setReplacement]);
  useEffect2(() => {
    return () => {
      stopFind();
    };
  }, [stopFind]);
  const label = isReplaceVisible ? "Hide replace field" : "Show replace field";
  return /* @__PURE__ */ React16.createElement(UiThemeProvider, null, /* @__PURE__ */ React16.createElement(
    Box2,
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
    canToggleReplace && /* @__PURE__ */ React16.createElement(Box2, null, /* @__PURE__ */ React16.createElement(IconButton3, { onClick: handleToggleReplace, size: "small", title: label, "aria-label": label }, /* @__PURE__ */ React16.createElement(Icon4, { name: "arrowRightSFill" }))),
    /* @__PURE__ */ React16.createElement(Box2, null, /* @__PURE__ */ React16.createElement(FindInput, { query, setQuery, total, activeIndex })),
    /* @__PURE__ */ React16.createElement(Box2, { sx: { justifySelf: "end" } }, /* @__PURE__ */ React16.createElement(
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
    isReplaceVisible && /* @__PURE__ */ React16.createElement(React16.Fragment, null, canToggleReplace && /* @__PURE__ */ React16.createElement(Box2, null), /* @__PURE__ */ React16.createElement(Box2, null, /* @__PURE__ */ React16.createElement(ReplaceInput, { replacement, setReplacement })), /* @__PURE__ */ React16.createElement(Box2, { sx: { justifySelf: "end" } }, /* @__PURE__ */ React16.createElement(ReplaceController, { replace, replaceAll })))
  ));
};

// src/buttons/find-button.tsx
var _a;
var EditorViewport = styled.div(_a || (_a = __template(["\n  position: absolute;\n  pointer-events: none;\n  display: flex;\n  justify-content: flex-end;\n  align-items: flex-start;\n"])));
var FindButton = (props) => {
  const [showFind, setShowFind] = useState4(false);
  const { ref, x, y, width, height, active } = usePositioner("editor");
  const handleSelect = useCallback11(() => {
    setShowFind((bool) => !bool);
  }, []);
  const hideFind = useCallback11(() => {
    setShowFind(false);
  }, []);
  return /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement(
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
  ), /* @__PURE__ */ React17.createElement(PositionerPortal, null, active && showFind && /* @__PURE__ */ React17.createElement(EditorViewport, { ref, style: { left: x, top: y, width, height } }, /* @__PURE__ */ React17.createElement(
    Paper,
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
    /* @__PURE__ */ React17.createElement(FindReplaceComponent, { canToggleReplace: true, onDismiss: hideFind })
  ))));
};

// src/buttons/increase-font-size-button.tsx
import React18, { useCallback as useCallback12 } from "react";
import { useCommands as useCommands8 } from "@remirror/react-core";
var IncreaseFontSizeButton = (props) => {
  const { increaseFontSize } = useCommands8();
  const handleSelect = useCallback12(() => {
    if (increaseFontSize.enabled()) {
      increaseFontSize();
    }
  }, [increaseFontSize]);
  const enabled = increaseFontSize.enabled();
  return /* @__PURE__ */ React18.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "increaseFontSize",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/increase-indent-button.tsx
import React19, { useCallback as useCallback13 } from "react";
import { useCommands as useCommands9 } from "@remirror/react-core";
var IncreaseIndentButton = (props) => {
  const { increaseIndent } = useCommands9();
  const handleSelect = useCallback13(() => {
    if (increaseIndent.enabled()) {
      increaseIndent();
    }
  }, [increaseIndent]);
  const enabled = increaseIndent.enabled();
  return /* @__PURE__ */ React19.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "increaseIndent",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/insert-horizontal-rule-button.tsx
import React20, { useCallback as useCallback14 } from "react";
import { useCommands as useCommands10, useCurrentSelection as useCurrentSelection4 } from "@remirror/react-core";
var InsertHorizontalRuleButton = (props) => {
  const { insertHorizontalRule } = useCommands10();
  useCurrentSelection4();
  const handleSelect = useCallback14(() => {
    if (insertHorizontalRule.enabled()) {
      insertHorizontalRule();
    }
  }, [insertHorizontalRule]);
  const enabled = insertHorizontalRule.enabled();
  return /* @__PURE__ */ React20.createElement(
    CommandButton,
    __spreadProps(__spreadValues({}, props), {
      commandName: "insertHorizontalRule",
      enabled,
      onSelect: handleSelect
    })
  );
};

// src/buttons/justify-align-button.tsx
import React21, { useCallback as useCallback15 } from "react";
import { useCommands as useCommands11, useCurrentSelection as useCurrentSelection5 } from "@remirror/react-core";
var JustifyAlignButton = (props) => {
  var _a2;
  const { justifyAlign } = useCommands11();
  useCurrentSelection5();
  const handleSelect = useCallback15(() => {
    if (justifyAlign.enabled()) {
      justifyAlign();
    }
  }, [justifyAlign]);
  const active = (_a2 = justifyAlign.active) == null ? void 0 : _a2.call(justifyAlign);
  const enabled = justifyAlign.enabled();
  return /* @__PURE__ */ React21.createElement(
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
import React22, { useCallback as useCallback16 } from "react";
import { useCommands as useCommands12, useCurrentSelection as useCurrentSelection6 } from "@remirror/react-core";
var LeftAlignButton = (props) => {
  var _a2;
  const { leftAlign } = useCommands12();
  useCurrentSelection6();
  const handleSelect = useCallback16(() => {
    if (leftAlign.enabled()) {
      leftAlign();
    }
  }, [leftAlign]);
  const active = (_a2 = leftAlign.active) == null ? void 0 : _a2.call(leftAlign);
  const enabled = leftAlign.enabled();
  return /* @__PURE__ */ React22.createElement(
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
import React23, { useCallback as useCallback17 } from "react";
import { useCommands as useCommands13, useEditorState } from "@remirror/react-core";
var PasteButton = (props) => {
  const { paste } = useCommands13();
  useEditorState();
  const handleSelect = useCallback17(() => {
    if (paste.enabled()) {
      paste();
    }
  }, [paste]);
  const enabled = paste.enabled();
  return /* @__PURE__ */ React23.createElement(
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
import React24, { useCallback as useCallback18 } from "react";
import { useCommands as useCommands14, useHelpers as useHelpers3 } from "@remirror/react-core";
var RedoButton = (props) => {
  const { redo } = useCommands14();
  const { redoDepth } = useHelpers3(true);
  const handleSelect = useCallback18(() => {
    if (redo.enabled()) {
      redo();
    }
  }, [redo]);
  const enabled = redoDepth() > 0;
  return /* @__PURE__ */ React24.createElement(
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
import React25, { useCallback as useCallback19 } from "react";
import { useCommands as useCommands15, useCurrentSelection as useCurrentSelection7 } from "@remirror/react-core";
var RightAlignButton = (props) => {
  var _a2;
  const { rightAlign } = useCommands15();
  useCurrentSelection7();
  const handleSelect = useCallback19(() => {
    if (rightAlign.enabled()) {
      rightAlign();
    }
  }, [rightAlign]);
  const active = (_a2 = rightAlign.active) == null ? void 0 : _a2.call(rightAlign);
  const enabled = rightAlign.enabled();
  return /* @__PURE__ */ React25.createElement(
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
import React26, { useCallback as useCallback20 } from "react";
import { useActive as useActive2, useCommands as useCommands16 } from "@remirror/react-core";
var ToggleBlockquoteButton = (props) => {
  const { toggleBlockquote } = useCommands16();
  const handleSelect = useCallback20(() => {
    if (toggleBlockquote.enabled()) {
      toggleBlockquote();
    }
  }, [toggleBlockquote]);
  const active = useActive2().blockquote();
  const enabled = toggleBlockquote.enabled();
  return /* @__PURE__ */ React26.createElement(
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
import React27, { useCallback as useCallback21 } from "react";
import { useActive as useActive3, useCommands as useCommands17 } from "@remirror/react-core";
var ToggleBoldButton = (props) => {
  const { toggleBold } = useCommands17();
  const handleSelect = useCallback21(() => {
    if (toggleBold.enabled()) {
      toggleBold();
    }
  }, [toggleBold]);
  const active = useActive3().bold();
  const enabled = toggleBold.enabled();
  return /* @__PURE__ */ React27.createElement(
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
import React28, { useCallback as useCallback22 } from "react";
import { useActive as useActive4, useCommands as useCommands18 } from "@remirror/react-core";
var ToggleBulletListButton = (props) => {
  const { toggleBulletList } = useCommands18();
  const handleSelect = useCallback22(() => {
    if (toggleBulletList.enabled()) {
      toggleBulletList();
    }
  }, [toggleBulletList]);
  const active = useActive4().bulletList();
  const enabled = toggleBulletList.enabled();
  return /* @__PURE__ */ React28.createElement(
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
import React29, { useCallback as useCallback23 } from "react";
import { useActive as useActive5, useCommands as useCommands19 } from "@remirror/react-core";
var ToggleCalloutButton = (_a2) => {
  var _b = _a2, { attrs = {} } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleCallout } = useCommands19();
  const handleSelect = useCallback23(() => {
    if (toggleCallout.enabled(attrs)) {
      toggleCallout(attrs);
    }
  }, [toggleCallout, attrs]);
  const active = useActive5().callout(attrs);
  const enabled = toggleCallout.enabled(attrs);
  return /* @__PURE__ */ React29.createElement(
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
import React30, { useCallback as useCallback24 } from "react";
import { useActive as useActive6, useCommands as useCommands20 } from "@remirror/react-core";
var ToggleCodeBlockButton = (_a2) => {
  var _b = _a2, { attrs = {} } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleCodeBlock } = useCommands20();
  const handleSelect = useCallback24(() => {
    if (toggleCodeBlock.enabled(attrs)) {
      toggleCodeBlock(attrs);
    }
  }, [toggleCodeBlock, attrs]);
  const active = useActive6().codeBlock();
  const enabled = toggleCodeBlock.enabled(attrs);
  return /* @__PURE__ */ React30.createElement(
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
import React31, { useCallback as useCallback25 } from "react";
import { useActive as useActive7, useCommands as useCommands21 } from "@remirror/react-core";
var ToggleCodeButton = (props) => {
  const { toggleCode } = useCommands21();
  const handleSelect = useCallback25(() => {
    if (toggleCode.enabled()) {
      toggleCode();
    }
  }, [toggleCode]);
  const active = useActive7().code();
  const enabled = toggleCode.enabled();
  return /* @__PURE__ */ React31.createElement(
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
import React32, { useCallback as useCallback26 } from "react";
import { useActive as useActive8, useCommands as useCommands22 } from "@remirror/react-core";
var ToggleColumnsButton = (_a2) => {
  var _b = _a2, { attrs = {} } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleColumns } = useCommands22();
  const handleSelect = useCallback26(() => {
    if (toggleColumns.enabled(attrs)) {
      toggleColumns(attrs);
    }
  }, [toggleColumns, attrs]);
  const active = useActive8().columns(attrs);
  const enabled = toggleColumns.enabled(attrs);
  return /* @__PURE__ */ React32.createElement(
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
import React33, { useCallback as useCallback27 } from "react";
import { useActive as useActive9, useCommands as useCommands23 } from "@remirror/react-core";
var ToggleHeadingButton = (_a2) => {
  var _b = _a2, { attrs } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleHeading } = useCommands23();
  const handleSelect = useCallback27(() => {
    if (toggleHeading.enabled(attrs)) {
      toggleHeading(attrs);
    }
  }, [toggleHeading, attrs]);
  const active = useActive9().heading(attrs);
  const enabled = toggleHeading.enabled(attrs);
  return /* @__PURE__ */ React33.createElement(
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
import React34, { useCallback as useCallback28 } from "react";
import { useActive as useActive10, useCommands as useCommands24 } from "@remirror/react-core";
var ToggleItalicButton = (props) => {
  const { toggleItalic } = useCommands24();
  const handleSelect = useCallback28(() => {
    if (toggleItalic.enabled()) {
      toggleItalic();
    }
  }, [toggleItalic]);
  const active = useActive10().italic();
  const enabled = toggleItalic.enabled();
  return /* @__PURE__ */ React34.createElement(
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
import React35, { useCallback as useCallback29 } from "react";
import { useActive as useActive11, useCommands as useCommands25 } from "@remirror/react-core";
var ToggleOrderedListButton = (props) => {
  const { toggleOrderedList } = useCommands25();
  const handleSelect = useCallback29(() => {
    if (toggleOrderedList.enabled()) {
      toggleOrderedList();
    }
  }, [toggleOrderedList]);
  const active = useActive11().orderedList();
  const enabled = toggleOrderedList.enabled();
  return /* @__PURE__ */ React35.createElement(
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
import React36, { useCallback as useCallback30 } from "react";
import { useActive as useActive12, useCommands as useCommands26 } from "@remirror/react-core";
var ToggleStrikeButton = (props) => {
  const { toggleStrike } = useCommands26();
  const handleSelect = useCallback30(() => {
    if (toggleStrike.enabled()) {
      toggleStrike();
    }
  }, [toggleStrike]);
  const active = useActive12().strike();
  const enabled = toggleStrike.enabled();
  return /* @__PURE__ */ React36.createElement(
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
import React37, { useCallback as useCallback31 } from "react";
import { useActive as useActive13, useCommands as useCommands27 } from "@remirror/react-core";
var ToggleSubscriptButton = (props) => {
  const { toggleSubscript } = useCommands27();
  const handleSelect = useCallback31(() => {
    if (toggleSubscript.enabled()) {
      toggleSubscript();
    }
  }, [toggleSubscript]);
  const active = useActive13().sub();
  const enabled = toggleSubscript.enabled();
  return /* @__PURE__ */ React37.createElement(
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
import React38, { useCallback as useCallback32 } from "react";
import { useActive as useActive14, useCommands as useCommands28 } from "@remirror/react-core";
var ToggleSuperscriptButton = (props) => {
  const { toggleSuperscript } = useCommands28();
  const handleSelect = useCallback32(() => {
    if (toggleSuperscript.enabled()) {
      toggleSuperscript();
    }
  }, [toggleSuperscript]);
  const active = useActive14().sup();
  const enabled = toggleSuperscript.enabled();
  return /* @__PURE__ */ React38.createElement(
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
import React39, { useCallback as useCallback33 } from "react";
import { useActive as useActive15, useCommands as useCommands29 } from "@remirror/react-core";
var ToggleTaskListButton = (props) => {
  const { toggleTaskList } = useCommands29();
  const handleSelect = useCallback33(() => {
    if (toggleTaskList.enabled()) {
      toggleTaskList();
    }
  }, [toggleTaskList]);
  const active = useActive15().taskList();
  const enabled = toggleTaskList.enabled();
  return /* @__PURE__ */ React39.createElement(
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
import React40, { useCallback as useCallback34 } from "react";
import { useActive as useActive16, useCommands as useCommands30 } from "@remirror/react-core";
var ToggleUnderlineButton = (props) => {
  const { toggleUnderline } = useCommands30();
  const handleSelect = useCallback34(() => {
    if (toggleUnderline.enabled()) {
      toggleUnderline();
    }
  }, [toggleUnderline]);
  const active = useActive16().underline();
  const enabled = toggleUnderline.enabled();
  return /* @__PURE__ */ React40.createElement(
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
import React41, { useCallback as useCallback35 } from "react";
import { useCommands as useCommands31, useHelpers as useHelpers4 } from "@remirror/react-core";
var ToggleWhitespaceButton = (props) => {
  const { toggleWhitespace } = useCommands31();
  const { isWhitespaceVisible } = useHelpers4(true);
  const handleSelect = useCallback35(() => {
    if (toggleWhitespace.enabled()) {
      toggleWhitespace();
    }
  }, [toggleWhitespace]);
  const active = isWhitespaceVisible();
  const enabled = toggleWhitespace.enabled();
  return /* @__PURE__ */ React41.createElement(
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
import React42, { useCallback as useCallback36 } from "react";
import { useCommands as useCommands32, useHelpers as useHelpers5 } from "@remirror/react-core";
var UndoButton = (props) => {
  const { undo } = useCommands32();
  const { undoDepth } = useHelpers5(true);
  const handleSelect = useCallback36(() => {
    if (undo.enabled()) {
      undo();
    }
  }, [undo]);
  const enabled = undoDepth() > 0;
  return /* @__PURE__ */ React42.createElement(
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
import { Box as Box3 } from "@mui/material";
import React43 from "react";
var CommandButtonGroup = (props) => /* @__PURE__ */ React43.createElement(
  Box3,
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
var BaselineButtonGroup = ({ children }) => /* @__PURE__ */ React44.createElement(CommandButtonGroup, null, /* @__PURE__ */ React44.createElement(ToggleSubscriptButton, null), /* @__PURE__ */ React44.createElement(ToggleSuperscriptButton, null), children);

// src/button-groups/basic-formatting-button-group.tsx
import React45 from "react";
var BasicFormattingButtonGroup = ({ children }) => /* @__PURE__ */ React45.createElement(CommandButtonGroup, null, /* @__PURE__ */ React45.createElement(ToggleBoldButton, null), /* @__PURE__ */ React45.createElement(ToggleItalicButton, null), /* @__PURE__ */ React45.createElement(ToggleUnderlineButton, null), children);

// src/button-groups/callout-type-button-group.tsx
import React46 from "react";
var INFO_CALLOUT = { type: "info" };
var WARNING_CALLOUT = { type: "warning" };
var ERROR_CALLOUT = { type: "error" };
var SUCCESS_CALLOUT = { type: "success" };
var CalloutTypeButtonGroup = ({ children }) => /* @__PURE__ */ React46.createElement(CommandButtonGroup, null, /* @__PURE__ */ React46.createElement(ToggleCalloutButton, { attrs: INFO_CALLOUT }), /* @__PURE__ */ React46.createElement(ToggleCalloutButton, { attrs: WARNING_CALLOUT }), /* @__PURE__ */ React46.createElement(ToggleCalloutButton, { attrs: ERROR_CALLOUT }), /* @__PURE__ */ React46.createElement(ToggleCalloutButton, { attrs: SUCCESS_CALLOUT }), children);

// src/button-groups/data-transfer-button-group.tsx
import React47 from "react";
var DataTransferButtonGroup = ({ children }) => /* @__PURE__ */ React47.createElement(CommandButtonGroup, null, /* @__PURE__ */ React47.createElement(CopyButton, null), /* @__PURE__ */ React47.createElement(CutButton, null), /* @__PURE__ */ React47.createElement(PasteButton, null), children);

// src/button-groups/formatting-button-group.tsx
import React48 from "react";
var FormattingButtonGroup = ({ children }) => /* @__PURE__ */ React48.createElement(CommandButtonGroup, null, /* @__PURE__ */ React48.createElement(ToggleBoldButton, null), /* @__PURE__ */ React48.createElement(ToggleItalicButton, null), /* @__PURE__ */ React48.createElement(ToggleUnderlineButton, null), /* @__PURE__ */ React48.createElement(ToggleStrikeButton, null), /* @__PURE__ */ React48.createElement(ToggleCodeButton, null), children);

// src/button-groups/heading-level-button-group.tsx
import React55 from "react";

// src/menus/code-block-tools/code-block-format-button.tsx
import { Button as Button2, FormControl } from "@mui/material";
import React49 from "react";
import { codeBlockPositioner } from "@remirror/extension-code-block";
import { useCommands as useCommands33 } from "@remirror/react-core";
import { usePositioner as usePositioner2 } from "@remirror/react-hooks";
var defaultButtonText = "format";
var CodeBlockFormatButton = ({
  text = defaultButtonText,
  className = "",
  onClick
}) => {
  const { ref, data, active } = usePositioner2(codeBlockPositioner, []);
  const { focus, formatCodeBlock } = useCommands33();
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
  return /* @__PURE__ */ React49.createElement(FormControl, { ref, margin: "none", size: "small", sx: { m: 1 }, className }, /* @__PURE__ */ React49.createElement(
    Button2,
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
import { FormControl as FormControl2, MenuItem, Select } from "@mui/material";
import React50, { useEffect as useEffect3, useMemo as useMemo3 } from "react";
import { uniqueBy } from "@remirror/core";
import { CodeBlockExtension, codeBlockPositioner as codeBlockPositioner2 } from "@remirror/extension-code-block";
import { useCommands as useCommands34, useExtension } from "@remirror/react-core";
import { usePositioner as usePositioner3 } from "@remirror/react-hooks";
var CodeBlockLanguageSelect = ({
  languages = [],
  className,
  onLanguageChange,
  onPointerDownSelect,
  onSelectChange
}) => {
  const { ref, element, data, active } = usePositioner3(codeBlockPositioner2, []);
  const { focus, updateCodeBlock } = useCommands34();
  const { defaultLanguage, supportedLanguages } = useExtension(CodeBlockExtension).options;
  const currentNodeLanguage = active ? data.node.attrs.language : void 0;
  const languageAliases = useMemo3(() => {
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
  const languageOptions = useMemo3(() => {
    const allLanguages = [
      ...languages,
      {
        displayName: defaultLanguage
      },
      ...supportedLanguages
    ];
    return uniqueBy(allLanguages, (lang) => lang.displayName).sort(
      (a, b) => a.displayName.localeCompare(b.displayName)
    );
  }, [languages, defaultLanguage, supportedLanguages]);
  const currentDisplayLanguage = useMemo3(() => {
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
  useEffect3(() => {
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
  return /* @__PURE__ */ React50.createElement(FormControl2, { ref, margin: "none", size: "small", sx: { m: 1 }, className }, /* @__PURE__ */ React50.createElement(
    Select,
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
    languageOptions.map(({ displayName, value }) => /* @__PURE__ */ React50.createElement(MenuItem, { key: displayName, value: value != null ? value : displayName }, displayName))
  ));
};

// src/menus/code-block-tools/code-block-tools.tsx
import React51, { useMemo as useMemo4 } from "react";
import { cx } from "@remirror/core";
import { codeBlockPositioner as codeBlockPositioner3 } from "@remirror/extension-code-block";
import { PositionerPortal as PositionerPortal2 } from "@remirror/react-components";
import { usePositioner as usePositioner4 } from "@remirror/react-hooks";
import { ExtensionCodeBlockTheme } from "@remirror/theme";
var CodeBlockTools = ({
  position = "right",
  offset = { x: 0, y: 0 },
  className = "",
  children
}) => {
  const positioner = usePositioner4(codeBlockPositioner3, []);
  const { ref, x, y, width, active } = positioner;
  const { x: offsetX, y: offsetY } = offset;
  const styles = useMemo4(() => {
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
  return /* @__PURE__ */ React51.createElement(UiThemeProvider, null, /* @__PURE__ */ React51.createElement(PositionerPortal2, null, /* @__PURE__ */ React51.createElement(
    "div",
    {
      ref,
      className: cx(ExtensionCodeBlockTheme.CODE_BLOCK_TOOLS_POSITIONER, className),
      style: styles
    },
    children
  )));
};

// src/menus/command-menu-item.tsx
import { ListItemIcon, ListItemText, MenuItem as MenuItem2, Typography } from "@mui/material";
import React52, { useCallback as useCallback37 } from "react";
import { isString as isString5 } from "@remirror/core";
import { Icon as Icon5 } from "@remirror/react-components";
var MenuItemIcon = ({ icon }) => {
  if (icon) {
    return /* @__PURE__ */ React52.createElement(ListItemIcon, null, isString5(icon) ? /* @__PURE__ */ React52.createElement(Icon5, { name: icon, size: "1rem" }) : /* @__PURE__ */ React52.createElement(React52.Fragment, null, icon));
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
  const handleClick = useCallback37(
    (e) => {
      onSelect();
      onClick == null ? void 0 : onClick(e);
    },
    [onSelect, onClick]
  );
  const handleMouseDown = useCallback37((e) => {
    e.preventDefault();
  }, []);
  const commandOptions = useCommandOptionValues({ commandName, active, enabled, attrs });
  let fallbackIcon = null;
  if (commandOptions.icon) {
    fallbackIcon = isString5(commandOptions.icon) ? commandOptions.icon : commandOptions.icon.name;
  }
  const primary = (_a3 = label != null ? label : commandOptions.label) != null ? _a3 : "";
  const secondary = displayDescription && (description != null ? description : commandOptions.description);
  return /* @__PURE__ */ React52.createElement(
    MenuItem2,
    __spreadProps(__spreadValues({
      selected: active,
      disabled: !enabled,
      onMouseDown: handleMouseDown
    }, rest), {
      onClick: handleClick
    }),
    icon !== null && /* @__PURE__ */ React52.createElement(MenuItemIcon, { icon: icon != null ? icon : fallbackIcon }),
    /* @__PURE__ */ React52.createElement(ListItemText, { primary, secondary }),
    displayShortcut && commandOptions.shortcut && /* @__PURE__ */ React52.createElement(Typography, { variant: "body2", color: "text.secondary", sx: { ml: 2 } }, commandOptions.shortcut)
  );
};

// src/menus/toggle-callout-menu-item.tsx
import React53, { useCallback as useCallback38 } from "react";
import { useActive as useActive17, useCommands as useCommands35 } from "@remirror/react-core";
var ToggleCalloutMenuItem = (_a2) => {
  var _b = _a2, { attrs } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleCallout } = useCommands35();
  const handleSelect = useCallback38(() => {
    if (toggleCallout.enabled(attrs)) {
      toggleCallout(attrs);
    }
  }, [toggleCallout, attrs]);
  const active = useActive17().callout(attrs);
  const enabled = toggleCallout.enabled(attrs);
  return /* @__PURE__ */ React53.createElement(
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
import React54, { useCallback as useCallback39 } from "react";
import { useActive as useActive18, useCommands as useCommands36 } from "@remirror/react-core";
var ToggleHeadingMenuItem = (_a2) => {
  var _b = _a2, { attrs } = _b, rest = __objRest(_b, ["attrs"]);
  const { toggleHeading } = useCommands36();
  const handleSelect = useCallback39(() => {
    if (toggleHeading.enabled(attrs)) {
      toggleHeading(attrs);
    }
  }, [toggleHeading, attrs]);
  const active = useActive18().heading(attrs);
  const enabled = toggleHeading.enabled(attrs);
  return /* @__PURE__ */ React54.createElement(
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
}) => /* @__PURE__ */ React55.createElement(CommandButtonGroup, null, /* @__PURE__ */ React55.createElement(ToggleHeadingButton, { attrs: LEVEL_1 }), /* @__PURE__ */ React55.createElement(ToggleHeadingButton, { attrs: LEVEL_2 }), !showAll ? /* @__PURE__ */ React55.createElement(ToggleHeadingButton, { attrs: LEVEL_3 }) : /* @__PURE__ */ React55.createElement(DropdownButton, { "aria-label": "More heading options" }, /* @__PURE__ */ React55.createElement(ToggleHeadingMenuItem, { attrs: LEVEL_3 }), /* @__PURE__ */ React55.createElement(ToggleHeadingMenuItem, { attrs: LEVEL_4 }), /* @__PURE__ */ React55.createElement(ToggleHeadingMenuItem, { attrs: LEVEL_5 }), /* @__PURE__ */ React55.createElement(ToggleHeadingMenuItem, { attrs: LEVEL_6 })), children);

// src/button-groups/history-button-group.tsx
import React56 from "react";
var HistoryButtonGroup = ({ children }) => /* @__PURE__ */ React56.createElement(CommandButtonGroup, null, /* @__PURE__ */ React56.createElement(UndoButton, null), /* @__PURE__ */ React56.createElement(RedoButton, null), children);

// src/button-groups/indentation-button-group.tsx
import React57 from "react";
var IndentationButtonGroup = ({ children }) => /* @__PURE__ */ React57.createElement(CommandButtonGroup, null, /* @__PURE__ */ React57.createElement(DecreaseIndentButton, null), /* @__PURE__ */ React57.createElement(IncreaseIndentButton, null), children);

// src/button-groups/list-button-group.tsx
import React59 from "react";
import { TaskListExtension } from "@remirror/extension-list";

// src/if-extension-present.tsx
import React58 from "react";
import { useHasExtension } from "@remirror/react-core";
var IfExtensionPresent = ({ children, extension }) => {
  const hasExtension = useHasExtension(extension);
  return hasExtension ? /* @__PURE__ */ React58.createElement(React58.Fragment, null, children) : null;
};

// src/button-groups/list-button-group.tsx
var ListButtonGroup = ({ children }) => /* @__PURE__ */ React59.createElement(CommandButtonGroup, null, /* @__PURE__ */ React59.createElement(ToggleBulletListButton, null), /* @__PURE__ */ React59.createElement(ToggleOrderedListButton, null), /* @__PURE__ */ React59.createElement(IfExtensionPresent, { extension: TaskListExtension }, /* @__PURE__ */ React59.createElement(ToggleTaskListButton, null)), children);

// src/button-groups/text-alignment-button-group.tsx
import React60 from "react";
var TextAlignmentButtonGroup = ({
  showAll = false,
  children
}) => /* @__PURE__ */ React60.createElement(CommandButtonGroup, null, /* @__PURE__ */ React60.createElement(LeftAlignButton, null), /* @__PURE__ */ React60.createElement(CenterAlignButton, null), /* @__PURE__ */ React60.createElement(RightAlignButton, null), showAll && /* @__PURE__ */ React60.createElement(JustifyAlignButton, null), children);

// src/toolbar/base-toolbar.tsx
import { Stack } from "@mui/material";
import React61 from "react";
var Toolbar = (props) => /* @__PURE__ */ React61.createElement(UiThemeProvider, null, /* @__PURE__ */ React61.createElement(
  Stack,
  __spreadValues({
    direction: "row",
    spacing: 1,
    sx: { backgroundColor: "background.paper", overflowX: "auto" }
  }, props)
));

// src/toolbar/floating-toolbar.tsx
import { Popper } from "@mui/material";
import React62, { useCallback as useCallback40, useMemo as useMemo5, useState as useState5 } from "react";
import { getPositioner } from "@remirror/extension-positioner";
import { usePositioner as usePositioner5 } from "@remirror/react-hooks";
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
  const { ref, x, y, width, height, active } = usePositioner5(
    () => getPositioner(positioner),
    [positioner]
  );
  const [anchorEl, setAnchorEl] = useState5(null);
  const inlineStyle = useMemo5(
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
  const combinedSelectionRefs = useCallback40(
    (elem) => {
      setAnchorEl(elem);
      ref == null ? void 0 : ref(elem);
    },
    [ref]
  );
  return /* @__PURE__ */ React62.createElement(React62.Fragment, null, /* @__PURE__ */ React62.createElement("div", { ref: combinedSelectionRefs, style: inlineStyle }), /* @__PURE__ */ React62.createElement(
    Popper,
    __spreadProps(__spreadValues({
      placement: "top",
      modifiers: DEFAULT_MODIFIERS
    }, rest), {
      open: active,
      anchorEl
    }),
    /* @__PURE__ */ React62.createElement(Toolbar, null, children ? /* @__PURE__ */ React62.createElement(React62.Fragment, null, children) : /* @__PURE__ */ React62.createElement(FormattingButtonGroup, null))
  ));
};

// src/toolbar/markdown-toolbar.tsx
import React64 from "react";

// src/toolbar/vertical-divider.tsx
import { Divider } from "@mui/material";
import React63 from "react";
var VerticalDivider = (props) => /* @__PURE__ */ React63.createElement(Divider, __spreadProps(__spreadValues({ flexItem: true, sx: { mx: 0.5 } }, props), { orientation: "vertical" }));

// src/toolbar/markdown-toolbar.tsx
var MarkdownToolbar = () => /* @__PURE__ */ React64.createElement(Toolbar, null, /* @__PURE__ */ React64.createElement(CommandButtonGroup, null, /* @__PURE__ */ React64.createElement(ToggleBoldButton, null), /* @__PURE__ */ React64.createElement(ToggleItalicButton, null), /* @__PURE__ */ React64.createElement(ToggleStrikeButton, null), /* @__PURE__ */ React64.createElement(ToggleCodeButton, null)), /* @__PURE__ */ React64.createElement(VerticalDivider, null), /* @__PURE__ */ React64.createElement(HeadingLevelButtonGroup, { showAll: true }), /* @__PURE__ */ React64.createElement(VerticalDivider, null), /* @__PURE__ */ React64.createElement(CommandButtonGroup, null, /* @__PURE__ */ React64.createElement(ToggleBlockquoteButton, null), /* @__PURE__ */ React64.createElement(ToggleCodeBlockButton, null)), /* @__PURE__ */ React64.createElement(VerticalDivider, null), /* @__PURE__ */ React64.createElement(HistoryButtonGroup, null));

// src/toolbar/wysiwyg-toolbar.tsx
import React65 from "react";
var WysiwygToolbar = () => /* @__PURE__ */ React65.createElement(Toolbar, null, /* @__PURE__ */ React65.createElement(HistoryButtonGroup, null), /* @__PURE__ */ React65.createElement(VerticalDivider, null), /* @__PURE__ */ React65.createElement(DataTransferButtonGroup, null), /* @__PURE__ */ React65.createElement(VerticalDivider, null), /* @__PURE__ */ React65.createElement(HeadingLevelButtonGroup, null), /* @__PURE__ */ React65.createElement(VerticalDivider, null), /* @__PURE__ */ React65.createElement(BasicFormattingButtonGroup, null), /* @__PURE__ */ React65.createElement(VerticalDivider, null), /* @__PURE__ */ React65.createElement(ListButtonGroup, null, /* @__PURE__ */ React65.createElement(CreateTableButton, null)));
export {
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
};
