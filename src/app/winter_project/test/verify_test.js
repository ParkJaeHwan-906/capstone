const router = require('express').Router();

const crypto = require('../../../lib/encrypt');

router.use('/', async(req, res) => {
    try{
        const { pw, cryptoPassword } = req.query;
        console.log(`입력 받은 pw : ${pw}`);
        // console.log(`전달 받은 salt : ${salt}`);
        console.log(`전달 받은 cryptoPassword : ${cryptoPassword}`);

        const result = await crypto.password_crypto(pw);

        console.log(result);

        const response = result === cryptoPassword ? true : false;

        return res.status(200.).json({
            message : 'ok',
            code : 200,
            result : response
        })
    } catch(e) { 
        console.log(e);
        return res.status(400).json({
            message : "Bad Request",
            code : 400
        })
    }
});

module.exports = router;