const router = require('express').Router();

const m_check_id = require('./check_id_modules');

router.use('/', async(req, res)=>{
    try{
        // 중복확인 할 ID 정보 가져오기
        const {account} = req.query;
        console.log(`중복 확인 할 아이디 : ${account}`);
        if(!account) return res.status(400).json({
            code : 400,
            message : '사용할 아이디를 입력해주세요',
            result : false
        })
        const result = await m_check_id.check_id(account);
    
        if(result.length > 0){
            console.log('이미 사용중입니다.');
            // 아이디가 이미 사용중인 경우
            return res.status(400).json({
                code : 400,
                message : '이미 사용중인 아이디입니다.',
                result : false
            });
        }else{
            console.log('사용가능합니다.');
            // 아이디가 사용 가능할 경우
            return res.status(200).json({
                code : 200,
                message : '사용 가능한 아이디입니다.',
                result : true
            });
        }

    } catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        });
    }
});

module.exports = router;