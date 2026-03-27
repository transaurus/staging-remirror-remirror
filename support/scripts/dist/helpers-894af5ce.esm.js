import _regeneratorRuntime from '@babel/runtime/helpers/esm/regeneratorRuntime';
import _taggedTemplateLiteral from '@babel/runtime/helpers/esm/taggedTemplateLiteral';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _createForOfIteratorHelper from '@babel/runtime/helpers/esm/createForOfIteratorHelper';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import { readPreState } from '@changesets/pre';
import readChangesets from '@changesets/read';
import { getPackages } from '@manypkg/get-packages';
import assert from 'assert';
import camelCaseKeys from 'camelcase-keys';
import chalk from 'chalk';
import { exec as exec$1, execFile as execFile$1 } from 'child_process';
import fs from 'fs';
import { diff } from 'jest-diff';
import isEqual from 'lodash.isequal';
import minimist from 'minimist';
import path from 'path';
import { rimraf } from 'rimraf';
import { debounce } from 'throttle-debounce';
import { Logger } from 'tslog';
import { promisify } from 'util';

var _ref, _cliArgs$logLevel, _templateObject, _templateObject2, _templateObject3;
/**
 * The `camelCased` argument passed to the cli.
 */
var cliArgs = camelCaseKeys(minimist(process.argv.slice(2)));

// The log level to use for scripts.
var minLevel = (_ref = (_cliArgs$logLevel = cliArgs.logLevel) !== null && _cliArgs$logLevel !== void 0 ? _cliArgs$logLevel : process.env.LOG_LEVEL) !== null && _ref !== void 0 ? _ref : 'debug';

/**
 * The logger used when running scripts.
 */
var log = new Logger({
  minLevel
});
var exec = promisify(exec$1);
var execFile = promisify(execFile$1);
var rm = rimraf;
var separator = '__';

/**
 * Convert a mangled name to its unmangled version.
 *
 * `babel__types` => `@babel/types`.
 */
function unmangleScopedPackage(mangledName) {
  return mangledName.includes(separator) ? "@".concat(mangledName.replace(separator, '/')) : mangledName;
}

/**
 * Mangle a scoped package name. Which removes the `@` symbol and adds a `__`
 * separator.
 *
 * `@babel/types` => `babel__types`
 */
function mangleScopedPackageName(packageName) {
  var _packageName$split = packageName.split('/'),
    _packageName$split2 = _slicedToArray(_packageName$split, 2),
    scope = _packageName$split2[0],
    name = _packageName$split2[1];
  assert.ok(scope, "Invalid package name provided: ".concat(packageName));
  if (name) {
    return [scope.replace('@', ''), name].join(separator);
  }
  return scope;
}

/**
 * Check if a file exists for the provide `filePath` the provided target.
 *
 * @param {string} filePath
 */
function fileExists(_x) {
  return _fileExists.apply(this, arguments);
}

/**
 * Get a path relative to the base directory of this project. If called with no
 * arguments it will return the base directory.
 */
function _fileExists() {
  _fileExists = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(filePath) {
    var stat;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          stat = fs.lstatSync(filePath);
          return _context.abrupt("return", stat.isFile());
        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", false);
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 5]]);
  }));
  return _fileExists.apply(this, arguments);
}
function baseDir() {
  return path.resolve(__dirname, '../../..', path.join(...arguments));
}

/**
 * Get the path relative to the base directory of this project.
 */
function getRelativePathFromJson(_ref2) {
  var location = _ref2.location;
  return path.relative(baseDir(), location);
}
/**
 * Format the provided file or files with `prettier` and `eslint`.
 */
