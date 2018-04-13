import test from 'ava';
import standup from '../lib/standup';

test('getJiraQueryUrl', t => {
  const username = 'USERNAME';
  const project = 'PROJECT';
  const jiraUrl = 'JIRA_URL';

  const query = encodeURIComponent(
    `project = ${project} AND assignee = ${username} AND sprint in openSprints() AND sprint not in futureSprints() ORDER BY Rank ASC`
  );
  const expectedUrl = `${jiraUrl}/rest/api/2/search?jql=${query}`;

  t.deepEqual(
    standup.getJiraQueryUrl('USERNAME', 'PROJECT', 'JIRA_URL'),
    expectedUrl
  );
});
