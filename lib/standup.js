const fetch = require('node-fetch');
const chalk = require('chalk');
const ora = require('ora');
const Table = require('cli-table');
const rc = require('rc');
const log = require('./log');
const base64 = require('base-64');

let username = null;
let project = null;
let jiraUrl = null;

const table = new Table({
  chars: {
    top: '',
    'top-mid': '',
    'top-left': '',
    'top-right': '',
    bottom: '',
    'bottom-mid': '',
    'bottom-left': '',
    'bottom-right': '',
    left: '',
    'left-mid': '',
    mid: '',
    'mid-mid': '',
    right: '',
    'right-mid': '',
    middle: ' '
  },
  style: {
    'padding-left': 0,
    'padding-right': 10
  }
});

const getJiraQueryUrl = (username, project, jiraUrl) => {
  const query = `project = ${project} AND assignee = ${username} AND sprint in openSprints() AND sprint not in futureSprints() ORDER BY Rank ASC`;
  return `${jiraUrl}/rest/api/2/search?jql=${encodeURIComponent(query)}`;
};

const prettyPrintIssue = issue => {
  const impedement = issue.fields.customfield_10007
    ? `(${issue.fields.customfield_10007[0].value})`
    : null;
  const key = chalk.blue.bold(issue.key);
  const summary = chalk.red.bold(issue.fields.summary);

  let status = chalk.yellow(issue.fields.status.name);
  status = impedement ? `${status} ${chalk.yellow.dim(impedement)}` : status;

  table.push([status, key, summary]);

  if (issue.fields.issuelinks) {
    const issueLinks = issue.fields.issuelinks;

    issueLinks.forEach(issueLink => {
      const status = issueLink.inwardIssue
        ? issueLink.inwardIssue.fields.status.name
        : issueLink.outwardIssue.fields.status.name;

      const impedementType =
        status == 'Closed'
          ? chalk.gray.dim(issueLink.type.inward)
          : chalk.gray(issueLink.type.inward);

      let summary = issueLink.inwardIssue
        ? issueLink.inwardIssue.fields.summary
        : issueLink.outwardIssue.fields.summary;

      summary =
        status == 'Closed'
          ? chalk.gray.dim(`${summary} (${status})`)
          : chalk.gray(`${summary} (${status})`);

      table.push(['', impedementType, summary]);
    });
  }

  table.push(['']);
};

const prettyPrintResponse = json => {
  if (json.errorMessages) {
    json.errorMessages.forEach(error => log.error(error));
  }

  if (json.warningMessages) {
    json.warningMessages.forEach(warning => log.warning(warning));
  }

  if (json.issues && json.issues.length > 0) {
    const assignedIssues = json.issues;

    assignedIssues.forEach(issue => prettyPrintIssue(issue));

    log(table.toString());
  } else {
    log.warning(`No results found for ${username} on ${jiraUrl}`);
  }
};

module.exports.fetch = function(config) {
  username = config.username;
  assignee = config.assignee;
  password = config.password;
  project = config.project;
  let headers = new fetch.Headers();
  jiraUrl =
    config.jiraUrl && config.jiraUrl.endsWith('/')
      ? config.jiraUrl.slice(0, -1)
      : config.jiraUrl;

  if (!username) {
    log.error(
      'No username found, make sure you have a .jirarc file with a username property'
    );
    return;
  }
  
  if (!assignee) {
    log.error(
      'No assignee found, make sure you have a .jirarc file with a assignee property'
    );
    return;
  }
  
  if (!password) {
    log.warn(
      'No password found, not required if Jira search is available in your network without authentication'
    );
    return;
  }

  if (!jiraUrl) {
    log.error(
      'No jiraUrl found, make sure you have a .jirarc file with a jiraUrl property'
    );
    return;
  }

  if (!project) {
    log.error(
      'No project found, make sure you have a .jirarc file with a project property'
    );
    return;
  }

  const jiraRestUrl = getJiraQueryUrl(assignee, project, jiraUrl);

  const spinner = ora(chalk.blue('Fetching issues...')).start();
  
  if(password){
    headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
  }
  
  fetch(`${jiraRestUrl}`, { timeout: 5000, headers: headers })
    .then(res => res.json())
    .then(json => {
      spinner.stop();
      log();

      prettyPrintResponse(json);
    })
    .catch(err => {
      spinner.stop();
      log.error(err);
    });
};

module.exports.getJiraQueryUrl = getJiraQueryUrl;
module.exports.prettyPrintIssue = prettyPrintIssue;
module.exports.prettyPrintResponse = prettyPrintResponse;
