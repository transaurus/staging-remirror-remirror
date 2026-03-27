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
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/playwright/playwright-helpers.ts
async function clearEditor(selector) {
  await page.click(selector, { clickCount: 3 });
  await page.keyboard.press("Backspace");
}
function sel(...selectors) {
  return selectors.join(" ");
}
function innerHtml(selector) {
  return page.$eval(selector, (element) => element.innerHTML);
}
function textContent(selector) {
  return page.$eval(selector, (element) => element.textContent);
}
function outerHtml(selector) {
  return page.$eval(selector, (element) => element.outerHTML);
}
function times(length, fn) {
  return Array.from(
    { length },
    (_, index) => fn ? fn(index) : index
  );
}
async function promiseSequence(sequence) {
  const promise = Promise.resolve();
  for (const next of sequence) {
    promise.then(next);
  }
  return promise;
}
async function press({ key, count = 1, delay: delay3 = 10 }) {
  return promiseSequence(times(count, () => () => page.keyboard.press(key, { delay: delay3 })));
}
async function type({ text, delay: delay3 = 10 }) {
  return page.keyboard.type(text, { delay: delay3 });
}
async function makeHtmlObject(htmlOrPromise) {
  return await Promise.resolve({ _: "HTML", html: await Promise.resolve(htmlOrPromise) });
}
function $innerHtml(selector) {
  return makeHtmlObject(page.$eval(selector, (element) => element.innerHTML));
}
async function goto(url = "") {
  return page.goto(__SERVER__.url + url, { timeout: 6e4 });
}
function getBrowserName() {
  var _a;
  return (_a = process.env.E2E_BROWSER) != null ? _a : "chromium";
}
function prefixBrowserName(...value) {
  return "".concat(getBrowserName(), "-").concat(process.platform, "-").concat(__SERVER__.name, "-").concat(value.join("-"));
}

// src/playwright/playwright-launcher.ts
import { setup, teardown } from "jest-process-manager";
import onExit from "signal-exit";

// src/playwright/playwright-server.config.ts
var { E2E_SERVER = "storybook-react", E2E_MODE = "development" } = process.env;
var dev = E2E_MODE === "development";
var servers = {
  next: {
    environment: "playwright",
    config: {
      command: dev ? "cd examples/with-next && pnpm dev -p 3030" : "cd examples/with-next && pnpm build && pnpm start -p 3030",
      port: 3030,
      usedPortAction: "kill",
      launchTimeout: 12e4
    },
    testMatch: ["examples/with-next/__e2e__/**/*.test.ts"],
    url: "http://localhost:3030/",
    name: "next"
  },
  docs: {
    environment: "playwright",
    config: {
      command: dev ? "cd website && pnpm start -p 3031" : "cd website && pnpm build && pnpx http-server build --p 3031",
      port: 3031,
      usedPortAction: "kill",
      launchTimeout: 12e4
    },
    testMatch: ["website/__e2e__/**/*.test.ts"],
    url: "http://localhost:3031/",
    name: "docs"
  },
  "storybook-react": {
    environment: "playwright",
    config: {
      command: dev ? "cd packages/storybook-react && pnpm start -p 3032 --ci" : "cd packages/storybook-react && pnpm build && pnpx http-server storybook-static -p 3032",
      port: 3032,
      usedPortAction: "kill",
      launchTimeout: 12e4
    },
    testMatch: ["<rootDir>/packages/*/__e2e__/**/*.test.ts"],
    url: "http://localhost:3032/iframe.html?id=",
    name: "storybook-react"
  }
};
var server = servers[E2E_SERVER];

