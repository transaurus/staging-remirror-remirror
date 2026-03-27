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
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  COLORS: () => COLORS,
  EpicModeExtension: () => EpicModeExtension,
  defaultEffect: () => defaultEffect,
  heartEffect: () => heartEffect,
  spawningEffect: () => spawningEffect
});
module.exports = __toCommonJS(src_exports);

// src/epic-mode-effects.ts
var import_core = require("@remirror/core");
var COLORS = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#bcbd22",
  "#17becf"
];
var VIBRANT_COLORS = [
  "#0078ff",
  "#bd00ff",
  "#ff9a00",
  "#01ff1f",
  "#e3ff00",
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#bcbd22",
  "#17becf"
];
var PARTICLE_NUM_RANGE = { min: 5, max: 10 };
var PARTICLE_GRAVITY = 0.08;
var PARTICLE_ALPHA_FADEOUT = 0.96;
var PARTICLE_VELOCITY_RANGE = {
  x: [-1, 1],
  y: [-3.5, -1.5]
};
var defaultEffect = {
  createParticle({ x, y, color }) {
    return {
      x,
      y: y + 10,
      alpha: 1,
      color,
      size: (0, import_core.randomInt)(2, 4),
      vx: PARTICLE_VELOCITY_RANGE.x[0] + Math.random() * (PARTICLE_VELOCITY_RANGE.x[1] - PARTICLE_VELOCITY_RANGE.x[0]),
      vy: PARTICLE_VELOCITY_RANGE.y[0] + Math.random() * (PARTICLE_VELOCITY_RANGE.y[1] - PARTICLE_VELOCITY_RANGE.y[0])
    };
  },
  updateParticle({ particle, ctx }) {
    particle.vy += PARTICLE_GRAVITY;
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.alpha *= PARTICLE_ALPHA_FADEOUT;
    ctx.fillStyle = "rgba(".concat(particle.color[0], ",").concat(particle.color[1], ",").concat(particle.color[2], ",").concat(particle.alpha, ")");
    ctx.fillRect(
      Math.round(particle.x - 1),
      Math.round(particle.y - 1),
      particle.size,
      particle.size
    );
  }
};
var DEFAULT_SPAWNING_DRAG = 0.92;
var createSpawningTheta = () => (0, import_core.randomInt)(0, 360) * Math.PI / 180;
var spawningEffect = {
  createParticle({ x, y, color }) {
    return {
      x,
      y: y + 10,
      alpha: 1,
      color,
      size: (0, import_core.randomInt)(2, 8),
      drag: DEFAULT_SPAWNING_DRAG,
      vx: (0, import_core.randomInt)(-3, 3),
      vy: (0, import_core.randomInt)(-3, 3),
      wander: 0.15,
      theta: createSpawningTheta()
    };
  },
  updateParticle({ particle, ctx }) {
    var _a2, _b, _c;
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= (_a2 = particle.drag) != null ? _a2 : DEFAULT_SPAWNING_DRAG;
    particle.vy *= (_b = particle.drag) != null ? _b : DEFAULT_SPAWNING_DRAG;
    particle.theta = ((_c = particle.theta) != null ? _c : createSpawningTheta()) + (0, import_core.randomInt)(-0.5, 0.5);
    particle.vx += Math.sin(particle.theta) * 0.1;
    particle.vy += Math.cos(particle.theta) * 0.1;
    particle.size *= 0.96;
    ctx.fillStyle = "rgba(".concat(particle.color[0], ",").concat(particle.color[1], ",").concat(particle.color[2], ",").concat(particle.alpha, ")");
    ctx.beginPath();
    ctx.arc(Math.round(particle.x - 1), Math.round(particle.y - 1), particle.size, 0, 2 * Math.PI);
    ctx.fill();
  }
};
var heartEffect = {
  createParticle({ x, y, color }) {
    return {
      x: x + 20,
      y: y - 10,
      alpha: 1,
      color,
      size: (0, import_core.randomInt)(5, 12),
      drag: 0.92,
      vx: (0, import_core.randomInt)(-3, 5),
      vy: (0, import_core.randomInt)(-3, 5),
      wander: 0.15,
      theta: (0, import_core.randomInt)(0, 360) * Math.PI / 180
    };
  },
  updateParticle({ particle, ctx }) {
    particle.x += particle.vx / 2;
    particle.y += particle.vy / 2;
    particle.alpha *= 0.985;
    const baseLen = particle.size;
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(3.95);
    ctx.beginPath();
    ctx.moveTo(-baseLen, 0);
    ctx.arc(0, 0, baseLen, 0, Math.PI, false);
    ctx.lineTo(baseLen, 0);
    ctx.arc(baseLen, -baseLen, baseLen, Math.PI * 90 / 180, Math.PI * 270 / 180, true);
    ctx.lineTo(baseLen, -baseLen * 2);
    ctx.lineTo(-baseLen, -baseLen * 2);
    ctx.lineTo(-baseLen, 0);
    const [r, g, b] = particle.color;
    ctx.fillStyle = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(particle.alpha, ")");
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
};

// src/epic-mode-extension.ts
var import_core2 = require("@remirror/core");
var _EpicModeExtension_decorators, _init, _a;
_EpicModeExtension_decorators = [(0, import_core2.extension)({
  defaultOptions: {
    particleEffect: defaultEffect,
    getCanvasContainer: () => document.body,
    colors: VIBRANT_COLORS,
    particleRange: PARTICLE_NUM_RANGE,
    active: true,
    shakeTime: 0.3,
    shakeIntensity: 5
  }
})];
var EpicModeExtension = class extends (_a = import_core2.PlainExtension) {
  get name() {
    return "epicMode";
  }
  createPlugin() {
    const pluginState = new EpicModePluginState(this);
    return {
      state: {
        init() {
          return pluginState;
        },
        apply(_tr, pluginState2) {
          return pluginState2;
        }
      },
      props: {
        handleKeyPress() {
          pluginState.shake();
          pluginState.spawnParticles();
          return false;
        }
      },
      view(view) {
        pluginState.init(view);
        return {
          destroy() {
            pluginState.destroy();
          }
        };
      }
    };
  }
};
_init = __decoratorStart(_a);
EpicModeExtension = __decorateElement(_init, 0, "EpicModeExtension", _EpicModeExtension_decorators, EpicModeExtension);
__runInitializers(_init, 1, EpicModeExtension);
function getRGBComponents(node) {
  const color = getComputedStyle(node).color;
  let match;
  if (color && (match = color.match(/(\d+), (\d+), (\d+)/))) {
    try {
      return match.slice(1);
    } catch (e) {
      return [255, 255, 255];
    }
  } else {
    return [255, 255, 255];
  }
}
var _extension, _shakeTime, _shakeTimeMax, _lastTime, _particles;
var EpicModePluginState = class {
  constructor(extension2) {
    __publicField(this, "canvas");
    __publicField(this, "ctx");
    __publicField(this, "container");
    __privateAdd(this, _extension);
    __privateAdd(this, _shakeTime, 0);
    __privateAdd(this, _shakeTimeMax, 0);
    __privateAdd(this, _lastTime, 0);
    __privateAdd(this, _particles, []);
    __publicField(this, "view");
    __publicField(this, "shake", () => {
      if (this.options.active) {
        __privateSet(this, _shakeTime, __privateSet(this, _shakeTimeMax, this.options.shakeTime));
      }
    });
    __publicField(this, "spawnParticles", () => {
      const { selection } = this.view.state;
      const coords = this.view.coordsAtPos(selection.$anchor.pos);
      this.canvas.style.top = "".concat(window.scrollY, "px");
      this.canvas.style.left = "".concat(window.scrollX, "px");
      const node = document.elementFromPoint(coords.left - 5, coords.top + 5);
      if (!node) {
        return;
      }
      const numParticles = (0, import_core2.randomInt)(this.options.particleRange.min, this.options.particleRange.max);
      const textColor = getRGBComponents(node);
      for (let ii = 0; ii < numParticles; ii++) {
        const colorCode = (0, import_core2.assertGet)(this.options.colors, ii % this.options.colors.length);
        const r = Number.parseInt(colorCode.slice(1, 3), 16);
        const g = Number.parseInt(colorCode.slice(3, 5), 16);
        const b = Number.parseInt(colorCode.slice(5, 7), 16);
        const color = [r, g, b];
        __privateGet(this, _particles)[ii] = this.options.particleEffect.createParticle({
          x: coords.left + 10,
          y: coords.top - 10,
          color,
          textColor,
          ctx: this.ctx,
          canvas: this.canvas
        });
      }
    });
    /**
     * Runs through the animation loop
     */
    __publicField(this, "loop", () => {
      if (!this.options.active) {
        return;
      }
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const currentTime = Date.now();
      if (!__privateGet(this, _lastTime)) {
        __privateSet(this, _lastTime, currentTime);
      }
      const dt = (currentTime - __privateGet(this, _lastTime)) / 1e3;
      __privateSet(this, _lastTime, currentTime);
      if (__privateGet(this, _shakeTime) > 0) {
        __privateSet(this, _shakeTime, __privateGet(this, _shakeTime) - dt);
        const magnitude = __privateGet(this, _shakeTime) / __privateGet(this, _shakeTimeMax) * this.options.shakeIntensity;
        const shakeX = (0, import_core2.randomInt)(-magnitude, magnitude);
        const shakeY = (0, import_core2.randomInt)(-magnitude, magnitude);
        this.view.dom.style.transform = "translate(".concat(shakeX, "px,").concat(shakeY, "px)");
      }
      this.drawParticles();
      requestAnimationFrame(this.loop);
    });
    __privateSet(this, _extension, extension2);
    this.shake = (0, import_core2.throttle)(100, this.shake);
    this.spawnParticles = (0, import_core2.throttle)(100, this.spawnParticles);
  }
  get options() {
    return __privateGet(this, _extension).options;
  }
  /**
   * Store a reference to the Prosemirror view and add the canvas to the DOM
   *
   * @param view
   */
  init(view) {
    this.view = view;
    this.container = this.options.getCanvasContainer();
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.id = "epic-mode-canvas";
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("An error occurred while creating the canvas context");
    }
    this.ctx = ctx;
    this.container.append(this.canvas);
    this.loop();
    return this;
  }
  destroy() {
    try {
      this.canvas.remove();
      if (this.container.contains(this.canvas)) {
        this.canvas.remove();
      }
    } catch (e) {
    }
  }
  drawParticles() {
    for (const particle of __privateGet(this, _particles)) {
      if (particle.alpha < 0.01 || particle.size <= 0.5) {
        continue;
      }
      this.options.particleEffect.updateParticle({
        particle,
        ctx: this.ctx,
        canvas: this.canvas
      });
    }
  }
};
_extension = new WeakMap();
_shakeTime = new WeakMap();
_shakeTimeMax = new WeakMap();
_lastTime = new WeakMap();
_particles = new WeakMap();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  COLORS,
  EpicModeExtension,
  defaultEffect,
  heartEffect,
  spawningEffect
});
