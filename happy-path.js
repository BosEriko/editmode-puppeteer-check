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

  await page.setViewport({ width: 1366, height: 1024 });

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

  // Create collection
  const allCollectionsButton = '#all-collections-button';
  const newCollectionButton = '#new-collection-button';
  const collectionInput = '#entity_type_name';
  const addFieldButton = '#slide-form-inner > #slide-form-content > #new_entity_type #add-field';
  const addFieldInput = '.collection-field-input';
  const newCollectionSaveButton = 'button[type="submit"].button.use-loading-spinner.flex.items-center';

  await page.waitForSelector(allCollectionsButton);
  await page.click(allCollectionsButton);

  await page.waitFor(3000);

  await page.waitForSelector(newCollectionButton);
  await page.click(newCollectionButton);

  await page.waitForSelector(collectionInput);
  await page.type(collectionInput, 'Test Collection');

  await page.waitForSelector(addFieldButton);
  await page.click(addFieldButton);

  await page.waitForSelector(addFieldInput);
  await page.type(addFieldInput, 'Test Field');

  await page.waitFor(3000);

  await page.waitForSelector(newCollectionSaveButton);
  await page.click(newCollectionSaveButton);
  
  // await page.screenshot({ path: './tmp/collection-after-save.jpg', type: 'jpeg' });

  await browser.close();

  // Delete the project
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
