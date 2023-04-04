/**
 * @see https://github.com/wojtekmaj/react-pdf/issues/415#issuecomment-634112378
 */
module.exports = function override(config) {
  config.module.rules[0].parser.requireEnsure = true;

  return config;
};