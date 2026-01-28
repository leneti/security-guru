import { test, expect } from "@playwright/test";

test.describe("Responsive Layout Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test.describe("Header Layout", () => {
    test("mobile header shows hamburger, desktop shows nav", async ({ page }) => {
      // Mobile viewport (< 768px)
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      const mobileMenuButton = page.locator('button[aria-label="Toggle mobile menu"]');
      const desktopNav = page.locator("nav .hidden.md\\:flex");

      await expect(mobileMenuButton).toBeVisible();
      await expect(desktopNav).toBeHidden();

      // Desktop viewport (>= 768px)
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(300);

      await expect(mobileMenuButton).toBeHidden();
      await expect(desktopNav).toBeVisible();
    });
  });

  test.describe("Services Grid Layout", () => {
    test("mobile: 1 column", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      const servicesGrid = page.locator("#services .grid");
      const cards = servicesGrid.locator("> div");

      await expect(cards.first()).toBeVisible();

      // Check grid layout via computed style or by counting visible items in one row
      const gridStyle = await servicesGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Mobile should have 1 column
      expect(gridStyle.split(" ").length).toBe(1);
    });

    test("tablet: 2 columns", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(300);

      const servicesGrid = page.locator("#services .grid");
      const gridStyle = await servicesGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Tablet (md breakpoint) should have 2 columns
      expect(gridStyle.split(" ").length).toBe(2);
    });

    test("desktop: 3 columns", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(300);

      const servicesGrid = page.locator("#services .grid");
      const gridStyle = await servicesGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Desktop (lg breakpoint) should have 3 columns
      expect(gridStyle.split(" ").length).toBe(3);
    });
  });

  test.describe("Footer Layout", () => {
    test("footer adapts from single column to multi-column", async ({ page }) => {
      // Mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(300);

      const footerGrid = page.locator("footer .grid");
      const footerColumns = await footerGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Mobile typically has 1 column for footer
      const mobileColumns = footerColumns.split(" ").length;
      expect(mobileColumns).toBe(1);

      // Desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(300);

      const desktopColumns = await footerGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Desktop should have more columns
      expect(desktopColumns.split(" ").length).toBeGreaterThan(1);
    });
  });
});
