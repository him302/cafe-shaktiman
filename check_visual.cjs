const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    // Vite WebSockets can cause navigation to never "finish"
    await page.goto('http://localhost:5173', { timeout: 0 });
    // wait a few seconds for 3D to render and animation to finish (6s duration)
    await new Promise(r => setTimeout(r, 10000));
    
    await page.screenshot({ path: 'public/debug.png' });
    console.log('Screenshot saved to public/debug.png');
  } catch (err) {
    console.log('Failed:', err.message);
  }
  
  await browser.close();
})();
