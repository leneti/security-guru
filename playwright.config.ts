import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:3000";

/** @see https://playwright.dev/docs/test-configuration */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : "50%",
  /** Reporter to use. @see https://playwright.dev/docs/test-reporters */
  reporter: "list",
  /* Visual testing settings */
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
      threshold: 0.2,
    },
  },
  use: {
    baseURL,
    /** Collect trace when retrying the failed test. @see https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 15"] },
    },
  ],
  webServer: {
    command: "yarn start",
    timeout: 180_000,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    gracefulShutdown: { signal: "SIGTERM", timeout: 30_000 },
  },
});
