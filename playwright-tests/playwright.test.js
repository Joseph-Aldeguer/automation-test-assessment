const { test, expect } = require('@playwright/test');
const { addTimestamp } = require('../utils/stringUtil');

test('Login with valid credentials on SauceDemo using Playwright', async ({ page }) => {
  const timestampedUsername = addTimestamp('standard_user'); // For demonstration
  console.log(`Generated username for demo: ${timestampedUsername}`);

  // Navigate to the site
  await page.goto('https://www.saucedemo.com/');

  // Fill in login form
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');

  // Submit login
  await page.click('#login-button');

  // Verify navigation to product page
  await expect(page).toHaveURL(/.*inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');
});
