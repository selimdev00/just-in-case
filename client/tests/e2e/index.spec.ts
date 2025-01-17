import { test, expect } from "@playwright/test";

test("Example test index", async ({ page }) => {
  await page.goto("/");
  const text = await page.textContent("h1");
  expect(text).toBe("Logo");
});
