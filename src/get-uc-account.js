const puppeteer = require('puppeteer');

/**
 * 
 * @param {puppeteer.Page} page 
 * @param {boolean} parse 
 */
async function getUCAccount(page, parsing = true) {
    await page.waitForSelector('.nav-uc-container', {timeout: 5_000})
    const rawText = await page.$eval('.nav-uc-container', el => el.innerText)
    if (parsing) {
        return Number(rawText.split(' ')[0])
    }
    return rawText
}

module.exports = {
    getUCAccount
}