function formatFiles(_x2) {
  return _formatFiles.apply(this, arguments);
}
function _formatFiles() {
  _formatFiles = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(path) {
    var _ref3,
      _ref3$silent,
      silent,
      _ref3$formatter,
      formatter,
      promises,
      paths,
      results,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _ref3 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, _ref3$silent = _ref3.silent, silent = _ref3$silent === void 0 ? false : _ref3$silent, _ref3$formatter = _ref3.formatter, formatter = _ref3$formatter === void 0 ? 'all' : _ref3$formatter;
          promises = [];
          paths = typeof path === 'string' ? [path] : path;
          if (formatter !== 'prettier') {
            promises.push(execFile("eslint", ["--fix", ...paths], {
              // @ts-expect-error
              stdio: 'pipe'
            }));
          }
          if (formatter !== 'eslint') {
            promises.push(execFile("prettier", ["--log-level", "warn", ...paths, "--write"], {
              // @ts-expect-error
              stdio: 'pipe'
            }));
          }
          _context2.next = 7;
          return Promise.all(promises);
        case 7:
          results = _context2.sent;
          if (!silent) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return");
        case 10:
          if (results.some(result => result.stderr)) {
            log.fatal(...results.map(result => result.stderr.trim()));
          }
          if (results.some(result => result.stdout)) {
            log.info(...results.map(result => result.stdout.trim()));
          }
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _formatFiles.apply(this, arguments);
}
/**
 * The cached packages, to prevent multiple re-computations.
 */
var packages;
/**
 * Get all dependencies.
 *
 * @param excludeDeprecated - when true exclude the deprecated packages
 */
function getAllDependencies() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref4$excludeDeprecat = _ref4.excludeDeprecated,
    excludeDeprecated = _ref4$excludeDeprecat === void 0 ? true : _ref4$excludeDeprecat,
    _ref4$excludeSupport = _ref4.excludeSupport,
    excludeSupport = _ref4$excludeSupport === void 0 ? false : _ref4$excludeSupport,
    _ref4$excludePrivate = _ref4.excludePrivate,
    excludePrivate = _ref4$excludePrivate === void 0 ? false : _ref4$excludePrivate;
  if (!packages) {
    packages = getPackages(baseDir()).then(_ref5 => {
      var _ref5$packages = _ref5.packages,
        packages = _ref5$packages === void 0 ? [] : _ref5$packages;
      var transformedPackages = [];
      var _iterator = _createForOfIteratorHelper(packages),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pkg = _step.value;
          if (excludeSupport && pkg.dir.startsWith(baseDir('support'))) {
            continue;
          }
          if (excludeDeprecated && pkg.dir.startsWith(baseDir('deprecated'))) {
            continue;
          }
          if (excludePrivate && pkg.packageJson.private) {
            continue;
          }
          transformedPackages.push(_objectSpread(_objectSpread({}, pkg.packageJson), {}, {
            location: pkg.dir
          }));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return transformedPackages;
    });
  }
  return packages;
}

/**
 * Get all the packages that can be used as dependencies within the project.
 * These are identified by having a types field in the package.json.
 *
 * @param relative - when set to true this will return the paths as
 * relative to the root directory. Defaults to `false`.
 */
function getTypedPackagesWithPath() {
  return _getTypedPackagesWithPath.apply(this, arguments);
}
function _getTypedPackagesWithPath() {
  _getTypedPackagesWithPath = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var relative,
      packages,
      tsPackages,
      typedPackages,
      _iterator3,
      _step3,
      pkg,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          relative = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : false;
          _context3.next = 3;
          return getAllDependencies();
        case 3:
          packages = _context3.sent;
          // Get the packages which have a `types` field.
          tsPackages = packages.filter(pkg => {
            if (pkg.types) {
              return true;
            }
            for (var _i2 = 0, _Object$values = Object.values((_pkg$exports = pkg.exports) !== null && _pkg$exports !== void 0 ? _pkg$exports : {}); _i2 < _Object$values.length; _i2++) {
              var _pkg$exports;
              var exportSubpath = _Object$values[_i2];
              if (exportSubpath.types) {
                return true;
              }
            }
            return false;
          });
          /**
           * The typed packages to be returned.
           */
          typedPackages = {}; // Loop through the typed packages and store the name as a key and path
          // (either relative or absolute) as the value.
          _iterator3 = _createForOfIteratorHelper(tsPackages);
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              pkg = _step3.value;
              assert.ok(pkg.name, 'Packages must include a name');
              typedPackages[pkg.name] = relative ? getRelativePathFromJson(pkg) : pkg.location;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          return _context3.abrupt("return", typedPackages);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getTypedPackagesWithPath.apply(this, arguments);
}
/**
 * Get the value of the current changesets.
 */
