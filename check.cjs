const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 10000 }).catch(e => console.log('Navigation error:', e.message));
  
  const content = await page.content();
  const fs = require('fs');
  fs.writeFileSync('dom.html', content);
  console.log('HTML saved to dom.html');
  
  await browser.close();
})();
