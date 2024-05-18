const weather = require('./weather_modules');
const router = require('express').Router();

router.use('/', async(req, res)=>{
    try{
        const result = weather.weatherAPI(55,127);
        return res.json(result);
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        });
    }
})

module.exports =router;