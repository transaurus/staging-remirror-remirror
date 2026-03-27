import _regeneratorRuntime from '@babel/runtime/helpers/esm/regeneratorRuntime';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _toArray from '@babel/runtime/helpers/esm/toArray';
import { e as exec, j as readChangesetState } from '../../dist/helpers-894af5ce.esm.js';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/helpers/objectSpread2';
import '@babel/runtime/helpers/createForOfIteratorHelper';
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
          return readChangesetState();
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
          return exec(publishCommand, {
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
