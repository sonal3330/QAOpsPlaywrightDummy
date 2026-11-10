const {test,expect}=require('@playwright/test');

test('First test',async({browser})=> {
    const context=await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://www.google.com/");
});

test('Second test',async({page})=> {
   await page.goto("https://www.google.com/");
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
});