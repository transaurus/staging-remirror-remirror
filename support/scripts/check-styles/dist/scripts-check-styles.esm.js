import _taggedTemplateLiteral from '@babel/runtime/helpers/esm/taggedTemplateLiteral';
import _regeneratorRuntime from '@babel/runtime/helpers/esm/regeneratorRuntime';
import _createForOfIteratorHelper from '@babel/runtime/helpers/esm/createForOfIteratorHelper';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import chalk from 'chalk';
import fs from 'fs-extra';
import globby from 'globby';
import { c as cliArgs, b as baseDir, l as log, k as compareOutput } from '../../dist/helpers-894af5ce.esm.js';
import { copyFilesToRemirror, writeOutput, removeGeneratedFiles, getOutput } from '../../linaria/dist/scripts-linaria.esm.js';
import '@babel/runtime/helpers/objectSpread2';
import '@babel/runtime/helpers/slicedToArray';
import '@changesets/pre';
import '@changesets/read';
import '@manypkg/get-packages';
import 'assert';
import 'camelcase-keys';
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
import '@babel/runtime/helpers/objectWithoutProperties';
import '@babel/runtime/helpers/toPropertyKey';
import '@linaria/babel-preset';
import '@linaria/utils';
import 'autoprefixer';
import 'cpy';
import 'lodash.groupby';
import 'postcss';
import 'postcss-nested';
import 'prettier';
import '@remirror/core-helpers';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var force = cliArgs.force;
var shouldFix = cliArgs.fix;
var outputFiles = globby.sync(['packages/remirror__styles/*.css'], {
  cwd: baseDir()
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
          return fs.readFile(file);
        case 8:
          output[baseDir(file)] = _context.sent.toString();
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
          log.info(chalk(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n{green Checking styles.}"], ["\\n{green Checking styles.}"]))));
          _context2.next = 3;
          return readOutputFiles();
        case 3:
          actualOutput = _context2.sent;
          _context2.next = 6;
          return getOutput();
        case 6:
          _yield$getOutput = _context2.sent;
          css = _yield$getOutput.css;
          ts = _yield$getOutput.ts;
          _context2.prev = 9;
          compareOutput(actualOutput, css);
          log.info(chalk(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n{green The generated {bold CSS} is valid for all files.}"], ["\\n{green The generated {bold CSS} is valid for all files.}"]))));
          if (force) {
            _context2.next = 14;
            break;
          }
          return _context2.abrupt("return", false);
        case 14:
          log.info(chalk(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n\nForcing update: {yellow `--force`} flag applied.\n\n"], ["\\n\\nForcing update: {yellow \\`--force\\`} flag applied.\\n\\n"]))));
          _context2.next = 20;
          break;
        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](9);
          log.error(_context2.t0.message);
        case 20:
          if (!(shouldFix || force)) {
            _context2.next = 31;
            break;
          }
          log.info('Forcing a fix!');
          _context2.next = 24;
          return removeGeneratedFiles();
        case 24:
          _context2.next = 26;
          return writeOutput(css);
        case 26:
          _context2.next = 28;
          return writeOutput(ts);
        case 28:
          _context2.next = 30;
          return copyFilesToRemirror();
        case 30:
          return _context2.abrupt("return", false);
        case 31:
          console.log(chalk(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n{bold.red To fix this issue run:} {blue.italic pnpm fix:css}\n"], ["\\n{bold.red To fix this issue run:} {blue.italic pnpm fix:css}\\n"]))));
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
