import { defineConfig } from "cypress";
import PluginEvents = Cypress.PluginEvents;
import PluginConfigOptions = Cypress.PluginConfigOptions;

export default defineConfig({
  e2e: {
    setupNodeEvents(on: PluginEvents, config: PluginConfigOptions) {},
    baseUrl: 'http://localhost:3000',
  },
});
