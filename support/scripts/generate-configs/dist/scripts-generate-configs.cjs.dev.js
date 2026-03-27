'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectSpread = require('@babel/runtime/helpers/objectSpread2');
var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _createForOfIteratorHelper = require('@babel/runtime/helpers/createForOfIteratorHelper');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var chalk = require('chalk');
var fs = require('fs-extra');
var os = require('os');
var pLimit = require('p-limit');
var path = require('path');
var writeJSON = require('write-json-file');
var coreHelpers = require('@remirror/core-helpers');
var helpers = require('../../dist/helpers-c1987c03.cjs.dev.js');
require('@changesets/pre');
require('@changesets/read');
require('@manypkg/get-packages');
require('assert');
require('camelcase-keys');
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

var chalk__default = /*#__PURE__*/_interopDefault(chalk);
var fs__default = /*#__PURE__*/_interopDefault(fs);
var os__default = /*#__PURE__*/_interopDefault(os);
var pLimit__default = /*#__PURE__*/_interopDefault(pLimit);
var path__default = /*#__PURE__*/_interopDefault(path);
var writeJSON__default = /*#__PURE__*/_interopDefault(writeJSON);

var _excluded = ["location"],
  _excluded2 = ["./", "src"],
  _excluded3 = ["compilerOptions"],
  _excluded4 = ["compilerOptions", "paths"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4;

// Store the name used for all tsconfig files.
var tsconfigFileName = 'tsconfig.json';

// A collection of the absolute paths where files will be written to.
var PATH = {
  sizeLimit: helpers.baseDir('.size-limit.json'),
  mainTsconfig: helpers.baseDir(tsconfigFileName),
  baseTsconfig: helpers.baseDir('support', 'tsconfig.base.json'),
  rootTsconfig: helpers.baseDir(tsconfigFileName),
  packagesTsconfig: helpers.baseDir('packages', tsconfigFileName)
};

// A list of all the generated files which will be prettified at the end of the
// process.
var filesToPrettify = [];

/**
 * Make sure that "main", "module" and "types" fields within the packages are
 * prefixed with `./`.
 */
function generateEntryPoint() {
  return _generateEntryPoint.apply(this, arguments);
}
/**
 * Add a `./` prefix to a path that needs to be seen as relative.
 */
function _generateEntryPoint() {
  _generateEntryPoint = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var fields, packages, promises, _iterator, _step, pkg, location, packageJson, packageJsonPath, edited, _iterator2, _step2, field, originValue, fixedValue;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          fields = ['main', 'module', 'types'];
          helpers.log.info(chalk__default["default"](_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n{blue Running script for package.json {bold.grey ", "} fields}"], ["\\n{blue Running script for package.json {bold.grey ", "} fields}"])), fields));

          // Get all the packages in the `pnpm` monorepo.
          _context.next = 4;
          return helpers.getAllDependencies({
            excludeSupport: true
          });
        case 4:
          packages = _context.sent;
          promises = [];
          _iterator = _createForOfIteratorHelper(packages);
          _context.prev = 7;
          _iterator.s();
        case 9:
          if ((_step = _iterator.n()).done) {
            _context.next = 37;
            break;
          }
          pkg = _step.value;
          location = pkg.location, packageJson = _objectWithoutProperties(pkg, _excluded);
          packageJsonPath = path__default["default"].join(location, 'package.json');
          edited = false;
          _iterator2 = _createForOfIteratorHelper(fields);
          _context.prev = 15;
          _iterator2.s();
        case 17:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 26;
            break;
          }
          field = _step2.value;
          originValue = packageJson[field];
          if (originValue) {
            _context.next = 22;
            break;
          }
          return _context.abrupt("continue", 24);
        case 22:
          fixedValue = prefixRelativePath(originValue);
          if (originValue !== fixedValue) {
            packageJson[field] = fixedValue;
            edited = true;
          }
        case 24:
          _context.next = 17;
          break;
        case 26:
          _context.next = 31;
          break;
        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](15);
          _iterator2.e(_context.t0);
        case 31:
          _context.prev = 31;
          _iterator2.f();
          return _context.finish(31);
        case 34:
          if (edited) {
            promises.push(writeJSON__default["default"](packageJsonPath, packageJson));
            filesToPrettify.push(packageJsonPath);
          }
        case 35:
          _context.next = 9;
          break;
        case 37:
          _context.next = 42;
          break;
        case 39:
          _context.prev = 39;
          _context.t1 = _context["catch"](7);
          _iterator.e(_context.t1);
        case 42:
          _context.prev = 42;
          _iterator.f();
          return _context.finish(42);
        case 45:
          _context.next = 47;
          return Promise.all(promises);
        case 47:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[7, 39, 42, 45], [15, 28, 31, 34]]);
  }));
  return _generateEntryPoint.apply(this, arguments);
}
function prefixRelativePath(path) {
  if (path === undefined || path === '') {
    return path;
  }
  return path.startsWith('.') ? path : "./".concat(path);
}

