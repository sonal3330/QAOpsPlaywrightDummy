const {test,expect,request}=require("@playwright/test");
const {APIUtils}=require("../utils/APIUtils");

let response;
 const fakeOrderPayload={data:[],message:"No Orders"};

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
  page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",async (route)=> {
      const response= await page.request.fetch(route.request());
      let body=JSON.stringify(fakeOrderPayload);
      await route.fulfill(
        {
            response,
            body
        }
      )
  });
    //const responsePromise= page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    //await responsePromise;
    //console.log(await page.locator(".mt-4").textContent());
    await expect(page.locator(".mt-4")).toContainText("You have No Orders to show");
    console.log(await page.locator(".mt-4").textContent());
})