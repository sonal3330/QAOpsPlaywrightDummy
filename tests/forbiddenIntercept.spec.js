const { test, expect } = require('@playwright/test');

test('Cart Assignment', async ({ page }) => {
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForURL("**/dashboard/**");
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=12345' }));
    await page.locator("button:has-text('View')").first().click();
    expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})
