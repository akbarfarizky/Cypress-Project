const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com', // ← base URL kamu
    defaultCommandTimeout: 3000, // ← timeout default untuk semua perintah (3 detik)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
