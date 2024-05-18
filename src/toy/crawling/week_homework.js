const router = require('express').Router();

// const chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe";

const puppeteer = require('puppeteer');

router.use('/', async(req, res)=> {
    try{
        const { Lv, problem, languages, pg } = req.query;
        // 언어 설정
        let language = '';
        for(let s of languages.split(' ')){
            language += s+`%2C`;
        }

        // launch 는 크롬 브라우저를 실행한다.
        // headless 옵션은 크롬 실행 시 브라우저를 보여주는지 여부를 결정한다.
        // false : 브라우저를 보여준다. true : 브라우저를 보여주지 않는다. 
        const browser = await puppeteer.launch({
            headless : true,
            // executablePath : chrome
        });

        // 페이지 생성
        const page = await browser.newPage();
        // goto 메서드를 이용해 특정 URL 로 이동한다.
        // 프로그래머스 코딩 테스트 페이지
        await page.goto(`https://school.programmers.co.kr/learn/challenges?order=recent&levels=${Lv}&languages=${language}&page=${pg}`);
        
        let eh_list = await page.$$(`#edu-service-app-main > div > div.site-conntent > article > div.Containerstyle__Container-sc-1bhq4ak-0.Challengesstyle__Container-sc-ii8ave-1.SdSJo.daPygB > div.Challengesstyle__Content-sc-ii8ave-2.hIXXAF > div.ChallengesTablestyle__ChallengesTableWrap-sc-wt0ety-3.eCXYdt > div > table > tbody tr`);
        
        let arr = [];

        for(let eh of eh_list){
            let title = await eh.$eval(`div.bookmark`, (e1) =>{
                return e1.innerText;
            });
            let url = await eh.$eval(`div.bookmark > a`, (e1) => {
                return e1.href;
            });
            let level = await eh.$eval(`td.level`, (e1) => {
                return e1.innerText;
                // e1.className 도 가능
            });
            // let level = await eh.$eval(`td.level > span`, (e1) => {
            //     return e1.className;
            // });
            console.log("Title:", title,'[' ,level, ']');
            
            console.log("URL:", url);
            arr.push({
                title : title,
                level : level,
                url : url
            });
        }
        
        // 추출한 문제의 개수가 원하는 문제의 개수보다 적을 경우
        if(arr.length <= problem){
            return res.status(200).json({
                message : 'ok',
                code : 200,
                result : arr
            });    
        }

        // 무작위로 문제 추출
        let result = []
        for(let i=0; i<problem; i++){
            let idx = parseInt(Math.random()*100)%arr.length
            result.push(arr[idx]);
        }

        return res.status(200).json({
            message : 'ok',
            code : 200,
            result : result
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            message : 'Bad Request',
            code : 400
        });
    }
})

module.exports = router;


