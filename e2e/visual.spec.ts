import { test, expect, type PageAssertionsToHaveScreenshotOptions } from "@playwright/test";

const screenshotOptions: PageAssertionsToHaveScreenshotOptions = {
  animations: "disabled",
  maxDiffPixels: 100,
  threshold: 0.2,
};

test.describe("Visual Regression Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for page to fully load including network requests
    await page.waitForLoadState("domcontentloaded");
    await page.waitForLoadState("networkidle");
    // Wait for any animations to settle
    await page.waitForTimeout(500);
    // Disable animations for consistent screenshots
    await page.evaluate(() => {
      document.body.style.setProperty("animation", "none");
    });
    // Wait a bit more after disabling animations
    await page.waitForTimeout(200);
  });

  test("homepage-full-page", async ({ page }) => {
    await expect(page.locator("body")).toHaveScreenshot(
      "homepage-full-page.png",
      screenshotOptions,
    );
  });
});
