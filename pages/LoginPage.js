const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigate() {
    await this.driver.get('https://example.com/login');
  }

  async login(username, password) {
    await this.driver.wait(until.elementLocated(By.id('username')), 5000);
    await this.driver.findElement(By.id('username')).sendKeys(username);
    await this.driver.findElement(By.id('password')).sendKeys(password);
    await this.driver.findElement(By.id('loginButton')).click();
  }
}

module.exports = LoginPage;