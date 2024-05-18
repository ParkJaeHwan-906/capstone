const jwt = require('../../../lib/auth');
const router = require('express').Router();

// 토큰의 만료 시간을 2시간으로 설정헀기 때문에, 주기적으로 토큰의 유효성을 검사해주기 위한 API
router.use('/check', jwt.verify, async(req, res) => {
    try {
        const info = req.auth;

        return res.status(200).json({
            code : 200,
            message : 'ok',
            result : info
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        });
    }
});

module.exports = router;