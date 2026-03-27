'use strict';

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var chalk = require('chalk');
var cheerio = require('cheerio');
var fs = require('fs');
var globby = require('globby');
var loadJson = require('load-json-file');
var path = require('path');
var coreHelpers = require('@remirror/core-helpers');
var helpers = require('../../dist/helpers-249dc920.cjs.prod.js');
require('@babel/runtime/helpers/objectSpread2');
require('@changesets/pre');
require('@changesets/read');
require('@manypkg/get-packages');
require('assert');
require('camelcase-keys');
require('child_process');
require('jest-diff');
require('lodash.isequal');
require('minimist');
require('rimraf');
require('throttle-debounce');
require('tslog');
require('util');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefault(chalk);
var cheerio__default = /*#__PURE__*/_interopDefault(cheerio);
var globby__default = /*#__PURE__*/_interopDefault(globby);
var loadJson__default = /*#__PURE__*/_interopDefault(loadJson);
var path__default = /*#__PURE__*/_interopDefault(path);

var _templateObject, _templateObject2;
var data = loadJson__default["default"].sync(helpers.baseDir('support', 'scripts', 'data', 'icons.json'));

// The icons which will are used within the `remirror` code base and included in
// the default bundle.
var coreIcons = new Set(data.icons);
var remixIconNodeModules = path__default["default"].resolve(__dirname, '../node_modules/remixicon/icons');
var remixIconContents = path__default["default"].join(remixIconNodeModules, './*/*.svg');
var coreIconsPath = helpers.baseDir('packages/remirror__icons/src/core-icons.ts');
var coreComponentsPath = helpers.baseDir('packages/remirror__react-components/src/icons/core.ts');
var allIconsPath = helpers.baseDir('packages/remirror__icons/src/all-icons.ts');
var allComponentsPath = helpers.baseDir('packages/remirror__react-components/src/icons/all.ts');

/**
 * Get all the icon files from the provided glob
 */
function getIconFiles(_x) {
  return _getIconFiles.apply(this, arguments);
}
/**
 * These are the ignored names for the svg content.
 */
