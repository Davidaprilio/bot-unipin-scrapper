const express = require('express')
const app = express()
const port = 3000
const puppeteer = require('puppeteer');
const { doLogin } = require('./login');
const { getUCAccount } = require('./get-uc-account');
const { getListProduct } = require('./get-list-product');

const data = new Map()

function isLogged() {
    return data.get('isLogged') ?? false
}

async function main() {

    let browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    data.set('browserRunning', true)
    let page = await browser.newPage();
    await page.goto('https://www.unipin.com');

    app.get('/start', (req, res) => {
        res.json({ hello: 'wworld' })
    })

    app.get('/status', (req, res) => {
        res.json({
            logged: data.get('isLogged') ?? false,
            browserRunning: data.get('browserRunning', true) 
        })
    })

    app.use((req, res, next) => {
        console.log('Req Required launch browser');
        if (!data.get('browserRunning')) {
            return res.json({
                msg: "Please run browser first"
            }).status(400)
        }
        next()
    })

    app.get('/login', async (req, res) => {
        if (isLogged()) {
            res.json({
                msg: 'Already Login',
                logged: true
            })
            return
        }

        const creds = {
            email: req.query.email,
            pass: req.query.pass
        }

        data.set('isLogged', await doLogin(page, creds))

        res.json({
            msg: 'OK',
            logged: data.get('isLogged')
        })
    })

    app.get('/products', async (req, res) => {
        res.json({
            products: await getListProduct(page)
        })
    })

    app.use((req, res, next) => {
        console.log('Req Required login unipin');
        if (!isLogged()) {
            return res.json({
                msg: "Please do login first"
            }).status(400)
        }
        next()
    })

    app.get('/uc', async (req, res) => {
        if (!isLogged) {
            return res.json({
                msg: 'Please login first'
            }).status(400) 
        }

        res.json({
            msg: 'OK',
            uc: await getUCAccount(page)
        })
    })


    app.listen(port, () => {
        console.log(`scrapper unipin api listening on port ${port}`)
    })
}

main()