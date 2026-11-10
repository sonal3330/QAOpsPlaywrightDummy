import { Page,Locator} from "@playwright/test";
export class OrdersdashboardPage
{
    page: Page;
    orderRow: Locator;
    orderIdList: Locator;
    constructor(page: Page)
    {
        this.page = page;
        this.orderRow =  page.locator("th[scope='row']");
        this.orderIdList = page.locator("tr.ng-star-inserted");
    }


    async viewYourOrder(myorderId:string): Promise<void>
    {
      await this.orderRow.first().waitFor();
      const orderIdCount=await this.orderIdList.count();
      console.log(orderIdCount);
      for(let i=0;i<orderIdCount;i++) {
          const row=this.orderIdList.nth(i);
          const orderIdText = await row
                .locator("th[scope='row']")
                .textContent();

            if (!orderIdText) {
                continue;
            }

            console.log("Current order ID:", orderIdText.trim());
          if(orderIdText.includes(myorderId)) {
             const viewBtn=row.locator(".btn-primary");
             await viewBtn.click();
             return;
           }
        }
        throw new Error(`Order ID ${myorderId} was not found.`);
    }
}

//module.exports = {OrdersdashboardPage};