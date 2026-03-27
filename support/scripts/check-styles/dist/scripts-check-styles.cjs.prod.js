'use strict';

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var chalk = require('chalk');
var fs = require('fs-extra');
var globby = require('globby');
var helpers = require('../../dist/helpers-249dc920.cjs.prod.js');
var linaria_dist_scriptsLinaria = require('../../linaria/dist/scripts-linaria.cjs.prod.js');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/slicedToArray');
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
require('path');
require('rimraf');
require('throttle-debounce');
require('tslog');
require('util');
require('@babel/runtime/helpers/objectWithoutProperties');
require('@babel/runtime/helpers/toPropertyKey');
require('@linaria/babel-preset');
require('@linaria/utils');
require('autoprefixer');
require('cpy');
require('lodash.groupby');
require('postcss');
require('postcss-nested');
require('prettier');
require('@remirror/core-helpers');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var chalk__default = /*#__PURE__*/_interopDefault(chalk);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var globby__default = /*#__PURE__*/_interopDefault(globby);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var force = helpers.cliArgs.force;
var shouldFix = helpers.cliArgs.fix;
var outputFiles = globby__default["default"].sync(['packages/remirror__styles/*.css'], {
  cwd: helpers.baseDir()
});

/**
 * Read all the style files.
 */
function readOutputFiles() {
  return _readOutputFiles.apply(this, arguments);
}
/**
 * Run the script.
 * @returns has error
 */
function _readOutputFiles() {
  _readOutputFiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var output, _iterator, _step, file;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          output = {};
          _iterator = _createForOfIteratorHelper(outputFiles);
          _context.prev = 2;
          _iterator.s();
        case 4:
          if ((_step = _iterator.n()).done) {
            _context.next = 11;
            break;
          }
          file = _step.value;
          _context.next = 8;
          return fs__default["default"].readFile(file);
        case 8:
          output[helpers.baseDir(file)] = _context.sent.toString();
        case 9:
          _context.next = 4;
          break;
        case 11:
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](2);
          _iterator.e(_context.t0);
        case 16:
          _context.prev = 16;
          _iterator.f();
          return _context.finish(16);
        case 19:
          return _context.abrupt("return", output);
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 13, 16, 19]]);
  }));
  return _readOutputFiles.apply(this, arguments);
}
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var actualOutput, _yield$getOutput, css, ts;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          helpers.log.info(chalk__default["default"](_templateObject || (_templateObject = _taggedTemplateLiteral(["\n{green Checking styles.}"], ["\\n{green Checking styles.}"]))));
          _context2.next = 3;
          return readOutputFiles();
        case 3:
          actualOutput = _context2.sent;
          _context2.next = 6;
          return linaria_dist_scriptsLinaria.getOutput();
        case 6:
          _yield$getOutput = _context2.sent;
          css = _yield$getOutput.css;
          ts = _yield$getOutput.ts;
          _context2.prev = 9;
          helpers.compareOutput(actualOutput, css);
          helpers.log.info(chalk__default["default"](_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n{green The generated {bold CSS} is valid for all files.}"], ["\\n{green The generated {bold CSS} is valid for all files.}"]))));
          if (force) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", false);
        case 14:
          helpers.log.info(chalk__default["default"](_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n\nForcing update: {yellow `--force`} flag applied.\n\n"], ["\\n\\nForcing update: {yellow \\`--force\\`} flag applied.\\n\\n"]))));
          _context2.next = 20;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](9);
          helpers.log.error(_context2.t0.message);
        case 20:
          if (!(shouldFix || force)) {
            _context2.next = 31;
            break;
          }
          helpers.log.info('Forcing a fix!');
          _context2.next = 24;
          return linaria_dist_scriptsLinaria.removeGeneratedFiles();
        case 24:
          _context2.next = 26;
          return linaria_dist_scriptsLinaria.writeOutput(css);
        case 26:
          _context2.next = 28;
          return linaria_dist_scriptsLinaria.writeOutput(ts);
        case 28:
          _context2.next = 30;
          return linaria_dist_scriptsLinaria.copyFilesToRemirror();
        case 30:
          return _context2.abrupt("return", false);
        case 31:
          console.log(chalk__default["default"](_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n{bold.red To fix this issue run:} {blue.italic pnpm fix:css}\n"], ["\\n{bold.red To fix this issue run:} {blue.italic pnpm fix:css}\\n"]))));
          return _context2.abrupt("return", true);
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[9, 17]]);
  }));
  return _run.apply(this, arguments);
}
function main() {
  return _main.apply(this, arguments);
}
function _main() {
  _main = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var hasError;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return run();
        case 2:
          hasError = _context3.sent;
          if (hasError) {
            process.exit(1);
          }
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _main.apply(this, arguments);
}
main();
