import { test, expect } from "@playwright/test";

test("homepage loads correctly", async ({ page }) => {
  await page.goto("/");

  // Expect the page to have a title containing "Security Guru"
  await expect(page).toHaveTitle(/Security Guru/i);
});

test("navigation menu is visible", async ({ page }) => {
  await page.goto("/");

  // Check that the main navigation is present
  await expect(page.locator("nav")).toBeVisible();
});

test("services section is displayed", async ({ page }) => {
  await page.goto("/");

  // Check that services section exists
  await expect(page.getByText(/Apsaugos signalizacijos/i)).toBeVisible();
});

test("contact form is present", async ({ page }) => {
  await page.goto("/");

  // Check that contact form fields are present
  await expect(page.getByLabel(/Vardas|Email|Telefonas/i)).toBeVisible();
});
