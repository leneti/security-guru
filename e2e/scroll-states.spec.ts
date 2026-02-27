import { test, expect } from "@playwright/test";

test.describe("Scroll State Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("header-scroll-state", async ({ page }) => {
    // Initial state - at top of page
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Check page scroll height to determine if scrolling is possible
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);

    const header = page.locator("nav").first();
    const initialClasses = await header.evaluate((el) => el.className);

    // At the top, header should be transparent (not scrolled state)
    expect(initialClasses).not.toContain("bg-dark/90");

    // Scroll down more than 50px
    const canScroll = scrollHeight > viewportHeight;

    if (canScroll) {
      // Use scrollTo with fallback for mobile Safari which doesn't support scrollTo in WebKit
      // First try scrollTo, if it doesn't work, simulate the scroll state
      await page.evaluate(() => window.scrollTo(0, 100));
      const actualScrollY = await page.evaluate(() => window.scrollY);

      // If scrollTo didn't work (common in mobile WebKit), use fallback
      if (actualScrollY === 0) {
        await page.evaluate(() => {
          Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
          window.dispatchEvent(new Event("scroll"));
        });
      }
    } else {
      // Page isn't scrollable, simulate scroll state directly
      await page.evaluate(() => {
        Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
        window.dispatchEvent(new Event("scroll"));
      });
    }
    await page.waitForTimeout(500);

    // After scrolling, header should have dark background with backdrop blur
    const scrolledClasses = await header.evaluate((el) => el.className);
    // Check for either bg-dark/90 or bg-[#021614] with the dark color
    const hasDarkBackground =
      scrolledClasses.includes("bg-dark/90") ||
      (scrolledClasses.includes("bg-[") && scrolledClasses.includes("#021614"));
    // Check for backdrop-blur (any blur variant)
    const hasBackdrop =
      scrolledClasses.includes("backdrop-blur") || scrolledClasses.includes("backdrop-blur-sm");

    expect(hasDarkBackground).toBe(true);
    expect(hasBackdrop).toBe(true);

    // Scroll back to top - use scrollTo with fallback for mobile
    await page.evaluate(() => window.scrollTo(0, 0));
    const scrollBackY = await page.evaluate(() => window.scrollY);
    if (scrollBackY !== 0) {
      await page.evaluate(() => {
        Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
        window.dispatchEvent(new Event("scroll"));
      });
    }
    await page.waitForTimeout(500);

    // Header should return to transparent state
    const topClasses = await header.evaluate((el) => el.className);
    expect(topClasses).not.toContain("bg-dark/90");
  });
});
