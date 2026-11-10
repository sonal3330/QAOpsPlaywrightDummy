// const {LoginPage} = require('./LoginPage');
// const {DashboardPage} = require('./DashboardPage');
// const {CartPage} = require('./CartPage');
// const { OrderPage } = require('./OrderPage');
// const { OrderSuccessPage } = require('./OrderSuccessPage');
// const { OrdersdashboardPage } = require('./OrdersdasboardPage');
// const { OrderDetailPage } = require('./OrderDetailPage');
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { OrderPage } from "./OrderPage";
import { OrderSuccessPage } from "./OrderSuccessPage";
import { OrdersdashboardPage } from "./OrdersdasboardPage";
import { OrderDetailPage } from "./OrderDetailPage";
import { Page } from "@playwright/test";

export class POManager 
{
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    orderPage: OrderPage;
    orderSuccessPage: OrderSuccessPage;
    ordersdashboardPage: OrdersdashboardPage;
    orderDetailPage: OrderDetailPage;

    constructor(page: Page)
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

//module.exports={POManager};