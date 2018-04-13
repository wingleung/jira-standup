const chalk = require('chalk');
const logSymbols = require('log-symbols');

const log = (message = '') => console.log(message);
exports['default'] = log;
module.exports = exports['default'];

const warning = message =>
  console.log(chalk.yellow(`${logSymbols.warning}  ${message}`));
module.exports.warning = warning;

const error = message =>
  console.log(chalk.red(`${logSymbols.error}  ${message}`));
module.exports.error = error;

const success = message =>
  console.log(chalk.green(`${logSymbols.success}  ${message}`));
module.exports.success = success;

const info = message =>
  console.log(chalk.blue(`${logSymbols.info}  ${message}`));
module.exports.info = info;
