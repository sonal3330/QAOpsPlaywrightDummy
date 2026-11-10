import { Page,Locator} from "@playwright/test";
export class OrderSuccessPage 
{
    page: Page;
    successMsg: Locator;
    orderId: Locator;
    allOrderBtn: Locator

    constructor(page: Page)
    {
        this.page = page;
        this.successMsg = page.locator(".hero-primary");
        this.orderId = page.locator("label.ng-star-inserted");
        this.allOrderBtn = page.locator("button[routerlink='/dashboard/myorders']");
    }

   getSuccessMsg(): Locator
    {
        return this.successMsg;
    }

    async getOrderId(): Promise<string>
    {
        const text = await this.orderId.textContent();
        console.log(text);
        if(!text)
        {
             throw new Error("Order ID text is empty or not found");
        }
        const myorderId= text.split(" ")[2];
        if (!myorderId) {
            throw new Error("Could not extract order ID");
        }
        console.log(myorderId);
        return myorderId;
    }

    async clickOnAllOrdersBtn(): Promise<void>
    {
        await this.allOrderBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

}

//module.exports = {OrderSuccessPage};