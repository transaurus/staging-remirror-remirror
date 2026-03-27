'use strict';

var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var getPackages = require('@manypkg/get-packages');
var apiExtractor = require('@microsoft/api-extractor');
var fs = require('fs-extra');
var path = require('path');
var helpers = require('../../dist/helpers-c1987c03.cjs.dev.js');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/slicedToArray');
require('@changesets/pre');
require('@changesets/read');
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

var path__default = /*#__PURE__*/_interopDefault(path);

var reportFolderRoot = helpers.baseDir('support', 'api');
var reportTempFolderRoot = helpers.baseDir('support', 'api', 'temp');
var ignorePackages = new Set([
// These packages below will throw errors. Need to fix them later.
'jest-remirror', '@remirror/cli', '@remirror/messages', '@remirror/pm', '@remirror/react-utils', '@remirror/styles', '@remirror/theme',
// These packages are not a part of remirror
'a11y-status', 'test-keyboard']);

/**
 * Get all typed packages.
 */
function getTypedPackages() {
  return _getTypedPackages.apply(this, arguments);
}
/**
 * Run the api extra.
 */
function _getTypedPackages() {
  _getTypedPackages = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var packages;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getPackages.getPackages(helpers.baseDir());
        case 2:
          packages = _context.sent;
          return _context.abrupt("return", packages.packages.filter(pkg => {
            var json = pkg.packageJson;
            return !json.private && !ignorePackages.has(json.name);
          }));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getTypedPackages.apply(this, arguments);
}
function runApiExtractor() {
  return _runApiExtractor.apply(this, arguments);
}
function _runApiExtractor() {
  _runApiExtractor = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var packages, packageNameSet, _iterator, _step, _pkg$packageJson$depe, _pkg$packageJson$peer, pkg, json, name, types, relativePath, projectFolder, mainEntryPointFilePath, packageJsonFullPath, apiJsonFilePath, reportFilePath, reportTempFilePath, reportFileName, reportFolder, reportTempFolder, configObject, extractorConfig, extractorResult;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getTypedPackages();
        case 2:
          packages = _context2.sent;
          packageNameSet = new Set(packages.map(pkg => pkg.packageJson.name));
          _iterator = _createForOfIteratorHelper(packages);
          _context2.prev = 5;
          _iterator.s();
        case 7:
          if ((_step = _iterator.n()).done) {
            _context2.next = 36;
            break;
          }
          pkg = _step.value;
          json = pkg.packageJson;
          name = helpers.mangleScopedPackageName(json.name);
          types = json.types;
          if (types) {
            _context2.next = 14;
            break;
          }
          throw new Error("unable to find \"types\" in ".concat(pkg.dir));
        case 14:
          relativePath = path__default["default"].relative(helpers.baseDir(), pkg.dir);
          projectFolder = helpers.baseDir(relativePath);
          mainEntryPointFilePath = path__default["default"].join(pkg.dir, types);
          packageJsonFullPath = path__default["default"].join(pkg.dir, 'package.json');
          apiJsonFilePath = path__default["default"].join(reportFolderRoot, "".concat(name, ".api.json"));
          reportFilePath = path__default["default"].join(reportFolderRoot, "".concat(name, ".api.md"));
          reportTempFilePath = path__default["default"].join(reportTempFolderRoot, "".concat(name, ".api.md"));
          reportFileName = path__default["default"].parse(reportFilePath).base;
          reportFolder = path__default["default"].parse(reportFilePath).dir;
          reportTempFolder = path__default["default"].parse(reportTempFilePath).dir;
          configObject = {
            projectFolder,
            mainEntryPointFilePath,
            apiReport: {
              enabled: true,
              reportFolder,
              reportFileName,
              reportTempFolder
            },
            docModel: {
              enabled: true,
              apiJsonFilePath
            },
            compiler: {
              tsconfigFilePath: path__default["default"].join(projectFolder, 'src', 'tsconfig.json'),
              overrideTsconfig: {
                moduleResolution: 'nodenext'
              },
              skipLibCheck: true
            },
            // Make `export * from 'other-remirror-packages'` to work
            bundledPackages: [...Object.keys((_pkg$packageJson$depe = pkg.packageJson.dependencies) !== null && _pkg$packageJson$depe !== void 0 ? _pkg$packageJson$depe : {}), ...Object.keys((_pkg$packageJson$peer = pkg.packageJson.peerDependencies) !== null && _pkg$packageJson$peer !== void 0 ? _pkg$packageJson$peer : {})].filter(name => packageNameSet.has(name))
          };
          extractorConfig = apiExtractor.ExtractorConfig.prepare({
            configObject,
            configObjectFullPath: undefined,
            packageJson: json,
            packageJsonFullPath
          });
          console.log("running API Extractor for ".concat(json.name));
          extractorResult = apiExtractor.Extractor.invoke(extractorConfig, {
            // Equivalent to the "--local" command-line parameter
            localBuild: true,
            // Equivalent to the "--verbose" command-line parameter
            showVerboseMessages: true
          });
          if (!extractorResult.succeeded) {
            _context2.next = 32;
            break;
          }
          console.log("successfully completed API Extractor for ".concat(json.name));
          _context2.next = 34;
          break;
        case 32:
          console.error("API Extractor completed with ".concat(extractorResult.errorCount, " errors and ").concat(extractorResult.warningCount, " warnings"));
          throw new Error('failed to run API Extractor');
        case 34:
          _context2.next = 7;
          break;
        case 36:
          _context2.next = 41;
          break;
        case 38:
          _context2.prev = 38;
          _context2.t0 = _context2["catch"](5);
          _iterator.e(_context2.t0);
        case 41:
          _context2.prev = 41;
          _iterator.f();
          return _context2.finish(41);
        case 44:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 38, 41, 44]]);
  }));
  return _runApiExtractor.apply(this, arguments);
}
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return fs.remove(reportFolderRoot);
        case 2:
          _context3.next = 4;
          return runApiExtractor();
        case 4:
          _context3.next = 6;
          return fs.remove(reportTempFolderRoot);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _run.apply(this, arguments);
}
run();
