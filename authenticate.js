const assert = require("chai").assert;
const puppeteer = require("puppeteer");

const URL = 'https://f067fd32ece0.ngrok.io';
const EMAIL = 'dev@editmode.app';
const PASSWORD = 'password';

(async () => {
  // Authenticate
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`${URL}/users/sign_in`);
  await page.type('input[type="email"]', EMAIL);
  await page.type('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');

  await page.goto(`${URL}/projects`);

  const title = await page.title();

  assert.equal(title, "Editmode.com - The Right Way to do content");
  await browser.close();
})();
