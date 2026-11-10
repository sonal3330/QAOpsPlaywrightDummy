const {test,expect}=require('@playwright/test');

async function loginAndGoToBooking(page,BASE_URL) {
   await page.goto(BASE_URL);
   await page.getByPlaceholder("you@email.com").fill("example30@yahoo.com")
   await page.getByLabel("Password").fill("Example@30");
   await page.locator("#login-btn").click();
   await expect(page.getByText("Browse Events →")).toBeVisible();
}

test('Booking Assignment 2',async({page})=> {
    const BASE_URL = "https://eventhub.rahulshettyacademy.com";
    await loginAndGoToBooking(page,BASE_URL);
    await page.locator("#nav-events").click();
    await page.locator("#event-card").getByRole("link",{name:"Book Now"}).first().click();
     await page.getByLabel("Full Name").fill("Sonal Sharma");
    await page.locator("#customer-email").fill("sonal123@yahoo.com");
    await page.getByPlaceholder("+91 98765 43210").fill("8130855555");
    await page.locator(".confirm-booking-btn").click();
    await page.getByRole("button",{name: "View My Bookings"}).click();
    await expect(page).toHaveURL(`${BASE_URL}/bookings`);
    await page.getByRole("button",{name:"View Details"}).first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRef=await page.locator("span.text-indigo-600").textContent();
    const eventTitle=await page.locator("h1").textContent();
    console.log(bookingRef);
    console.log(eventTitle);
    await expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
    await page.getByRole("button",{name:"Check eligibility for refund?"}).click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect
    await page.pause();
})
