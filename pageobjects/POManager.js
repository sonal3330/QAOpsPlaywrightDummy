const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const { OrderPage } = require('./OrderPage');
const { OrderSuccessPage } = require('./OrderSuccessPage');
const { OrdersdashboardPage } = require('./OrdersdasboardPage');
const { OrderDetailPage } = require('./OrderDetailPage');

class POManager 
{
    constructor(page)
    {
        this.page=page;
        this.loginPage=new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.orderSuccessPage = new OrderSuccessPage(this.page);
        this.ordersdashboardPage = new OrdersdashboardPage(this.page);
        this.orderDetailPage = new OrderDetailPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

     getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage() 
    {
        return this.cartPage;
    }

    getOrderPage()
    {
        return this.orderPage;
    }

    getOrderSuccessPage()
    {
        return this.orderSuccessPage;
    }

    getOrdersdashboardPage()
    {
        return this.ordersdashboardPage;
    }
    
    getOrderDetailPage()
    {
        return this.orderDetailPage;
    }

}

module.exports={POManager};