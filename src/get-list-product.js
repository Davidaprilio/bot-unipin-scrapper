const puppeteer = require('puppeteer');

/**
 * 
 * @param {puppeteer.Page} page 
 */
async function getListProduct(page) {
    await page.goto('https://www.unipin.com');

    await page.waitForSelector('#homepage-featuredgame-tabContent .tab-pane[role="tabpanel"] .card-sizer.o .card-game-title', {
        timeout: 0
    })
    
    const listProduct = await page.$$eval('#homepage-featuredgame-tabContent .tab-pane[role="tabpanel"]', async panes => {
        return panes.map(pane => {
            return Array.from(pane.querySelectorAll('.card-sizer.o')).map(card => {
                return {
                    img: card.querySelector('.card-image img').dataset.src.replaceAll(' ', '+'),
                    name: card.querySelector('.card-game-title').innerText,
                    publisher: card.querySelector('.card-game-publisher').innerText,
                }
            })
        })

    })

    return listProduct    
}

module.exports = {
    getListProduct,
}