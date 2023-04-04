const importOrder = require('./import-order')

module.exports = {
  extends: [
    'react-app',
  ],
  rules: {
    "comma-dangle": ["error", "always-multiline"],
    "jsx-quotes": ["error", "prefer-single"],
    "quotes": ["error", "single"],
    "max-lines": ["error", 500],
    "max-len": ["error", { "code": 120 }],
    "complexity": ["error", 20],
    "import/order": importOrder.config,
    "import/newline-after-import": ["error", { "count": 1 }],
    "no-multiple-empty-lines": ["error", { "max": 1 }],
    "no-console": "warn",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
      { blankLine: "always", prev: ["if"], next: "*" },
      { blankLine: "always", prev: ["*"], next: "if" },
    ],
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/jsx-newline": ["error"],
    "lines-between-class-members": ["error", "always"],
    "padded-blocks": ["error", "never"],
    "object-shorthand": ["error", "always"]
  }
}
