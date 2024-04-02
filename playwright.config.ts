import dotenv from "dotenv";
import path from "path";
import { defineConfig, devices } from "@playwright/test";

dotenv.config({ path: path.resolve(__dirname, ".env.example") });

export default defineConfig({
  testDir: "./e2e/tests",
  outputDir: "./e2e/results",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  expect: {
    timeout: 20_000,
  },

  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run dev:ci",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
