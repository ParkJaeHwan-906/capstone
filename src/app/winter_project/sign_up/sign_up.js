const router =require('express').Router();

const m_sign_up = require('./sign_up_modules');

router.use('/', async(req,res)=>{
    try{
        console.log('회원가입');
        const {name, birth, email, account, password, phone, address, detail, check_id, nickname} = req.body;
        if(check_id == 'false' || !check_id){
            return res.status(400).json({
                code : 400,
                message : '아이디 중복 확인을 해주세요'
            });
        }
       const result = await m_sign_up.sign_up(name, birth, email, account, password, phone, address, detail, nickname);

        return res.status(200).json({
            code : 200,
            message : '회원가입이 완료되었습니다.',
            result : result
        });
    } catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        });
    }
});

module.exports = router;