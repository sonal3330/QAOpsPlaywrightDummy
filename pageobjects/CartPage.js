class CartPage 
{
    constructor(page)
    {
        this.page=page;
        this.cartInfo = page.locator(".infoWrap");
        this.checkoutBtn = page.locator("button:has-text('Checkout')");
    }

    async verifyItemInCart(productName)
    {
        await this.cartInfo.waitFor();
        const cartItem = this.page.locator(`h3:has-text("${productName}")`); // u can also create method getProductLocator - return this.page.locator(""h3..) and call that method here
        const cartItemPresent=await cartItem.isVisible();
        return cartItemPresent;
    }

    async clickOnCheckoutBtn()
    {
        await this.checkoutBtn.click();
    }
       
}

module.exports = {CartPage};