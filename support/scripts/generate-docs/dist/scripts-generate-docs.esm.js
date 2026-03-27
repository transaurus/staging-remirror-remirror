import _regeneratorRuntime from '@babel/runtime/helpers/esm/regeneratorRuntime';
import _slicedToArray from '@babel/runtime/helpers/esm/slicedToArray';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import { writeFile, mkdirp, readFile } from 'fs-extra';
import inquirer from 'inquirer';
import Mustache from 'mustache';
import path from 'path';
import { kebabCase, entries } from '@remirror/core-helpers';
import { b as baseDir, l as log, f as fileExists } from '../../dist/helpers-894af5ce.esm.js';
import '@babel/runtime/helpers/taggedTemplateLiteral';
import '@babel/runtime/helpers/objectSpread2';
import '@babel/runtime/helpers/createForOfIteratorHelper';
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
import 'rimraf';
import 'throttle-debounce';
import 'tslog';
import 'util';

// The folder where the markdown templates are stored.
var templateFolder = baseDir('./support/templates/docs');

// A mapping of the types of generated docs to the location of their templates.
var templates = {
  extension: {
    destinationFolder: baseDir('docs', 'extensions'),
    origin: path.join(templateFolder, 'extension.md')
  },
  package: {
    destinationFolder: baseDir('docs', 'packages'),
    origin: path.join(templateFolder, 'package.md')
  },
  command: {
    destinationFolder: baseDir('docs', 'commands'),
    origin: path.join(templateFolder, 'command.md')
  },
  helper: {
    destinationFolder: baseDir('docs', 'helpers'),
    origin: path.join(templateFolder, 'helper.md')
  },
  hook: {
    destinationFolder: baseDir('docs', 'hooks'),
    origin: path.join(templateFolder, 'hook.md')
  },
  stringHandler: {
    destinationFolder: baseDir('docs', 'string-handlers'),
    origin: path.join(templateFolder, 'string-handler.md')
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
          return inquirer.prompt([{
            type: 'list',
            name: 'template',
            message: 'What template would you like to use?',
            choices: entries(templates).map(_ref => {
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
          return readFile(origin, {
            encoding: 'utf-8'
          });
        case 6:
          template = _context.sent;
          rendered = Mustache.render(template, {
            name: answers.entityName
          });
          destination = path.join(destinationFolder, "".concat(kebabCase(answers.entityName), ".md"));
          _context.next = 11;
          return fileExists(destination);
        case 11:
          if (!_context.sent) {
            _context.next = 14;
            break;
          }
          log.warn("Documentation already exists at ".concat(path.relative(baseDir(), destination)));
          return _context.abrupt("return");
        case 14:
          _context.next = 16;
          return mkdirp(path.dirname(destination));
        case 16:
          _context.next = 18;
          return writeFile(destination, rendered, {});
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _run.apply(this, arguments);
}
run().catch(error => {
  log.fatal(error);
});
