class OrderSuccessPage 
{
    constructor(page)
    {
        this.page = page;
        this.successMsg = page.locator(".hero-primary");
        this.orderId = page.locator("label.ng-star-inserted");
        this.allOrderBtn = page.locator("button[routerlink='/dashboard/myorders']");
    }

   async getSuccessMsg() 
    {
        return await this.successMsg;
    }

    async getOrderId() 
    {
        console.log(await this.orderId.textContent());
        const myorderId=(await this.orderId.textContent()).split(" ")[2];
        console.log(myorderId);
        return myorderId;
    }

    async clickOnAllOrdersBtn() 
    {
        await this.allOrderBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {OrderSuccessPage};