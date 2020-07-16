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

  // Add non collection chunk
  const addChunkButton = '#add-chunk-button';
  const addChunkInput = 'div #content_piece_single_line_text_content';
  const addChunkCreateButton = '#slide-form-content > #new_content_piece > .form-page-top-section > .inline-flex > .button';
  const closeAddChunkForm = '.c-content_pieces > #slide-form > #slide-form-inner > .js-close-slide-form > svg';

  await page.waitForSelector(addChunkButton);
  await page.click(addChunkButton);

  await page.waitFor(3000);

  await page.waitForSelector(addChunkInput);
  await page.type(addChunkInput, 'Test Chunk');

  await page.waitFor(3000);

  await page.waitForSelector(addChunkCreateButton);
  await page.click(addChunkCreateButton);

  await page.waitFor(3000);

  await page.waitForSelector(closeAddChunkForm);
  await page.click(closeAddChunkForm);

  await page.waitFor(3000);

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

  await page.waitFor(3000);

  // Add chunk to collection
  const addCollectionChunkButton = '#add-collection-chunk-button';
  const addCollectionChunkInput = 'div #content_piece_single_line_text_content';
  const addCollectionChunkCreateButton = '#slide-form-content > #new_content_piece > .form-page-top-section > .inline-flex > .button';
  const closeAddCollectionChunkForm = '.c-content_pieces > #slide-form > #slide-form-inner > .js-close-slide-form > svg';

  await page.waitForSelector(addCollectionChunkButton);
  await page.click(addCollectionChunkButton);

  await page.waitFor(3000);

  await page.waitForSelector(addCollectionChunkInput);
  await page.type(addCollectionChunkInput, 'Test Collection Chunk');

  await page.waitFor(3000);

  await page.waitForSelector(addCollectionChunkCreateButton);
  await page.click(addCollectionChunkCreateButton);

  await page.waitFor(3000);

  await page.waitForSelector(closeAddCollectionChunkForm);
  await page.click(closeAddCollectionChunkForm);

  await page.waitFor(3000);

  // Click & get 200 for: Activity Log
  const activityLogsButton = '#activity-logs-button';

  await page.waitFor(3000);

  await page.waitForSelector(activityLogsButton);
  await page.click(activityLogsButton);

  const activityLogsPageResponse = await page.waitForResponse(response => response.status() === 200);

  assert.equal(true, activityLogsPageResponse.ok());

  // Click & get 200 for: Docs
  const docsButton = '#docs-button';

  await page.waitFor(3000);

  await page.waitForSelector(docsButton);
  await page.click(docsButton);

  const docsPageResponse = await page.waitForResponse(response => response.status() === 200);

  assert.equal(true, docsPageResponse.ok());

  // Click & get 200 for: API Docs
  const apiButton = '#api-button';

  await page.waitFor(3000);

  await page.waitForSelector(apiButton);
  await page.click(apiButton);

  const apiPageResponse = await page.waitForResponse(response => response.status() === 200);

  assert.equal(true, apiPageResponse.ok());

  // Click & get 200 for: Team
  const teamButton = '#team-button';

  await page.waitFor(3000);

  await page.waitForSelector(teamButton);
  await page.click(teamButton);

  const teamPageResponse = await page.waitForResponse(response => response.status() === 200);

  assert.equal(true, teamPageResponse.ok());

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

  // await page.screenshot({ path: './tmp/collection-after-save.jpg', type: 'jpeg' });

  await page.keyboard.press(String.fromCharCode(13));

  await navigationPromise;

  // Close the browser
  await browser.close();
})();
