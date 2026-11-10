const {test,expect}=require('@playwright/test');

test('Login test',async({page})=> {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy");
  await page.locator("#password").fill("Learning@830$3mK");
  await page.locator("#terms").check();
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
})

test('Login test2',async({page})=> {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username=page.locator("#username");
  await username.fill("rahulshettyacademy");
  const password=page.locator("#password");
  await password.fill("Learning@830$3mK");
  const termsCheckBox=page.locator("#terms");
  await termsCheckBox.check();
  const signInBtn=page.locator("#signInBtn");
  await signInBtn.click();
  const errorMsg=page.locator("[style*='block']")
  console.log(await errorMsg.textContent());
  await expect(errorMsg).toContainText("Incorrect");
})