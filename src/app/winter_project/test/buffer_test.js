const router = require('express').Router();
const auth = require('../../../lib/auth');

router.use('/', (req,res)=>{
    const result = auth.sign('안녕');
    return res.json(result);
});
module.exports = router;