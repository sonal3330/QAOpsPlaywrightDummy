const {test,expect} = require('@playwright/test');

async function login(page) {
   await page.goto("https://eventhub.rahulshettyacademy.com/login");
   await page.getByPlaceholder("you@email.com").fill("example30@yahoo.com")
   await page.getByLabel("Password").fill("Example@30");
   await page.locator("#login-btn").click();
   await expect(page.getByText("Browse Events →")).toBeVisible();
}

function futureDateValue(page) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);
  const date = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  const year = targetDate.getFullYear();
  const timeInHours=11;
  const timeInMinutes=10;
  return [ date, month, year, timeInHours, timeInMinutes];
}


test('Booking flow',async({page})=> {
    await login(page);
    await page.getByRole("button",{name:"Admin"}).click();
    await page.getByRole("link",{name:"Manage Events"}).first().click();
    const eventTitle=`Sonal Testing - ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("Sonal Testing");
    await page.getByLabel("City").fill("Delhi");
    await page.getByLabel("Venue").fill("Dwarka");
    await page.getByLabel("Event Date & Time").click();
    const date=await futureDateValue();
    console.log(date);
    for(let i=0;i<date.length;i++) {
     console.log(date[i]);
     if(i==3) {
        await page.locator("[id='event-date-&-time']").press("ArrowRight");
     }
     await page.locator("[id='event-date-&-time']").pressSequentially(String(date[i]));
    }  
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();
    await page.locator("#nav-events").click();
    const events=page.locator("[data-testid='event-card']");
    await events.first().waitFor();
    expect(await events.filter({hasText:eventTitle})).toBeVisible({ timeout: 5000 });
    const myEvent=events.filter({hasText:eventTitle});
    const seatsBeforeBooking=(await myEvent.getByText("seat").textContent()).split(" ")[0];
    console.log(seatsBeforeBooking);
    await myEvent.locator("[data-testid='book-now-btn']").click();
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill("Sonal Sharma");
    await page.locator("#customer-email").fill("sonal123@yahoo.com");
    await page.getByPlaceholder("+91 98765 43210").fill("8130855555");
    await page.locator(".confirm-booking-btn").click();
    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef=(await page.locator(".booking-ref").textContent()).trim();
    await page.getByRole("button",{name: "View My Bookings"}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    const bookingCards=page.locator("#booking-card");
    bookingCards.first().waitFor();
    await expect(page.locator(".booking-ref").first()).toHaveText(bookingRef);
    await expect(bookingCards.first().locator("h3")).toHaveText(eventTitle);
    await page.locator("#nav-events").click();
    await events.first().waitFor();
   await expect(events.filter({hasText:eventTitle})).toBeVisible();
   await page.waitForLoadState("networkidle");
   const seatsAfterBooking= (await events.filter({hasText:eventTitle}).getByText("seat").textContent()).split(" ")[0];
   console.log(seatsAfterBooking);
   expect(Number(seatsAfterBooking)).toBe(Number(seatsBeforeBooking)-1);
})


/* import { test, expect } from '@playwright/test';

const BASE_URL      = 'https://eventhub.rahulshettyacademy.com'
// ── Credentials ────────────────────────────────────────────────────────────────
const USER_EMAIL    = 'replacewithyourcredentials@gmail.com';// update email and password with your account
const USER_PASSWORD = 'yourpassword'; 

// ── Helpers ────────────────────────────────────────────────────────────────────
async function login(page) {
  await page.goto(`${BASE_URL}/login`);

  // Located by placeholder
  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);

  // Located by label
  await page.getByLabel('Password').fill(USER_PASSWORD);

  // Located by id
  await page.locator('#login-btn').click();

  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}


// ── Test ───────────────────────────────────────────────────────────────────────
test('create event via UI, book it, and verify seat reduction', async ({ page }) => {

  // ── Step 1: Log in ───────────────────────────────────────────────────────
  await login(page);

  // ── Step 2: Create a new event via the admin form ────────────────────────
  await page.goto(`${BASE_URL}/admin/events`);

  // Unique title so we can find this exact card later
  const eventTitle = `Test Event ${Date.now()}`;

  // Located by id (explicit on the component)
  await page.locator('#event-title-input').fill(eventTitle);

  // Description — only textarea in the form
  await page.locator('#admin-event-form textarea').fill('Playwright test event');

  // Located by label (Select auto-generates id from label text)
  await page.getByLabel('City').fill('Test City');
  await page.getByLabel('Venue').fill('Test Venue');

  // datetime-local input — located by label
  await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');

  await page.getByLabel('Price ($)').fill('100');
  await page.getByLabel('Total Seats').fill('50');

  // Located by id
  await page.locator('#add-event-btn').click();

  // Wait for success toast
  await expect(page.getByText('Event created!')).toBeVisible();

  console.log(`Created event: "${eventTitle}"`);

  // ── Step 3: Go to Events page and find the newly created card ─────────────
  await page.goto(`${BASE_URL}/events`);

  // Located by data-testid
  const eventCards = page.getByTestId('event-card');
  await expect(eventCards.first()).toBeVisible();

  // Scan all visible event cards for the one matching our created title
  const targetCard = eventCards.filter({ hasText: eventTitle }).first();
  await expect(targetCard).toBeVisible({ timeout: 5000 });

  // Capture seat count before booking
  const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
  console.log(`Seats before booking: ${seatsBeforeBooking}`);

  // Located by data-testid inside the matched card
  await targetCard.getByTestId('book-now-btn').click();

  // ── Step 4: Fill the booking form ────────────────────────────────────────

  // Quantity defaults to 1 — verify via id
  const ticketCount = page.locator('#ticket-count');
  await expect(ticketCount).toHaveText('1');

  // Located by label
  await page.getByLabel('Full Name').fill('Test Student');

  // Located by id
  await page.locator('#customer-email').fill('test.student@example.com');

  // Located by placeholder
  await page.getByPlaceholder('+91 98765 43210').fill('9876543210');

  // Located by CSS class
  await page.locator('.confirm-booking-btn').click();

  // ── Step 5: Verify booking confirmation ──────────────────────────────────

  // Located by CSS class
  const bookingRefEl = page.locator('.booking-ref').first();
  await expect(bookingRefEl).toBeVisible();

  const bookingRef = (await bookingRefEl.innerText()).trim();
  expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

  console.log(`Booking confirmed. Ref: ${bookingRef}`);

  // ── Step 6: Verify booking appears in My Bookings ────────────────────────
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  // Located by id
  const bookingCards = page.locator('#booking-card');
  await expect(bookingCards.first()).toBeVisible();

  // Find the card that contains our booking ref (via CSS class inside the card)
  const matchingCard = bookingCards.filter({ has: page.locator('.booking-ref', { hasText: bookingRef }) });
  await expect(matchingCard).toBeVisible();

  // Verify event title also appears in the same card
  await expect(matchingCard).toContainText(eventTitle);

  console.log(`Booking card found in My Bookings for ref: ${bookingRef}`);

  // ── Step 7: Verify seat count reduced on Events page ─────────────────────
  await page.goto(`${BASE_URL}/events`);
  await expect(eventCards.first()).toBeVisible();

  // Find the same event by title
  const updatedCard       = eventCards.filter({ hasText: eventTitle }).first();
  await expect(updatedCard).toBeVisible();

  const seatsAfterBooking = parseInt(await updatedCard.getByText('seat').first().innerText());
  console.log(`Seats after booking: ${seatsAfterBooking}`);

  // Booked 1 ticket — count must drop by exactly 1
  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});

Your submission
SS
Sonal sharma
Posted A few seconds ago
Complete the Playwright code for given manual Instructions.

const {test,expect} = require('@playwright/test');

async function login(page) {
   await page.goto("https://eventhub.rahulshettyacademy.com/login");
   await page.getByPlaceholder("you@email.com").fill("example30@yahoo.com")
   await page.getByLabel("Password").fill("Example@30");
   await page.locator("#login-btn").click();
   await expect(page.getByText("Browse Events →")).toBeVisible();
}

function futureDateValue(page) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);
  const date = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  const year = targetDate.getFullYear();
  const timeInHours=11;
  const timeInMinutes=10;
  return [ date, month, year, timeInHours, timeInMinutes];
}


test('Booking flow',async({page})=> {
    await login(page);
    await page.getByRole("button",{name:"Admin"}).click();
    await page.getByRole("link",{name:"Manage Events"}).first().click();
    const eventTitle=`Sonal Testing - ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill("Sonal Testing");
    await page.getByLabel("City").fill("Delhi");
    await page.getByLabel("Venue").fill("Dwarka");
    await page.getByLabel("Event Date & Time").click();
    const date=await futureDateValue();
    console.log(date);
    for(let i=0;i<date.length;i++) {
     console.log(date[i]);
     if(i==3) {
        await page.locator("[id='event-date-&-time']").press("ArrowRight");
     }
     await page.locator("[id='event-date-&-time']").pressSequentially(String(date[i]));
    }  
    await page.getByLabel("Price ($)").fill("100");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();
    await page.locator("#nav-events").click();
    const events=page.locator("[data-testid='event-card']");
    await events.first().waitFor();
    expect(await events.filter({hasText:eventTitle})).toBeVisible({ timeout: 5000 });
    const myEvent=events.filter({hasText:eventTitle});
    const seatsBeforeBooking=(await myEvent.getByText("seat").textContent()).split(" ")[0];
    console.log(seatsBeforeBooking);
    await myEvent.locator("[data-testid='book-now-btn']").click();
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill("Sonal Sharma");
    await page.locator("#customer-email").fill("sonal123@yahoo.com");
    await page.getByPlaceholder("+91 98765 43210").fill("8130855555");
    await page.locator(".confirm-booking-btn").click();
    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef=(await page.locator(".booking-ref").textContent()).trim();
    await page.getByRole("button",{name: "View My Bookings"}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    const bookingCards=page.locator("#booking-card");
    bookingCards.first().waitFor();
    await expect(page.locator(".booking-ref").first()).toHaveText(bookingRef);
    await expect(bookingCards.first().locator("h3")).toHaveText(eventTitle);
    await page.locator("#nav-events").click();
    await events.first().waitFor();
   await expect(events.filter({hasText:eventTitle})).toBeVisible();
   await page.waitForLoadState("networkidle");
   const seatsAfterBooking= (await events.filter({hasText:eventTitle}).getByText("seat").textContent()).split(" ")[0];
   console.log(seatsAfterBooking);
   expect(Number(seatsAfterBooking)).toBe(Number(seatsBeforeBooking)-1);
})*/
