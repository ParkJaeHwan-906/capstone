const router = require('express').Router();
const puppeteer = require('puppeteer');


const login_m = require('./modules/login_modules');

router.use('/', async(req, res)=>{
    try{
        const {u_id , u_pw, code} = req.body;

        // 입력정보
        console.log(`id : ${u_id}`);
        console.log(`pw : ${u_pw}`);
        
        // 로그인
        const browser = await puppeteer.launch({
            headless: false,
            args: ['--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials']
        });
    
        let page = await browser.newPage();
        await page.goto('https://ticket.interpark.com/Gate/TPLogin.asp');
    
        await page.setViewport({width: 1400, height: 1400});
    
        // 웹페이지에서 <iframe> 요소가 나타날 때까지 기다림
        await page.waitForSelector('iframe');
        const id = await page.$(
            'iframe[src="https://accounts.interpark.com/authorize/ticket-pc?origin=https%3A%2F%2Fticket%2Einterpark%2Ecom%2FGate%2FTPLoginConfirmGate%2Easp%3FGroupCode%3D%26Tiki%3D%26Point%3D%26PlayDate%3D%26PlaySeq%3D%26HeartYN%3D%26TikiAutoPop%3D%26BookingBizCode%3D%26MemBizCD%3DWEBBR%26CPage%3D%26GPage%3Dhttp%253A%252F%252Fticket%252Einterpark%252Ecom%252F&postProc=IFRAME"]',
        );
    
        // 로그인
        const idSelector = '#userId';
        const idInput = u_id;
        const pwSelector = '#userPwd';
        const pwInput = u_pw;
    
        let frame = await id.contentFrame();
        await frame.type(idSelector, idInput);
        await frame.type(pwSelector, pwInput);
        // await page.type(idSelector, idInput);
        // await page.type(pwSelector, pw);
        page.keyboard.press('Enter');
        
        await page.waitForNavigation();
        
        await page.goto(`https://tickets.interpark.com/goods/${code}`);
        // const login = login_m.login(id, pw, code);


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