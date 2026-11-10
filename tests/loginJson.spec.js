const {test,expect}=require("@playwright/test");

let webContext;
test.beforeAll(async({browser})=> {
    const context=await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("sonal122@gmail.com");
    await page.locator("#userPassword").fill("Sonal@12");
    await page.locator("[value='Login']").click();
    await page.waitForURL("**/dashboard/**");
    await page.waitForLoadState('networkidle');
    await context.storageState({path: "state.json"});
    webContext=await browser.newContext({storageState: "state.json"});
})

test("Test case 1",async()=> {
    const page= await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator(".card-body").first().waitFor();
    const product= await page.locator(".card-body");
    const productTitle=await page.locator(".card-body b");
    console.log(await productTitle.allTextContents());
})

test("Test case 2",async()=> {
    const page=await webContext.newPage();
     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
     console.log(await page.url());
})