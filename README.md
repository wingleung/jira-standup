# Jira standup [![Build Status](https://travis-ci.org/wingleung/jira-standup.svg?branch=master)](https://travis-ci.org/wingleung/jira-standup)

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
