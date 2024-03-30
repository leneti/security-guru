import { expect, test } from "@playwright/test";

test.describe("Service pages", () => {
  test("should be navigable from the navbar", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Paslaugos" }).click();
    const serviceButtons = page.getByRole("menuitem");
    const allServices = await serviceButtons.allTextContents();

    if (allServices.length < 1) throw new Error("No services found");

    for (const service of allServices) {
      await page.getByRole("menuitem", { name: service }).click();
      await expect(
        page.getByRole("heading", { name: service, level: 1 }),
      ).toBeVisible();
      await page.getByRole("button", { name: "Paslaugos" }).click();
    }
  });
});
