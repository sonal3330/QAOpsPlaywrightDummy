const {test,expect}=require('@playwright/test');

test('Assignment to sign up then login then get first title',async({page})=> {
    const email="test68@yahoo.com";
    const pass="Test@1234";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("a.text-reset").click();
    await page.locator("#firstName").fill("Sonal");
    await page.locator("#lastName").fill("Sharma");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userMobile").fill("8888888888");
    await page.locator("[formcontrolname='occupation']").selectOption({label: 'Engineer'});
    await page.locator("input[value='Female']").click();
    await page.locator("#userPassword").fill(pass);
    await page.locator("#confirmPassword").fill(pass);
    await page.locator("input[type='checkbox']").click();
    await page.locator("input[type='submit']").click();
    await page.locator("button[routerlink='/auth']").click();
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(pass);
    await page.locator("#login").click();
    const productTitle=page.locator(".card-body b");
    console.log(await productTitle.first().textContent());
})

