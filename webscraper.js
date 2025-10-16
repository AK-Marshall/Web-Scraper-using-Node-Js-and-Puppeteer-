const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {

  const url = process.argv[2]; 
  
  if (!url) {
    console.error("Please Provide a URL. Example node webscrapper.js https://example.com ");
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto( url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    return {
      title: document.title,
      firstHeading: document.querySelector("h1") ? document.querySelector("h1").innerText : null
    };
  });

  fs.writeFileSync("Scraped_Data.json", JSON.stringify(data, null, 2));

  await browser.close();
})();


