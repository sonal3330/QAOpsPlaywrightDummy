const {customtest} = require('../utils/fixtureAssignment.js');
const {expect} = require('@playwright/test');

customtest('Assignment fixture test', async({authenticatedPage,createEvent})=> {
    await authenticatedPage.locator("#nav-events").click();
    await authenticatedPage.waitForLoadState('networkidle');
    await expect(authenticatedPage.getByText(createEvent.eventTitle)).toBeVisible();
});
