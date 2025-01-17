import { test, expect } from "@playwright/test";

const login = async (page) => {
  await page.goto("/login");
  await page.waitForTimeout(1000);
  await page.fill('input[name="username"]', "admin");
  await page.fill('input[name="password"]', "adminpass");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000);
};

const goToUsersPage = async (page) => {
  await page.getByText("all users").click();
  await page.waitForTimeout(1000);
};

test("Redirect to login page if not logged in", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1000);
  expect(page.url()).toBe("http://localhost:3000/login");
});

test("Admin login", async ({ page }) => {
  await login(page);

  expect(page.url()).toBe("http://localhost:3000/");
  await expect(page.getByText("admin")).toHaveCount(2);
  await expect(page.getByText("all users")).toHaveCount(1);
});

test("Admin logout", async ({ page }) => {
  await login(page);

  await page.getByText("logout").click();
  await page.waitForTimeout(1000);

  expect(page.url()).toBe("http://localhost:3000/login");
});

test("Redirect to dashboard if logged in", async ({ page }) => {
  await login(page);

  expect(page.url()).toBe("http://localhost:3000/");

  await page.goto("/login");
  await page.waitForTimeout(1000);

  expect(page.url()).toBe("http://localhost:3000/");
});

test("Go to users page", async ({ page }) => {
  await login(page);

  await page.getByText("all users").click();
  await page.waitForTimeout(1000);

  expect(page.url()).toBe("http://localhost:3000/users");

  await expect(page.getByText("id")).toHaveCount(1);
  await expect(page.getByText("username")).toHaveCount(1);
  await expect(page.getByText("role")).toHaveCount(1);
  await expect(page.getByText("access")).toHaveCount(1);
});

test("Grant access to user", async ({ page }) => {
  await login(page);
  await goToUsersPage(page);

  const grant = page.getByText("grant");
  if ((await grant.count()) < 1) {
    await page.getByText("revoke").nth(1).click();
    await page.waitForTimeout(1000);
  }

  await page.getByText("grant").click();
  await page.waitForTimeout(1000);

  await expect(page.getByText("successfully granted access")).toHaveCount(1);
});

test("Revoke access to user", async ({ page }) => {
  await login(page);
  await goToUsersPage(page);

  const revoke = page.getByText("revoke");
  if ((await revoke.count()) < 1) {
    await page.getByText("revoke").nth(1).click();
    await page.waitForTimeout(1000);
  }
  await page.getByText("revoke").nth(1).click();
  await page.waitForTimeout(1000);

  await expect(page.getByText("successfully revoked access")).toHaveCount(1);
});
