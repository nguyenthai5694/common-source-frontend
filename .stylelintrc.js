module.exports = {
  "extends": [
    "stylelint-config-sass-guidelines",
    "stylelint-config-rational-order",
  ],
  "plugins": [
    "stylelint-order",
    "stylelint-config-rational-order/plugin"
  ],
  "rules": {
    "declaration-property-value-disallowed-list": null,
    "function-url-quotes": "never",
    "indentation": 2,
    "number-leading-zero": null,
    "scss/at-mixin-pattern": null, // DRAFT
    "scss/selector-no-redundant-nesting-selector": null, // DRAFT
    "selector-class-pattern": null,
    "selector-max-id": null, // DRAFT
    "selector-max-compound-selectors": 5,
    "selector-no-qualifying-type": null, // DRAFT
    "max-nesting-depth": null,
    "order/properties-alphabetical-order": null,
    "order/properties-order": [],
    "plugin/rational-order": [true, {
      "border-in-box-model": false,
      "empty-line-between-groups": false,
    }],
  }
}
