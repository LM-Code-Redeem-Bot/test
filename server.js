const express = require('express'),
    app = express(),
    puppeteer = require('puppeteer');

app.get("/", async (request, response) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://lordsmobile.igg.com/gifts/');
    await page.focus('#iggid')
    await page.keyboard.type('12345')
    await page.focus('#cdkey_1')
    await page.keyboard.type('royal')
    const selector1 = '#btn_claim_1';
    await page.waitForSelector(selector1);
    await page.click(selector1);
    const selector2 = '#btn_msg_close';
    await page.waitForSelector(selector2);
    await page.click(selector2);
    await page.screenshot({path: __dirname+'/public/puppeteer.png'});
    await browser.close();
    response.sendFile(__dirname+'/public/puppeteer.png');
  } catch (error) {
    console.log(error);
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
