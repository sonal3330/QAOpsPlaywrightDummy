class OrderDetailPage
{
    constructor(page)
    {
        this.page = page;
        this.orderResult = page.locator(".col-text").first();
        this.emailAddress = page.locator(".address p").first();
        this.countryAddress = page.locator(".address p").nth(1);

    }
     
    async getOrderResult()
    {
        return await this.orderResult.textContent();
    }

    async getEmail()
    {
        return await this.emailAddress;
    }

    async getCountry()
    {
        return await this.countryAddress;
    }
    
}

module.exports = {OrderDetailPage};