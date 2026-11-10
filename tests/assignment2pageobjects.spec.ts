// const {test,expect}=require('@playwright/test');
// const {POManager} = require('../pageobjects/POManager');
import {test,expect} from '@playwright/test';
import { POManager } from '../pageobjectsTypescript/POManager';
import testData from '../test-data/assignment2pageobjectsTestData.json';

testData.forEach((data) => {   
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
    await expect(orderPage.getEmailPopulated()).toHaveText(data.email);
    await orderPage.clickOnPlaceOrderBtn();
    const orderSuccessPage = poManager.getOrderSuccessPage();
    await expect(orderSuccessPage.getSuccessMsg()).toHaveText(" Thankyou for the order. ");
    const myorderId= await orderSuccessPage.getOrderId();
    await orderSuccessPage.clickOnAllOrdersBtn();
    const ordersdashboardPage = poManager.getOrdersdashboardPage();
    await ordersdashboardPage.viewYourOrder(myorderId);
    const orderDetailPage = poManager.getOrderDetailPage();
    expect((await orderDetailPage.getOrderResult())?.includes(myorderId)).toBeTruthy();
    await expect(orderDetailPage.getEmail()).toHaveText(data.email);
    await expect(orderDetailPage.getCountry()).toContainText("India");
});
});