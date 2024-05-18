const router = require('express').Router();

// 장난감

//-----------------------------------------------------------
// puppeteer 

// naver를 브라우저로 열기
const open_web = require('./puppeteer/open_web');
router.use('/open/web', open_web);
// naver에 로그인 하기
const login = require('./puppeteer/login');
router.use('/login', login);

// ticketing
const ticketing = require('./ticketing/main');
router.use('/ticketing', ticketing);
// iframe 가져오기
const iframe = require('./ticketing/get_iframe');
router.use('/iframe', iframe);

// 크롤링
// 프로그래머스 문제 추출하기
const programmers_crawling = require('./crawling/week_homework');
router.use('/programmers/crawling', programmers_crawling);

//-----------------------------------------------------------

router.use('/', (req, res, next) => {
    console.log('toy index ok');
    next();
})

module.exports = router;