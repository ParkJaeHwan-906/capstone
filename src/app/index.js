const router = require('express').Router();

// WINTER PROJECT 

// 로그인
const winter_p_login = require('./winter_project/login/login');
router.use('/project/login', winter_p_login);

// 아이디 중복 확인
const winter_p_check_id = require('./winter_project/sign_up/check_Id/check_id');
router.use('/project/check_id', winter_p_check_id);

// 회원가입
const winter_p_sign_up = require('./winter_project/sign_up/sign_up');
router.use('/project/sign_up', winter_p_sign_up);

//-----------------------------------------------------------------------
// DB 테스트
const db_test = require('./winter_project/test/db_test');
router.use('/project/test/db', db_test);

// 암호화 단위 테스트
const crypto_test = require('./winter_project/test/encrypto_test');
router.use('/project/test/crypto', crypto_test);

// 검증 단위 테스트
const verify_test = require('./winter_project/test/verify_test');
router.use('/project/test/verify', verify_test);

// buffer 테스트
const buffer_test = require('./winter_project/test/buffer_test');
router.use('/project/test/buffer', buffer_test);

// token 테스트
const token_test = require('./winter_project/test/token_test');
router.use('/project/test/token', token_test);

// axios 테스트
const axios_get_test = require('./winter_project/axios_call/axios_get');
router.use('/project/test/axios/get', axios_get_test);

const axios_post_test = require('./winter_project/axios_call/axios_post');
router.use('/project/test/axios/post', axios_post_test);

const axios_call_test = require('./winter_project/test/axios_test');
router.use('/project/test/axios/call', axios_call_test);

//---------------------------------------------------------------------------
// 암호화 키 생성 
// 평문 : hwannee
const create_key = require('./create_key/create_key');
router.use('/create/key',create_key);

//---------------------------------------------------------------------------

// kakao api
const kakao = require('./kakao_api/test');
router.use('/kakao', kakao);


router.use('/', (req, res, next) => {
    console.log('index ok');
    next();
})

module.exports = router;

// git 연동 테스트