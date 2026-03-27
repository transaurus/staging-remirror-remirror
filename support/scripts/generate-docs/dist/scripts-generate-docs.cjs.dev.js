'use strict';

var _regeneratorRuntime = require('@babel/runtime/helpers/regeneratorRuntime');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var fs = require('fs-extra');
var inquirer = require('inquirer');
var Mustache = require('mustache');
var path = require('path');
var coreHelpers = require('@remirror/core-helpers');
var helpers = require('../../dist/helpers-c1987c03.cjs.dev.js');
require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/helpers/objectSpread2');
require('@babel/runtime/helpers/createForOfIteratorHelper');
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
require('rimraf');
require('throttle-debounce');
require('tslog');
require('util');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var inquirer__default = /*#__PURE__*/_interopDefault(inquirer);
var Mustache__default = /*#__PURE__*/_interopDefault(Mustache);
var path__default = /*#__PURE__*/_interopDefault(path);

// The folder where the markdown templates are stored.
var templateFolder = helpers.baseDir('./support/templates/docs');

// A mapping of the types of generated docs to the location of their templates.
var templates = {
  extension: {
    destinationFolder: helpers.baseDir('docs', 'extensions'),
    origin: path__default["default"].join(templateFolder, 'extension.md')
  },
  package: {
    destinationFolder: helpers.baseDir('docs', 'packages'),
    origin: path__default["default"].join(templateFolder, 'package.md')
  },
  command: {
    destinationFolder: helpers.baseDir('docs', 'commands'),
    origin: path__default["default"].join(templateFolder, 'command.md')
  },
  helper: {
    destinationFolder: helpers.baseDir('docs', 'helpers'),
    origin: path__default["default"].join(templateFolder, 'helper.md')
  },
  hook: {
    destinationFolder: helpers.baseDir('docs', 'hooks'),
    origin: path__default["default"].join(templateFolder, 'hook.md')
  },
  stringHandler: {
    destinationFolder: helpers.baseDir('docs', 'string-handlers'),
    origin: path__default["default"].join(templateFolder, 'string-handler.md')
  }
};
function run() {
  return _run.apply(this, arguments);
} // Create an inquirer prompt which generates the documentation.
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var answers, _templates$answers$te, origin, destinationFolder, template, rendered, destination;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return inquirer__default["default"].prompt([{
            type: 'list',
            name: 'template',
            message: 'What template would you like to use?',
            choices: coreHelpers.entries(templates).map(_ref => {
              var _ref2 = _slicedToArray(_ref, 1),
                name = _ref2[0];
              return {
                name,
                type: 'choice',
                key: name[0]
              };
            })
          }, {
            type: 'input',
            name: 'entityName',
            message: 'What name would you like to use?'
          }]);
        case 2:
          answers = _context.sent;
          _templates$answers$te = templates[answers.template], origin = _templates$answers$te.origin, destinationFolder = _templates$answers$te.destinationFolder;
          _context.next = 6;
          return fs.readFile(origin, {
            encoding: 'utf-8'
          });
        case 6:
          template = _context.sent;
          rendered = Mustache__default["default"].render(template, {
            name: answers.entityName
          });
          destination = path__default["default"].join(destinationFolder, "".concat(coreHelpers.kebabCase(answers.entityName), ".md"));
          _context.next = 11;
          return helpers.fileExists(destination);
        case 11:
          if (!_context.sent) {
            _context.next = 14;
            break;
          }
          helpers.log.warn("Documentation already exists at ".concat(path__default["default"].relative(helpers.baseDir(), destination)));
          return _context.abrupt("return");
        case 14:
          _context.next = 16;
          return fs.mkdirp(path__default["default"].dirname(destination));
        case 16:
          _context.next = 18;
          return fs.writeFile(destination, rendered, {});
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _run.apply(this, arguments);
}
run().catch(error => {
  helpers.log.fatal(error);
});
