const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: (config) => {
    config.resolve.alias['app'] = path.resolve(__dirname, '..', 'src', 'app');
    config.resolve.alias['soumu'] = path.resolve(__dirname, '..', 'src', 'soumu');

    return config;
  }
}