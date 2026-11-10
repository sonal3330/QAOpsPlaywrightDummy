class DashboardPage
{
     constructor(page)
     {
        this.page=page;
        this.product = page.locator(".card-body");
        this.productTitle = page.locator(".card-body b");
        this.cartButton = page.locator("[routerlink*='/cart']");
     }

     async searchProductAndAddToCart(itemTitle)
     {
       console.log(await this.productTitle.allTextContents());
       const count=await this.productTitle.count();
       for(var i=0; i<count; i++) {
          if(await this.productTitle.nth(i).textContent()===itemTitle) {
            await this.product.nth(i).locator("text=Add to Cart").click();
            break;
          }
        }
     }

     async goToCartPage() 
     {
      await this.cartButton.click();
     }
}

module.exports = {DashboardPage};