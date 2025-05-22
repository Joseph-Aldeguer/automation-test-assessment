const fs = require('fs');
const path = require('path');

async function takeScreenshot(driver, testName) {
  try {
    const image = await driver.takeScreenshot();
    const screenshotsDir = path.resolve(__dirname, '../screenshots');

    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${testName}-${timestamp}.png`;
    const filepath = path.join(screenshotsDir, filename);

    fs.writeFileSync(filepath, image, 'base64');
    console.log(`Screenshot saved: ${filepath}`);
  } catch (error) {
    console.error('Error taking screenshot:', error);
  }
}

module.exports = { takeScreenshot };
