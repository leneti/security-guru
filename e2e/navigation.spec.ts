import { test, expect } from "@playwright/test";

test.describe("Navigation Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  // Desktop Navigation Tests
  test.describe("Desktop Navigation", () => {
    test("paslaugos-link", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const link = page.locator('nav a:has-text("Paslaugos")');
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL("**#services");
    });

    test("apie-mus-link", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const link = page.locator('nav a:has-text("Apie mus")');
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL("**#about");
    });

    test("susisiekti-cta", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const link = page.locator('nav a:has-text("Susisiekti")').last();
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL("**#contact");
    });
  });

  // Mobile Navigation Tests
  test.describe("Mobile Navigation", () => {
    test("mobile-menu-opens", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Use the first occurrence in the nav (not in the dialog)
      const menuButton = page.locator('nav button[aria-label="Toggle mobile menu"]').first();
      await expect(menuButton).toBeVisible();

      // Click to open menu
      await menuButton.click();
      await page.waitForTimeout(500);

      // Check that dialog is now open by checking for visible links
      const dialogLinks = page.locator('[role="dialog"] a:has-text("Paslaugos")');
      await expect(dialogLinks).toBeVisible();
    });

    test("mobile-menu-closes", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Open menu first
      const menuButton = page.locator('nav button[aria-label="Toggle mobile menu"]').first();
      await menuButton.click();
      await page.waitForTimeout(500);

      // Verify dialog is open
      const dialogLinks = page.locator('[role="dialog"] a:has-text("Paslaugos")');
      await expect(dialogLinks).toBeVisible();

      // Click the close button in the dialog
      const closeButton = page.locator('[role="dialog"] button[aria-label="Toggle mobile menu"]');
      await closeButton.click();
      await page.waitForTimeout(500);

      // Verify dialog is closed
      await expect(dialogLinks).not.toBeVisible();
    });

    test("mobile-link-scrolls", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.locator('nav button[aria-label="Toggle mobile menu"]').first().click();
      await page.waitForTimeout(500);

      const mobileLink = page.locator('[role="dialog"] a:has-text("Paslaugos")');
      await expect(mobileLink).toBeVisible();
      await mobileLink.click();
      await page.waitForTimeout(500);
      await page.waitForURL("**#services");
      await expect(page.locator("#services")).toBeInViewport();
    });
  });

  // Footer Navigation Tests
  test.describe("Footer Navigation", () => {
    test("footer-services-link", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const link = page.locator('footer a[href="#services"]');
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL("**#services");
    });

    test("footer-about-link", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const link = page.locator('footer a[href="#about"]');
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL("**#about");
    });

    test("footer-contact-link", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const link = page.locator('footer a[href="#contact"]');
      await expect(link).toBeVisible();
      await link.click();
      await page.waitForURL("**#contact");
    });
  });

  // Hero CTA Tests
  test.describe("Hero CTAs", () => {
    test("hero-services-cta", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const cta = page.locator('section:has(h1) a:has-text("Mūsų Paslaugos")');
      await expect(cta).toBeVisible();
      await cta.click();
      await page.waitForURL("**#services");
    });

    test("hero-offer-cta", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const cta = page.locator('section:has(h1) a:has-text("Gauti Pasiūlymą")');
      await expect(cta).toBeVisible();
      await cta.click();
      await page.waitForURL("**#contact");
    });
  });

  // Social Links Tests
  test.describe("Social Links", () => {
    test("facebook-opens-new-tab", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const facebookLink = page.locator('footer a[href*="facebook"]');
      await expect(facebookLink).toBeVisible();

      const [newPage] = await Promise.all([page.waitForEvent("popup"), facebookLink.click()]);
      await expect(newPage).toHaveURL(/facebook\.com/);
    });

    test("instagram-opens-new-tab", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const instagramLink = page.locator('footer a[href*="instagram"]');
      await expect(instagramLink).toBeVisible();

      const [newPage] = await Promise.all([page.waitForEvent("popup"), instagramLink.click()]);
      await expect(newPage).toHaveURL(/instagram\.com/);
    });
  });
});
