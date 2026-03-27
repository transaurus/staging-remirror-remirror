import _createForOfIteratorHelper from '@babel/runtime/helpers/esm/createForOfIteratorHelper';
import _regeneratorRuntime from '@babel/runtime/helpers/esm/regeneratorRuntime';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import fs from 'fs-extra';
import path from 'path';
import { b as baseDir, l as log, d as formatFiles } from '../../dist/helpers-894af5ce.esm.js';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/helpers/objectSpread2';
import '@babel/runtime/helpers/slicedToArray';
import '@changesets/pre';
import '@changesets/read';
import '@manypkg/get-packages';
import 'assert';
import 'camelcase-keys';
import 'chalk';
import 'child_process';
import 'fs';
import 'jest-diff';
import 'lodash.isequal';
import 'minimist';
import 'rimraf';
import 'throttle-debounce';
import 'tslog';
import 'util';

var config = require(baseDir('lingui.config.js'));
var I18N_SRC_DIR = baseDir('packages', 'remirror__i18n', 'src');
var filesToFormat = [];

/**
 * Join up the paths
 */
function join() {
  for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
    paths[_key] = arguments[_key];
  }
  return path.join(I18N_SRC_DIR, ...paths);
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
          return Promise.all([fs.writeFile(entryPath, "export * from './messages';\n")]);
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
          return formatFiles(filesToFormat, {
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
run().catch(error => log.fatal(error));
