const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  await page.goto('http://localhost:3000/projects/prj_Fx4I3EvI0dBx/chunks?list%5Bentity_type_id%5D=10&list%5Bproject_id%5D=104')
  
  await page.setViewport({ width: 1920, height: 982 })
  
  await page.waitForSelector('#slide-form-inner > #slide-form-content > #new_entity_type > .pt-10 > .label:nth-child(3)')
  await page.click('#slide-form-inner > #slide-form-content > #new_entity_type > .pt-10 > .label:nth-child(3)')
  
  await page.waitForSelector('#slide-form-inner > #slide-form-content > #new_entity_type #add-field')
  await page.click('#slide-form-inner > #slide-form-content > #new_entity_type #add-field')
  
  await page.waitForSelector('#slide-form-content > #new_entity_type > .pt-10 > #field-inputs > .bg-white')
  await page.click('#slide-form-content > #new_entity_type > .pt-10 > #field-inputs > .bg-white')
  
  await page.waitForSelector('.pt-10 > #fild-inputs > .bg-white .form-input')
  await page.click('.pt-10 > #field-inputs > .bg-white > .w-8\/12 > .form-input')
  
  await page.waitForSelector('#new_entity_type > .form-page-top-section > .flex > .button > .text-white')
  await page.click('#new_entity_type > .form-page-top-section > .flex > .button > .text-white')
  
  await browser.close()
})()
