import _regeneratorRuntime from '@babel/runtime/helpers/esm/regeneratorRuntime';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import _createForOfIteratorHelper from '@babel/runtime/helpers/esm/createForOfIteratorHelper';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import os from 'os';
import pLimit from 'p-limit';
import path from 'path';
import { parse } from 'semver';
import writeJSON from 'write-json-file';
import { b as baseDir, h as getAllDependencies } from './helpers-894af5ce.esm.js';

var _excluded = ["location"];

/**
 * Read through the packages and update all the versions of internal
 * dependencies to be the new version
 */
function mutatePackageVersions(_x) {
  return _mutatePackageVersions.apply(this, arguments);
}

/**
 * Update the pre-release version to use the PR version.
 */
function _mutatePackageVersions() {
  _mutatePackageVersions = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(prerelease) {
    var options, packages, limit, promises, versionedNames, _iterator, _step, pkg, _iterator2, _step2, _loop, rootLocation, rootJson;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // The options for writing the json files
          options = {
            detectIndent: true
          }; // First change the versions for all public packages.
          _context2.next = 3;
          return getAllDependencies();
        case 3:
          packages = _context2.sent;
          limit = pLimit(os.cpus().length);
          promises = [];
          versionedNames = {};
          _iterator = _createForOfIteratorHelper(packages);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              pkg = _step.value;
              versionedNames[pkg.name] = getPreReleaseVersion(pkg.version, prerelease);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _iterator2 = _createForOfIteratorHelper(packages);
          _context2.prev = 10;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var pkg, location, json, jsonLocation;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  pkg = _step2.value;
                  location = pkg.location, json = _objectWithoutProperties(pkg, _excluded);
                  jsonLocation = path.join(location, 'package.json'); // Change the version of the json
                  json.version = versionedNames[pkg.name];

                  // Change the versions of internal dependencies.
                  mutateDependencies(versionedNames, json.dependencies);

                  // Change the versions of internal devDependencies.
                  mutateDependencies(versionedNames, json.devDependencies);

                  // Change the versions of internal peerDependencies.
                  mutateDependencies(versionedNames, json.peerDependencies);

                  // log.debug(location, json.version);
                  promises.push(limit(() => writeJSON(jsonLocation, json, options)));
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _loop);
          });
          _iterator2.s();
        case 13:
          if ((_step2 = _iterator2.n()).done) {
            _context2.next = 17;
            break;
          }
          return _context2.delegateYield(_loop(), "t0", 15);
        case 15:
          _context2.next = 13;
          break;
        case 17:
          _context2.next = 22;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t1 = _context2["catch"](10);
          _iterator2.e(_context2.t1);
        case 22:
          _context2.prev = 22;
          _iterator2.f();
          return _context2.finish(22);
        case 25:
          rootLocation = baseDir('package.json'); // Mutate the root package.json file
          rootJson = require(baseDir('package.json'));
          mutateDependencies(versionedNames, rootJson.dependencies);
          mutateDependencies(versionedNames, rootJson.devDependencies);
          mutateDependencies(versionedNames, rootJson.peerDependencies);
          promises.push(limit(() => writeJSON(rootLocation, rootJson, options)));
          _context2.next = 33;
          return Promise.all(promises);
        case 33:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[10, 19, 22, 25]]);
  }));
  return _mutatePackageVersions.apply(this, arguments);
}
function getPreReleaseVersion(version, prerelease) {
  var semver = parse(version);
  if (!semver) {
    throw new Error("Invalid version provided: ".concat(version));
  }
  return "0.0.0-".concat(prerelease);
}

/**
 * Mutate dependencies so that every package uses the same dependencies.
 */
function mutateDependencies(versionedNames, dependencies) {
  if (!dependencies) {
    return;
  }
  for (var _i = 0, _Object$keys = Object.keys(dependencies); _i < _Object$keys.length; _i++) {
    var name = _Object$keys[_i];
    var prVersion = versionedNames[name];
    if (prVersion) {
      dependencies[name] = prVersion;
    }
  }
}

export { mutatePackageVersions as m };
