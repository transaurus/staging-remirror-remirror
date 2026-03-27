var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);

// src/react-serializer.tsx
import React, { createElement, Fragment } from "react";
import {
  ErrorConstant,
  invariant,
  isArray,
  isPlainObject,
  isString,
  object as object2
} from "@remirror/core";

// src/ssr-utils.ts
import {
  hasOwnProperty,
  keys,
  object
} from "@remirror/core";

// src/ssr-constants.ts
var possibleStandardNames = {
  // HTML
  accept: "accept",
  acceptcharset: "acceptCharset",
  "accept-charset": "acceptCharset",
  accesskey: "accessKey",
  action: "action",
  allowfullscreen: "allowFullScreen",
  alt: "alt",
  as: "as",
  async: "async",
  autocapitalize: "autoCapitalize",
  autocomplete: "autoComplete",
  autocorrect: "autoCorrect",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  autosave: "autoSave",
  capture: "capture",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  challenge: "challenge",
  charset: "charSet",
  checked: "checked",
  children: "children",
  cite: "cite",
  class: "className",
  classid: "classID",
  classname: "className",
  cols: "cols",
  colspan: "colSpan",
  content: "content",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  controls: "controls",
  controlslist: "controlsList",
  coords: "coords",
  crossorigin: "crossOrigin",
  dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
  data: "data",
  datetime: "dateTime",
  default: "default",
  defaultchecked: "defaultChecked",
  defaultvalue: "defaultValue",
  defer: "defer",
  dir: "dir",
  disabled: "disabled",
  download: "download",
  draggable: "draggable",
  enctype: "encType",
  for: "htmlFor",
  form: "form",
  formmethod: "formMethod",
  formaction: "formAction",
  formenctype: "formEncType",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  frameborder: "frameBorder",
  headers: "headers",
  height: "height",
  hidden: "hidden",
  high: "high",
  href: "href",
  hreflang: "hrefLang",
  htmlfor: "htmlFor",
  httpequiv: "httpEquiv",
  "http-equiv": "httpEquiv",
  icon: "icon",
  id: "id",
  innerhtml: "innerHTML",
  inputmode: "inputMode",
  integrity: "integrity",
  is: "is",
  itemid: "itemID",
  itemprop: "itemProps",
  itemref: "itemRef",
  itemscope: "itemScope",
  itemtype: "itemType",
  keyparams: "keyProps",
  keytype: "keyType",
  kind: "kind",
  label: "label",
  lang: "lang",
  list: "list",
  loop: "loop",
  low: "low",
  manifest: "manifest",
  marginwidth: "marginWidth",
  marginheight: "marginHeight",
  max: "max",
  maxlength: "maxLength",
  media: "media",
  mediagroup: "mediaGroup",
  method: "method",
  min: "min",
  minlength: "minLength",
  multiple: "multiple",
  muted: "muted",
  name: "name",
  nomodule: "noModule",
  nonce: "nonce",
  novalidate: "noValidate",
  open: "open",
  optimum: "optimum",
  pattern: "pattern",
  placeholder: "placeholder",
  playsinline: "playsInline",
  poster: "poster",
  preload: "preload",
  profile: "profile",
  radiogroup: "radioGroup",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rel: "rel",
  required: "required",
  reversed: "reversed",
  role: "role",
  rows: "rows",
  rowspan: "rowSpan",
  sandbox: "sandbox",
  scope: "scope",
  scoped: "scoped",
  scrolling: "scrolling",
  seamless: "seamless",
  selected: "selected",
  shape: "shape",
  size: "size",
  sizes: "sizes",
  span: "span",
  spellcheck: "spellCheck",
  src: "src",
  srcdoc: "srcDoc",
  srclang: "srcLang",
  srcset: "srcSet",
  start: "start",
  step: "step",
  style: "style",
  summary: "summary",
  tabindex: "tabIndex",
  target: "target",
  title: "title",
  type: "type",
  usemap: "useMap",
  value: "value",
  width: "width",
  wmode: "wmode",
  wrap: "wrap",
  // SVG
  about: "about",
  accentheight: "accentHeight",
  "accent-height": "accentHeight",
  accumulate: "accumulate",
  additive: "additive",
  alignmentbaseline: "alignmentBaseline",
  "alignment-baseline": "alignmentBaseline",
  allowreorder: "allowReorder",
  alphabetic: "alphabetic",
  amplitude: "amplitude",
  arabicform: "arabicForm",
  "arabic-form": "arabicForm",
  ascent: "ascent",
  attributename: "attributeName",
  attributetype: "attributeType",
  autoreverse: "autoReverse",
  azimuth: "azimuth",
  basefrequency: "baseFrequency",
  baselineshift: "baselineShift",
  "baseline-shift": "baselineShift",
  baseprofile: "baseProfile",
  bbox: "bbox",
  begin: "begin",
  bias: "bias",
  by: "by",
  calcmode: "calcMode",
  capheight: "capHeight",
  "cap-height": "capHeight",
  clip: "clip",
  clippath: "clipPath",
  "clip-path": "clipPath",
  clippathunits: "clipPathUnits",
  cliprule: "clipRule",
  "clip-rule": "clipRule",
  color: "color",
  colorinterpolation: "colorInterpolation",
  "color-interpolation": "colorInterpolation",
  colorinterpolationfilters: "colorInterpolationFilters",
  "color-interpolation-filters": "colorInterpolationFilters",
  colorprofile: "colorProfile",
  "color-profile": "colorProfile",
  colorrendering: "colorRendering",
  "color-rendering": "colorRendering",
  contentscripttype: "contentScriptType",
  contentstyletype: "contentStyleType",
  cursor: "cursor",
  cx: "cx",
  cy: "cy",
  d: "d",
  datatype: "datatype",
  decelerate: "decelerate",
  descent: "descent",
  diffuseconstant: "diffuseConstant",
  direction: "direction",
  display: "display",
  divisor: "divisor",
  dominantbaseline: "dominantBaseline",
  "dominant-baseline": "dominantBaseline",
  dur: "dur",
  dx: "dx",
  dy: "dy",
  edgemode: "edgeMode",
  elevation: "elevation",
  enablebackground: "enableBackground",
  "enable-background": "enableBackground",
  end: "end",
  exponent: "exponent",
  externalresourcesrequired: "externalResourcesRequired",
  fill: "fill",
  fillopacity: "fillOpacity",
  "fill-opacity": "fillOpacity",
  fillrule: "fillRule",
  "fill-rule": "fillRule",
  filter: "filter",
  filterres: "filterRes",
  filterunits: "filterUnits",
  floodopacity: "floodOpacity",
  "flood-opacity": "floodOpacity",
  floodcolor: "floodColor",
  "flood-color": "floodColor",
  focusable: "focusable",
  fontfamily: "fontFamily",
  "font-family": "fontFamily",
  fontsize: "fontSize",
  "font-size": "fontSize",
  fontsizeadjust: "fontSizeAdjust",
  "font-size-adjust": "fontSizeAdjust",
  fontstretch: "fontStretch",
  "font-stretch": "fontStretch",
  fontstyle: "fontStyle",
  "font-style": "fontStyle",
  fontvariant: "fontVariant",
  "font-variant": "fontVariant",
  fontweight: "fontWeight",
  "font-weight": "fontWeight",
  format: "format",
  from: "from",
  fx: "fx",
  fy: "fy",
  g1: "g1",
  g2: "g2",
  glyphname: "glyphName",
  "glyph-name": "glyphName",
  glyphorientationhorizontal: "glyphOrientationHorizontal",
  "glyph-orientation-horizontal": "glyphOrientationHorizontal",
  glyphorientationvertical: "glyphOrientationVertical",
  "glyph-orientation-vertical": "glyphOrientationVertical",
  glyphref: "glyphRef",
  gradienttransform: "gradientTransform",
  gradientunits: "gradientUnits",
  hanging: "hanging",
  horizadvx: "horizAdvX",
  "horiz-adv-x": "horizAdvX",
  horizoriginx: "horizOriginX",
  "horiz-origin-x": "horizOriginX",
  ideographic: "ideographic",
  imagerendering: "imageRendering",
  "image-rendering": "imageRendering",
  in2: "in2",
  in: "in",
  inlist: "inlist",
  intercept: "intercept",
  k1: "k1",
  k2: "k2",
  k3: "k3",
  k4: "k4",
  k: "k",
  kernelmatrix: "kernelMatrix",
  kernelunitlength: "kernelUnitLength",
  kerning: "kerning",
  keypoints: "keyPoints",
  keysplines: "keySplines",
  keytimes: "keyTimes",
  lengthadjust: "lengthAdjust",
  letterspacing: "letterSpacing",
  "letter-spacing": "letterSpacing",
  lightingcolor: "lightingColor",
  "lighting-color": "lightingColor",
  limitingconeangle: "limitingConeAngle",
  local: "local",
  markerend: "markerEnd",
  "marker-end": "markerEnd",
  markerheight: "markerHeight",
  markermid: "markerMid",
  "marker-mid": "markerMid",
  markerstart: "markerStart",
  "marker-start": "markerStart",
  markerunits: "markerUnits",
  markerwidth: "markerWidth",
  mask: "mask",
  maskcontentunits: "maskContentUnits",
  maskunits: "maskUnits",
  mathematical: "mathematical",
  mode: "mode",
  numoctaves: "numOctaves",
  offset: "offset",
  opacity: "opacity",
  operator: "operator",
  order: "order",
  orient: "orient",
  orientation: "orientation",
  origin: "origin",
  overflow: "overflow",
  overlineposition: "overlinePosition",
  "overline-position": "overlinePosition",
  overlinethickness: "overlineThickness",
  "overline-thickness": "overlineThickness",
  paintorder: "paintOrder",
  "paint-order": "paintOrder",
  panose1: "panose1",
  "panose-1": "panose1",
  pathlength: "pathLength",
  patterncontentunits: "patternContentUnits",
  patterntransform: "patternTransform",
  patternunits: "patternUnits",
  pointerevents: "pointerEvents",
  "pointer-events": "pointerEvents",
  points: "points",
  pointsatx: "pointsAtX",
  pointsaty: "pointsAtY",
  pointsatz: "pointsAtZ",
  prefix: "prefix",
  preservealpha: "preserveAlpha",
  preserveaspectratio: "preserveAspectRatio",
  primitiveunits: "primitiveUnits",
  property: "property",
  r: "r",
  radius: "radius",
  refx: "refX",
  refy: "refY",
  renderingintent: "renderingIntent",
  "rendering-intent": "renderingIntent",
  repeatcount: "repeatCount",
  repeatdur: "repeatDur",
  requiredextensions: "requiredExtensions",
  requiredfeatures: "requiredFeatures",
  resource: "resource",
  restart: "restart",
  result: "result",
  results: "results",
  rotate: "rotate",
  rx: "rx",
  ry: "ry",
  scale: "scale",
  security: "security",
  seed: "seed",
  shaperendering: "shapeRendering",
  "shape-rendering": "shapeRendering",
  slope: "slope",
  spacing: "spacing",
  specularconstant: "specularConstant",
  specularexponent: "specularExponent",
  speed: "speed",
  spreadmethod: "spreadMethod",
  startoffset: "startOffset",
  stddeviation: "stdDeviation",
  stemh: "stemh",
  stemv: "stemv",
  stitchtiles: "stitchTiles",
  stopcolor: "stopColor",
  "stop-color": "stopColor",
  stopopacity: "stopOpacity",
  "stop-opacity": "stopOpacity",
  strikethroughposition: "strikethroughPosition",
  "strikethrough-position": "strikethroughPosition",
  strikethroughthickness: "strikethroughThickness",
  "strikethrough-thickness": "strikethroughThickness",
  string: "string",
  stroke: "stroke",
  strokedasharray: "strokeDasharray",
  "stroke-dasharray": "strokeDasharray",
  strokedashoffset: "strokeDashoffset",
  "stroke-dashoffset": "strokeDashoffset",
  strokelinecap: "strokeLinecap",
  "stroke-linecap": "strokeLinecap",
  strokelinejoin: "strokeLinejoin",
  "stroke-linejoin": "strokeLinejoin",
  strokemiterlimit: "strokeMiterlimit",
  "stroke-miterlimit": "strokeMiterlimit",
  strokewidth: "strokeWidth",
  "stroke-width": "strokeWidth",
  strokeopacity: "strokeOpacity",
  "stroke-opacity": "strokeOpacity",
  suppresscontenteditablewarning: "suppressContentEditableWarning",
  suppresshydrationwarning: "suppressHydrationWarning",
  surfacescale: "surfaceScale",
  systemlanguage: "systemLanguage",
  tablevalues: "tableValues",
  targetx: "targetX",
  targety: "targetY",
  textanchor: "textAnchor",
  "text-anchor": "textAnchor",
  textdecoration: "textDecoration",
  "text-decoration": "textDecoration",
  textlength: "textLength",
  textrendering: "textRendering",
  "text-rendering": "textRendering",
  to: "to",
  transform: "transform",
  typeof: "typeof",
  u1: "u1",
  u2: "u2",
  underlineposition: "underlinePosition",
  "underline-position": "underlinePosition",
  underlinethickness: "underlineThickness",
  "underline-thickness": "underlineThickness",
  unicode: "unicode",
  unicodebidi: "unicodeBidi",
  "unicode-bidi": "unicodeBidi",
  unicoderange: "unicodeRange",
  "unicode-range": "unicodeRange",
  unitsperem: "unitsPerEm",
  "units-per-em": "unitsPerEm",
  unselectable: "unselectable",
  valphabetic: "vAlphabetic",
  "v-alphabetic": "vAlphabetic",
  values: "values",
  vectoreffect: "vectorEffect",
  "vector-effect": "vectorEffect",
  version: "version",
  vertadvy: "vertAdvY",
  "vert-adv-y": "vertAdvY",
  vertoriginx: "vertOriginX",
  "vert-origin-x": "vertOriginX",
  vertoriginy: "vertOriginY",
  "vert-origin-y": "vertOriginY",
  vhanging: "vHanging",
  "v-hanging": "vHanging",
  videographic: "vIdeographic",
  "v-ideographic": "vIdeographic",
  viewbox: "viewBox",
  viewtarget: "viewTarget",
  visibility: "visibility",
  vmathematical: "vMathematical",
  "v-mathematical": "vMathematical",
  vocab: "vocab",
  widths: "widths",
  wordspacing: "wordSpacing",
  "word-spacing": "wordSpacing",
  writingmode: "writingMode",
  "writing-mode": "writingMode",
  x1: "x1",
  x2: "x2",
  x: "x",
  xchannelselector: "xChannelSelector",
  xheight: "xHeight",
  "x-height": "xHeight",
  xlinkactuate: "xlinkActuate",
  "xlink:actuate": "xlinkActuate",
  xlinkarcrole: "xlinkArcrole",
  "xlink:arcrole": "xlinkArcrole",
  xlinkhref: "xlinkHref",
  "xlink:href": "xlinkHref",
  xlinkrole: "xlinkRole",
  "xlink:role": "xlinkRole",
  xlinkshow: "xlinkShow",
  "xlink:show": "xlinkShow",
  xlinktitle: "xlinkTitle",
  "xlink:title": "xlinkTitle",
  xlinktype: "xlinkType",
  "xlink:type": "xlinkType",
  xmlbase: "xmlBase",
  "xml:base": "xmlBase",
  xmllang: "xmlLang",
  "xml:lang": "xmlLang",
  xmlns: "xmlns",
  "xml:space": "xmlSpace",
  xmlnsxlink: "xmlnsXlink",
  "xmlns:xlink": "xmlnsXlink",
  xmlspace: "xmlSpace",
  y1: "y1",
  y2: "y2",
  y: "y",
  ychannelselector: "yChannelSelector",
  z: "z",
  zoomandpan: "zoomAndPan"
};

