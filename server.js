
const http = require('http');
const app = require('./app')
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

/*
const port = process.env.PORT || 3000;
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://remolacha.net/');
    const screenshot = await page.screenshot();
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log('Server started on port ' + port);
});

*/