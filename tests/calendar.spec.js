const {test,expect} = require('@playwright/test');

test('Calendar test',async({page})=> {
    const date ="30";
    const month = "11";
    const year ="1996";
    const expectedList=[month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker--closed").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator("button[class*='prev-button']").click();
    await page.locator("button[class*='prev-button']").click();
    await page.locator("button[class*='prev-button']").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("(//abbr[text()='"+date+"'])[2]").click();
    const dateArray=page.locator("input.react-date-picker__inputGroup__input");
    for(let i=0;i<expectedList.length;i++) {
        console.log(await dateArray.nth(i).inputValue());
        expect(await dateArray.nth(i).inputValue()).toEqual(expectedList[i]);
    }
})