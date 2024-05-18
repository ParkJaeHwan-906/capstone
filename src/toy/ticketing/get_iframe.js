const router = require('express').Router();
const puppeteer = require('puppeteer');

router.use('/', async(req, res)=>{
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://ticket.interpark.com/Gate/TPLogin.asp');

        // 웹 페이지의 모든 iframe 요소 선택
        const iframes = await page.$$('iframe');

        // 모든 iframe에 대해 반복
        for (const iframe of iframes) {
            // iframe의 src 속성 가져오기
            const src = await iframe.evaluate(element => element.src);
            console.log('iframe src:', src);
        }

        await browser.close();
        
        return res.status(200).json({
            code : 200,
            message : '성공적으로 완료하였습니디.'
        })
    } catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        });
    }
});

module.exports = router;