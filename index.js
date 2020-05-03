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

app.get('/', async function (req, res) {
    
    let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(serviceBuilder)
    .build();
      //await driver.get('https://www.sahibinden.com/ilan/ikinci-el-ve-sifir-alisveris-bilgisayar-dizustu-notebook-dell-vostro-5590-i7-10510u-hatasiz-garantili-carsi-iletisimden-816835175/detay')
      await driver.get('https://www.recepkaramanli.com/fiyat-takip');
     // await sleep(5000)
      //await driver.getPageSource().then(function(res) { console.log(res)); })
      await driver.getTitle().then(function (res) { res.send(res); });
  
})

var server = app.listen(PORT, function () {
    console.log('sunucu calisiyor');
})
