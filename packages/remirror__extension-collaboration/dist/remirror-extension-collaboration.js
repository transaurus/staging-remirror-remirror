var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/collaboration-extension.ts
import {
  command,
  debounce,
  extension,
  invariant,
  isArray,
  isNumber,
  PlainExtension,
  uniqueId
} from "@remirror/core";
import { collab, getVersion, receiveTransaction, sendableSteps } from "@remirror/pm/collab";
import { Step } from "@remirror/pm/transform";
var _flushSendableSteps_dec, _cancelSendableSteps_dec, _sendCollaborationUpdate_dec, _a, _CollaborationExtension_decorators, _init;
_CollaborationExtension_decorators = [extension({
  defaultOptions: {
    version: 0,
    clientID: uniqueId(),
    debounceMs: 250
  },
  staticKeys: ["version", "clientID", "debounceMs"],
  handlerKeys: ["onSendableReceived"]
})];
var CollaborationExtension = class extends (_a = PlainExtension, _sendCollaborationUpdate_dec = [command()], _cancelSendableSteps_dec = [command()], _flushSendableSteps_dec = [command()], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "_debounceGetSendableSteps");
  }
  get name() {
    return "collaboration";
  }
  get debounceGetSendableSteps() {
    if (!this._debounceGetSendableSteps) {
      this._debounceGetSendableSteps = debounce(
        this.options.debounceMs,
        this.getSendableSteps.bind(this)
      );
    }
    return this._debounceGetSendableSteps;
  }
  sendCollaborationUpdate(attributes) {
    return ({ state, dispatch }) => {
      invariant(isValidCollaborationAttributes(attributes), {
        message: "Invalid attributes passed to the collaboration command."
      });
      const { version, steps } = attributes;
      if (getVersion(state) > version) {
        return false;
      }
      if (dispatch) {
        dispatch(
          receiveTransaction(
            state,
            steps.map((item) => Step.fromJSON(this.store.schema, item)),
            steps.map((item) => item.clientID)
          )
        );
      }
      return true;
    };
  }
  cancelSendableSteps() {
    return () => {
      var _a2;
      (_a2 = this.debounceGetSendableSteps) == null ? void 0 : _a2.cancel();
      return true;
    };
  }
  flushSendableSteps() {
    return ({ state }) => {
      var _a2;
      (_a2 = this.debounceGetSendableSteps) == null ? void 0 : _a2.cancel();
      this.getSendableSteps(state);
      return true;
    };
  }
  createExternalPlugins() {
    const { version, clientID } = this.options;
    const plugin = collab({
      version,
      clientID
    });
    return [plugin];
  }
  onStateUpdate(props) {
    var _a2;
    (_a2 = this.debounceGetSendableSteps) == null ? void 0 : _a2.call(this, props.state);
  }
  onDestroy() {
    this.store.commands.flushSendableSteps();
  }
  /**
   * This passes the sendable steps into the `onSendableReceived` handler defined in the
   * options when there is something to send.
   */
  getSendableSteps(state) {
    const sendable = sendableSteps(state);
    if (sendable) {
      const jsonSendable = {
        version: sendable.version,
        steps: sendable.steps.map((step) => step.toJSON()),
        clientID: sendable.clientID
      };
      this.options.onSendableReceived({ sendable, jsonSendable });
    }
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "sendCollaborationUpdate", _sendCollaborationUpdate_dec, CollaborationExtension);
__decorateElement(_init, 1, "cancelSendableSteps", _cancelSendableSteps_dec, CollaborationExtension);
__decorateElement(_init, 1, "flushSendableSteps", _flushSendableSteps_dec, CollaborationExtension);
CollaborationExtension = __decorateElement(_init, 0, "CollaborationExtension", _CollaborationExtension_decorators, CollaborationExtension);
__runInitializers(_init, 1, CollaborationExtension);
var isValidCollaborationAttributes = (attributes) => !(!attributes || !isArray(attributes.steps) || !isNumber(attributes.version));
export {
  CollaborationExtension
};