/**
 * Get the relative path for the browser module if it exists, otherwise fallback
 * to the module or main path.
 */
function getBrowserPath(pkg) {
  var _pkg$browser, _pkg$module;
  var browserPath = coreHelpers.isString(pkg.browser) ? pkg.browser : (_pkg$browser = pkg.browser) === null || _pkg$browser === void 0 ? void 0 : _pkg$browser[prefixRelativePath((_pkg$module = pkg.module) !== null && _pkg$module !== void 0 ? _pkg$module : '')];
  return coreHelpers.isString(browserPath) ? browserPath : pkg.module;
}
/**
 * This generates the `.size-limit.json` file.
 */
function generateSizeLimitConfig() {
  return _generateSizeLimitConfig.apply(this, arguments);
}
function _generateSizeLimitConfig() {
  _generateSizeLimitConfig = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var packages, sizes, _iterator3, _step3, _pkg$Remirror, _pkg$peerDependencies, _pkg$dependencies, pkg, limit, pathToEntryFile, pathToPackage, ignore;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          helpers.log.info(chalk__default["default"](_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n{blue Generating {bold.grey size-limit.json} config file}"], ["\\n{blue Generating {bold.grey size-limit.json} config file}"]))));

          // Get all the packages in the `pnpm` monorepo.
          _context2.next = 3;
          return helpers.getAllDependencies();
        case 3:
          packages = _context2.sent;
          // Container for the size limit config object. This will be written to the
          // size limit json file.
          sizes = [];
          _iterator3 = _createForOfIteratorHelper(packages);
          _context2.prev = 6;
          _iterator3.s();
        case 8:
          if ((_step3 = _iterator3.n()).done) {
            _context2.next = 21;
            break;
          }
          pkg = _step3.value;
          limit = (_pkg$Remirror = pkg['@remirror']) === null || _pkg$Remirror === void 0 ? void 0 : _pkg$Remirror.sizeLimit; // Ignore when there is no limit set for the package.
          if (limit) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("continue", 19);
        case 13:
          // The path from the current package to the entry point.
          pathToEntryFile = getBrowserPath(pkg);
          if (pathToEntryFile) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("continue", 19);
        case 16:
          // The path from the root directory to the current package.
          pathToPackage = helpers.getRelativePathFromJson(pkg); // A list of files to ignore in the size calculations.
          ignore = [
          // Ignore all peer dependencies.
          ...Object.keys((_pkg$peerDependencies = pkg.peerDependencies) !== null && _pkg$peerDependencies !== void 0 ? _pkg$peerDependencies : {}),
          // Ignore all internal dependencies.
          ...Object.keys((_pkg$dependencies = pkg.dependencies) !== null && _pkg$dependencies !== void 0 ? _pkg$dependencies : {}).filter(name => name.startsWith('@remirror/'))]; // Add the configuration object to the list of sizes to check.
          sizes.push({
            name: pkg.name,
            limit,
            path: path__default["default"].join(pathToPackage, pathToEntryFile),
            ignore,
            running: false,
            gzip: true
          });
        case 19:
          _context2.next = 8;
          break;
        case 21:
          _context2.next = 26;
          break;
        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](6);
          _iterator3.e(_context2.t0);
        case 26:
          _context2.prev = 26;
          _iterator3.f();
          return _context2.finish(26);
        case 29:
          _context2.next = 31;
          return writeJSON__default["default"](PATH.sizeLimit, sizes);
        case 31:
          filesToPrettify.push(PATH.sizeLimit);
        case 32:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[6, 23, 26, 29]]);
  }));
  return _generateSizeLimitConfig.apply(this, arguments);
}
var DEFAULT_TSCONFIG_META = {
  src: {
    // Flag to show that this file is autogenerated and should not be edited.
    compilerOptions: {
      types: [],
      declaration: true,
      composite: true,
      noEmit: false,
      emitDeclarationOnly: true,
      outDir: '../dist-types'
    },
    include: ['./']
  },
  __e2e__: {
    // Flag to show that this file is autogenerated and should not be edited.
    compilerOptions: {
      types: ['expect-playwright/global', 'jest-playwright-preset', 'jest', 'jest-extended', 'snapshot-diff', 'playwright', 'node'],
      skipLibCheck: true,
      importsNotUsedAsValues: 'remove',
      outDir: './dist-types'
    },
    include: ['./']
  },
  __tests__: {
    compilerOptions: {
      types: ['jest', 'jest-extended', 'jest-axe', '@testing-library/jest-dom', 'snapshot-diff', 'node'],
      skipLibCheck: true,
      importsNotUsedAsValues: 'remove',
      outDir: './dist-types'
    },
    include: ['./']
  },
  __dts__: {
    compilerOptions: {
      skipLibCheck: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      allowUnreachableCode: true,
      noImplicitReturns: false,
      importsNotUsedAsValues: 'remove',
      outDir: './dist-types'
    },
    include: ['./']
  }
};
// Get the folder for `.pnpm`.
var pnpmFolder = helpers.baseDir('node_modules', '.pnpm');

