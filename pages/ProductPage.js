const { By, until } = require('selenium-webdriver');

class ProductPage {
  constructor(driver) {
    this.driver = driver;
    this.pageTitle = By.css('.title');
    this.cartBadge = By.css('.shopping_cart_badge');
    this.addToCartButtons = By.css('.btn_inventory'); // Buttons for adding/removing items
  }

  async waitForPageToLoad() {
    await this.driver.wait(until.elementLocated(this.pageTitle), 10000);
  }

  async addItemToCart() {
    // Click the first "Add to cart" button available
    const buttons = await this.driver.findElements(this.addToCartButtons);
    for (const btn of buttons) {
      const text = await btn.getText();
      if (text === 'Add to cart') {
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
		const text = await btn.getText();
		if (text === 'Remove') {
		  await btn.click();
		  console.log('Clicked Remove button');

		  // Wait until the cart badge updates or disappears (cart becomes empty)
		  await this.driver.wait(async () => {
			const hasItem = await this.cartHasItem();
			return !hasItem;  // Wait until cartHasItem() returns false
		  }, 5000);

		  return;
		}
	  }
	  throw new Error('Remove button not found');
	}

  async cartHasItem() {
    try {
      await this.driver.wait(until.elementLocated(this.cartBadge), 2000);
      const badge = await this.driver.findElement(this.cartBadge);
      const text = await badge.getText();
      return parseInt(text, 10) > 0;
    } catch (err) {
      // If the badge is not found, cart is empty
      return false;
    }
  }
}

module.exports = ProductPage;
