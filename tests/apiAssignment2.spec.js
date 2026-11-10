const { test, request, expect} = require('@playwright/test');
const {ApiUtilsAssignment}=require("../utils/ApiUtilsAssignment");
const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const gmailUsername = "sonal30@gmail.com";
const password = "Sonal@30";
const yahooUsername = "sonal@yahoo.com";

let apiUtilsAssignment;

test.beforeAll(async()=> {
    const loginPayload= { "email": yahooUsername,"password": password };
    const apiContext = await request.newContext();
    apiUtilsAssignment=new ApiUtilsAssignment(apiContext,loginPayload);
})

async function loginAs(page, GMAIL_USER) {
   await page.goto(BASE_URL);
   await page.getByPlaceholder("you@email.com").fill(GMAIL_USER)
   await page.getByLabel("Password").fill(password);
   await page.locator("#login-btn").click();
   await expect(page.getByText("Browse Events →")).toBeVisible();
}

test("Cross-user booking access denied", async ({ page }) => {
     await apiUtilsAssignment.getToken();
     await apiUtilsAssignment.fetchEvents();
     const yahooBookingId=await apiUtilsAssignment.createBooking();  
     await loginAs(page, gmailUsername);
     await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });
     await expect(page.getByText("Access Denied")).toBeVisible();
     await expect(page.getByText("You are not authorized to view this booking.")).toBeVisible();
})