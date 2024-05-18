const puppeteer = require('puppeteer');

// 로그인 후, 원하는 예매 페이지로 이동
exports.login = async(userId, pw, code) => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-web-security', '--disable-features=IsolateOrigins', ' --disable-site-isolation-trials']
    });

    let page = await browser.newPage();
    await page.goto('https://ticket.interpark.com/Gate/TPLogin.asp');

    await page.setViewport({width: 1080, height: 1024});

    // 웹페이지에서 <iframe> 요소가 나타날 때까지 기다림
    await page.waitForSelector('iframe');
    const id = await page.$(
        'iframe[src="https://accounts.interpark.com/authorize/ticket-pc?origin=https%3A%2F%2Fticket%2Einterpark%2Ecom%2FGate%2FTPLoginConfirmGate%2Easp%3FGroupCode%3D%26Tiki%3D%26Point%3D%26PlayDate%3D%26PlaySeq%3D%26HeartYN%3D%26TikiAutoPop%3D%26BookingBizCode%3D%26MemBizCD%3DWEBBR%26CPage%3D%26GPage%3Dhttp%253A%252F%252Fticket%252Einterpark%252Ecom%252F&postProc=IFRAME"]',
    );

    // 로그인
    const idSelector = '#userId';
    const idInput = userId;
    const pwSelector = '#userPwd';
    const pwInput = pw;

    let frame = await id.contentFrame();
    await frame.type(idSelector, idInput);
    await frame.type(pwSelector, pwInput);
    page.keyboard.press('Enter');
    
    await page.goto(`https://tickets.interpark.com/goods/${code}`);
    // await page.waitForNavigation();

    return true;
};