// src/ssr-utils.ts
function getPossibleStandardName(key) {
  var _a;
  if (!hasOwnProperty(possibleStandardNames, key)) {
    return key;
  }
  return (_a = possibleStandardNames[key]) != null ? _a : key;
}
function mapProps(props) {
  const transformedProps = object();
  for (const key of keys(props)) {
    const name = getPossibleStandardName(key);
    transformedProps[name] = props[key];
    if (name === "contentEditable") {
      transformedProps.suppressContentEditableWarning = true;
    }
  }
  return transformedProps;
}
function gatherDomMethods(specs) {
  var _a;
  const result = object();
  for (const name in specs) {
    if (!hasOwnProperty(specs, name)) {
      continue;
    }
    const toDOM = (_a = specs[name]) == null ? void 0 : _a.toDOM;
    if (toDOM) {
      result[name] = toDOM;
    }
  }
  return result;
}

// src/react-serializer.tsx
var _components, _view;
var _ReactSerializer = class _ReactSerializer {
  constructor(nodes, marks, manager) {
    __publicField(this, "nodes");
    __publicField(this, "marks");
    __privateAdd(this, _components);
    __privateAdd(this, _view);
    var _a;
    this.nodes = nodes;
    this.marks = marks;
    __privateSet(this, _components, (_a = manager.store.components) != null ? _a : object2());
    __privateSet(this, _view, manager.view);
  }
  /**
   * Receives the return value from toDOM defined in the node schema and transforms it
   * into JSX
   *
   * @param structure - The DOMOutput spec for the current node
   * @param wraps - passed through any elements that this component should be parent of
   */
  static renderSpec(structure, wraps) {
    if (isString(structure)) {
      return structure;
    }
    const Component = structure[0];
    const props = object2();
    const attributes = structure[1];
    const children = [];
    let currentIndex = 1;
    if (isPlainObject(attributes) && !isArray(attributes)) {
      currentIndex = 2;
      for (const name in attributes) {
        if (attributes[name] != null) {
          props[name] = attributes[name];
        }
      }
    }
    for (let ii = currentIndex; ii < structure.length; ii++) {
      const child = structure[ii];
      if (child === 0) {
        invariant(!(ii < structure.length - 1 || ii > currentIndex), {
          message: "Content hole (0) must be the only child of its parent node",
          code: ErrorConstant.INTERNAL
        });
        return createElement(Component, mapProps(props), wraps);
      }
      children.push(_ReactSerializer.renderSpec(child, wraps));
    }
    return createElement(Component, mapProps(props), ...children);
  }
  /**
   * Create a serializer from the extension manager
   *
   * @param manager
   */
  static fromManager(manager) {
    return new _ReactSerializer(
      this.nodesFromManager(manager),
      this.marksFromManager(manager),
      manager
    );
  }
  /**
   * Pluck nodes from the extension manager
   *
   * @param manager
   */
  static nodesFromManager(manager) {
    const result = gatherDomMethods(manager.nodes);
    if (!result.text) {
      result.text = (node) => node.text ? node.text : "";
    }
    return result;
  }
  /**
   * Pluck marks from the extension manager
   *
   * @param manager
   */
  static marksFromManager(manager) {
    return gatherDomMethods(manager.marks);
  }
  /**
   * The main entry method on this class for traversing through a schema tree and creating JSx.
   *
   * ```ts
   * reactSerializer.serializeFragment(fragment)
   * ```
   *
   * @param fragment
   */
  serializeFragment(fragment) {
    const children = [];
    fragment.forEach((node) => {
      let child;
      child = this.serializeNode(node);
      [...node.marks].reverse().forEach((mark) => {
        child = this.serializeMark(mark, node.isInline, child);
      });
      children.push(child);
    });
    return createElement(Fragment, {}, ...children);
  }
  /**
   * Transform the passed in node into a JSX Element
   *
   * @param node
   */
  serializeNode(node) {
    const managerStoreComponent = __privateGet(this, _components)[node.type.name];
    const toDOM = this.nodes[node.type.name];
    let children;
    if (node.content.childCount > 0) {
      children = this.serializeFragment(node.content);
    }
    if (managerStoreComponent) {
      const { Component, props } = managerStoreComponent;
      return /* @__PURE__ */ React.createElement(Component, __spreadProps(__spreadValues({}, props), { node, view: __privateGet(this, _view) }), children);
    }
    return toDOM && _ReactSerializer.renderSpec(toDOM(node), children);
  }
  /**
   * Transform the provided mark into a JSX Element that wraps the current node
   *
   * @param mark
   * @param inline
   * @param wrappedElement
   */
  serializeMark(mark, inline, wrappedElement) {
    const toDOM = this.marks[mark.type.name];
    return toDOM && _ReactSerializer.renderSpec(toDOM(mark, inline), wrappedElement);
  }
};
_components = new WeakMap();
_view = new WeakMap();
var ReactSerializer = _ReactSerializer;

