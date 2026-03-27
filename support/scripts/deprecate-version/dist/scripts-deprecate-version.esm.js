import _regeneratorRuntime from '@babel/runtime/helpers/esm/regeneratorRuntime';
import _createForOfIteratorHelper from '@babel/runtime/helpers/esm/createForOfIteratorHelper';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import { execa } from 'execa';
import os from 'os';
import pLimit from 'p-limit';
import { c as cliArgs, l as log, h as getAllDependencies } from '../../dist/helpers-894af5ce.esm.js';
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
import 'path';
import 'rimraf';
import 'throttle-debounce';
import 'tslog';
import 'util';

var _cliArgs$message;
var version = cliArgs.version;
var message = (_cliArgs$message = cliArgs.message) !== null && _cliArgs$message !== void 0 ? _cliArgs$message : '';
if (!version) {
  log.error('\nPlease supply a version that should be deprecated.');
  process.exit(1);
}
if (message) {
  log.info('\nNo message provided, this command will now un-deprecated');
}
var limit = pLimit(os.cpus().length);
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
          return getAllDependencies({
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
                          log.debug('Deprecating', target);
                          _context.next = 5;
                          return execa('npm', ['deprecate', target, message]);
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
                          log.fatal(_context.t0);
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
