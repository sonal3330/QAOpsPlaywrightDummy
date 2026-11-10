const {test,request} = require('@playwright/test');
const {APIUtils} = require('./APIUtils');
const loginPayload={userEmail:'anshika@gmail.com', userPassword: 'Iamking@000'};
const orderPayload={orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

exports.customtest = test.extend({
    authenticatedPage: async({browser},use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.locator("#userEmail").fill("anshika@gmail.com");
        await page.locator("#userPassword").fill("Iamking@000");
        await page.locator("[value='Login']").click();
        await page.waitForURL("**/dashboard/**");
        await page.waitForLoadState('networkidle');
        await use(page);
        await context.close();
    },
    createOrder: async({},use)=> {
    const apiContext = await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    const response=await apiUtils.createOrder(orderPayload);
    await use(response);
    await apiContext.dispose();
    }, 
    testDataForOrder: {
            productName: "Adidas"
    }
});