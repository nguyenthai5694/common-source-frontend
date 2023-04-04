/**
 * Actually, one commit can resolve many issues. BUT, developers tend to
 * combine all stuff that are NOT related to each others into into one commit
 * causing difficult for reviewing and tracing.  
 * It's a trade off to have only 1 issue ID in subject.
 */
function oneCommitOneIssue({ subject }) {
  if (!subject) return [true];

  const issueIds = subject.match(/#[0-9]*/g) || [];

  return [
    issueIds.length < 2,
    `Your commit violate "one commit one issue" rule. It contains ${issueIds.length} redmine issue IDs.`,
  ];
}

/**
 * "Talk is cheap, let use linter" - someone said.
 */
function prettierScope({ scope }) {
  if (!scope) return [true];

  // Check one space between characters.
  if (scope.includes('  ')) {
    return [false, 'Please check your commit scope, it use more than 1 space between characters.'];
  }

  // Check start and end with a word.
  if (!/^\w.*\w$/.test(scope)) {
    return [false, 'Please check your commit scope, scope must start/end with a word.'];
  }

  // Check space before and after hyphen.
  if (scope.match(/\-\w/) || scope.match(/\w\-/)) {
    return [false, `Please check your commit scope, add space before and after hyphen.
    Bad: "feat(scope-sub-scope): subject"
    Good: "feat(scope - sub scope): subject"`];
  }

  // For now, one commit many scopes is allowed.
  // Check space after comma.
  if (scope.match(/\,\w/)) {
    return [false, `Please check your commit scope, add space after comma.
    Bad: "feat(scope - scope2,scope3): subject"
    Good: "feat(scope - scope2, scope3): subject"`];
  }

  // Check valid character.
  return [
    /^[(a-z0-9)|(\-)|( )|(\,)]*$/g.test(scope),
    `Please check your commit scope, it can contain only lower case, number, hyphen, space and comma.
    Eg: "fix(kian, bunsyo list): fix feature x #111111"`,
  ];
}

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'prettier-scope': [2, 'always'],
    '1-commit-1-issue': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        '1-commit-1-issue': oneCommitOneIssue,
        'prettier-scope': prettierScope,
      },
    },
  ],
};
