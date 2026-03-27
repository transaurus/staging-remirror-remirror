'use strict';

var helpers = require('../../dist/helpers-c1987c03.cjs.dev.js');
var mutatatePackages = require('../../dist/mutatate-packages-a6ab8015.cjs.dev.js');
require('@babel/runtime/helpers/regeneratorRuntime');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/createForOfIteratorHelper');
require('@babel/runtime/helpers/asyncToGenerator');
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
require('@babel/runtime/helpers/objectWithoutProperties');
require('os');
require('p-limit');
require('semver');
require('write-json-file');

/**
 * @script
 *
 * Mutate the package locally with the provided PR so that it can be published.
 */
var PRERELEASE = process.env.PRERELEASE;
if (!PRERELEASE) {
  helpers.log.error('No `PRERELEASE` environment variable provided.');
  process.exit(1);
}
mutatatePackages.mutatePackageVersions(PRERELEASE);
