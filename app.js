const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

async function CorotosGetData(search){
    const url = 'https://www.corotos.com.do/k/' + search + '?q%5Bsorts%5D=price_dop%20asc'; // + search
    const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        //executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage();
    await page.goto(url);
    const bookData = await page.evaluate(() => {

        const convertPrice = (price) => { return parseFloat(price); }
        const bookPods = Array.from(document.querySelectorAll('.page_content .flex.group'));
        const data = bookPods.map((book) => ({
            title: book.querySelector('.listing-bottom-info h3').innerText,
            img: book.querySelector('a img').getAttribute('src'),
            currency: book.querySelector('.listing-bottom-info .price-info span.text-overline').innerText,
            price: convertPrice(book.querySelector('.listing-bottom-info .price-info span.text-title-3').innerText),
            company: 'Corotos'
        }));
        return data;
    }, url)
    //const version = await page.browser().version();
    browser.close();
    
    return bookData;
}
/*
async function ChomerVersion(){
    const browser = await puppeteer.launch({
        headless: true,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage(); 
    const version = await page.browser().version();
    return version;
}

app.get('/', async (req, res) => {
    const dataManage = await ChomerVersion();
    res.status(200).send(dataManage);
})*/
app.get('/api/corotos/:search', async (req, res) => {
    const {search} = req.params;
    const dataManage = await CorotosGetData(search);
    res.status(200).send(dataManage);
})

/*
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});
*/

module.exports = app;