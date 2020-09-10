const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const puppeteer = require('puppeteer');

function getUrl(placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

async function sendRequest(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
            req.abort();
        }
        else {
            req.continue();
        }
    });

    await page.goto(url, { waitUntil: 'networkidle2' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await browser.close();
    return data;
}

module.exports = async function getPopularTimes(placeId) {
    const data = await sendRequest(getUrl(placeId));
    const body = new JSDOM(data);
    const days = body.window.document.getElementsByClassName('section-popular-times-graph');
    let busyness;
    let i = 0;
    for (let day of days) {
      const hours = day.getElementsByClassName('section-popular-times-bar');
      let j = 0;
      for (let hour of hours) {
        let hr = hour.getAttribute('aria-label');
        let parts = hr.split(' ');
        if (parts[0] === 'Currently') {
          busyness = parts[1];
        } else if(parts.length < 5) {
          //Do nothing
        } else {
          j++;
        }
      }
      i++;
    }
    return busyness;
}