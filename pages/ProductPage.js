const { By, until } = require('selenium-webdriver');

class ProductPage {
  constructor(driver) {
    this.driver = driver;
    this.pageTitle = By.css('.title');
    this.cartBadge = By.css('.shopping_cart_badge');
    this.addToCartButtons = By.css('.btn_inventory');
  }

  async waitForPageToLoad() {
    await this.driver.wait(until.elementLocated(this.pageTitle), 10000);
  }

  async addItemToCart() {
    const buttons = await this.driver.findElements(this.addToCartButtons);
    for (const btn of buttons) {
      const text = await btn.getText();
      if (text.trim() === 'Add to cart') {
        console.log('Clicking Add to cart button...');
        await btn.click();
        return;
      }
    }
    throw new Error('Add to cart button not found');
  }

  async removeItemFromCart() {
    console.log('Looking for Remove button to click...');
    const buttons = await this.driver.findElements(this.addToCartButtons);

    for (const btn of buttons) {
      try {
        const text = await btn.getText();
        if (text === 'Remove') {
          console.log('Clicking Remove button...');
          await btn.click();
          console.log('Clicked Remove button, waiting for cart to update...');
          await this.driver.wait(async () => {
            const hasItem = await this.cartHasItem();
            console.log('Cart has item after remove click:', hasItem);
            return !hasItem;  // Wait until cart is empty
          }, 7000);
          console.log('Cart is now empty.');
          return;
        }
      } catch (err) {
        if (err.name === 'StaleElementReferenceError') {
          console.warn('Caught StaleElementReferenceError, retrying...');
          continue;
        }
        throw err;
      }
    }
    throw new Error('Remove button not found');
  }

  async cartHasItem() {
    try {
      await this.driver.wait(until.elementLocated(this.cartBadge), 4000);
      const badge = await this.driver.findElement(this.cartBadge);
      const text = await badge.getText();
      return parseInt(text, 10) > 0;
    } catch (err) {
      return false;
    }
  }
}

module.exports = ProductPage;
