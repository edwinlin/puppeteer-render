const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto("https://www.inboxes.com/");


    // Resize window to 1230 x 788
    await page.setViewport({ width: 1230, height: 788 });
  
    // Click on <button> "Get my first inbox!"
    await page.waitForSelector('.focus-within\:ring-4');
    await page.click('.focus-within\:ring-4');
  
    // Click on <input> #username
    await page.waitForSelector('#username');
    await page.click('#username');
  
    // Fill "123fire456" on <input> #username
    await page.waitForSelector('#username:not([disabled])');
    await page.type('#username', "123fire456");
  
    // Click on <button> "Add Inbox"
    await page.waitForSelector('.w-full1');
    await page.click('.w-full1');
  
    // Click on <span> "123fire456@blondmail.com"
    await page.waitForSelector('.cursor-pointer:nth-child(2)');
    await page.click('.cursor-pointer:nth-child(2)');
  
    await browser.close();
  };

module.exports = { scrapeLogic };
