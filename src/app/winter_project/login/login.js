const router = require('express').Router();

const jwt = require('../../../lib/auth');
const m_login = require('./login_moduls');

router.use('/', async(req, res)=>{
    try{
        const { account, pw } = req.body;

        console.log(`입력 정보
account : ${account}
pw : ${pw}`);

        // 로그인 결과
        const result = await m_login.check_account(account, pw);

        // 0 : 비밀번호 불일치, 1: 로그인 성공, -1 : 아이디 불일치
        // console.log(result);

        if(result.result === 0){
            return res.status(400).json({
                code : 400,
                message : 'pw error',
            });
        } else if(result.result === 1){
            // 토큰 발행
            // user idx 와 user nickname 포함
            const token = jwt.sign({
                user_idx : result.user_idx,
                user_nickname : result.user_nickname
            })
            // console.log(token)
            return res.status(200).json({
                code : 200,
                message : 'login success',
                token : token
            });
        }else if(result.result === -1){
            return res.status(400).json({
                code : 400,
                message : 'id error',
            });
        }

    } catch(e){
        console.log(e);
        return res.status(500).json({
            code : 500,
            message : 'Internal Server error'
        });
    }
});

module.exports = router;