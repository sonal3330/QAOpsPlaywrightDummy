class APIUtils 
{
    constructor(apiContext,loginPayload) {
        this.apiContext=apiContext;
        this.loginPayload=loginPayload;
    }

     async getToken() {
         const result=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                    data: this.loginPayload
                }
            )
            const jsonAPIResponse=await result.json();
            const token=jsonAPIResponse.token;
            console.log(token);
            return token;
     }

     async createOrder (orderPayload) {
        const result={};
        result.token=await this.getToken();
        const orderJson=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
        {
           data: orderPayload,
           headers: {
            'Authorization': result.token,
            'Content-Type': 'application/json'
           }
        }
     );
       const newOrderResponse=await orderJson.json();
       const orderId=newOrderResponse.orders[0];
       result.orderId=orderId;
       console.log(result);
       return result;
     }
 }
module.exports = {APIUtils};