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

// src/dom.ts
import { isArray } from "@remirror/core";
import { createCoreManager } from "@remirror/preset-core";

// src/dom-framework.ts
import {
  Framework,
  STATE_OVERRIDE
} from "@remirror/core";
import { EditorView } from "@remirror/pm/view";
var DomFramework = class extends Framework {
  get name() {
    return "dom";
  }
  /**
   * Create the prosemirror `[[EditorView`]].
   */
  createView(state, element) {
    return new EditorView(element != null ? element : null, {
      state,
      dispatchTransaction: this.dispatchTransaction,
      attributes: () => this.getAttributes(),
      editable: () => {
        var _a;
        return (_a = this.props.editable) != null ? _a : true;
      },
      plugins: []
    });
  }
  /**
   * This method should be called when the framework is first created.
   */
  onFirstRender() {
    if (!this.firstRender) {
      return;
    }
    this.onChange();
    this.addFocusListeners();
  }
  /**
   * Responsible for managing state updates.
   */
  updateState(_a) {
    var _b = _a, { state } = _b, rest = __objRest(_b, ["state"]);
    const { tr, transactions, triggerChange = true } = rest;
    if (!tr && !transactions) {
      state = state.apply(state.tr.setMeta(STATE_OVERRIDE, {}));
    }
    this.view.updateState(state);
    if (triggerChange && (transactions == null ? void 0 : transactions.length) !== 0) {
      this.onChange({ state, tr });
    }
    this.manager.onStateUpdate({ previousState: this.previousState, state, tr, transactions });
  }
  get frameworkOutput() {
    return __spreadProps(__spreadValues({}, this.baseOutput), {
      destroy: () => this.destroy()
    });
  }
};

// src/dom.ts
function createDomManager(extensions, options) {
  return createCoreManager(extensions, options);
}
function createDomEditor(props) {
  var _a;
  const { manager, element } = props;
  const fallback = manager.createEmptyDoc();
  const [initialContent, initialSelection] = isArray(props.initialContent) ? props.initialContent : [(_a = props.initialContent) != null ? _a : fallback];
  const initialEditorState = manager.createState({
    content: initialContent,
    selection: initialSelection
  });
  const framework = new DomFramework({
    getProps: () => props,
    initialEditorState,
    element
  });
  framework.onFirstRender();
  return framework.frameworkOutput;
}
export {
  createDomEditor,
  createDomManager
};
