const {test,expect,request}=require("@playwright/test");
const {APIUtils}=require("../utils/APIUtils");

let response;

test.beforeAll(async()=> {
    const loginPayload={userEmail:'anshika@gmail.com', userPassword: 'Iamking@000'};
    const orderPayload={orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
    const apiContext = await request.newContext();
    const apiUtils=new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);
})

test('Client App Login',async({page}) => {
  await page.addInitScript(value=> {
    window.localStorage.setItem('token',value);
  },response.token);
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');
    await  page.locator("th[scope='row']").first().waitFor();
    const orderIdList = await page.locator("tr.ng-star-inserted");
    const orderIdCount=await orderIdList.count();
    console.log(orderIdCount);
    for(let i=0;i<orderIdCount;i++) {
      console.log(await orderIdList.nth(i).textContent());
      if((await orderIdList.nth(i).locator("th[scope='row']").textContent()).includes(response.orderId)) {
        console.log(await orderIdList.nth(i).locator("th[scope='row']").textContent());
        const viewBtn=await orderIdList.locator(".btn-primary").nth(i);
        await viewBtn.click();
        break;
      }
    }
})