// Store the scoped folders within the main `pnpmFolder`.
var pnpmScopedFolders = {};

/**
 * A function which retrieves the .d.ts file for a given package name.
 *
 * We can't use `require.resolve` since pnpm doesn't hoist all packages.
 * Instead we're going to look at the special `.pnpm` folder inside the root
 * `node_modules`.
 */
function getPackageDefinitionFilePath(_x) {
  return _getPackageDefinitionFilePath.apply(this, arguments);
}
/**
 * Add flag to indicate that this file is auto generated.
 */
function _getPackageDefinitionFilePath() {
  _getPackageDefinitionFilePath = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(name) {
    var _, _pnpmScopedFolders$_;
    var subFolder,
      searchFolders,
      folderName,
      base,
      split,
      directory,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          subFolder = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : '';
          if (!((_pnpmScopedFolders$_ = pnpmScopedFolders[_ = '.']) !== null && _pnpmScopedFolders$_ !== void 0)) {
            _context3.next = 5;
            break;
          }
          _context3.t0 = _pnpmScopedFolders$_;
          _context3.next = 8;
          break;
        case 5:
          _context3.next = 7;
          return fs__default["default"].readdir(pnpmFolder);
        case 7:
          _context3.t0 = pnpmScopedFolders[_] = _context3.sent;
        case 8:
          searchFolders = _context3.t0;
          folderName = name;
          base = pnpmFolder;
          if (name.startsWith('@')) {
            split = name.split('/');
            folderName = "".concat(coreHelpers.assertGet(split, 0), "+").concat(coreHelpers.assertGet(split, 1));
          }
          directory = searchFolders.find(name => name.startsWith("".concat(folderName, "@")));
          !directory ? process.env.NODE_ENV !== "production" ? coreHelpers.invariant(false, {
            message: "No directory found for ".concat(name)
          }) : coreHelpers.invariant(false) : void 0;
          return _context3.abrupt("return", path__default["default"].join(base, directory, 'node_modules', name, subFolder.endsWith('.d.ts') ? subFolder : path__default["default"].join(subFolder, 'index.d.ts')));
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getPackageDefinitionFilePath.apply(this, arguments);
}
function createAutoGeneratedFlag(folderName) {
  return {
    __AUTO_GENERATED__: ["To update the configuration edit the following field.", "`package.json > @remirror > tsconfigs > '".concat(folderName, "'`"), '', "Then run: `pnpm -w generate:ts`"]
  };
}
function makeRelative(filepath) {
  return filepath.startsWith('.') ? filepath : "./".concat(filepath);
}

/**
 * Resolve the metadata from the tsconfig file.
 */
function resolveTsConfigMeta(_x2, _x3, _x4) {
  return _resolveTsConfigMeta.apply(this, arguments);
}
/**
 * Generate a tsconfig for every package.
 */
function _resolveTsConfigMeta() {
  _resolveTsConfigMeta = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(pkg, dependencies, types) {
    var _pkg$Remirror2;
    var configFiles, meta, foldersInDirectory, mergedMeta, main, src, rest, references, _dependencies$remirro, _src$compilerOptions$, _src$compilerOptions, filepath, _i, _Object$keys, dependency, dependencyPath, _iterator4, _step4, type, _src$compilerOptions2, _filepath, _ref, _ref$compilerOptions, original, other, compilerOptions, _i2, _Object$entries, _original$paths, _src$compilerOptions3, _Object$entries$_i, folder, config, _filepath2, _ref2, _ref2$compilerOptions, _original, _ref2$paths, paths, _other, compilerOptionsPaths, _iterator5, _step5, entry, _dependencyPath, _entry, name, _pnpmFolder, subFolder, pathToDefinitionFile, _compilerOptions, extraReferences, _dependencies$testing, _dependencies$remirro2, testingPath, remirrorPath;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          configFiles = [];
          meta = (_pkg$Remirror2 = pkg['@remirror']) === null || _pkg$Remirror2 === void 0 ? void 0 : _pkg$Remirror2.tsconfigs;
          if (!(meta === false)) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", configFiles);
        case 4:
          _context4.next = 6;
          return fs.readdir(pkg.location);
        case 6:
          foldersInDirectory = _context4.sent;
          mergedMeta = coreHelpers.deepMerge(DEFAULT_TSCONFIG_META, meta !== null && meta !== void 0 ? meta : {});
          main = mergedMeta['./'], src = mergedMeta.src, rest = _objectWithoutProperties(mergedMeta, _excluded2);
          references = [];
          if (!(src !== false)) {
            _context4.next = 25;
            break;
          }
          filepath = path__default["default"].join(pkg.location, 'src', tsconfigFileName); // Collect all the references need for the current package.
          _i = 0, _Object$keys = Object.keys(_objectSpread(_objectSpread(_objectSpread({}, pkg.dependencies), pkg.peerDependencies), pkg.optionalDependencies));
        case 13:
          if (!(_i < _Object$keys.length)) {
            _context4.next = 22;
            break;
          }
          dependency = _Object$keys[_i];
          dependencyPath = dependencies[dependency]; // Check if the dependency is one of the internal workspace dependencies.
          // We only want to add the internal project dependencies to the
          // references.
          if (dependencyPath) {
            _context4.next = 18;
            break;
          }
          return _context4.abrupt("continue", 19);
        case 18:
          references.push({
            // Add the dependency which is a path relative to the current package
            // being checked.
            path: path__default["default"].join(path__default["default"].relative(path__default["default"].dirname(filepath), path__default["default"].join(dependencyPath, 'src')))
          });
        case 19:
          _i++;
          _context4.next = 13;
          break;
        case 22:
          _iterator4 = _createForOfIteratorHelper((_src$compilerOptions$ = src === null || src === void 0 ? void 0 : (_src$compilerOptions = src.compilerOptions) === null || _src$compilerOptions === void 0 ? void 0 : _src$compilerOptions.types) !== null && _src$compilerOptions$ !== void 0 ? _src$compilerOptions$ : []);
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              type = _step4.value;
              types.add(type);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
          configFiles.push({
            shouldReference: true,
            filepath,
            json: _objectSpread(_objectSpread(_objectSpread({}, createAutoGeneratedFlag('src')), {}, {
              extends: path__default["default"].relative(path__default["default"].dirname(filepath), PATH.baseTsconfig)
            }, src), {}, {
              references: pkg.name === '@remirror/support' ? [{
                path: path__default["default"].relative(path__default["default"].dirname(filepath), (_dependencies$remirro = dependencies['remirror']) !== null && _dependencies$remirro !== void 0 ? _dependencies$remirro : '')
              }] : references
            })
          });
        case 25:
          if (main) {
            _filepath = path__default["default"].join(pkg.location, tsconfigFileName);
            _ref = main !== null && main !== void 0 ? main : {}, _ref$compilerOptions = _ref.compilerOptions, original = _ref$compilerOptions === void 0 ? {} : _ref$compilerOptions, other = _objectWithoutProperties(_ref, _excluded3);
            compilerOptions = coreHelpers.deepMerge(src !== false ? (_src$compilerOptions2 = src === null || src === void 0 ? void 0 : src.compilerOptions) !== null && _src$compilerOptions2 !== void 0 ? _src$compilerOptions2 : {} : {}, original);
            configFiles.push({
              shouldReference: false,
              filepath: _filepath,
              json: _objectSpread(_objectSpread({}, createAutoGeneratedFlag('src')), {}, {
                extends: makeRelative(path__default["default"].relative(path__default["default"].dirname(_filepath), PATH.baseTsconfig)),
                compilerOptions
              }, other)
            });
          }
          _i2 = 0, _Object$entries = Object.entries(rest);
        case 27:
          if (!(_i2 < _Object$entries.length)) {
            _context4.next = 69;
            break;
          }
          _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2), folder = _Object$entries$_i[0], config = _Object$entries$_i[1];
          if (!(!foldersInDirectory.includes(folder.replace(/^\.\//, '')) || config === false)) {
            _context4.next = 31;
            break;
          }
          return _context4.abrupt("continue", 66);
        case 31:
          _filepath2 = path__default["default"].join(pkg.location, folder, tsconfigFileName);
          _ref2 = config !== null && config !== void 0 ? config : {}, _ref2$compilerOptions = _ref2.compilerOptions, _original = _ref2$compilerOptions === void 0 ? {} : _ref2$compilerOptions, _ref2$paths = _ref2.paths, paths = _ref2$paths === void 0 ? [] : _ref2$paths, _other = _objectWithoutProperties(_ref2, _excluded4);
          compilerOptionsPaths = (_original$paths = _original.paths) !== null && _original$paths !== void 0 ? _original$paths : {};
          if (!paths) {
            _context4.next = 61;
            break;
          }
          _iterator5 = _createForOfIteratorHelper(paths);
          _context4.prev = 36;
          _iterator5.s();
        case 38:
          if ((_step5 = _iterator5.n()).done) {
            _context4.next = 53;
            break;
          }
          entry = _step5.value;
          if (!coreHelpers.isString(entry)) {
            _context4.next = 46;
            break;
          }
          _dependencyPath = dependencies[entry];
          if (_dependencyPath) {
            _context4.next = 44;
            break;
          }
          return _context4.abrupt("continue", 51);
        case 44:
          compilerOptionsPaths[entry] = [path__default["default"].join(path__default["default"].relative(path__default["default"].dirname(_filepath2), path__default["default"].join(_dependencyPath, 'src', 'index.ts')))];
          return _context4.abrupt("continue", 51);
        case 46:
          _entry = _slicedToArray(entry, 3), name = _entry[0], _pnpmFolder = _entry[1], subFolder = _entry[2];
          _context4.next = 49;
          return getPackageDefinitionFilePath(_pnpmFolder, subFolder);
        case 49:
          pathToDefinitionFile = _context4.sent;
          compilerOptionsPaths[name] = [path__default["default"].join(path__default["default"].relative(path__default["default"].dirname(_filepath2), pathToDefinitionFile))];
        case 51:
          _context4.next = 38;
          break;
        case 53:
          _context4.next = 58;
          break;
        case 55:
          _context4.prev = 55;
          _context4.t0 = _context4["catch"](36);
          _iterator5.e(_context4.t0);
        case 58:
          _context4.prev = 58;
          _iterator5.f();
          return _context4.finish(58);
        case 61:
          _compilerOptions = coreHelpers.deepMerge(src !== false ? (_src$compilerOptions3 = src === null || src === void 0 ? void 0 : src.compilerOptions) !== null && _src$compilerOptions3 !== void 0 ? _src$compilerOptions3 : {} : {}, _original, {
            paths: coreHelpers.isEmptyObject(compilerOptionsPaths) ? undefined : compilerOptionsPaths
          });
          extraReferences = [];
          if (['__tests__', '__dts__'].includes(folder)) {
            extraReferences.push({
              path: '../src'
            });
          }
          if (folder.startsWith('__')) {
            testingPath = path__default["default"].relative(path__default["default"].dirname(_filepath2), path__default["default"].join((_dependencies$testing = dependencies['testing']) !== null && _dependencies$testing !== void 0 ? _dependencies$testing : '', 'src'));
            remirrorPath = path__default["default"].relative(path__default["default"].dirname(_filepath2), path__default["default"].join((_dependencies$remirro2 = dependencies['remirror']) !== null && _dependencies$remirro2 !== void 0 ? _dependencies$remirro2 : '', 'src'));
            extraReferences.push({
              path: testingPath
            }, {
              path: remirrorPath
            });
          }
          configFiles.push({
            shouldReference: true,
            filepath: _filepath2,
            json: _objectSpread(_objectSpread(_objectSpread({}, createAutoGeneratedFlag(folder)), {}, {
              extends: path__default["default"].relative(path__default["default"].dirname(_filepath2), PATH.baseTsconfig),
              compilerOptions: _compilerOptions
            }, _other), {}, {
              references: [...extraReferences, ...references]
            })
          });
        case 66:
          _i2++;
          _context4.next = 27;
          break;
        case 69:
          return _context4.abrupt("return", configFiles);
        case 70:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[36, 55, 58, 61]]);
  }));
  return _resolveTsConfigMeta.apply(this, arguments);
}
function generatePackageTsConfigs() {
  return _generatePackageTsConfigs.apply(this, arguments);
}
/**
 * The runner that runs when this is actioned.
 */
