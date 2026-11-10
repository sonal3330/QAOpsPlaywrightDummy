import { Page, Locator } from "@playwright/test";

export class DashboardPage
{
     page: Page;
     product: Locator;
     productTitle: Locator;
     cartButton: Locator;

     constructor(page:Page)
     {
        this.page=page;
        this.product = page.locator(".card-body");
        this.productTitle = page.locator(".card-body b");
        this.cartButton = page.locator("[routerlink*='/cart']");
     }

     async searchProductAndAddToCart(itemTitle: string): Promise<void>
     {
       console.log(await this.productTitle.allTextContents());
       const count=await this.productTitle.count();
       for(let i=0; i<count; i++) {
          const title = await this.productTitle.nth(i).textContent();
          if(title?.trim()===itemTitle) {
            await this.product.nth(i).locator("text=Add to Cart").click();
            break;
          }
        }
     }

     async goToCartPage(): Promise<void>
     {
      await this.cartButton.click();
     }
}

//module.exports = {DashboardPage};