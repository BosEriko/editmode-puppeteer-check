const assert = require("chai").assert;
const puppeteer = require("puppeteer");

const URL = 'http://localhost:3000';
const EMAIL = 'dev@editmode.app';
const PASSWORD = 'password';

(async () => {
  // Authenticate
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();

  await page.goto(`${URL}/users/sign_in`);
  await page.type('input[type="email"]', EMAIL);
  await page.type('input[type="password"]', PASSWORD);
  await page.click('button[type="submit"]');

  // Create a new Project
  await page.waitFor(3000);
  const timestamp = +(new Date());
  const newProjectButton = ".flex > .flex-1 > .max-w-3xl > .pt-8 > .white";
  const projectNameInput = '#project_name';

  await page.waitForSelector(newProjectButton);
  await page.click(newProjectButton);

  await page.waitFor(3000);

  await page.waitForSelector(projectNameInput);
  await page.type(projectNameInput, `${timestamp}-project`);

  await page.click('button[type="submit"]');

  // Delete the project
  await page.goto(`${URL}/projects`);
  const createdProject = "ul > li:last-child > a";

  await page.waitForSelector(createdProject);
  await page.click(createdProject);

  await page.waitFor(3000);

  const projectSettingsButton = '#project-settings-button';
  const projectDeleteButton = '#project-delete-button';

  await page.waitForSelector(projectSettingsButton);
  await page.click(projectSettingsButton);

  await page.waitFor(3000);

  await page.evaluate(() => {
    document.getElementById('project-delete-button').scrollIntoView();
  });

  await page.waitFor(3000);

  await page.waitForSelector(projectDeleteButton);
  await page.click(projectDeleteButton);

  await page.waitFor(3000);

  await page.keyboard.press(String.fromCharCode(13));

  await navigationPromise;

  // Close the browser
  await browser.close();
})();