function _generatePackageTsConfigs() {
  _generatePackageTsConfigs = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    var _yield$Promise$all, _yield$Promise$all2, packages, dependencies, promises, limit, references, types, entryFiles, writePackageTsconfig, _iterator7, _step7, pkg, packagesTsconfig;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          writePackageTsconfig = function _writePackageTsconfig(pkg) {
            if (pkg.types && !pkg.private) {
              entryFiles.push(path__default["default"].join(helpers.getRelativePathFromJson(pkg), 'src', 'index.ts'));
            }
            promises.push(limit(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
              var tsconfigFiles, _iterator6, _step6, tsconfig;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return resolveTsConfigMeta(pkg, dependencies, types);
                  case 2:
                    tsconfigFiles = _context5.sent;
                    _iterator6 = _createForOfIteratorHelper(tsconfigFiles);
                    _context5.prev = 4;
                    _iterator6.s();
                  case 6:
                    if ((_step6 = _iterator6.n()).done) {
                      _context5.next = 13;
                      break;
                    }
                    tsconfig = _step6.value;
                    if (tsconfig.shouldReference) {
                      _context5.next = 10;
                      break;
                    }
                    return _context5.abrupt("continue", 11);
                  case 10:
                    references.push({
                      path: path__default["default"].relative(helpers.baseDir(), path__default["default"].dirname(tsconfig.filepath))
                    });
                  case 11:
                    _context5.next = 6;
                    break;
                  case 13:
                    _context5.next = 18;
                    break;
                  case 15:
                    _context5.prev = 15;
                    _context5.t0 = _context5["catch"](4);
                    _iterator6.e(_context5.t0);
                  case 18:
                    _context5.prev = 18;
                    _iterator6.f();
                    return _context5.finish(18);
                  case 21:
                    _context5.next = 23;
                    return Promise.all(tsconfigFiles.map(_ref4 => {
                      var filepath = _ref4.filepath,
                        json = _ref4.json;
                      return writeJSON__default["default"](filepath, json);
                    }));
                  case 23:
                    // Add the file created to the list of files to prettify at the end of
                    // the script being run.
                    filesToPrettify.push(...tsconfigFiles.map(tsconfig => tsconfig.filepath));
                  case 24:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[4, 15, 18, 21]]);
            }))));
          };
          helpers.log.info(chalk__default["default"](_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n{blue Generating {bold.grey tsconfig.json} files for all packages}"], ["\\n{blue Generating {bold.grey tsconfig.json} files for all packages}"]))));

          // Get the full package and the locations of all packages with a `types` field
          // in their `package.json`.
          _context6.next = 4;
          return Promise.all([helpers.getAllDependencies(), helpers.getTypedPackagesWithPath()]);
        case 4:
          _yield$Promise$all = _context6.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          packages = _yield$Promise$all2[0];
          dependencies = _yield$Promise$all2[1];
          promises = [];
          limit = pLimit__default["default"](os__default["default"].cpus().length);
          references = [];
          types = new Set();
          entryFiles = [];
          /**
           * Write the file for an individual package.
           */
          _iterator7 = _createForOfIteratorHelper(packages);
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
              pkg = _step7.value;
              // Populate the promises.
              writePackageTsconfig(pkg);
            }

            // Write all the files to the locations.
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
          _context6.next = 17;
          return Promise.all(promises);
        case 17:
          packagesTsconfig = {
            extends: makeRelative(path__default["default"].relative(path__default["default"].dirname(PATH.packagesTsconfig), PATH.baseTsconfig)),
            compilerOptions: {
              types: [...types],
              composite: true,
              noEmit: true,
              skipLibCheck: true
            },
            include: ['./*/src']
          };
          references.sort((a, b) => a.path.localeCompare(b.path));
          _context6.next = 21;
          return writeJSON__default["default"](PATH.rootTsconfig, {
            include: [],
            files: [],
            references
          }, {
            detectIndent: true
          });
        case 21:
          filesToPrettify.push(PATH.packagesTsconfig);
          _context6.next = 24;
          return writeJSON__default["default"](PATH.packagesTsconfig, packagesTsconfig, {
            detectIndent: true
          });
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _generatePackageTsConfigs.apply(this, arguments);
}
function main() {
  return _main.apply(this, arguments);
} // Run the script and listen for any errors.
function _main() {
  _main = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          if (!(helpers.cliArgs.size > 0)) {
            _context7.next = 5;
            break;
          }
          _context7.next = 3;
          return Promise.all([generateSizeLimitConfig()]);
        case 3:
          _context7.next = 17;
          break;
        case 5:
          if (!helpers.cliArgs.tsPackages) {
            _context7.next = 10;
            break;
          }
          _context7.next = 8;
          return Promise.all([generatePackageTsConfigs()]);
        case 8:
          _context7.next = 17;
          break;
        case 10:
          if (!helpers.cliArgs.entryPoint) {
            _context7.next = 15;
            break;
          }
          _context7.next = 13;
          return Promise.all([generateEntryPoint()]);
        case 13:
          _context7.next = 17;
          break;
        case 15:
          _context7.next = 17;
          return Promise.all([generateSizeLimitConfig()]);
        case 17:
          if (!(filesToPrettify.length === 0)) {
            _context7.next = 19;
            break;
          }
          return _context7.abrupt("return");
        case 19:
          helpers.log.debug('Prettifying the updated and created files');

          // Format all the files which have been created before exiting.
          _context7.next = 22;
          return helpers.formatFiles(filesToPrettify, {
            silent: true,
            formatter: 'prettier'
          });
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _main.apply(this, arguments);
}
main().catch(error => {
  helpers.log.error(chalk__default["default"](_templateObject || (_templateObject = _taggedTemplateLiteral(["\n{red Something went wrong while running the} {blue.bold generate-configs} {red script.}"], ["\\n{red Something went wrong while running the} {blue.bold generate-configs} {red script.}"]))));
  helpers.log.fatal('\n', error);
  process.exit(1);
});
