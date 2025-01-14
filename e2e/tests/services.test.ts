import { expect, test } from "@playwright/test";

const serviceData = [
  "Apsaugos signalizacijos sistemos",
  "Įeigos kontrolės sistemos",
  "Priešgaisrinės signalizacijos sistemos",
  "Vaizdo stebėjimo sistemos",
  "Integruoti apsaugos sprendimai",
];

test.describe("Service pages", () => {
  for (const service of serviceData) {
    test(`${service} should be navigable from the navbar`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Paslaugos" }).click();
      await page.getByRole("menuitem", { name: service }).click();
      await expect(
        page.getByRole("heading", { name: service, level: 1 }),
      ).toBeVisible();
    });
  }
});
