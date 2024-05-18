const router = require('express').Router();

const db = require('../../../lib/database');

router.use('/', async(req,res)=>{
    try{
        const qString = 'SELECT * FROM account;';

        // console.log(qString)

        const result = await db.query(qString, []);


        return res.json(result)
    } catch(e){
        console.log(e);
        return res.status(500).json({
            code : 500,
            message : 'db conn error' 
        });
    }
});

module.exports = router;