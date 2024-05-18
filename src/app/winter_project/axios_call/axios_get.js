const router = require('express').Router();


// axios 사용한 API 호출 테스트 
// get 방식 
router.use('/', async(req, res)=>{
    try{
        // query를 통해 넘어온 test 변수의 값을 받아옴
        const {test} = req.query;
        console.log(`test_get : ${test}`);


        // 전달 받은 값을 확인 차 json으로 리턴해준다.
        return res.status(200).json({
            code : 200,
            message : 'get_ok',
            test : test
        });

    }catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        });
    }
});

module.exports = router;