function readChangesetState() {
  return _readChangesetState.apply(this, arguments);
}
function _readChangesetState() {
  _readChangesetState = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var cwd,
      preState,
      changesets,
      changesetsToFilter,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          cwd = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : process.cwd();
          _context4.next = 3;
          return readPreState(cwd);
        case 3:
          preState = _context4.sent;
          _context4.next = 6;
          return readChangesets(cwd);
        case 6:
          changesets = _context4.sent;
          if ((preState === null || preState === void 0 ? void 0 : preState.mode) === 'pre') {
            changesetsToFilter = new Set(preState.changesets);
            changesets = changesets.filter(x => !changesetsToFilter.has(x.id));
          }
          return _context4.abrupt("return", {
            preState: preState,
            changesets
          });
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _readChangesetState.apply(this, arguments);
}
var diffOptions = {
  contextLines: 1,
  expand: false,
  aAnnotation: 'Original',
  aColor: chalk.red,
  bAnnotation: 'Generated',
  bColor: chalk.green,
  includeChangeCounts: true
};

/**
 * Sort the keys alphabetically to produce consistent comparisons.
 */
function orderOutputKeys(output) {
  return Object.keys(output).sort().map(name => path.relative(process.cwd(), name));
}

/**
 * Check that the actual output and the expected output are identical. When
 * content has changed it will throw an error with a descriptive diff.
 *
 * @param actual
 * @param expected
 */
function compareOutput(actual, expected) {
  var actualKeys = orderOutputKeys(actual);
  var expectedKeys = orderOutputKeys(expected);
  if (!isEqual(actualKeys, expectedKeys)) {
    throw new Error(chalk(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n{yellow The generated files are not identical to the original files.}\n\n", "\n"], ["\\n{yellow The generated files are not identical to the original files.}\\n\\n", "\\n"])), diff(actualKeys, expectedKeys, diffOptions) || ''));
  }
  var errorMessages = [];
  for (var _i = 0, _Object$entries = Object.entries(actual); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      name = _Object$entries$_i[0],
      actualContents = _Object$entries$_i[1];
    var expectedContents = expected[name];
    var relativeName = path.relative(process.cwd(), name);
    if (isEqual(actualContents, expectedContents)) {
      continue;
    }
    errorMessages.push(chalk(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["{grey ", "}\n", ""], ["{grey ", "}\\n", ""])), relativeName, diff(actualContents, expected[name], diffOptions)));
  }
  if (errorMessages.length > 0) {
    throw new Error(chalk(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n{bold.yellow The generated file contents differs from current content.}\n\n", "\n"], ["\\n{bold.yellow The generated file contents differs from current content.}\\n\\n", "\\n"])), errorMessages.join('\n\n')));
  }
}
var environment = {
  get isUnit() {
    return !environment.isE2E && !environment.isIntegration;
  },
  get isIntegration() {
    return process.env.TEST_ENV === 'integration';
  },
  get isE2E() {
    return process.env.TEST_ENV === 'e2e';
  },
  get isCI() {
    return Boolean(process.env.CI);
  },
  get isMacOS() {
    return process.platform === 'darwin';
  }
};

/**
 * Watch some files and execute a callback function when any file change.
 *
 * @param files an array of file paths
 * @param callback the function that will be called when a file is modified
 */
function watchFiles(files, callback) {
  var debounceCallback = debounce(1027, false, callback);
  var _iterator2 = _createForOfIteratorHelper(files),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var file = _step2.value;
      fs.watchFile(file, {
        interval: 1007
      }, (curr, prev) => {
        // To be notified when the file was modified, not just accessed, it is
        // necessary to compare curr.mtime and prev.mtime.
        if (curr.mtime.getTime() !== prev.mtime.getTime()) {
          debounceCallback();
        }
      });
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

export { execFile as a, baseDir as b, cliArgs as c, formatFiles as d, exec as e, fileExists as f, getRelativePathFromJson as g, getAllDependencies as h, getTypedPackagesWithPath as i, readChangesetState as j, compareOutput as k, log as l, mangleScopedPackageName as m, environment as n, rm as r, unmangleScopedPackage as u, watchFiles as w };
