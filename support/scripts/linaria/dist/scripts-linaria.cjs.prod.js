'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _toPropertyKey = require('@babel/runtime/helpers/toPropertyKey');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var babelPreset = require('@linaria/babel-preset');
var utils = require('@linaria/utils');
var autoprefixer = require('autoprefixer');
var chalk = require('chalk');
var cpy = require('cpy');
var fs = require('fs-extra');
var globby = require('globby');
var groupBy = require('lodash.groupby');
var path = require('path');
var postcss = require('postcss');
var postcssNested = require('postcss-nested');
var prettier = require('prettier');
var coreHelpers = require('@remirror/core-helpers');
var helpers = require('../../dist/helpers-249dc920.cjs.prod.js');
require('@changesets/pre');
require('@changesets/read');
require('@manypkg/get-packages');
require('assert');
require('camelcase-keys');
require('child_process');
require('fs');
require('jest-diff');
require('lodash.isequal');
require('minimist');
require('rimraf');
require('throttle-debounce');
require('tslog');
require('util');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var autoprefixer__default = /*#__PURE__*/_interopDefault(autoprefixer);
var chalk__default = /*#__PURE__*/_interopDefault(chalk);
var cpy__default = /*#__PURE__*/_interopDefault(cpy);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var globby__default = /*#__PURE__*/_interopDefault(globby);
var groupBy__default = /*#__PURE__*/_interopDefault(groupBy);
var path__default = /*#__PURE__*/_interopDefault(path);
var postcss__default = /*#__PURE__*/_interopDefault(postcss);
var postcssNested__default = /*#__PURE__*/_interopDefault(postcssNested);
var prettier__default = /*#__PURE__*/_interopDefault(prettier);

var _templateObject;

/**
 * The files to check when searching for linaria based css strings.
 *
 * @param {string[]} paths
 */
var files = globby__default["default"].sync(['packages/remirror__theme/src/*.{ts,tsx}'], {
  cwd: helpers.baseDir(),
  ignore: ['**/@remirror/styles', '**/website', '**/__tests__', '**/__dts__', '**/__mocks__', '**/__fixtures__', '*.{test,spec}.{ts,tsx}', '**/*.d.ts', '*.d.ts']
});

/**
 * The destination of the outputted css, where styles are eventually published
 * from.
 */
var outputDirectory = helpers.baseDir('packages/remirror__styles');

/**
 * This regex groups the generated css files from the same package together.
 */
var groupingRegex = /([\w-]+)\.ts$/;

/**
 * A dictionary mapping of files grouped together by their scoped identifier.
 * Where the package `@remirror/core` would have a scoped identifier of `core`.
 *
 * ```json
 * {
 *   "core": ["packages/remirror__core/src/styles.ts"],
 *   "react-social": ["packages/remirror__react-social/src/components/social-mentions.tsx"],
 * }
 * ```
 */
var groupedFiles = groupBy__default["default"](files, file => {
  var match = file.match(groupingRegex);
  var captured = match === null || match === void 0 ? void 0 : match[1];
  if (!captured) {
    throw new Error("Invalid file ".concat(file));
  }
  return captured.replace('-theme', '');
});

/**
 * Cache the prettier config to reuse when prettifying a file.
 *
 * @type {import('prettier').Options | null | undefined}
 */
var prettierConfig;

/**
 * Format the contents with prettier.
 *
 * @param contents - the content to format
 * @param parser - the parser to use for the formatting
 *
 * @returns formatted value of the provided content
 */
function formatContents(_x) {
  return _formatContents.apply(this, arguments);
}
/**
 * Process the css with `postcss` for prefixing, variables and other features.
 *
 * @param css - the untransformed css text
 * @param from - the path being transformed
 * @param to - the output path for the transformation
 */
