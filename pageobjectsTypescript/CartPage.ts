import { Page, Locator } from "@playwright/test";
export class CartPage 
{
    page: Page;
    cartInfo: Locator;
    checkoutBtn: Locator;

    constructor(page: Page)
    {
        this.page=page;
        this.cartInfo = page.locator(".infoWrap");
        this.checkoutBtn = page.locator("button:has-text('Checkout')");
    }

    async verifyItemInCart(productName: string): Promise<boolean>
    {
        await this.cartInfo.waitFor();
        const cartItem = this.page.locator(`h3:has-text("${productName}")`); // u can also create method getProductLocator - return this.page.locator(""h3..) and call that method here
        const cartItemPresent=await cartItem.isVisible();
        return cartItemPresent;
    }

    async clickOnCheckoutBtn(): Promise<void>
    {
        await this.checkoutBtn.click();
    }
       
}

//module.exports = {CartPage};