const router = require('express').Router();

const crypto = require('../../../lib/encrypt');

router.use('/', async(req, res) => {
    try{
        const { pw } = req.query;
        console.log(`입력받은 pw : ${pw}`);

        const result = await crypto.password_crypto(pw);
    
        console.log(`pw : ${result}`);

        return res.status(200.).json({
            message : 'ok',
            code : 200,
            pw : result
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