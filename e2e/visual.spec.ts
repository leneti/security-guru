import { test, expect, type PageAssertionsToHaveScreenshotOptions } from "@playwright/test";

const screenshotOptions: PageAssertionsToHaveScreenshotOptions = {
  animations: "disabled",
  maxDiffPixels: 100,
  threshold: 0.2,
};

test.describe("Visual Regression Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for page to fully load
    await page.waitForLoadState("domcontentloaded");
    // Disable animations for consistent screenshots
    await page.evaluate(() => {
      document.body.style.setProperty("animation", "none");
    });
  });

  test.only("homepage-full-page", async ({ page }) => {
    await expect(page).toHaveScreenshot("homepage-full-page.png", screenshotOptions);
  });

  test("header-desktop", async ({ page }) => {
    const header = page.locator("nav").first();
    await expect(header).toHaveScreenshot("header-desktop.png", screenshotOptions);
  });

  test("hero-section", async ({ page }) => {
    const hero = page.locator("#hero");
    await expect(hero).toHaveScreenshot("hero-section.png", screenshotOptions);
  });

  test("services-section", async ({ page }) => {
    const services = page.locator("#services");
    await expect(services).toHaveScreenshot("services-section.png", screenshotOptions);
  });

  test("about-section", async ({ page }) => {
    const about = page.locator("#about");
    await expect(about).toHaveScreenshot("about-section.png", screenshotOptions);
  });

  test("contact-section", async ({ page }) => {
    const contact = page.locator("#contact");
    await expect(contact).toHaveScreenshot("contact-section.png", screenshotOptions);
  });

  test("footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toHaveScreenshot("footer.png", screenshotOptions);
  });
});
