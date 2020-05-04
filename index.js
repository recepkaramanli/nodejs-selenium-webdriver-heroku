const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const webdriver = require('selenium-webdriver')
var app = express()
chrome = require('selenium-webdriver/chrome')
var sleep = require('sleep-promise');
let options = new chrome.Options();
options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH);
let serviceBuilder = new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH);
options.addArguments("--headless");
options.addArguments("--disable-gpu");
options.addArguments("--no-sandbox");
options.addArguments("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36")

app.get('/url/:data', async function (req, res) {
    
    let buff = new Buffer(req.params.data, 'base64')
    let text = buff.toString('ascii')
    
    let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(serviceBuilder)
    .build();
      await driver.get(text)
      await sleep(5000)
      await driver.getPageSource().then(function(source) { res.send(source); })
      //await driver.getTitle().then(function(title) { res.send(title); });
  
})

var server = app.listen(PORT, function () {
    console.log('sunucu calisiyor');
})
