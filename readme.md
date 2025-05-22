# Automation Test Assessment

##Overview

This project demonstrates end-to-end automation testing using both Selenium WebDriver and Playwright. 
It covers key functionalities of the SauceDemo application, including login, product addition/removal, 
and cart verification.

##Project Structure

automation-test-assessment/
├── tests/
│   ├── login.test.js
│   ├── product.test.js
│   └── playwright.test.js
├── pages/
│   └── ProductPage.js
├── utils/
│   └── stringUtils.js
├── screenshots/
│   └── [timestamped screenshots]
├── package.json
└── README.md

- tests/: Contains test scripts for different functionalities.

- pages/: Houses the Page Object Model classes.

- utils/: Includes utility functions like appendTimestamp.

- screenshots/: Stores screenshots captured during test fail- ures.

##Setup Instructions
1. Clone the repository
GIT bash:
git clone https://github.com/Joseph-Aldeguer/automation-test-assessment.git

2. Install dependencies
GIT bash: 
npm Install

3. Run Selenium Test
GIT bash: 
npm test

4. Run Playwright Test
GIT bash:
npm run playwright:test


##Assumptions

- Tests are conducted using the standard_user account on SauceDemo.

- The application state is reset before each test to ensure consistency.

##Screenshots

Screenshots are automatically captured upon test failures 
and saved in the screenshots/ directory with timestamped 
filenames for easy identification.