// src/playwright/playwright-launcher.ts
var { globalSetup, globalTeardown } = __require("jest-playwright-preset");
var serverSetupPromise;
var destroyServer = async (globalConfig) => {
  if (server.environment !== "playwright") {
    return;
  }
  serverSetupPromise = void 0;
  await teardown();
  await globalTeardown(globalConfig);
};
var setupServer = async (globalConfig) => {
  if (server.environment !== "playwright") {
    return;
  }
  await setup([server.config]);
  onExit(() => {
    destroyServer().then(() => {
      process.exit();
    });
  });
  await globalSetup(globalConfig);
};
var startServer = (globalConfig) => {
  if (serverSetupPromise) {
    return serverSetupPromise;
  }
  serverSetupPromise = setupServer(globalConfig);
  return serverSetupPromise;
};

// src/playwright/playwright-modifier-keys.ts
import delay from "delay";
import { take } from "@remirror/core";
var ALT = ["Alt", "\u2325"];
var CTRL = ["Control", "\u2303"];
var COMMAND = ["Meta", "\u2318"];
var SHIFT = ["Shift", "\u21E7"];
var WINDOWS = ["Windows", "", "\u2756"];
var CAPS_LOCK = ["CapsLock", "\u21EA", "\u21EA"];
var Modifier = {
  Primary: (isMac) => isMac ? [COMMAND[0]] : [CTRL[0]],
  PrimaryShift: (isMac) => isMac ? [SHIFT[0], COMMAND[0]] : [CTRL[0], SHIFT[0]],
  PrimaryAlt: (isMac) => isMac ? [ALT[0], COMMAND[0]] : [CTRL[0], ALT[0]],
  Secondary: (isMac) => isMac ? [SHIFT[0], ALT[0], COMMAND[0]] : [CTRL[0], SHIFT[0], ALT[0]],
  Access: (isMac) => isMac ? [CTRL[0], ALT[0]] : [SHIFT[0], ALT[0]],
  Ctrl: () => [CTRL[0]],
  Alt: () => [ALT[0]],
  CtrlShift: () => [CTRL[0], SHIFT[0]],
  Shift: () => [SHIFT[0]],
  ShiftAlt: () => [SHIFT[0], ALT[0]]
};
function mod(modifier, key, isMacFn = isApple) {
  switch (modifier) {
    case "Primary":
      return "".concat(Modifier[modifier](isMacFn()).join("-"), "-").concat(key);
    case "PrimaryShift":
      return "".concat(Modifier[modifier](isMacFn()).join("-"), "-").concat(key);
    case "PrimaryAlt":
      return "".concat(Modifier[modifier](isMacFn()).join("-"), "-").concat(key);
    case "Secondary":
      return "".concat(Modifier[modifier](isMacFn()).join("-"), "-").concat(key);
    case "Access":
      return "".concat(Modifier[modifier](isMacFn()).join("-"), "-").concat(key);
    case "Ctrl":
      return "".concat(Modifier[modifier]().join("-"), "-").concat(key);
    case "Alt":
      return "".concat(Modifier[modifier]().join("-"), "-").concat(key);
    case "CtrlShift":
      return "".concat(Modifier[modifier]().join("-"), "-").concat(key);
    case "Shift":
      return "".concat(Modifier[modifier]().join("-"), "-").concat(key);
    case "ShiftAlt":
      return "".concat(Modifier[modifier]().join("-"), "-").concat(key);
    default:
      throw new Error("Invalid modifier name passed in");
  }
}
var getModifiers = ({ modifiers, isMac = false }) => {
  const list = [];
  for (const modifier of modifiers) {
    if (/^(cmd|meta|m)$/i.test(modifier)) {
      list.push(COMMAND[0]);
    } else if (/^a(lt)?$/i.test(modifier)) {
      list.push(ALT[0]);
    } else if (/^(c|ctrl|control)$/i.test(modifier)) {
      list.push(CTRL[0]);
    } else if (/^s(hift)?$/i.test(modifier)) {
      list.push(SHIFT[0]);
    } else if (/^mod$/i.test(modifier)) {
      if (isMac) {
        list.push(COMMAND[0]);
      } else {
        list.push(CTRL[0]);
      }
    } else {
      throw new Error("Unrecognized modifier name: ".concat(modifier));
    }
  }
  return list;
};
var selectAll = async (options = {}) => {
  const { page: playwrightPage = page } = options;
  await playwrightPage.evaluate(() => {
    const isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
    const dom = document.activeElement;
    if (!dom) {
      return;
    }
    dom.dispatchEvent(
      new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: isMac ? "Meta" : "Control",
        code: isMac ? "MetaLeft" : "ControlLeft",
        location: KeyboardEvent.DOM_KEY_LOCATION_LEFT,
        getModifierState: (keyArg) => keyArg === (isMac ? "Meta" : "Control"),
        ctrlKey: !isMac,
        metaKey: isMac,
        charCode: 0,
        keyCode: isMac ? 93 : 17,
        which: isMac ? 93 : 17
      })
    );
    const preventableEvent = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: "a",
      code: "KeyA",
      location: KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
      getModifierState: (keyArg) => keyArg === (isMac ? "Meta" : "Control"),
      ctrlKey: !isMac,
      metaKey: isMac,
      charCode: 0,
      keyCode: 65,
      which: 65
    });
    const wasPrevented = !dom.dispatchEvent(preventableEvent) || preventableEvent.defaultPrevented;
    if (!wasPrevented) {
      document.execCommand("selectall", false);
    }
    dom.dispatchEvent(
      new KeyboardEvent("keyup", {
        bubbles: true,
        cancelable: true,
        key: isMac ? "Meta" : "Control",
        code: isMac ? "MetaLeft" : "ControlLeft",
        location: KeyboardEvent.DOM_KEY_LOCATION_LEFT,
        getModifierState: () => false,
        charCode: 0,
        keyCode: isMac ? 93 : 17,
        which: isMac ? 93 : 17
      })
    );
  });
  if (options.delay) {
    return delay(options.delay);
  }
};
var selectAllShortcuts = /* @__PURE__ */ new Set([
  "cmd-a",
  "meta-a",
  "m-a",
  "ctrl-a",
  "control-a",
  "c-a",
  "mod-a"
]);
function isApple() {
  return process.platform === "darwin";
}
async function pressKeyWithModifier(pattern) {
  if (selectAllShortcuts.has(pattern.toLowerCase())) {
    return selectAll();
  }
  let modifiers = pattern.split(/-(?!$)/);
  let key = modifiers[modifiers.length - 1];
  modifiers = take(modifiers, modifiers.length - 1);
  if (key === "Space") {
    key = " ";
  }
  const list = getModifiers({ modifiers, isMac: isApple() });
  await Promise.all(list.map(async (modifier) => page.keyboard.down(modifier)));
  if (!key) {
    return;
  }
  await page.keyboard.press(key);
  await Promise.all(list.map(async (modifier) => page.keyboard.up(modifier)));
}

