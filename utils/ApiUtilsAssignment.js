const { expect } = require('@playwright/test');

const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
const API_URL = BASE_URL + "/api";
let token;
let eventId;
let yahooBookingId;

class ApiUtilsAssignment {
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
        await expect(result.status()).toBe(200);
        const jsonAPIResponse = await result.json();
        token = jsonAPIResponse.token;
        console.log(token);
        return token;
    }

    async fetchEvents() {
          const events = await this.apiContext.get(API_URL + "/events", 
            {
                headers: {
                    "Authorization": "Bearer "+token
                }
            });
        expect(events.status()).toBe(200);  
        const jsonAPIResponse = await events.json();
        eventId= jsonAPIResponse.data[0].id;
        console.log(eventId);
        return eventId;
    }


    async createBooking() {
        const booking = await this.apiContext.post(API_URL+"/bookings", 
            {
                headers: {
                  "Authorization": "Bearer "+token
                },
                data: {
                       "eventId": eventId,
                       "customerName": "Yahoo User",
                       "customerEmail": this.loginPayload.email,
                       "customerPhone": "9876543210",
                       "quantity": 1
                }
            });
            expect(booking.status()).toBe(201); 
            const jsonAPIResponse = await booking.json();
            yahooBookingId = jsonAPIResponse.data.id;
            console.log(yahooBookingId);
            return yahooBookingId; 
    }

}

module.exports = {ApiUtilsAssignment};