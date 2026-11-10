import { Page,Locator} from "@playwright/test";

export class OrderDetailPage
{
    page: Page;
    orderResult: Locator;
    emailAddress: Locator;
    countryAddress: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.orderResult = page.locator(".col-text").first();
        this.emailAddress = page.locator(".address p").first();
        this.countryAddress = page.locator(".address p").nth(1);

    }
     
    async getOrderResult(): Promise<string|null>
    {
        return await this.orderResult.textContent();
    }

    getEmail(): Locator
    {
        return this.emailAddress;
    }

     getCountry(): Locator
    {
        return this.countryAddress;
    }
    
}

//module.exports = {OrderDetailPage};