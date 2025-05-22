const { Builder, By } = require('selenium-webdriver');
const ProductPage = require('../pages/ProductPage');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('SauceDemo Product Page Tests', function() {
  this.timeout(30000); // 30 seconds timeout for async ops

  let driver;
  let productPage;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    productPage = new ProductPage(driver);

    // Navigate to login page
    await driver.get('https://www.saucedemo.com/');

    // Login
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    // Wait for URL to change to inventory page to ensure login completed
    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes('/inventory.html');
    }, 7000);

    // Wait for product page to load (title element)
    await productPage.waitForPageToLoad();
  });

  after(async function() {
    await driver.quit();
  });

  it('should add and remove item from cart', async function() {
    try {
      // Add item to cart
      await productPage.addItemToCart();

      // Verify cart has item
      const hasItem = await productPage.cartHasItem();
      console.log('Cart has item:', hasItem);
      assert.strictEqual(hasItem, true);

      // Remove item from cart
      await productPage.removeItemFromCart();

      // Verify cart is empty
      const hasItemAfterRemoval = await productPage.cartHasItem();
      console.log('Cart has item after removal:', hasItemAfterRemoval);
      assert.strictEqual(hasItemAfterRemoval, false);

    } catch (error) {
      // On failure, capture screenshot
      const screenshotDir = path.resolve(__dirname, '../screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }
      const screenshotPath = path.join(screenshotDir, `failure-${Date.now()}.png`);
      const screenshot = await driver.takeScreenshot();
      fs.writeFileSync(screenshotPath, screenshot, 'base64');
      console.log(`Test failed. Screenshot saved: ${screenshotPath}`);

      throw error;  // rethrow so mocha knows test failed
    }
  });
});