function _formatContents() {
  _formatContents = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(contents) {
    var _prettierConfig, _yield$prettier$resol;
    var parser,
      extension,
      sampleFile,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          parser = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'css';
          extension = parser === 'typescript' ? '.ts' : '.css';
          sampleFile = path__default["default"].join(helpers.baseDir(), "sample".concat(extension)); // Check if the prettier config has been retrieved. If not, retrieve it.
          if (!((_prettierConfig = prettierConfig) !== null && _prettierConfig !== void 0)) {
            _context.next = 7;
            break;
          }
          _context.next = 19;
          break;
        case 7:
          _context.next = 9;
          return prettier__default["default"].resolveConfig(sampleFile);
        case 9:
          _context.t1 = _yield$prettier$resol = _context.sent;
          _context.t0 = _context.t1 !== null;
          if (!_context.t0) {
            _context.next = 13;
            break;
          }
          _context.t0 = _yield$prettier$resol !== void 0;
        case 13:
          if (!_context.t0) {
            _context.next = 17;
            break;
          }
          _context.t2 = _yield$prettier$resol;
          _context.next = 18;
          break;
        case 17:
          _context.t2 = {};
        case 18:
          prettierConfig = _context.t2;
        case 19:
          return _context.abrupt("return", prettier__default["default"].format(contents, _objectSpread(_objectSpread({}, prettierConfig), {}, {
            parser
          })));
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _formatContents.apply(this, arguments);
}
function processCss(_x2, _x3, _x4) {
  return _processCss.apply(this, arguments);
}
/** @typedef {{ outputFilename: string; content: string; }} ExtractedCss */
/**
 * Extract the css from the provided identifier and relative file path and
 * updates the `output` object in the outer scope.
 *
 * @param {string} name - refers to the scoped package identifier.
 * `@remirror/core` would be `core`.
 * @param {File[]} relativeFilePaths - the relative paths for the package which
 * should be checked for css.
 *
 * @returns {Promise<ExtractedCss | undefined>} the output css and the filename
 * to which it should be written
 */
function _processCss() {
  _processCss = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(css, from, to) {
    var result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return postcss__default["default"]([postcssNested__default["default"], autoprefixer__default["default"]]).process(css, {
            from,
            to
          });
        case 2:
          result = _context2.sent;
          return _context2.abrupt("return", result.css);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _processCss.apply(this, arguments);
}
function extractCssFromPackage(_x5, _x6) {
  return _extractCssFromPackage.apply(this, arguments);
}
/**
 * Get the absolute path for the location of where the CSS file should be
 * placed.
 *
 * @param {string} name - the scoped package identifier. `@remirror/core`
 * becomes `core`.
 */
function _extractCssFromPackage() {
  _extractCssFromPackage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(name, relativeFilePaths) {
    var css, outputFilename, _iterator, _step, filename, fileContents, result, rawCssText, cssText, content;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          /**
           * A container for the css extracted from each filePath
           * @type { string[] }
           */
          css = []; // The absolute path for outputting the css file.
          outputFilename = resolveCssOutputFilename(name);
          _iterator = _createForOfIteratorHelper(relativeFilePaths);
          _context3.prev = 3;
          _iterator.s();
        case 5:
          if ((_step = _iterator.n()).done) {
            _context3.next = 22;
            break;
          }
          filename = _step.value;
          _context3.next = 9;
          return fs__default["default"].readFile(helpers.baseDir(filename));
        case 9:
          fileContents = _context3.sent;
          _context3.next = 12;
          return babelPreset.transform(fileContents.toString(), {
            filename,
            outputFilename,
            preprocessor: 'none'
          }, utils.asyncResolveFallback);
        case 12:
          result = _context3.sent;
          rawCssText = result.cssText; // Skip this if no css was found in the file.
          if (rawCssText) {
            _context3.next = 16;
            break;
          }
          return _context3.abrupt("continue", 20);
        case 16:
          _context3.next = 18;
          return processCss(rawCssText);
        case 18:
          cssText = _context3.sent;
          // Add a comment header to the files, purely for aesthetics.
          css.push("/**\n * Styles extracted from: ".concat(filename, "\n */\n").concat(cssText));
        case 20:
          _context3.next = 5;
          break;
        case 22:
          _context3.next = 27;
          break;
        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](3);
          _iterator.e(_context3.t0);
        case 27:
          _context3.prev = 27;
          _iterator.f();
          return _context3.finish(27);
        case 30:
          if (!(css.length === 0)) {
            _context3.next = 32;
            break;
          }
          return _context3.abrupt("return");
        case 32:
          content = css.join('\n');
          return _context3.abrupt("return", {
            outputFilename,
            content
          });
        case 34:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 24, 27, 30]]);
  }));
  return _extractCssFromPackage.apply(this, arguments);
}
function resolveCssOutputFilename(name) {
  return path__default["default"].join(outputDirectory, "".concat(name, ".css"));
}

// An autogenerated notice which is added to the top of every ts file.
var autoGenerated = "/**\n * AUTO GENERATED FILE - TO UPDATE RUN: `pnpm -w run fix:css`\n */\n";

// The file names for the code style imports.
var importData = {
  emotion: {
    file: path__default["default"].join(outputDirectory, 'src', 'emotion.tsx'),
    imports: "".concat(autoGenerated, "\nimport { css } from '@emotion/react';\nimport emotionStyled from '@emotion/styled';\nimport { defaultImport } from '@remirror/core-helpers';\n\nconst styled = defaultImport(emotionStyled);\n\n")
  },
  styledComponents: {
    file: path__default["default"].join(outputDirectory, 'src', 'styled-components.tsx'),
    imports: "".concat(autoGenerated, "\nimport StyledComponents, { css } from 'styled-components';\nimport { defaultImport } from '@remirror/core-helpers';\n\nconst styled = defaultImport(StyledComponents);\n\n")
  },
  dom: {
    file: path__default["default"].join(outputDirectory, 'src', 'dom.tsx'),
    imports: "".concat(autoGenerated, "\nimport { css } from '@emotion/css';\n\nexport * from './utils';\n\n")
  }
};

