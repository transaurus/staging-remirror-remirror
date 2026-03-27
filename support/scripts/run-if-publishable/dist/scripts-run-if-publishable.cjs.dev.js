'use strict';

var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _toArray = require('@babel/runtime/helpers/toArray');
var helpers = require('../../dist/helpers-c1987c03.cjs.dev.js');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/createForOfIteratorHelper');
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

var _process$argv = _toArray(process.argv),
  args = _process$argv.slice(2);
var command = args.join(' ');
var FIFTY_MB_BUFFER_SIZE = 1024 * 1024 * 50;
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _yield$readChangesetS, changesets, preState, shouldSkipCommand, tag, publishCommand;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return helpers.readChangesetState();
        case 2:
          _yield$readChangesetS = _context.sent;
          changesets = _yield$readChangesetS.changesets;
          preState = _yield$readChangesetS.preState;
          shouldSkipCommand = changesets.length > 0;
          tag = 'latest';
          if (preState) {
            tag = preState.tag;
          }
          publishCommand = "".concat(command, ":").concat(tag);
          if (!shouldSkipCommand) {
            _context.next = 12;
            break;
          }
          console.log("\x1B[33mUnmerged changesets found. Skipping publish command: '".concat(publishCommand, "'\x1B[0m"));
          return _context.abrupt("return");
        case 12:
          _context.next = 14;
          return helpers.exec(publishCommand, {
            // @ts-expect-error
            stdio: 'inherit',
            // Added so that publishing still succeeds on CI with large publish payloads.
            maxBuffer: FIFTY_MB_BUFFER_SIZE
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _run.apply(this, arguments);
}
run();
