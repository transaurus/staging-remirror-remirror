'use strict';

var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var execa = require('execa');
var os = require('os');
var pLimit = require('p-limit');
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
require('path');
require('rimraf');
require('throttle-debounce');
require('tslog');
require('util');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var os__default = /*#__PURE__*/_interopDefault(os);
var pLimit__default = /*#__PURE__*/_interopDefault(pLimit);

var _cliArgs$message;
var version = helpers.cliArgs.version;
var message = (_cliArgs$message = helpers.cliArgs.message) !== null && _cliArgs$message !== void 0 ? _cliArgs$message : '';
if (!version) {
  helpers.log.error('\nPlease supply a version that should be deprecated.');
  process.exit(1);
}
if (message) {
  helpers.log.info('\nNo message provided, this command will now un-deprecated');
}
var limit = pLimit__default["default"](os__default["default"].cpus().length);
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var promises, packages, _iterator, _step, _loop;
    return _regeneratorRuntime().wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          promises = [];
          _context3.next = 3;
          return helpers.getAllDependencies({
            excludeDeprecated: true,
            excludeSupport: true
          });
        case 3:
          packages = _context3.sent;
          _iterator = _createForOfIteratorHelper(packages);
          _context3.prev = 5;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var _pkg$version;
            var pkg;
            return _regeneratorRuntime().wrap(function _loop$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  pkg = _step.value;
                  if (!(pkg.private || (_pkg$version = pkg.version) !== null && _pkg$version !== void 0 && _pkg$version.startsWith('0.0.0') || !pkg.name)) {
                    _context2.next = 3;
                    break;
                  }
                  return _context2.abrupt("return", 1);
                case 3:
                  promises.push(limit(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                    var target, _yield$execa, stdout, stderr;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          target = "".concat(pkg.name, "@").concat(version);
                          helpers.log.debug('Deprecating', target);
                          _context.next = 5;
                          return execa.execa('npm', ['deprecate', target, message]);
                        case 5:
                          _yield$execa = _context.sent;
                          stdout = _yield$execa.stdout;
                          stderr = _yield$execa.stderr;
                          if (stderr) {
                            console.error(stderr);
                          }
                          if (stdout) {
                            console.info(stdout);
                          }
                          _context.next = 15;
                          break;
                        case 12:
                          _context.prev = 12;
                          _context.t0 = _context["catch"](0);
                          helpers.log.fatal(_context.t0);
                        case 15:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee, null, [[0, 12]]);
                  }))));
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _loop);
          });
          _iterator.s();
        case 8:
          if ((_step = _iterator.n()).done) {
            _context3.next = 14;
            break;
          }
          return _context3.delegateYield(_loop(), "t0", 10);
        case 10:
          if (!_context3.t0) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("continue", 12);
        case 12:
          _context3.next = 8;
          break;
        case 14:
          _context3.next = 19;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t1 = _context3["catch"](5);
          _iterator.e(_context3.t1);
        case 19:
          _context3.prev = 19;
          _iterator.f();
          return _context3.finish(19);
        case 22:
          _context3.next = 24;
          return Promise.all(promises);
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee2, null, [[5, 16, 19, 22]]);
  }));
  return _run.apply(this, arguments);
}
run();
