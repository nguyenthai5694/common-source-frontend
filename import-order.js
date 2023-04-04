/**
 * For more information about import order convention, please read B.2. JS convention.md
 */

const fs = require('fs');

const packageJsonRawData = fs.readFileSync('package.json');
let extDependencies = Object.keys(JSON.parse(packageJsonRawData).dependencies);
extDependencies = extDependencies.concat([
  'react-router',
  'history',
  'query-string'
])

// Why react on top, because this is a react application!
const pathGroups = [
  {
    "pattern": "react",
    "group": "external",
    "position": "before",
  },
];

extDependencies.forEach(depName => {
  pathGroups.push({
    "pattern": depName,
    "group": "builtin", // actually, it is external package.
    "position": "before"
  })

  pathGroups.push({
    "pattern": `${depName}/**`,
    "group": "builtin",
    "position": "before"
  })
})

pathGroups.push({
  "pattern": `soumu/**`,
  "group": "internal",
  "position": "before"
})

// Make sure code inside app/modules/** will always import after app/{const|api|xxx}.
pathGroups.push({
  "pattern": `app/modules/**`,
  "group": "internal",
  "position": "after"
})

pathGroups.push({
  "pattern": `app/**`,
  "group": "internal",
  "position": "before"
})

// TODO: this is list of valid child folders in alphabetic order(hard code),
// it is better to use regex pattern to find out valid child folders.
const validChildFolders = [
  'api',
  'components',
  'const',
  'hooks',
  'modules',
  'services',
  'store',
];

validChildFolders.forEach(folderName => {
  pathGroups.push({
    "pattern": `./${folderName}/**`,
    "group": "parent",
    "position": "before"
  });
});

exports.config = [
  "error",
  {
    "pathGroupsExcludedImportTypes": ["react"],
    "newlines-between": "never",
    "groups": [
      "external",
      "builtin",
      "internal",
      "index",
      "parent",
      "sibling",
    ],
    "pathGroups": pathGroups,
    "alphabetize": {
      order: 'asc',
      caseInsensitive: true,
    },
  }
];