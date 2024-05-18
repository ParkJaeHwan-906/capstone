const router = require('express').Router();

const crypto = require('../../lib/encrypt');

router.use('/', async(req, res)=>{
    try{
        const plain_text = "hwannee";
        const result = await crypto.create_key(plain_text) ;

        return res.json(result);
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        })
    }
});

module.exports = router;