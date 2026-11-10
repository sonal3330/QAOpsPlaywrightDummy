const {test,expect}=require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const testdata = JSON.parse(JSON.stringify(require('../test-data/assignment2pageobjectsTestData.json')));

for(const data of testdata)
{    
test(`@Smoke Cart Assignment ${data.itemTitle} `,async({page})=> {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToURL();
    await loginPage.login(data.email, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(data.itemTitle);
    await dashboardPage.goToCartPage();
    const cartPage = poManager.getCartPage();
    expect(await cartPage.verifyItemInCart(data.itemTitle)).toBeTruthy();
    await cartPage.clickOnCheckoutBtn();
    const orderPage = poManager.getOrderPage();
    await orderPage.fillPersonalInformation();
    await orderPage.selectCountry();
    await expect(await orderPage.getEmailPopulated()).toHaveText(data.email);
    await orderPage.clickOnPlaceOrderBtn();
    const orderSuccessPage = poManager.getOrderSuccessPage();
    await expect(await orderSuccessPage.getSuccessMsg()).toHaveText(" Thankyou for the order. ");
    const myorderId= await orderSuccessPage.getOrderId();
    await orderSuccessPage.clickOnAllOrdersBtn();
    const ordersdashboardPage = poManager.getOrdersdashboardPage();
    await ordersdashboardPage.viewYourOrder(myorderId);
    const orderDetailPage = poManager.getOrderDetailPage();
    expect((await orderDetailPage.getOrderResult()).includes(myorderId)).toBeTruthy();
    await expect(await orderDetailPage.getEmail()).toHaveText(data.email);
    await expect(await orderDetailPage.getCountry()).toContainText("India");
})
}