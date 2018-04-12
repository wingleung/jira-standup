#!/usr/bin/env node

const program = require('commander');
const rc = require('rc');

const log = require('./lib/log');
const standup = require('./lib/standup');
const packageJson = require('./package.json');

program.addImplicitHelpCommand = () => {};

const config = rc('jira', {
    username: null,
    jiraUrl: null
});

if(!config.config) {
    log.warn('config not present, please create a .jirarc file in the project root or your home folder');
}

program
    .version(packageJson.version);

program
    .command('standup')
    .description('Show current standup report')
    .action((cmd) => {
        standup.fetch(config);
    });

program
    .command('*', 'Default command', {noHelp: true})
    .action((cmd) => {
        log.error(`${cmd}: command not found`);
        program.help();
    });

program.parse(process.argv);