/**
 * This is used to generate the camel case name variant from the absolute path.
 *
 * @param {File} absolutePath
 * @returns {string} the camel cased name.
 */
function getCamelCaseName(absolutePath) {
  return coreHelpers.camelCase(path__default["default"].basename(absolutePath).replace('css', ''));
}

/**
 * This is used to generate the pascal case name variant from the absolute path.
 *
 * @param {File} absolutePath
 * @returns {string} the camel cased name.
 */
function getPascalCaseName(absolutePath) {
  return coreHelpers.pascalCase(path__default["default"].basename(absolutePath).replace('css', ''));
}

/**
 * Generate the styled css format of imports.
 *
 * @param {string} absolutePath - the absolute file path
 * @param {string} contents - the css for this package
 * @param {string[]} [allPaths] - an array of the path names
 */
function generateStyledCss(absolutePath, contents, allPaths) {
  var css = allPaths ? allPaths.map(path => "${".concat(getCamelCaseName(path), "StyledCss}")).join('\n  ') : contents;
  return "export const ".concat(getCamelCaseName(absolutePath), "StyledCss = css`").concat(css, "`;\n\n");
}

/**
 * Generate the styled component format of imports.
 *
 * @param absolutePath - the absolute file path
 * @param allPaths - an array of the path names
 */
function generateStyledComponent(absolutePath, allPaths) {
  var paths = allPaths ? allPaths : [absolutePath];
  var content = paths.map(path => "${".concat(getCamelCaseName(path), "StyledCss}")).join('\n  ');
  return "export const ".concat(getPascalCaseName(absolutePath), "StyledComponent = styled.div`").concat(content, "`;\n\n");
}

/**
 * Clean the css and style files.
 */
function removeGeneratedFiles() {
  return _removeGeneratedFiles.apply(this, arguments);
}

/**
 * Copy files from `@remirror/styles` to `remirror/styles`.
 */
function _removeGeneratedFiles() {
  _removeGeneratedFiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var tsFiles;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          // The files that need to be deleted.
          tsFiles = [...Object.values(importData).map(_ref => {
            var file = _ref.file;
            return file;
          })].join(' '); // Delete css files 🤭
          _context4.next = 3;
          return Promise.all([helpers.rm('packages/{@,}remirror/styles/*.css'), helpers.rm(tsFiles)]);
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _removeGeneratedFiles.apply(this, arguments);
}
function copyFilesToRemirror() {
  return _copyFilesToRemirror.apply(this, arguments);
}

/**
 * Transform the css output to TS files.
 *
 * - From the output, get the filenames and css.
 * - Capitalize the filename and join it with the css.
 *
 * @param css - the css object
 */
function _copyFilesToRemirror() {
  _copyFilesToRemirror = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return cpy__default["default"](['packages/remirror__styles/*.css'], 'packages/remirror/styles/');
        case 2:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _copyFilesToRemirror.apply(this, arguments);
}
function getTsOutput(_x7) {
  return _getTsOutput.apply(this, arguments);
}
function _getTsOutput() {
  _getTsOutput = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(css) {
    var _ts$dom$file, _ts$emotion$file, _ts$styledComponents$;
    var dom, emotion, styledComponents, ts, allPath, rest, allPaths, _i, _Object$entries, _Object$entries$_i, absolutePath, cssContents, exportedCss, exportedComponent, allExportedCss, allExportedComponent;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          dom = importData.dom, emotion = importData.emotion, styledComponents = importData.styledComponents;
          ts = {
            [dom.file]: dom.imports,
            [emotion.file]: emotion.imports,
            [styledComponents.file]: styledComponents.imports
          };
          allPath = resolveCssOutputFilename('all');
          css[allPath], rest = _objectWithoutProperties(css, [allPath].map(_toPropertyKey));
          /** @type {string[]} */
          allPaths = [];
          for (_i = 0, _Object$entries = Object.entries(rest); _i < _Object$entries.length; _i++) {
            _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), absolutePath = _Object$entries$_i[0], cssContents = _Object$entries$_i[1];
            allPaths.push(absolutePath);
            exportedCss = generateStyledCss(absolutePath, cssContents);
            exportedComponent = generateStyledComponent(absolutePath); // Add the styled css exports
            ts[dom.file] += exportedCss;
            ts[emotion.file] += exportedCss;
            ts[styledComponents.file] += exportedCss;

            // Add the style component exports
            ts[emotion.file] += exportedComponent;
            ts[styledComponents.file] += exportedComponent;
          }
          allExportedCss = generateStyledCss(allPath, '', allPaths);
          allExportedComponent = generateStyledComponent(allPath, allPaths); // Add the styled css exports for the `all` css.
          ts[dom.file] += allExportedCss;
          ts[emotion.file] += allExportedCss;
          ts[styledComponents.file] += allExportedCss;

          // Add the `all` styled component exports
          ts[emotion.file] += allExportedComponent;
          ts[styledComponents.file] += allExportedComponent;
          _context6.next = 15;
          return formatContents((_ts$dom$file = ts[dom.file]) !== null && _ts$dom$file !== void 0 ? _ts$dom$file : '', 'typescript');
        case 15:
          ts[dom.file] = _context6.sent;
          _context6.next = 18;
          return formatContents((_ts$emotion$file = ts[emotion.file]) !== null && _ts$emotion$file !== void 0 ? _ts$emotion$file : '', 'typescript');
        case 18:
          ts[emotion.file] = _context6.sent;
          _context6.next = 21;
          return formatContents((_ts$styledComponents$ = ts[styledComponents.file]) !== null && _ts$styledComponents$ !== void 0 ? _ts$styledComponents$ : '', 'typescript');
        case 21:
          ts[styledComponents.file] = _context6.sent;
          return _context6.abrupt("return", ts);
        case 23:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _getTsOutput.apply(this, arguments);
}
/**
 * Get the output files and css.
 */
