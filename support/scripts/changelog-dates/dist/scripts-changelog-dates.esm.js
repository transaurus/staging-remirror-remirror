import _createForOfIteratorHelper from '@babel/runtime/helpers/esm/createForOfIteratorHelper';
import _regeneratorRuntime from '@babel/runtime/helpers/esm/regeneratorRuntime';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import { execSync } from 'child_process';
import { promises } from 'fs';
import path from 'path';
import { h as getAllDependencies } from '../../dist/helpers-894af5ce.esm.js';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/helpers/objectSpread2';
import '@babel/runtime/helpers/slicedToArray';
import '@changesets/pre';
import '@changesets/read';
import '@manypkg/get-packages';
import 'assert';
import 'camelcase-keys';
import 'chalk';
import 'jest-diff';
import 'lodash.isequal';
import 'minimist';
import 'rimraf';
import 'throttle-debounce';
import 'tslog';
import 'util';

var NAME = 'CHANGELOG.md';

/**
 * Read a file.
 *
 * @param {string} filePath - the filePath
 */
function readFile(_x) {
  return _readFile.apply(this, arguments);
}
/**
 * Get the release date
 *
 * @param date - the date to use
 */
function _readFile() {
  _readFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(filePath) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return promises.readFile(filePath, 'utf-8');
        case 3:
          return _context.abrupt("return", _context.sent);
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return");
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _readFile.apply(this, arguments);
}
function getDate() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  return "".concat(date.getFullYear(), "-").concat((date.getMonth() + 1).toString().padStart(2, '0'), "-").concat(date.getDate().toString().padStart(2, '0'));
}

/**
 * Check if the file has changed.
 *
 * @param filePath - the file path to check.
 */
function hasFileChanged(filePath) {
  var isUntracked = !execSync("git ls-files ".concat(filePath)).toString().trim();
  if (isUntracked) {
    return true;
  }
  return !!execSync("git --no-pager diff --name-only ".concat(filePath)).toString().trim();
}

/**
 * Add dates to all updated changelog files.
 */
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var packages, _iterator, _step, pkg, filePath, contents, updatedContent;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getAllDependencies({
            excludeDeprecated: false
          });
        case 2:
          packages = _context2.sent;
          _iterator = _createForOfIteratorHelper(packages);
          _context2.prev = 4;
          _iterator.s();
        case 6:
          if ((_step = _iterator.n()).done) {
            _context2.next = 24;
            break;
          }
          pkg = _step.value;
          filePath = path.join(pkg.location, NAME);
          _context2.next = 11;
          return readFile(filePath);
        case 11:
          contents = _context2.sent;
          if (contents) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("continue", 22);
        case 14:
          updatedContent = contents.replace(/## (\d+)\.(\d+)\.(\d+)(?:-([\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*))?(?:\+[\dA-Za-z-]+)?$/m, "$&\n\n> ".concat(getDate()));
          if (!(contents === updatedContent)) {
            _context2.next = 17;
            break;
          }
          return _context2.abrupt("continue", 22);
        case 17:
          if (hasFileChanged(filePath)) {
            _context2.next = 19;
            break;
          }
          return _context2.abrupt("continue", 22);
        case 19:
          _context2.next = 21;
          return promises.writeFile(filePath, updatedContent);
        case 21:
          console.log("\x1B[32mAdded date to changelog: ".concat(filePath));
        case 22:
          _context2.next = 6;
          break;
        case 24:
          _context2.next = 29;
          break;
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](4);
          _iterator.e(_context2.t0);
        case 29:
          _context2.prev = 29;
          _iterator.f();
          return _context2.finish(29);
        case 32:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 26, 29, 32]]);
  }));
  return _run.apply(this, arguments);
}
run();