// src/ssr-component.tsx
import React2 from "react";
var RemirrorSSR = (props) => {
  const { attributes, manager, state, editable } = props;
  const outerProperties = mapProps(attributes);
  const ssrElement = ReactSerializer.fromManager(manager).serializeFragment(state.doc.content);
  const transformedElement = manager.store.ssrTransformer(ssrElement, state);
  return /* @__PURE__ */ React2.createElement("div", __spreadProps(__spreadValues({}, outerProperties), { suppressContentEditableWarning: true, contentEditable: editable }), transformedElement);
};

// src/ssr-prosemirror-view.ts
import {
  Cast,
  getDocument,
  shouldUseDomEnvironment
} from "@remirror/core";
import { EditorView as EditorView2 } from "@remirror/pm/view";
var EditorViewSSR = class {
  constructor(_place, props) {
    __publicField(this, "state");
    __publicField(this, "dom");
    __publicField(this, "dragging", null);
    __publicField(this, "root");
    const doc = getDocument();
    this.root = doc;
    this.dom = doc.createElement("div");
    this.state = props.state;
  }
  update(_props) {
  }
  setProps(_props) {
  }
  updateState(_state) {
  }
  someProps(_propName, f) {
    return f ? f(null) : null;
  }
  hasFocus() {
    return false;
  }
  focus() {
  }
  posAtCoords(_coords) {
    return null;
  }
  coordsAtPos(_pos) {
    return { bottom: 0, left: 0, right: 0, top: 0 };
  }
  domAtPos(_pos) {
    return { node: this.dom, offset: 0 };
  }
  nodeDOM(_pos) {
    return null;
  }
  posAtDOM(_node, _offset, _bias) {
    return 0;
  }
  endOfTextblock(_dir, _state) {
    return true;
  }
  /**
   * Removes the editor from the DOM and destroys all [node
   * views](#view.NodeView).
   */
  destroy() {
  }
  dispatch(_tr) {
  }
};
function createEditorView(place, props) {
  const Constructor = shouldUseDomEnvironment() ? EditorView2 : Cast(EditorViewSSR);
  return new Constructor(place, props);
}
export {
  EditorViewSSR,
  ReactSerializer,
  RemirrorSSR,
  createEditorView
};
