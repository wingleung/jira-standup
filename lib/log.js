const chalk = require('chalk');
const logSymbols = require('log-symbols');

exports['default'] = (message = '') => {
    console.log(message);
};
module.exports = exports["default"];

const warning = (message) => console.log(chalk.yellow(`${logSymbols.warning}  ${message}`));
module.exports.warn = warning;
module.exports.warning = warning;

const error = (message) => console.log(chalk.red(`${logSymbols.error}  ${message}`));
module.exports.err = error;
module.exports.error = error;

const success = (message) => console.log(chalk.green(`${logSymbols.success}  ${message}`));
module.exports.ok = success;
module.exports.success = success;

const info = (message) => console.log(chalk.blue(`${logSymbols.info}  ${message}`));
module.exports.info = info;
