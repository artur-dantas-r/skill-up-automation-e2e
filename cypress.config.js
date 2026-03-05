import { defineConfig } from "cypress";
import { allureCypress } from "allure-cypress/reporter";
import { connect } from './cypress/support/mongo';

require('dotenv').config()

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      const db = await connect()

      on('task', {
        async deleteUser(email) {
          const users = db.collection('users')
          await users.deleteMany({ email: email })
          return null
        }
      })

      allureCypress(on, config, {
        resultsDir: "allure-result",
      });
      return config
    },
    baseUrl: process.env.BASE_URL,
    video: false,
    screenshotOnRunFailure: false,
    env: {
      cloudAmqpApi: process.env.CLOUD_AMPQ_API,
      cloudAmqpAuth: process.env.CLOUD_AMPQ_AUTH
    }
  },
});
