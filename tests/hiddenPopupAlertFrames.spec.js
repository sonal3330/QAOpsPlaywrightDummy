const {test,expect}=require('@playwright/test');

test('Handling frames,popups,hidden', async({page})=> {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();
    await page.goBack();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#confirmbtn").click();
    page.on('dialog',dialog => dialog.accept());
    await page.locator("#mousehover").hover();
    const framePage=page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
    const heading= await framePage.locator("div.content-side h2").textContent();
    console.log(heading.split(" ")[1]);
})