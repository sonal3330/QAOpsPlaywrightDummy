const {test,expect}=require('@playwright/test');

test('Child Window',async({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink= await page.locator("a[href*='documents-request']");
    const [newPage]= await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])
    const emailRequestText=await newPage.locator(".red").first().textContent();
    const splitText= emailRequestText.split("@");
    const domain=splitText[1].split(" ")[0];
    const usernameField=await page.locator("#username");
    await usernameField.fill(domain);
    console.log(await usernameField.inputValue());
})


test('dummy',async({browser})=>{
    const context=await browser.newContext();
    const context2=await browser.newContext();
    const page=await context.newPage();
    const page2= await context2.newPage();
    await page.goto("https://www.google.com/?zx=1782374302404");
    await page2.goto("https://www.youtube.com/");
})

test('dummy2',async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    const page2= await context.newPage();
    await page.goto("https://www.google.com/?zx=1782374302404");
    await page2.goto("https://www.youtube.com/");
})