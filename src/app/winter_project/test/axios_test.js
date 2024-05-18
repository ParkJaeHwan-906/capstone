const axios = require('axios');
const router = require('express').Router();

const base_url = process.env.base_url;

const api_url_get = '/api/project/test/axios/get';
const api_url_post = '/api/project/test/axios/post';

router.use('/', async(req, res)=> {
    try{
        const {test} = req.query;
        
        const params = {
            test : test
        }

        const body = {
            test : test
        }
        
        // const result = await axios.get(base_url+api_url_get, { params });
        const result = await axios.post(base_url+api_url_post, body);

        return res.json(result.data);
    } catch(e){
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        });
    }
});

module.exports = router;