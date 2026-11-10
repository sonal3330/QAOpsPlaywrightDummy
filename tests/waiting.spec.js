const {test,expect}=require('@playwright/test');

test('wait till ement appears',async({page})=> {
    const email="test68@yahoo.com";
    const pass="Test@1234";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
     await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(pass);
    await page.locator("#login").click();
    const productTitle=page.locator(".card-body b");
    //await page.waitForLoadState('networkidle');
    await productTitle.first().waitFor();
    console.log(await productTitle.allTextContents());
});