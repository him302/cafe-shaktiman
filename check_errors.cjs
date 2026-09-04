const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
  try {
    // Vite uses WebSockets, so networkidle0 times out.
    await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 15000 });
    // wait a few seconds to catch React runtime errors
    await new Promise(r => setTimeout(r, 5000));
    console.log('Page loaded and waited 5s successfully');
  } catch (err) {
    console.log('Failed to load page:', err.message);
  }
  
  await browser.close();
})();
