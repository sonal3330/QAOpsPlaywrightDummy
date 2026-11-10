import { Page,Locator} from "@playwright/test";
export class OrderPage
{
    page: Page;
    dropdown: Locator;
    dropdownOptions: Locator;
    textbox: Locator;
    emailTextbox: Locator;
    placeOrderBtn: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.dropdown = page.locator("[placeholder='Select Country']");
        this.dropdownOptions = page.locator("section.ta-results");
        this.textbox = page.locator("[type='text']");
        this.emailTextbox = page.locator(".user__name [type='text']").first();
        this.placeOrderBtn =  page.locator(".action__submit");
    }

     async selectCountry(): Promise<void>
     {
        await this.dropdown.waitFor();
        await this.dropdown.pressSequentially("Indi",{delay:1500});
        await this.dropdownOptions.waitFor();
        const dropdownCount= await this.dropdownOptions.locator("button").count();
        for(let i=0;i<dropdownCount;i++) {
           const option = await this.dropdownOptions
                .locator("button")
                .nth(i)
                .textContent();
          if(option?.trim()==="India") {
             await this.dropdownOptions.locator("button").nth(i).click();
            break;
          }
        }
    }

    async fillPersonalInformation(): Promise<void>
    {
        await this.textbox.nth(1).fill("123");
        await this.textbox.nth(2).fill("Sonal Sharma");
        await this.textbox.nth(3).fill("test");
    }

    getEmailPopulated(): Locator
    {
        return this.emailTextbox;
    }

    async clickOnPlaceOrderBtn(): Promise<void>{
        await this.placeOrderBtn.click();
    }
       
}

//module.exports = {OrderPage};