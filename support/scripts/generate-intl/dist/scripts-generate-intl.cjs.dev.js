'use strict';

var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var fs = require('fs-extra');
var path = require('path');
var helpers = require('../../dist/helpers-c1987c03.cjs.dev.js');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/slicedToArray');
require('@changesets/pre');
require('@changesets/read');
require('@manypkg/get-packages');
require('assert');
require('camelcase-keys');
require('chalk');
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

var fs__default = /*#__PURE__*/_interopDefault(fs);
var path__default = /*#__PURE__*/_interopDefault(path);

var config = require(helpers.baseDir('lingui.config.js'));
var I18N_SRC_DIR = helpers.baseDir('packages', 'remirror__i18n', 'src');
var filesToFormat = [];

/**
 * Join up the paths
 */
function join() {
  for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
    paths[_key] = arguments[_key];
  }
  return path__default["default"].join(I18N_SRC_DIR, ...paths);
}

/**
 * Create the declaration file for each locale.
 */
function createIndexFile(_x) {
  return _createIndexFile.apply(this, arguments);
}
function _createIndexFile() {
  _createIndexFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(locale) {
    var messagesPath, entryPath;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          messagesPath = join(locale, 'messages.d.ts');
          entryPath = join(locale, 'index.ts');
          filesToFormat.push(messagesPath, join(locale, 'messages.ts'));
          _context.next = 5;
          return Promise.all([fs__default["default"].writeFile(entryPath, "export * from './messages';\n")]);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createIndexFile.apply(this, arguments);
}
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var _iterator, _step, locale;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // Currently only the `en` locale is supported but that should increase in the
          // future.
          _iterator = _createForOfIteratorHelper(config.locales);
          _context2.prev = 1;
          _iterator.s();
        case 3:
          if ((_step = _iterator.n()).done) {
            _context2.next = 9;
            break;
          }
          locale = _step.value;
          _context2.next = 7;
          return createIndexFile(locale);
        case 7:
          _context2.next = 3;
          break;
        case 9:
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          _iterator.e(_context2.t0);
        case 14:
          _context2.prev = 14;
          _iterator.f();
          return _context2.finish(14);
        case 17:
          _context2.next = 19;
          return helpers.formatFiles(filesToFormat, {
            formatter: 'prettier'
          });
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 11, 14, 17]]);
  }));
  return _run.apply(this, arguments);
}
run().catch(error => helpers.log.fatal(error));
