class OrdersdashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.orderRow =  page.locator("th[scope='row']");
        this.orderIdList = page.locator("tr.ng-star-inserted");
    }


    async viewYourOrder(myorderId)
    {
      await this.orderRow.first().waitFor();
      const orderIdCount=await this.orderIdList.count();
      console.log(orderIdCount);
      for(let i=0;i<orderIdCount;i++) {
          console.log(await this.orderIdList.nth(i).textContent());
          if((await this.orderIdList.nth(i).locator("th[scope='row']").textContent()).includes(myorderId)) {
             console.log(await this.orderIdList.nth(i).locator("th[scope='row']").textContent());
             const viewBtn=await this.orderIdList.locator(".btn-primary").nth(i);
             await viewBtn.click();
             break;
           }
        }
    }
}

module.exports = {OrdersdashboardPage};