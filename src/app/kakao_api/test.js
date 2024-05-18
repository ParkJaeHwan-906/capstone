const router = require('express').Router();

const kakao_api = require('./kakao_api');

// kakao api 호출이 정상적으로 되는지 보기위한 호출 테스트
router.use('/', async(req, res) => {
    try{
        // const {address} = req.query;
        const {category} = req.query;
        // const xy = await kakao_api.get_coordinate(address);
        const address = await kakao_api.get_address(category);
        const result = address.documents.map(e => {
            const {address_name, phone, place_name, place_url, road_address_name, x, y} = e;
            return {
                address_name,
                phone,
                place_name,
                place_url,
                road_address_name,
                x,
                y
            };
        })
        return res.status(200).json({
            message : 'ok',
            code : 200,
            // result : xy
            result : result
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            message : 'Bad Request',
            code : 400
        });
    }
});

module.exports = router;
