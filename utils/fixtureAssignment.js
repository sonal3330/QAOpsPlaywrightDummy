const {test,expect,request} = require('@playwright/test');
const {ApiUtilsAssignment2} = require('./APIUtilsAssignment2');
const username = "sonal@yahoo.com";
const password = "Sonal@30";

exports.customtest=test.extend({
    authenticatedPage: async({browser},use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://eventhub.rahulshettyacademy.com");
        await page.locator("#email").fill(username);
        await page.locator("#password").fill(password);
        await page.locator("#login-btn").click();
        await expect(page.getByText("Browse Events →")).toBeVisible();
        await use(page);
        await context.close();
    },
    createEvent: async({},use) => {
          const loginPayload = {"email": username, "password": password};
          const apiContext = await request.newContext();
          const apiUtils=new ApiUtilsAssignment2(apiContext,loginPayload);
          const eventDetails= await apiUtils.createEvent();
          await use(eventDetails);
    }
});