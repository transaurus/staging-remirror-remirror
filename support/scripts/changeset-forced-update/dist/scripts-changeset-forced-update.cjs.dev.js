'use strict';

var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _toArray = require('@babel/runtime/helpers/toArray');
var getDependentsGraph = require('@changesets/get-dependents-graph');
var getPackages = require('@manypkg/get-packages');
var fs = require('fs');
var writeJSON = require('write-json-file');
var helpers = require('../../dist/helpers-c1987c03.cjs.dev.js');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/slicedToArray');
require('@changesets/pre');
require('@changesets/read');
require('assert');
require('camelcase-keys');
require('chalk');
require('child_process');
require('jest-diff');
require('lodash.isequal');
require('minimist');
require('path');
require('rimraf');
require('throttle-debounce');
require('tslog');
require('util');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var writeJSON__default = /*#__PURE__*/_interopDefault(writeJSON);

var _process$argv = _toArray(process.argv),
  args = _process$argv.slice(2);
var clean = args.includes('--clean');
var FORCED_FILE_NAME = 'pre-forced-update';
var FORCED_FILE_PATH = helpers.baseDir('.changeset', "".concat(FORCED_FILE_NAME, ".md"));
var PRE_FILE_PATH = helpers.baseDir('.changeset', 'pre.json');

/**
 * Create a changeset file which implements all the forced updates.
 */
function createForcedUpdateFile(_x) {
  return _createForcedUpdateFile.apply(this, arguments);
}
/**
 * Run the command.
 */
function _createForcedUpdateFile() {
  _createForcedUpdateFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(packages) {
    var frontMatter, fileContents;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          frontMatter = packages.map(pkg => "'".concat(pkg.name, "': patch"));
          fileContents = "---\n".concat(frontMatter.join('\n'), "\n---\n\nForced update in pre-release mode.");
          _context.next = 4;
          return fs.promises.writeFile(FORCED_FILE_PATH, fileContents);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _createForcedUpdateFile.apply(this, arguments);
}
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var _yield$readChangesetS, changesets, preState, nameList, graph, _iterator, _step, changeset, _iterator2, _step2, _graph$get, release, dependents, nameSet, packages;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return helpers.readChangesetState();
        case 2:
          _yield$readChangesetS = _context2.sent;
          changesets = _yield$readChangesetS.changesets;
          preState = _yield$readChangesetS.preState;
          if (preState) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return");
        case 7:
          if (!clean) {
            _context2.next = 15;
            break;
          }
          _context2.next = 10;
          return helpers.rm(FORCED_FILE_PATH);
        case 10:
          _context2.next = 12;
          return writeJSON__default["default"](PRE_FILE_PATH, _objectSpread(_objectSpread({}, preState), {}, {
            changesets: preState.changesets.filter(name => name !== FORCED_FILE_NAME)
          }));
        case 12:
          _context2.next = 14;
          return helpers.formatFiles(PRE_FILE_PATH);
        case 14:
          return _context2.abrupt("return");
        case 15:
          nameList = [];
          _context2.t0 = getDependentsGraph.getDependentsGraph;
          _context2.next = 19;
          return getPackages.getPackages(helpers.baseDir());
        case 19:
          _context2.t1 = _context2.sent;
          graph = (0, _context2.t0)(_context2.t1);
          _iterator = _createForOfIteratorHelper(changesets);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              changeset = _step.value;
              _iterator2 = _createForOfIteratorHelper(changeset.releases);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  release = _step2.value;
                  nameList.push(release.name);
                  dependents = (_graph$get = graph.get(release.name)) !== null && _graph$get !== void 0 ? _graph$get : []; // Add all the dependent packages to the included names since they will
                  // automatically be updated and don't need a forced update.
                  nameList.push(release.name, ...dependents);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          nameSet = new Set(...nameList);
          _context2.next = 26;
          return helpers.getAllDependencies();
        case 26:
          packages = _context2.sent.filter(pkg => !pkg.private && !nameSet.has(pkg.name));
          if (!(packages.length === 0)) {
            _context2.next = 29;
            break;
          }
          return _context2.abrupt("return");
        case 29:
          _context2.next = 31;
          return createForcedUpdateFile(packages);
        case 31:
          _context2.next = 33;
          return helpers.formatFiles(FORCED_FILE_PATH);
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _run.apply(this, arguments);
}
run();