// src/playwright/playwright-images.ts
import { mkdir, writeFile } from "fs/promises";
import looksSame, { createDiff } from "looks-same";
import path from "path";
import { kebabCase } from "@remirror/core";
function tempDir(...paths) {
  return path.resolve(__dirname, "../..", "__failed-diffs__", ...paths);
}
function toPng(name) {
  return !name.endsWith(".png") ? "".concat(name, ".png") : name;
}
function getDiffPaths() {
  const testName = kebabCase(jestCircus.currentTestName.toLowerCase());
  return {
    diff: tempDir(toPng(testName)),
    one: tempDir(toPng("".concat(testName, "_1"))),
    two: tempDir(toPng("".concat(testName, "_2")))
  };
}
function imagesMatch(image1, image2) {
  return new Promise((resolve, reject) => {
    looksSame(image1, image2, { ignoreCaret: true }, (error, { equal }) => {
      if (equal) {
        resolve(equal);
        return;
      }
      const { diff, one, two } = getDiffPaths();
      mkdir(path.dirname(diff), { recursive: true }).then(() => Promise.all([writeFile(one, image1), writeFile(two, image2)])).then(() => {
        createDiff(
          {
            reference: image1,
            current: image2,
            diff,
            highlightColor: "#ff00ff"
          },
          (diffError) => {
            if (diffError) {
              reject(new Error("Could not create diff after failing test ".concat(diffError.message)));
              return;
            }
            reject(error != null ? error : new Error("Images do not match. Diff created at path ".concat(diff)));
          }
        );
      });
    });
  });
}

