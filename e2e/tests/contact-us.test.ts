import { expect, test } from "@playwright/test";

test.describe("Contact Us page", () => {
  test("should be navigable from the navbar", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Susisiekite" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Susisiekite", level: 1 }),
    ).toBeVisible();
  });

  test("should show company information", async ({ page }) => {
    await page.goto("/susisiekite");
    await expect(page.getByText("info@securityguru.lt")).toBeVisible();
    await expect(page.getByText(/\+37060334255/)).toBeVisible();
    await expect(page.getByText("Vilniuje ir Vilniaus")).toBeVisible();
    await expect(page.getByText(/I-VII/)).toBeVisible();
    await expect(page.getByText("306109454")).toBeVisible();
  });

  test("should successfully send email with correctly filled out form", async ({
    page,
  }) => {
    await page.goto("/susisiekite");

    await page.getByLabel("Namams").check();

    await page.getByPlaceholder("Security Guru").click();
    await page.getByPlaceholder("Security Guru").fill("Playwright");

    await page.getByPlaceholder("Miestas").click();
    await page.getByPlaceholder("Miestas").fill("Test");

    await page
      .getByPlaceholder("info@securityguru.lt")
      .fill("test@playwright.com");

    await page.getByPlaceholder("+").fill("+37064698452");

    await page.getByPlaceholder("Pateikite").fill("Playwright Test");

    await page.getByRole("button", { name: "Siųsti laišką" }).click();

    await expect(page.getByText("[Playwright]")).toBeVisible();
  });
});
