const puppeteer = require('puppeteer');
const router = require('express').Router();

router.use('/', async(req, res) => {
    try{
        const browser = await puppeteer.launch({
            headless : false
        });
        const page = await browser.newPage();

        const naver_id = "doormoo2";
        const naver_pw = "Hwannee22!";

        await page.goto('https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/');

        await page.evaluate((id, pw) => {
            document.querySelector('#id').value = id;
            document.querySelector('#pw').value = pw;
        }, naver_id, naver_pw);

        // await page.type('#id', naver_id)
        // await page.type('#pw', naver_pw)

        await page.click('.btn_login');

        await page.goto('https://naver.com');
        
        await page.waitForNavigation();

        return res.status(200).json({
            code : 200,
            message : '성공적으로 브라우저를 실행했습니다.'
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            message : 'Bad Request',
            code : 400
        });
    }
});

module.exports = router;