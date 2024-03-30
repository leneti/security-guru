import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("hero CTA should navigate to Contact Us", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Susisiekite su mumis" }).click();
    await expect(
      page.getByRole("heading", { name: "Susisiekite" }),
    ).toBeVisible();
  });
});
