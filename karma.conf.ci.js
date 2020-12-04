// Run the config in a Headless browser (required for running in CI)
const setupBaseConfig = require('./karma.conf'); 

process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  setupBaseConfig(config);

  config.set({
    browsers: ['ChromeHeadless'],
  });
};
