const {test,expect}=require('@playwright/test');
const { request } = require('http');

test('Login test',async({page})=> {
page.on('request',request=>console.log("Request:"+ request.url()));
  page.on('response',response=>console.log("Response:"+ response.url(),response.status()));
  await page.route('**/*.{jpg,png,jpeg}',route=>route.abort());
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK2");
  await page.locator("#terms").check();
  await page.locator("#signInBtn").click();
  await page.getByRole('button', { name: 'Add' }).first().click();
});