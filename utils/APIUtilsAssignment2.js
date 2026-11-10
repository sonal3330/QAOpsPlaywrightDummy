const { expect } = require('@playwright/test');
const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
const API_URL = BASE_URL + "/api";

let token;

class ApiUtilsAssignment2 {
   
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const result = await this.apiContext.post(API_URL + "/auth/login",
            {
                data: this.loginPayload,
                headers: {
                    "Content-Type" : "application/json",
                    "accept" : "application/json"
                }

            });
        expect(result.status()).toBe(200);
        const jsonAPIResponse = await result.json();
        token = jsonAPIResponse.token;
        console.log(token);
        return token;
    }
    

    async createEvent() {

        if (!token) {
            await this.getToken();
        }

         const eventResult={};
         const event = await this.apiContext.post(API_URL+"/events", {
            headers: {
                "Authorization" : "Bearer "+ token,
                "accept" : "application/json",
                "Content-Type" : "application/json"
            },
            data: {
                 "title": "Sonal Sharma Tech Summit 2026",
                 "description": "Sonal A premier technology conference.",
                 "category": "Conference",
                 "venue": "Bangalore International Centre",
                 "city": "Bangalore",
                 "eventDate": "2026-10-15T09:00:00.000Z",
                 "price": 1500,
                 "totalSeats": 500,
                 "imageUrl": "https://example.com/banner.jpg"
            }
         });
       expect(event.status()).toBe(201);
       const eventResponse=await event.json();
       const id=eventResponse.data.id;
       const eventTitle= eventResponse.data.title;
       eventResult.id=id;
       eventResult.eventTitle=eventTitle;
       console.log(eventResult);
       return eventResult;
    }

}

module.exports = {ApiUtilsAssignment2};