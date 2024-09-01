const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1680,
  viewportHeight: 1050,
  requestTimeout: 15000,
  defaultCommandTimeout: 2000,
  scrollBehavior: "nearest",

  //numTestsKeptInMemory: 0,
  experimentalMemoryManagement: true,
  video: true,
  videoCompression: 0,

  e2e: {
    env: {
      mainPage: "https://magento.softwaretestingboard.com/",
    },
  },
});