function _getIconFiles() {
  _getIconFiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(glob) {
    var files, core, all, _iterator, _step, file;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return globby__default["default"](glob, {
            absolute: true,
            onlyFiles: true
          });
        case 2:
          files = _context.sent;
          files.sort((a, z) => path__default["default"].basename(a).localeCompare(path__default["default"].basename(z)));
          core = [];
          all = [];
          _iterator = _createForOfIteratorHelper(files);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              file = _step.value;
              if (coreIcons.has(path__default["default"].basename(file))) {
                core.push(file);
              } else {
                all.push(file);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return _context.abrupt("return", {
            core,
            all
          });
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getIconFiles.apply(this, arguments);
}
function getInvalidNames(tagName) {
  var invalidNames = ['class'];
  if (tagName === 'svg') {
    invalidNames.push(...['xmlns', 'xmlns:xlink', 'xml:space', 'width', 'height']);
  }
  return new Set(invalidNames);
}
function convertIconData(_x2) {
  return _convertIconData.apply(this, arguments);
}
/**
 * Create the import statement for the component files, which pulls in the icons
 * from `@remirror/icons`.
 */
function _convertIconData() {
  _convertIconData = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(svg) {
    var _tree$;
    var $svg, attributeConverter, elementToTree, tree;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          elementToTree = function _elementToTree($element) {
            var _$element$get;
            var iconTrees = [];
            var _iterator3 = _createForOfIteratorHelper((_$element$get = $element.get()) !== null && _$element$get !== void 0 ? _$element$get : []),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _$child$children;
                var $child = _step3.value;
                if (!($child.tagName && !['style'].includes($child.tagName))) {
                  continue;
                }
                var tag = $child.tagName;
                var attr = attributeConverter($child.attributes, $child.tagName);
                var child = (_$child$children = $child.children) !== null && _$child$children !== void 0 && _$child$children.length ? elementToTree(cheerio__default["default"]($child.children)) : undefined;
                if (tag === 'g' && coreHelpers.isEmptyObject(attr) && child !== null && child !== void 0 && child.length) {
                  iconTrees.push(...child);
                } else {
                  iconTrees.push({
                    tag,
                    attr,
                    child
                  });
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            return iconTrees;
          };
          attributeConverter = function _attributeConverter(attrs, tagName) {
            var attributes = coreHelpers.object();
            var convertedAttributes = coreHelpers.object();
            var invalidNames = getInvalidNames(tagName);
            var _iterator2 = _createForOfIteratorHelper(attrs),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var attr = _step2.value;
                attributes[attr.name] = attr === null || attr === void 0 ? void 0 : attr.value;
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
            for (var _i = 0, _Object$entries = Object.entries(attributes); _i < _Object$entries.length; _i++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                name = _Object$entries$_i[0],
                value = _Object$entries$_i[1];
              if (invalidNames.has(name)) {
                continue;
              }
              var newName = coreHelpers.camelCase(name);
              var shouldRenameAttribute = newName === 'fill' && (value === 'none' || value === 'currentColor') || newName !== 'fill';
              if (shouldRenameAttribute) {
                convertedAttributes[newName] = value;
              }
            }
            return convertedAttributes;
          };
          $svg = cheerio__default["default"].load(svg, {
            xmlMode: true
          })('svg'); // filter/convert attributes
          // 1. remove class attr
          // 2. convert to camelcase ex: fill-opacity => fillOpacity
          tree = elementToTree($svg); // Get the first child to avoid the top level `svg` tag which is not needed.
          return _context2.abrupt("return", (_tree$ = tree[0]) === null || _tree$ === void 0 ? void 0 : _tree$.child);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _convertIconData.apply(this, arguments);
}
function generateComponentIconImports(iconNames, type) {
  var importSource = 'core' === type ? '@remirror/icons' : '@remirror/icons/all';
  return "import {\n  ".concat(iconNames.join(',\n  '), "\n} from '").concat(importSource, "';");
}

/**
 * The first lines for the generate file.
 */
function generateFileHeader(type) {
  var importString = 'icon' === type ? "import type { IconTree } from './icon-types';" : "import { GenIcon, IconType } from './icons-base';";
  return "/** THIS FILE IS AUTO GENERATED */\n\n".concat(importString);
}

/**
 * Generate the export statement for the icon array.
 */
function generateIconExport(iconName, iconData, cdnPath) {
  var description = "The icon for `".concat(coreHelpers.kebabCase(iconName), ".svg` created by [RemixIcons](https://remixicons.com).\n *");
  return "/**\n * ".concat(description, " ![").concat(coreHelpers.capitalCase(iconName), "](https://cdn.jsdelivr.net/npm/remixicon@2.5.0/icons/").concat(cdnPath, ")\n */\nexport const ").concat(iconName, ": IconTree[] = ").concat(JSON.stringify(iconData !== null && iconData !== void 0 ? iconData : []), ";");
}

/**
 * Create the export statement for the icon component.
 */
function generateComponentExport(componentName, iconName, cdnPath) {
  var description = "The react component for the `".concat(coreHelpers.kebabCase(iconName), ".svg` icon created by [RemixIcons](https://remixicons.com).\n *");
  return "/**\n * ".concat(description, " ![").concat(coreHelpers.capitalCase(componentName), "](https://cdn.jsdelivr.net/npm/remixicon@2.5.0/icons/").concat(cdnPath, ")\n */\nexport const ").concat(componentName, ": IconType = (props) => {\n  return GenIcon(").concat(iconName, ")(props);\n};");
}

/**
 * Generate all exports.
 */
function generateAllExports(type) {
  return 'component' === type ? "export * from './core';" : "export * from './core-icons';";
}
/**
 * Update the content arrays.
 */
function updateContent(_x3, _x4, _x5) {
  return _updateContent.apply(this, arguments);
}
/**
 * Write the files for the created icons.
 */
function _updateContent() {
  _updateContent = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(files, _, options) {
    var names, iconContent, componentContent, _iterator4, _step4, file, pathForCdn, svgString, iconData, originalName, componentName, iconName;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          names = options.names, iconContent = options.iconContent, componentContent = options.componentContent;
          _iterator4 = _createForOfIteratorHelper(files);
          _context3.prev = 2;
          _iterator4.s();
        case 4:
          if ((_step4 = _iterator4.n()).done) {
            _context3.next = 23;
            break;
          }
          file = _step4.value;
          pathForCdn = path__default["default"].relative(remixIconNodeModules, file);
          _context3.next = 9;
          return fs.promises.readFile(file, 'utf8');
        case 9:
          svgString = _context3.sent;
          _context3.next = 12;
          return convertIconData(svgString);
        case 12:
          iconData = _context3.sent;
          originalName = path__default["default"].basename(file, path__default["default"].extname(file));
          componentName = "".concat(coreHelpers.pascalCase(originalName).replace(/^4/, 'Four').replace(/^24/, 'TwentyFour'), "Icon");
          iconName = coreHelpers.camelCase(componentName).replace(/Icon$/, '');
          if (!names.has(iconName)) {
            _context3.next = 18;
            break;
          }
          return _context3.abrupt("continue", 21);
        case 18:
          names.add(iconName);
          iconContent.push(generateIconExport(iconName, iconData, pathForCdn), '');
          componentContent.push(generateComponentExport(componentName, iconName, pathForCdn), '');
        case 21:
          _context3.next = 4;
          break;
        case 23:
          _context3.next = 28;
          break;
        case 25:
          _context3.prev = 25;
          _context3.t0 = _context3["catch"](2);
          _iterator4.e(_context3.t0);
        case 28:
          _context3.prev = 28;
          _iterator4.f();
          return _context3.finish(28);
        case 31:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 25, 28, 31]]);
  }));
  return _updateContent.apply(this, arguments);
}
function writeIconModule() {
  return _writeIconModule.apply(this, arguments);
}
/**
 * Run the script and generate icons.
 */
