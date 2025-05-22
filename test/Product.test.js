const { Builder, By } = require('selenium-webdriver');
const ProductPage = require('../pages/ProductPage');
const assert = require('assert');

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

    // Wait for product page to load
    await productPage.waitForPageToLoad();
  });

  after(async function() {
    await driver.quit();
  });

  it('should add and remove item from cart', async function() {
    // Add item
    await productPage.addItemToCart();

    // Verify cart has item
    const hasItem = await productPage.cartHasItem();
    console.log('Cart has item:', hasItem);
    assert.strictEqual(hasItem, true);

    // Remove item
    await productPage.removeItemFromCart();

    // Verify cart is empty
    const hasItemAfterRemoval = await productPage.cartHasItem();
    console.log('Cart has item after removal:', hasItemAfterRemoval);
    assert.strictEqual(hasItemAfterRemoval, false);
  });
});