function getOutput() {
  return _getOutput.apply(this, arguments);
}

/**
 * Write the output to the required locations.
 *
 * @param output - container for all the output gathered so far.
 */
function _getOutput() {
  _getOutput = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var css, all, _i2, _Object$entries2, _Object$entries2$_i, name, relativeFilePaths, extracted, content, outputFilename;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          // A container for all the css output gathered so far.
          css = {}; // A list of all the styles gathered together so far. This is tracked so that
          // after running through the full list of packages a new entry can be made
          // which includes the entire css bundle.
          all = [];
          _i2 = 0, _Object$entries2 = Object.entries(groupedFiles);
        case 3:
          if (!(_i2 < _Object$entries2.length)) {
            _context7.next = 18;
            break;
          }
          _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), name = _Object$entries2$_i[0], relativeFilePaths = _Object$entries2$_i[1];
          _context7.next = 7;
          return extractCssFromPackage(name, relativeFilePaths);
        case 7:
          extracted = _context7.sent;
          if (extracted) {
            _context7.next = 10;
            break;
          }
          return _context7.abrupt("continue", 15);
        case 10:
          content = extracted.content, outputFilename = extracted.outputFilename; // Add the content to the `all` outer scope holder. After all packages are
          // run this array will hold all css and be added to the output.
          all.push(content);

          // Prettify the file and store the result in the `output` object.
          _context7.next = 14;
          return formatContents(content, 'css');
        case 14:
          css[outputFilename] = _context7.sent;
        case 15:
          _i2++;
          _context7.next = 3;
          break;
        case 18:
          _context7.next = 20;
          return formatContents(all.join('\n'), 'css');
        case 20:
          css[resolveCssOutputFilename('all')] = _context7.sent;
          _context7.t0 = css;
          _context7.next = 24;
          return getTsOutput(css);
        case 24:
          _context7.t1 = _context7.sent;
          return _context7.abrupt("return", {
            css: _context7.t0,
            ts: _context7.t1
          });
        case 26:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _getOutput.apply(this, arguments);
}
function writeOutput(_x8) {
  return _writeOutput.apply(this, arguments);
}
function _writeOutput() {
  _writeOutput = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(output) {
    var entries, promisesToRun, _i3, _entries, _entries$_i, filename, contents;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          entries = Object.entries(output);
          promisesToRun = [];
          for (_i3 = 0, _entries = entries; _i3 < _entries.length; _i3++) {
            _entries$_i = _slicedToArray(_entries[_i3], 2), filename = _entries$_i[0], contents = _entries$_i[1];
            promisesToRun.push(fs__default["default"].writeFile(filename, contents));
          }

          // Write all the files at the same time, rather than sequentially.
          _context8.next = 5;
          return Promise.all(promisesToRun);
        case 5:
          // We made it 🎉
          console.log(chalk__default["default"](_templateObject || (_templateObject = _taggedTemplateLiteral(["{green Successfully extracted {bold ", "} CSS files.}"])), entries.length));
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _writeOutput.apply(this, arguments);
}

exports.copyFilesToRemirror = copyFilesToRemirror;
exports.getOutput = getOutput;
exports.removeGeneratedFiles = removeGeneratedFiles;
exports.writeOutput = writeOutput;
