const {test,expect} = require("@playwright/test");
const {writeExcelTest } = require("../utils/excel");


test("@Smoke upload and download file", async({page})=> {
    const searchText = "Mango";
    const price= "350";
    const filePath= "C:/Users/VICTUS/Downloads/download.xlsx";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise= page.waitForEvent('download');
    await page.getByRole("button",{name:"Download"}).click();
    const download= await downloadPromise;
    await download.saveAs(filePath); 
    await writeExcelTest(searchText,price,{row:0,col:2},filePath);
    const uploadButton = page.locator("#fileinput");
    await uploadButton.click();
    await uploadButton.setInputFiles(filePath);
    const textLocator= await page.getByText(searchText);
    const desiredRow= await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(price);
})