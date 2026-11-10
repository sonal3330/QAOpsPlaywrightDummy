const {test,expect}=require('@playwright/test');

test('UI Controls',async({page})=> {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#password").fill("Learning@830$3mK");
    const radioBtns=page.locator("span.checkmark");
    await radioBtns.last().click();
    await page.locator("#okayBtn").click();
    await expect(radioBtns.last()).toBeChecked();
    const dropdown=page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await expect(dropdown).toHaveValue("consult");
    const checkBox=await page.locator("#terms");
    await checkBox.click();
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    const documentLink=page.locator("[href*=documents-request]");
    await expect(documentLink).toHaveAttribute("class","blinkingText");
});