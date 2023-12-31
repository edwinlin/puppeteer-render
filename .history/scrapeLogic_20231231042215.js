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

    await page.goto('https://sinfest.xyz/view.php?date=2023-12-30');

    // Resize window to 734 x 788
    await page.setViewport({ width: 734, height: 788 });
  
    // Scroll wheel by X:9, Y:123
    await page.evaluate(() => window.scrollBy(9, 123));
  
    // Scroll wheel by X:0, Y:21
    await page.evaluate(() => window.scrollBy(0, 21));
  
    // Scroll wheel by X:1, Y:14
    await page.evaluate(() => window.scrollBy(1, 14));
  
    // Scroll wheel by X:0, Y:14
    await page.evaluate(() => window.scrollBy(0, 14));
  
    // Scroll wheel by X:-2, Y:26
    await page.evaluate(() => window.scrollBy(-2, 26));
  
    // Scroll wheel by X:0, Y:414
    await page.evaluate(() => window.scrollBy(0, 414));
  
    // Scroll wheel by X:8, Y:161
    await page.evaluate(() => window.scrollBy(8, 161));
  
    // Scroll wheel by X:0, Y:93
    await page.evaluate(() => window.scrollBy(0, 93));
  
    // Scroll wheel by X:-2, Y:28
    await page.evaluate(() => window.scrollBy(-2, 28));
  
    // Scroll wheel by X:0, Y:532
    await page.evaluate(() => window.scrollBy(0, 532));
  
    // Scroll wheel by X:2, Y:2
    await page.evaluate(() => window.scrollBy(2, 2));
  
    // Scroll wheel by X:0, Y:2
    await page.evaluate(() => window.scrollBy(0, 2));
  
    // Click on <a> [href="view.php?date=2023-12-30"]:nth-child(1)
    await page.waitForSelector('[href="view.php?date=2023-12-30"]:nth-child(1)');
    await Promise.all([
      page.click('[href="view.php?date=2023-12-30"]:nth-child(1)'),
      page.waitForNavigation()
    ]);
  
    // Click on <b> "December 30, 2023: Let Me..."
    await page.waitForSelector('b');  

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      "b"
    );
    const fullTitle = await textSelector.evaluate((el) => el.textContent);

    // Print the full title
    const logStatement = `The title of this blog post is ${fullTitle}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
