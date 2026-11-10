const {test,expect}=require('@playwright/test');

test('Get first,second,third and last product', async({page})=> {
   await page.goto("https://rahulshettyacademy.com/angularpractice/shop");
   const cardTitles=page.locator(".card-title a");
   console.log("First:"+ await cardTitles.first().textContent());
   console.log("Last:"+ await cardTitles.last().textContent());
   console.log("Second:"+await cardTitles.nth(1).textContent());
   console.log("Third:"+await cardTitles.nth(2).textContent());
})

test('Get all titles', async({page})=> {
   await page.goto("https://rahulshettyacademy.com/angularpractice/shop");
   const cardTitles=page.locator(".card-title a");
   await cardTitles.first().textContent();
   console.log(await cardTitles.allTextContents());
})