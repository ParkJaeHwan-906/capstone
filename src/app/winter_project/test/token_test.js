const router = require('express').Router();
const auth = require('../../../lib/auth');

router.use('/', auth.verify, (req,res)=>{
    console.log(req.auth);
    return res.json('ok');
});
module.exports = router;