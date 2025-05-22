const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const { takeScreenshot } = require('../utils/screenshotUtil');

let driver;
let loginPage;
let productPage;

describe('SauceDemo Login Test', function () {
  this.timeout(60000); // Increase timeout for async operations

  before(async () => {
    console.log('Starting WebDriver setup...');

    const chromeDriverPath = require('chromedriver').path;
    process.env.PATH += `;${chromeDriverPath.replace(/chromedriver\.exe$/, '')}`;

    const options = new chrome.Options().addArguments('--headless');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    console.log('WebDriver initialized');
    loginPage = new LoginPage(driver);
    productPage = new ProductPage(driver);
  });

  after(async () => {
    console.log('Quitting driver');
    if (driver) await driver.quit();
  });

  afterEach(async function () {
    // On test failure, capture screenshot
    if (this.currentTest.state === 'failed') {
      console.log(`Test failed: ${this.currentTest.title}. Capturing screenshot...`);
      await takeScreenshot(driver, this.currentTest.title);
    }
  });

  it('should log in successfully with standard_user', async () => {
    console.log('Opening login page...');
    await loginPage.open();

    console.log('Logging in...');
    await loginPage.login('standard_user', 'secret_sauce');

    console.log('Waiting for product page title...');
    await productPage.waitForPageToLoad();

    const title = await driver.getTitle();
    console.log('Page title:', title);
  });

  it('should add an item to the cart', async () => {
    await productPage.addItemToCart();
    const hasItem = await productPage.cartHasItem();
    console.log('Item in cart:', hasItem);
    if (!hasItem) throw new Error('Cart should have item after adding');
  });

  it('should remove an item from the cart', async () => {
    await productPage.removeItemFromCart();
    const hasItem = await productPage.cartHasItem();
    console.log('Item in cart after removal:', hasItem);
    if (hasItem) throw new Error('Cart should be empty after removal');
  });
});
