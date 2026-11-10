const {test,expect}=require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const{customtest} = require('../utils/assignment2fixture'); 

customtest('Cart Assignment',async({page,testDataForOrder})=> {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToURL();
    await loginPage.login(testDataForOrder.username, testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(testDataForOrder.productName);
    await dashboardPage.goToCartPage();
    const cartPage = poManager.getCartPage();
    expect(await cartPage.verifyItemInCart(testDataForOrder.productName)).toBeTruthy();
    await cartPage.clickOnCheckoutBtn();
    const orderPage = poManager.getOrderPage();
    await orderPage.fillPersonalInformation();
    await orderPage.selectCountry();
    await expect(await orderPage.getEmailPopulated()).toHaveText(testDataForOrder.username);
    await orderPage.clickOnPlaceOrderBtn();
    const orderSuccessPage = poManager.getOrderSuccessPage();
    await expect(await orderSuccessPage.getSuccessMsg()).toHaveText(" Thankyou for the order. ");
    const myorderId= await orderSuccessPage.getOrderId();
    await orderSuccessPage.clickOnAllOrdersBtn();
    const ordersdashboardPage = poManager.getOrdersdashboardPage();
    await ordersdashboardPage.viewYourOrder(myorderId);
    const orderDetailPage = poManager.getOrderDetailPage();
    expect((await orderDetailPage.getOrderResult()).includes(myorderId)).toBeTruthy();
    await expect(await orderDetailPage.getEmail()).toHaveText(testDataForOrder.username);
    await expect(await orderDetailPage.getCountry()).toContainText("India");
})