import puppeteer from 'puppeteer';
import fs from 'fs';
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://developer.mozilla.org/ja/docs/Web/HTTP/Status');

  const contents = await page.$('#content > article');
  const titles = await contents.$$('dt');
  const texts = await contents.$$('dd');

  const data = [];
  let text = '';
  for (let i = 0; i < titles.length; i++) {
    const status = (
      await (await titles[i].getProperty('textContent')).jsonValue()
    ).replace(/\s\(.+\)|\s\n.+\n/gi, '');
    if (!status.match(/^\d{3}/)) break;

    const statusCode = status.match(/\d{3}/gi)[0];
    const statusName = status.replace(/\d{3}\s/, '');
    const statusText = (
      await (await texts[i].getProperty('textContent')).jsonValue()
    ).replace(/\n|\s/g, '');
    data.push({
      status,
      statusCode,
      statusName,
      statusText,
    });
    text += `{区切り}\n${statusCode}{区切り}\n${statusName}{区切り}\n${statusText}`;
    // console.log(status.replace(/\d{3}\s/, ''));
  }
  // console.log(data);
  fs.writeFileSync('./exports/statuscode.txt', text, 'utf8');
  fs.writeFileSync('./exports/statuscode.json', JSON.stringify(data), 'utf8');

  await browser.close();
})();
