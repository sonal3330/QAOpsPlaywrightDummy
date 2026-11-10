const {test,expect}=require('@playwright/test');

test('screenshot',async({page})=> {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: "screenshots/element.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: "screenshots/entirePage.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test('@Smoke visual testing',async({page})=> {
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('visualTest/landing-page.png');
})
