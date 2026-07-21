import { expect, test } from "@playwright/test";

test("visitor intake appears in the governed reviewer queue", async ({ page }) => {
  const uniqueEmail = `browser-${Date.now()}@example.test`;

  await page.goto("/");
  await expect(page.getByText("Verified scope: demo-request intake and sales review")).toBeVisible();
  await page.getByRole("link", { name: "Send a request" }).click();

  await page.getByLabel("Name").fill("Browser Test");
  await page.getByLabel("Work email").fill(uniqueEmail);
  await page.getByLabel("Company").fill("Synthetic Test Company");
  await page.getByLabel("What would you like to evaluate?").fill("A synthetic browser test of the governed intake journey.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Send request" }).click();

  await expect(page.getByRole("status")).toContainText("Request received");
  await expect(page.getByRole("status")).toContainText(/DEMO-[0-9]{8}-[A-Z0-9]{8}/);

  await page.goto("/requests");
  await page.getByLabel("Email").fill(process.env.E2E_ADMIN_EMAIL ?? "admin@example.test");
  await page.getByLabel("Password").fill(process.env.E2E_ADMIN_PASSWORD ?? "integration-password-value");
  await page.getByRole("button", { name: "Sign in" }).click();

  const requestCard = page.locator("article").filter({ hasText: uniqueEmail });
  await expect(requestCard).toBeVisible();
  await expect(requestCard).toContainText("NEW");
  await requestCard.getByRole("button", { name: "Mark qualified" }).click();
  await expect(requestCard).toContainText("QUALIFIED");
});
