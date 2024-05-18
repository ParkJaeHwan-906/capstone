const puppeteer = require('puppeteer');
const router = require('express').Router();

router.use('/', async(req, res) => {
    try{
        // launch 메서드는 크롬(사실은 chromium) 브라우저를 실행한다.
        // headless 롭션은 크롬 실행 시 브라우저를 보여주는 여부를 설정함
        // false : 브라우저가 보임, true : 브라우저가 백그라운드에서 실행됨
        const browser = await puppeteer.launch({headless : false});

        // 페이지를 생성해준다. 
        const page = await browser.newPage();
        // page 오브젝트의 goto 메소드는 특정 URL 경로로 이동하는 메서드이다.
        page.goto('https://naver.com');

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