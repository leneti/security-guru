import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("hero CTA should navigate to Contact Us", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Susisiekite su mumis" }).click();
    await expect(
      page.getByRole("heading", { name: "Susisiekite", level: 1 }),
    ).toBeVisible();
  });

  test("navbar logo should navigate back to home page", async ({ page }) => {
    await page.goto("/apie-mus");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "logotipas" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Namų ir verslo apsaugos sprendimai" }),
    ).toBeVisible();
  });

  test("footer logo should navigate back to home page", async ({ page }) => {
    await page.goto("/apie-mus");
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "logotipas" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Namų ir verslo apsaugos sprendimai" }),
    ).toBeVisible();
  });
});
