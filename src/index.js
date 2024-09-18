const puppeteer = require('puppeteer');
const { doLogin } = require('./login');
const { getListProduct } = require('./get-list-product');

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
        email: 'email@example.com',
        pass: 'password',
    })

    const listProduct = await getListProduct(page)
    console.log('listProduct',listProduct);

})();
