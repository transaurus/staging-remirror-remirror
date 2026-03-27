"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
  DiffExtension: () => DiffExtension
});
module.exports = __toCommonJS(src_exports);

// src/diff-extension.ts
var import_core2 = require("@remirror/core");
var import_transform = require("@remirror/pm/transform");
var import_view = require("@remirror/pm/view");

// src/diff-utils.ts
var import_core = require("@remirror/core");
var Span = class {
  constructor(props) {
    __publicField(this, "from");
    __publicField(this, "to");
    __publicField(this, "commit");
    const { from, to, commit } = props;
    this.from = from;
    this.to = to;
    this.commit = commit;
  }
};
var Commit = class {
  constructor(props) {
    __publicField(this, "message");
    __publicField(this, "time");
    __publicField(this, "steps");
    __publicField(this, "maps");
    __publicField(this, "hidden");
    const { message, time, steps, maps, hidden } = props;
    this.message = message;
    this.time = time;
    this.steps = steps;
    this.maps = maps;
    this.hidden = hidden;
  }
};
var TrackState = class _TrackState {
  constructor(props) {
    __publicField(this, "blameMap");
    __publicField(this, "commits");
    __publicField(this, "uncommittedSteps");
    __publicField(this, "uncommittedMaps");
    const { blameMap, commits, uncommittedSteps, uncommittedMaps } = props;
    this.blameMap = blameMap;
    this.commits = commits;
    this.uncommittedSteps = uncommittedSteps;
    this.uncommittedMaps = uncommittedMaps;
  }
  /**
   * Apply a transform to this state.
   */
  applyTransform(transform) {
    const inverted = transform.steps.map(
      (step, index) => step.invert((0, import_core.assertGet)(transform.docs, index))
    );
    const newBlame = updateBlameMap({ map: this.blameMap, transform, id: this.commits.length });
    return new _TrackState({
      blameMap: newBlame,
      commits: this.commits,
      uncommittedSteps: [...this.uncommittedSteps, ...inverted],
      uncommittedMaps: [...this.uncommittedMaps, ...transform.mapping.maps]
    });
  }
  /**
   * When a transaction is marked as a commit, this is used to put any
   * uncommitted steps into a new commit.
   */
  applyCommit(message, time) {
    if ((0, import_core.isEmptyArray)(this.uncommittedSteps)) {
      return this;
    }
    const commit = new Commit({
      message,
      time,
      steps: this.uncommittedSteps,
      maps: this.uncommittedMaps
    });
    return new _TrackState({
      blameMap: this.blameMap,
      commits: [...this.commits, commit],
      uncommittedSteps: [],
      uncommittedMaps: []
    });
  }
};
function updateBlameMap({ map, transform, id }) {
  const result = [];
  const mapping = transform.mapping;
  for (const span of map) {
    const from = mapping.map(span.from, 1);
    const to = mapping.map(span.to, -1);
    if (from < to) {
      result.push(new Span({ from, to, commit: span.commit }));
    }
  }
  for (const [index, map2] of mapping.maps.entries()) {
    const after = mapping.slice(index + 1);
    map2.forEach((_s, _e, start, end) => {
      insertIntoBlameMap({
        map: result,
        from: after.map(start, 1),
        to: after.map(end, -1),
        commit: id
      });
    });
  }
  return result;
}
function insertIntoBlameMap(props) {
  let { from, to, map, commit } = props;
  if (from >= to) {
    return;
  }
  let pos = 0;
  let next;
  for (; pos < map.length; pos++) {
    next = (0, import_core.assertGet)(map, pos);
    if (next.commit === commit) {
      if (next.to >= from) {
        break;
      }
      continue;
    }
    if (next.to <= from) {
      continue;
    }
    if (next.from < from) {
      const left = new Span({ from: next.from, to: from, commit: next.commit });
      if (next.to > to) {
        map.splice(pos++, 0, left);
      } else {
        map[pos++] = left;
      }
    }
    break;
  }
  while (next = map[pos]) {
    if (next.commit === commit) {
      if (next.from > to) {
        break;
      }
      from = Math.min(from, next.from);
      to = Math.max(to, next.to);
      map.splice(pos, 1);
      continue;
    }
    if (next.from >= to) {
      break;
    }
    if (next.to > to) {
      map[pos] = new Span({ from: to, to: next.to, commit: next.commit });
      break;
    }
    map.splice(pos, 1);
  }
  map.splice(pos, 0, new Span({ from, to, commit }));
}

