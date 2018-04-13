# Jira standup [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Greenkeeper badge](https://badges.greenkeeper.io/wingleung/jira-standup.svg)](https://greenkeeper.io/)

> cli tool to quickly show tickets you're assigned to and its impedements.

> **Note:** only works if Jira search is available in your network without authentication

<img src="jira-standup.gif" width="688">

## Getting Started

### Installing

```
npm i -g jira-standup
```

### Configuration

Create a config file `.jirarc` in your project root or home folder or anywhere in between

```
username=johndoe
project=yourJiraProject
jiraUrl=https://jira.url.com/
```

### Usage

```
jira standup
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

[npm-url]: https://www.npmjs.com/package/jira-standup
[npm-image]: https://img.shields.io/npm/v/jira-standup.svg
[travis-url]: https://travis-ci.org/wingleung/jira-standup
[travis-image]: https://travis-ci.org/wingleung/jira-standup.svg?branch=master
