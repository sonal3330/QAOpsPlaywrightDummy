const {test,expect}=require('@playwright/test');

test('Cart Assignment',async({page})=> {
    const itemTitle = "ZARA COAT 3";
    const email="anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button",{name:"Login"}).click();
    await page.locator("div.card").first().waitFor();
    await page.locator("div.card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await expect(page.getByText(itemTitle)).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    const orderId= (await page.locator("label.ng-star-inserted").textContent()).trim().split(" ")[1];
    console.log(orderId);
    await page.getByRole("listitem").getByRole("button",{name:"ORDERS"}).click();
    await page.locator("tr.ng-star-inserted").first().waitFor();
    await page.locator("tr.ng-star-inserted").filter({hasText:orderId}).getByRole("button",{name:"View"}).click();
})