import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('cell', { name: '88' }).click();
  await expect(page.getByText('Veg/fruit name')).toBeVisible();
  await expect(page.locator('tbody')).toContainText('58');
  await page.getByPlaceholder('----').click();
  await expect(page.locator('input[name="day"]')).toHaveValue('14');
  await page.locator('input[name="day"]').click();
  await page.getByText('Delivery Date0 / / «‹July').click();
  await page.getByText('Delivery Date0 / / «‹July').click();
  await page.getByRole('button', { name: '»' }).click();
  await page.locator('button').nth(1).click();
  await page.getByText('/').nth(1).click();
  await page.locator('input[name="month"]').click();
  await page.getByRole('button', { name: 'July 8,' }).click();
});