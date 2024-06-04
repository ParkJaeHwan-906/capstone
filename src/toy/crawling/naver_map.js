const router = require('express').Router();
const axios = require('axios');

router.use('/map', async(req, res) => {
    try{
        const { search_keyword } = req.query;
        console.log(search_keyword)
        let baseURL = `https://map.naver.com/p/api/search/allSearch?query=${search_keyword}&type=all&searchCoord=126.95194719999381%3B37.49922150000015&boundary=`
        const headers = {
            'Content-Type': 'application/json, text/plain',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            'Referer': 'https://map.naver.com/',
            'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
        };
        const result = await axios.get(encodeURI(baseURL), { headers });
        let list = result.data.result.place.list;
        list = list.map((e) => {
            return {
                rank : e.rank,
                name : e.name,
                menu : e.menuInfo,
                tel : e.tel,
                status : e.businessStatus.status.text,
                address : e.address
            }
        })
        list.sort((a,b)=> a.rank - b.rank);
        // console.log(list)
        return res.json(list);
    } catch(e) {
        console.log(e);
        return res.status(400).json({
            code : 400,
            message : "Bad Request"
        });
    }
});
module.exports = router;