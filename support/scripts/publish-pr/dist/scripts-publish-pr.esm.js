import { l as log } from '../../dist/helpers-894af5ce.esm.js';
import { m as mutatePackageVersions } from '../../dist/mutatate-packages-aa4b1820.esm.js';
import '@babel/runtime/helpers/regeneratorRuntime';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/helpers/objectSpread2';
import '@babel/runtime/helpers/createForOfIteratorHelper';
import '@babel/runtime/helpers/asyncToGenerator';
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
import '@babel/runtime/helpers/objectWithoutProperties';
import 'os';
import 'p-limit';
import 'semver';
import 'write-json-file';

/**
 * @script
 *
 * Mutate the package locally with the provided PR so that it can be published.
 */
var PRERELEASE = process.env.PRERELEASE;
if (!PRERELEASE) {
  log.error('No `PRERELEASE` environment variable provided.');
  process.exit(1);
}
mutatePackageVersions(PRERELEASE);