// src/playwright/playwright-shared.ts
function smokeTest(url = "/") {
  test("can navigate to '".concat(url, "'"), async () => {
    await goto(url);
  });
}
function ssrTest(description, url) {
  test("ssr - ".concat(description), async () => {
    let currentPage;
    currentPage = await browser.newPage({ javaScriptEnabled: false });
    await goto(url);
    const ssrImage = await currentPage.screenshot();
    await currentPage.close();
    currentPage = await browser.newPage({ javaScriptEnabled: true });
    await goto(url);
    const domImage = await currentPage.screenshot();
    await currentPage.close();
    await expect(imagesMatch(ssrImage, domImage)).resolves.toBeTrue();
  });
}

// src/playwright/playwright-typist.ts
import delay2 from "delay";
var typist = createTypist({ delay: 10 });
function createTypist(options = {}) {
  return async function typist2(text, optionsOverride) {
    for (const action of createActionQueue(text, __spreadValues(__spreadValues({}, options), optionsOverride))) {
      await action(options);
    }
  };
}
var defaultModifierActions = __spreadProps(__spreadValues(__spreadProps(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, createCloseableAction("shift", "Shift")), createCloseableAction("ctrl", "Control")), createCloseableAction("alt", "Alt")), createCloseableAction("meta", "Meta")), createCloseableAction("mod", isApple() ? "Meta" : "Control")), createCloseableAction("cmd", "Meta")), {
  // General modifiers.
  "{selectall}": ({ delay: delay3 }) => selectAll({ delay: delay3 }),
  "{capslock}": ({ delay: delay3 }) => page.keyboard.press("CapsLock", { delay: delay3 }),
  "{arrowleft}": ({ delay: delay3 }) => page.keyboard.press("ArrowLeft", { delay: delay3 }),
  "{arrowright}": ({ delay: delay3 }) => page.keyboard.press("ArrowRight", { delay: delay3 }),
  "{arrowdown}": ({ delay: delay3 }) => page.keyboard.press("ArrowDown", { delay: delay3 }),
  "{arrowup}": ({ delay: delay3 }) => page.keyboard.press("ArrowUp", { delay: delay3 }),
  "{pagedown}": ({ delay: delay3 }) => page.keyboard.press("PageDown", { delay: delay3 }),
  "{pageup}": ({ delay: delay3 }) => page.keyboard.press("PageUp", { delay: delay3 })
}), createAliasedActions()), {
  "{enter}": ({ delay: delay3 }) => page.keyboard.press("Enter", { delay: delay3 }),
  "\n": ({ delay: delay3 }) => page.keyboard.press("Enter", { delay: delay3 }),
  "\r": ({ delay: delay3 }) => page.keyboard.press("Enter", { delay: delay3 }),
  "{tab}": ({ delay: delay3 }) => page.keyboard.press("Tab", { delay: delay3 }),
  "{esc}": ({ delay: delay3 }) => page.keyboard.press("Escape", { delay: delay3 }),
  "{del}": ({ delay: delay3 }) => page.keyboard.press("Delete", { delay: delay3 }),
  "{backspace}": ({ delay: delay3 }) => page.keyboard.press("Backspace", { delay: delay3 }),
  "{space}": ({ delay: delay3 }) => page.keyboard.press("Space", { delay: delay3 }),
  " ": ({ delay: delay3 }) => page.keyboard.press("Space", { delay: delay3 }),
  "{f1}": ({ delay: delay3 }) => page.keyboard.press("F1", { delay: delay3 }),
  "{f2}": ({ delay: delay3 }) => page.keyboard.press("F2", { delay: delay3 }),
  "{f3}": ({ delay: delay3 }) => page.keyboard.press("F3", { delay: delay3 }),
  "{f4}": ({ delay: delay3 }) => page.keyboard.press("F4", { delay: delay3 }),
  "{f5}": ({ delay: delay3 }) => page.keyboard.press("F5", { delay: delay3 }),
  "{f6}": ({ delay: delay3 }) => page.keyboard.press("F6", { delay: delay3 }),
  "{f7}": ({ delay: delay3 }) => page.keyboard.press("F7", { delay: delay3 }),
  "{f8}": ({ delay: delay3 }) => page.keyboard.press("F8", { delay: delay3 }),
  "{f9}": ({ delay: delay3 }) => page.keyboard.press("F9", { delay: delay3 }),
  "{f10}": ({ delay: delay3 }) => page.keyboard.press("F10", { delay: delay3 }),
  "{f11}": ({ delay: delay3 }) => page.keyboard.press("F11", { delay: delay3 }),
  "{f12}": ({ delay: delay3 }) => page.keyboard.press("F12", { delay: delay3 })
});
function createAliasedActions() {
  const homeAction = ({ delay: delay3, page: playwrightPage = page }) => isApple() ? Promise.resolve() : playwrightPage.keyboard.press("Home", { delay: delay3 });
  homeAction.alias = isApple() ? "{cmd}{arrowleft}{/cmd}" : void 0;
  const endAction = ({ delay: delay3, page: playwrightPage = page }) => isApple() ? Promise.resolve() : playwrightPage.keyboard.press("End", { delay: delay3 });
  endAction.alias = isApple() ? "{cmd}{arrowright}{/cmd}" : void 0;
  return {
    "{home}": homeAction,
    "{end}": endAction
  };
}
function createCloseableAction(name, key) {
  const openTag = "{".concat(name, "}");
  const closeTag = "{/".concat(name, "}");
  const open = async (options) => {
    await page.keyboard.down(key);
    return options.delay ? delay2(options.delay) : void 0;
  };
  const close = async (options) => {
    await page.keyboard.up(key);
    return options.delay ? delay2(options.delay) : void 0;
  };
  open.closingTag = closeTag;
  return {
    [openTag]: open,
    [closeTag]: close
  };
}
function* createActionQueue(text, options) {
  while (text) {
    const value = getAction(text, options);
    text = value.text;
    yield value.action;
  }
}
function getAction(text, options) {
  var _a;
  const value = Object.entries(__spreadValues(__spreadValues({}, defaultModifierActions), options.actions)).find(
    ([tag]) => text.startsWith(tag)
  );
  if (value) {
    const [tag, action] = value;
    text = text.slice(tag.length);
    if (!options.skipAutoClose && action.closingTag && !text.includes(action.closingTag)) {
      text += action.closingTag;
    }
    if (action.alias) {
      text = action.alias + text;
    }
    return { action, text };
  }
  const character = (_a = text[0]) != null ? _a : "";
  return {
    action: ({ delay: delay3 }) => page.keyboard.type(character, { delay: delay3 }),
    text: text.slice(1)
  };
}
export {
  $innerHtml,
  ALT,
  CAPS_LOCK,
  COMMAND,
  CTRL,
  Modifier,
  SHIFT,
  WINDOWS,
  clearEditor,
  createTypist,
  destroyServer,
  getBrowserName,
  getModifiers,
  goto,
  innerHtml,
  isApple,
  mod,
  outerHtml,
  prefixBrowserName,
  press,
  pressKeyWithModifier,
  sel,
  selectAll,
  server,
  servers,
  setupServer,
  smokeTest,
  ssrTest,
  startServer,
  textContent,
  type,
  typist
};
