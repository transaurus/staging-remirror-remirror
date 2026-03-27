'use strict';

var _toArray = require('@babel/runtime/helpers/toArray');
var child_process = require('child_process');

var _process$argv = _toArray(process.argv),
  args = _process$argv.slice(2);
var command = args.join(' ');
var CI = process.env.CI;
if (CI === 'true') {
  console.log("CI='true' - skipping command: '".concat(command, "'\n\n"));
  process.exit(0);
}
child_process.execSync(command, {
  stdio: 'inherit'
});
