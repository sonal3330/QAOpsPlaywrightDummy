const {test,expect}=require('@playwright/test');

test('Cart Assignment',async({page})=> {
    const itemTitle = "ZARA COAT 3";
    const email="anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForURL("**/dashboard/**");
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    const product= await page.locator(".card-body");
    const productTitle=await page.locator(".card-body b");
    console.log(await productTitle.allTextContents());
    const count=await productTitle.count();
    for(var i=0; i<count; i++) {
          if(await productTitle.nth(i).textContent()===itemTitle) {
            await product.nth(i).locator("text=Add to Cart").click();
            break;
          }
    }
    const cartButton = await page.locator("[routerlink*='/cart']");
    await cartButton.click();
    await page.locator(".infoWrap").waitFor();
    const cartItem=await page.locator("h3:has-text('${itemTitle}')");
    const cartItemPresent=await cartItem.isVisible();
    await expect(cartItem).toBeTruthy();
    await page.locator("button:has-text('Checkout')").click();
    await page.locator("[placeholder='Select Country']").waitFor();
    const dropdown= await page.locator("[placeholder='Select Country']");
    await dropdown.pressSequentially("Indi",{delay:1500});
    await page.locator("section.ta-results").waitFor();
    const dropdownOptions= await page.locator("section.ta-results");
    const dropdownCount= await dropdownOptions.locator("button").count();
    for(let i=0;i<dropdownCount;i++) {
      if(await dropdownOptions.locator("button").nth(i).textContent()===" India") {
         await dropdownOptions.locator("button").nth(i).click();
        break;
      }
    }
    await page.locator("[type='text']").nth(1).fill("123");
    await page.locator("[type='text']").nth(2).fill("Sonal Sharma");
    await page.locator("[type='text']").nth(3).fill("test");
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId= await page.locator("label.ng-star-inserted");
    console.log(await orderId.textContent());
    const myorderId=(await orderId.textContent()).split(" ")[2];
    console.log(myorderId);
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');
    await  page.locator("th[scope='row']").first().waitFor();
    const orderIdList = await page.locator("tr.ng-star-inserted");
    const orderIdCount=await orderIdList.count();
    console.log(orderIdCount);
    for(let i=0;i<orderIdCount;i++) {
      console.log(await orderIdList.nth(i).textContent());
      if((await orderIdList.nth(i).locator("th[scope='row']").textContent()).includes(myorderId)) {
        console.log(await orderIdList.nth(i).locator("th[scope='row']").textContent());
        const viewBtn=await orderIdList.locator(".btn-primary").nth(i);
        await viewBtn.click();
        break;
      }
    }
    const orderResult=await page.locator(".col-text").first().textContent();
    await expect(orderResult.includes(myorderId)).toBeTruthy();
    await expect(page.locator(".address p").first()).toHaveText(email);
    await expect(page.locator(".address p").nth(1)).toContainText("India");
})