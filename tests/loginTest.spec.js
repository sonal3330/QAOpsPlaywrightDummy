const {test,expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');

test('Log in', async({page})=> {
   const email="anshika@gmail.com";
   const password = "Iamking@000";
   const loginPage = new LoginPage(page);
   await loginPage.goToURL();
   await loginPage.login(email, password);
});