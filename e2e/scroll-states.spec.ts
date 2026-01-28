import { test, expect } from "@playwright/test";

test.describe("Scroll State Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("header-scroll-state", async ({ page }) => {
    // Initial state - at top of page
    await page.setViewportSize({ width: 1920, height: 1080 });

    const header = page.locator("nav").first();
    const initialClasses = await header.evaluate((el) => el.className);

    // At the top, header should be transparent (not scrolled state)
    expect(initialClasses).not.toContain("bg-dark/90");

    // Scroll down more than 50px
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);

    // After scrolling, header should have dark background with backdrop blur
    const scrolledClasses = await header.evaluate((el) => el.className);
    // Check for either bg-dark/90 or bg-[#021614] with the dark color
    const hasDarkBackground =
      scrolledClasses.includes("bg-dark/90") ||
      (scrolledClasses.includes("bg-[") && scrolledClasses.includes("#021614"));
    const hasBackdrop = scrolledClasses.includes("backdrop-blur");

    expect(hasDarkBackground).toBe(true);
    expect(hasBackdrop).toBe(true);

    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Header should return to transparent state
    const topClasses = await header.evaluate((el) => el.className);
    expect(topClasses).not.toContain("bg-dark/90");
  });
});
