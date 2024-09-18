const puppeteer = require('puppeteer');

/**
 * 
 * @param {puppeteer.Page} page 
 * @param {{email: string, pass: string }} creds 
 */
async function doLogin(page, creds) {

    await page.click('#navbar-signin-button')
    await page.type('#loginEmailSide', creds.email, {delay: 70})
    await page.type('#loginPassword', creds.pass, {delay: 70})
    await page.click('#signin-email-submit-button')

    console.log('Login .....');

    await page.waitForSelector('.profile-name-email-wrap', {
        timeout: 0
    })
    await page.waitForSelector('.signout-button', {timeout: 0})
    
    console.log('Login Succeed')
};

module.exports = {    
    doLogin,
}