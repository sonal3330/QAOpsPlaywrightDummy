const {customtest} = require('../utils/fixture.js');
const {expect} = require('@playwright/test');

customtest('Custom fixture test', async({authenticatedPage,createOrder,testDataForOrder})=> {
    //await authenticatedPage.locator(".card-body").first().waitFor();
    await authenticatedPage.waitForLoadState('networkidle');
    await authenticatedPage.locator("button[routerlink='/dashboard/myorders']").click();
    await authenticatedPage.waitForLoadState('networkidle');
    //await authenticatedPage.locator("th[scope='row']").first().waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
})