function _writeIconModule() {
  _writeIconModule = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var coreNames, allNames, iconHeader, componentHeader, iconExports, componentExports, coreIconContent, allIconContent, coreComponentContent, allComponentContent, allOptions, coreOptions, _yield$getIconFiles, core, all, coreIconString, allIconString, coreComponentString, allComponentString;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          coreNames = new Set();
          allNames = new Set();
          iconHeader = [generateFileHeader('icon'), ''];
          componentHeader = [generateFileHeader('component'), ''];
          iconExports = ['', generateAllExports('icon')];
          componentExports = ['', generateAllExports('component')];
          coreIconContent = [];
          allIconContent = [];
          coreComponentContent = [];
          allComponentContent = [];
          allOptions = {
            names: allNames,
            iconContent: allIconContent,
            componentContent: allComponentContent
          };
          coreOptions = {
            names: coreNames,
            iconContent: coreIconContent,
            componentContent: coreComponentContent
          }; // Sort alphabetically.
          _context4.next = 14;
          return getIconFiles(remixIconContents);
        case 14:
          _yield$getIconFiles = _context4.sent;
          core = _yield$getIconFiles.core;
          all = _yield$getIconFiles.all;
          _context4.next = 19;
          return Promise.all([updateContent(core, 'core', coreOptions), updateContent(all, 'all', allOptions)]);
        case 19:
          coreIconString = [...iconHeader, ...coreIconContent].join('\n');
          allIconString = [...iconHeader, ...allIconContent, ...iconExports].join('\n');
          coreComponentString = [...componentHeader, generateComponentIconImports([...coreNames], 'core'), '', ...coreComponentContent].join('\n');
          allComponentString = [...componentHeader, generateComponentIconImports([...allNames], 'all'), '', ...allComponentContent, ...componentExports].join('\n');
          _context4.next = 25;
          return Promise.all([fs.promises.writeFile(coreIconsPath, coreIconString), fs.promises.writeFile(allIconsPath, allIconString), fs.promises.writeFile(coreComponentsPath, coreComponentString), fs.promises.writeFile(allComponentsPath, allComponentString)]);
        case 25:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _writeIconModule.apply(this, arguments);
}
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    var formatPaths;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          helpers.log.debug(chalk__default["default"](_templateObject || (_templateObject = _taggedTemplateLiteral(["Generating icons for {grey `@remirror/react-components`}"], ["Generating icons for {grey \\`@remirror/react-components\\`}"]))));
          formatPaths = [coreIconsPath, coreComponentsPath, allIconsPath, allComponentsPath];
          _context5.next = 4;
          return writeIconModule();
        case 4:
          _context5.next = 6;
          return helpers.formatFiles(formatPaths, {
            silent: true
          });
        case 6:
          helpers.log.debug(chalk__default["default"](_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["{green Icons generated} \uD83D\uDE4C"]))));
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _run.apply(this, arguments);
}
run();