// src/diff-extension.ts
var _getCommit_dec, _getCommits_dec, _revertCommit_dec, _commitChange_dec, _removeHighlightedCommit_dec, _highlightCommit_dec, _a, _DiffExtension_decorators, _init;
_DiffExtension_decorators = [(0, import_core2.extension)({
  defaultOptions: {
    blameMarkerClass: "blame-marker",
    revertMessage: (message) => "Revert: '".concat(message, "'")
  },
  staticKeys: ["blameMarkerClass"],
  handlerKeys: ["onMouseOverCommit", "onMouseLeaveCommit", "onSelectCommits", "onDeselectCommits"]
})];
var DiffExtension = class extends (_a = import_core2.PlainExtension, _highlightCommit_dec = [(0, import_core2.command)()], _removeHighlightedCommit_dec = [(0, import_core2.command)()], _commitChange_dec = [(0, import_core2.command)()], _revertCommit_dec = [(0, import_core2.command)()], _getCommits_dec = [(0, import_core2.helper)()], _getCommit_dec = [(0, import_core2.helper)()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "hovered");
    __publicField(this, "selections");
  }
  get name() {
    return "diff";
  }
  /**
   * Create the custom change tracking plugin.
   *
   * This has been adapted from the prosemirror website demo.
   * https://github.com/ProseMirror/website/blob/master/example/track/index.js
   */
  createPlugin() {
    return {
      state: {
        init: (_, state) => this.createInitialState(state),
        apply: (tr, pluginState, _, state) => {
          const newState = this.applyStateUpdates(tr, pluginState, state);
          this.handleSelection(tr, newState);
          return newState;
        }
      },
      props: {
        decorations: (state) => this.getPluginState(state).decorations,
        handleDOMEvents: {
          mouseover: (view, event) => this.handlerMouseOver(view, event),
          mouseleave: (view, event) => this.handleMouseLeave(view, event)
        }
      }
    };
  }
  highlightCommit(commit) {
    return (props) => {
      const { tr, dispatch } = props;
      if ((0, import_core2.isString)(commit)) {
        commit = this.getIndexByName(commit);
      }
      if (!(0, import_core2.isNumber)(commit)) {
        commit = this.getCommitId(commit);
      }
      if (dispatch) {
        dispatch(this.setMeta(tr, { add: commit }));
      }
      return true;
    };
  }
  removeHighlightedCommit(commit) {
    return (props) => {
      const { tr, dispatch } = props;
      if ((0, import_core2.isString)(commit)) {
        commit = this.getIndexByName(commit);
      }
      if (!(0, import_core2.isNumber)(commit)) {
        commit = this.getCommitId(commit);
      }
      if (dispatch) {
        dispatch(this.setMeta(tr, { clear: commit }));
      }
      return true;
    };
  }
  commitChange(message) {
    return (props) => {
      const { tr, dispatch } = props;
      if (dispatch) {
        dispatch(this.setMeta(tr, { message }));
      }
      return true;
    };
  }
  revertCommit(commit) {
    return (props) => {
      var _a2;
      const { state, tr, dispatch } = props;
      if (!commit) {
        commit = this.getCommit("last");
      }
      const { tracked } = this.getPluginState(state);
      const index = tracked.commits.indexOf(commit);
      if (index === -1) {
        return false;
      }
      if (!(0, import_core2.isEmptyArray)(tracked.uncommittedSteps)) {
        return false;
      }
      if (!dispatch) {
        return true;
      }
      const commitMaps = [];
      for (const commit2 of tracked.commits.slice(index)) {
        commitMaps.push(...commit2.maps);
      }
      const remap = new import_transform.Mapping(commitMaps);
      for (let index2 = commit.steps.length - 1; index2 >= 0; index2--) {
        const remapped = (_a2 = commit.steps[index2]) == null ? void 0 : _a2.map(remap.slice(index2 + 1));
        if (!remapped) {
          continue;
        }
        const result = tr.maybeStep(remapped);
        if (result.doc) {
          remap.appendMap(remapped.getMap(), index2);
        }
      }
      if (tr.docChanged) {
        this.setMeta(tr, { message: this.options.revertMessage(commit.message) });
        dispatch(tr);
      }
      return true;
    };
  }
  getCommits() {
    return this.getPluginState().tracked.commits;
  }
  getIndexByName(name) {
    const length = this.getPluginState().tracked.commits.length;
    switch (name) {
      case "first":
        return 0;
      default:
        return length - 1;
    }
  }
  getCommit(id) {
    const commits = this.getPluginState().tracked.commits;
    const commit = (0, import_core2.isString)(id) ? commits[this.getIndexByName(id)] : commits[id];
    (0, import_core2.invariant)(commit, {});
    return commit;
  }
  getCommitId(commit) {
    const { tracked } = this.getPluginState();
    return tracked.commits.indexOf(commit);
  }
  /**
   * Get the meta data for this custom plugin.
   */
  getMeta(tr) {
    var _a2;
    return (_a2 = tr.getMeta(this.pluginKey)) != null ? _a2 : {};
  }
  /**
   * Set the meta data for the plugin.
   */
  setMeta(tr, meta) {
    tr.setMeta(this.pluginKey, __spreadValues(__spreadValues({}, this.getMeta(tr)), meta));
    return tr;
  }
  /**
   * Calls the selection handlers when the selection changes the number of
   * commit spans covered.
   */
  handleSelection(tr, pluginState) {
    if (!(0, import_core2.hasTransactionChanged)(tr)) {
      return;
    }
    const { from, to } = tr.selection;
    const { blameMap, commits } = pluginState.tracked;
    const selections = [];
    for (const map of blameMap) {
      const selectionIncludesSpan = map.from <= from && map.to >= from || map.from <= to && map.to >= to;
      if (!selectionIncludesSpan || !(0, import_core2.isNumber)(map.commit) || map.commit >= commits.length) {
        continue;
      }
      selections.push({ commit: this.getCommit(map.commit), from: map.from, to: map.to });
    }
    const selectionHasCommit = selections.length > 0;
    if (selectionHasCommit && !(0, import_core2.isEqual)(selections, this.selections)) {
      this.options.onSelectCommits(selections, this.selections);
      this.selections = selections;
      return;
    }
    if (this.selections) {
      this.options.onDeselectCommits(this.selections);
      this.selections = void 0;
    }
  }
  /**
   * Transform the view and event into a commit and span.
   */
  getHandlerPropsFromEvent(view, event) {
    if (!(0, import_core2.isDomNode)(event.target)) {
      return;
    }
    const pos = view.posAtDOM(event.target, 0);
    const { tracked } = this.getPluginState();
    const span = tracked.blameMap.find((map) => map.from <= pos && map.to >= pos);
    if (!span || !(0, import_core2.isNumber)(span.commit)) {
      return;
    }
    return { commit: this.getCommit(span.commit), from: span.from, to: span.to };
  }
  /**
   * Capture the mouseover event and trigger the `onMouseOverCommit` handler
   * when it is captured.
   */
  handlerMouseOver(view, event) {
    const props = this.getHandlerPropsFromEvent(view, event);
    if (props) {
      this.hovered = props;
      this.options.onMouseOverCommit(props);
    }
    return false;
  }
  /**
   * Capture the mouseleave event and trigger the `onMouseLeaveCommit` handler.
   */
  handleMouseLeave(view, event) {
    if (!this.hovered) {
      return false;
    }
    const commit = this.getHandlerPropsFromEvent(view, event);
    if (commit) {
      this.hovered = void 0;
      this.options.onMouseLeaveCommit(commit);
    }
    return false;
  }
  /**
   * Create the initial plugin state for the custom plugin.
   */
  createInitialState(state) {
    return {
      tracked: new TrackState({
        blameMap: [new Span({ from: 0, to: state.doc.content.size, commit: void 0 })],
        commits: [],
        uncommittedMaps: [],
        uncommittedSteps: []
      }),
      decorations: import_view.DecorationSet.empty
    };
  }
  /**
   * Apply state updates in response to document changes.
   */
  applyStateUpdates(tr, pluginState, state) {
    return __spreadValues(__spreadValues({}, this.updateTracked(tr, pluginState)), this.updateHighlights(tr, pluginState, state));
  }
  createDecorationSet(commits, pluginState, state) {
    const { tracked } = pluginState;
    const decorations = [];
    for (const { commit, from, to } of tracked.blameMap) {
      if (!(0, import_core2.isNumber)(commit) || !commits.includes(commit)) {
        continue;
      }
      decorations.push(import_view.Decoration.inline(from, to, { class: this.options.blameMarkerClass }));
    }
    return import_view.DecorationSet.create(state.doc, decorations);
  }
  /**
   * Apply updates to the highlight decorations.
   */
  updateHighlights(tr, pluginState, state) {
    var _a2;
    const { add, clear } = this.getMeta(tr);
    if ((0, import_core2.isNumber)(add) && pluginState.commits && !pluginState.commits.includes(add)) {
      const commits = [...pluginState.commits, add];
      const decorations = this.createDecorationSet(commits, pluginState, state);
      return { decorations, commits };
    }
    if ((0, import_core2.isNumber)(clear) && pluginState.commits && pluginState.commits.includes(clear)) {
      const commits = pluginState.commits.filter((commit) => commit !== clear);
      const decorations = this.createDecorationSet(commits, pluginState, state);
      return { decorations, commits };
    }
    if (tr.docChanged && !(0, import_core2.isEmptyArray)(pluginState.commits)) {
      return {
        decorations: pluginState.decorations.map(tr.mapping, tr.doc),
        commits: pluginState.commits
      };
    }
    return { decorations: pluginState.decorations, commits: (_a2 = pluginState.commits) != null ? _a2 : [] };
  }
  /**
   * Apply updates for the commit tracker.
   *
   * Please note this isn't able to track marks and diffs. It can only
   * track changes to content.
   */
  updateTracked(tr, state) {
    let { tracked } = state;
    if (tr.docChanged) {
      tracked = tracked.applyTransform(tr);
    }
    const { message } = this.getMeta(tr);
    if (message) {
      tracked = tracked.applyCommit(message, tr.time);
    }
    return { tracked };
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "highlightCommit", _highlightCommit_dec, DiffExtension);
__decorateElement(_init, 1, "removeHighlightedCommit", _removeHighlightedCommit_dec, DiffExtension);
__decorateElement(_init, 1, "commitChange", _commitChange_dec, DiffExtension);
__decorateElement(_init, 1, "revertCommit", _revertCommit_dec, DiffExtension);
__decorateElement(_init, 1, "getCommits", _getCommits_dec, DiffExtension);
__decorateElement(_init, 1, "getCommit", _getCommit_dec, DiffExtension);
DiffExtension = __decorateElement(_init, 0, "DiffExtension", _DiffExtension_decorators, DiffExtension);
__runInitializers(_init, 1, DiffExtension);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DiffExtension
});
