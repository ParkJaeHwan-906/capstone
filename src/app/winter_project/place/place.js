const router = require('express').Router();
const place_m = require('./place_modules');

const jwt = require('../../../lib/auth');

// 장소 등록 
router.use('/upload', jwt.verify , async(req, res) => {
    try{
        // 장소이름, 장소주소, 좌표, 카테고리를 입력 받아 DB 에 업데이트
        const { place_name, place_address, geo_x, geo_y, category, place_url, place_phone } = req.query;
        const { user_idx, user_nickname } = req.auth;

        const duplication = await place_m.place_duplication(place_name, place_address);
        if(duplication.length > 0){
            const result = await place_m.update_view(place_name, place_address);
            return res.status(200).json({
                code : 200,
                message : "ok"
            });
        }
        else{
            const result = await place_m.place_upload(user_idx, place_name, place_address, geo_x, geo_y, category, place_url, place_phone);
            
            return res.status(200).json({
                code : 200,
                message : 'ok',
                result : result
            });
        }
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : 'Bad Request'
        });
    }
});

// 장소 리스트 가져오기
router.use('/list', async(req, res) => {
    try {
        const { location , category } = req.query;

        const result = await place_m.place_list(location, category);

        result.map((e) => {
            switch(e.category) {
                case 0 : 
                e.category = "음식점/술집";
                break;
                case 1 : 
                e.category = "카페";
                break;
                default :
                e.category = "놀거리/볼거리";
            }
        })
        return res.status(200).json({
            code : 200,
            message : "ok",
            result : result
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : "Bad Request"
        });
    }
})
// 선택 행 위치 보여주기
router.use('/location', async(req, res) => {
    try {
        const { place_name, place_address } = req.query;

        const result = await place_m.place_detail(place_name, place_address);

        const init_geo = {
            lat : result[0].kakao_geo.y,
            long : result[0].kakao_geo.x,
        }

        const geo = [{
            lat : result[0].kakao_geo.y,
            long : result[0].kakao_geo.x,
            color : "red"
        }];
        return res.status(200).json({
            code : 200,
            message : "ok",
            init_geo : init_geo,
            geo : geo
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : "Bad Request"
        });
    }
})

// 장소 상세 정보
router.use('/detail', async(req, res) => {
    try {
        const { place_name, place_address } = req.query;

        const view_update = await place_m.update_view(place_name, place_address);
        const result = await place_m.place_detail(place_name, place_address);
        const init_geo = {
            lat : result[0].kakao_geo.y,
            long : result[0].kakao_geo.x,
        }

        const geo = [{
            lat : result[0].kakao_geo.y,
            long : result[0].kakao_geo.x,
            color : "red"
        }];

        result.map((e) => {
            switch(e.category) {
                case 0 : 
                e.category = "음식점/술집";
                break;
                case 1 : 
                e.category = "카페";
                break;
                default :
                e.category = "놀거리/볼거리";
            }
        })

        return res.status(200).json({
            code : 200,
            message : "ok",
            result : result,
            init_geo : init_geo,
            geo : geo
        });
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : "Bad Request"
        });
    }
})

module.exports = router;