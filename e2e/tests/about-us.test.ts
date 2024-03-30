import { expect, test } from "@playwright/test";

test.describe("About Us page", () => {
  test("should be navigable from the navbar", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Apie mus" }).click();
    await expect(
      page.getByRole("heading", { name: "Apie mus", level: 1 }),
    ).toBeVisible();
  });
});
