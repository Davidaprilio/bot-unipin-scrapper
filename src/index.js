const puppeteer = require('puppeteer');
const { doLogin } = require('./login');
const { getListProduct } = require('./get-list-product');
const { getUCAccount } = require('./get-uc-account');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    // await page.setViewport({
    //     width: 1920,
    //     height: 1080,
    // });

    await page.goto('https://www.unipin.com');
    await doLogin(page, {
        email: 'rizqi14gaming@gmail.com',
        pass: '@Rahasia1',
    })
    const uc = await getUCAccount(page)
    console.log('Saldo', uc);
    
    // const listProduct = await getListProduct(page)
    // console.log('listProduct',listProduct);

})();
