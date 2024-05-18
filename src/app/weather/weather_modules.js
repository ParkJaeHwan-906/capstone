const axios = require('axios');
const dayjs = require('dayjs');
const config = require('../../../config.json');
                
function createUrl (weather_key, base_date , pageNo, nx, ny) {
                    
    return `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${weather_key}&numOfRows=290&pageNo=${pageNo}&base_date=${base_date}&base_time=2300&nx=${nx}&ny=${ny}&dataType=JSON`
}
                
function extractWeatherInfoByDateTime (gametime, json) {
    var time =  gametime.endsWith('30') ? gametime.slice(0,2) +'00' : gametime;
    const weatherType = ['TMP', 'POP', 'PCP', 'fcstDate', 'fcstTime']
    // TMP : 1시간 기온
    // POP : 강수확률
    // PCP : 1시간 강수량
    // fcstDate : 예측일자
    // fcstTime : 예측시간 
    var weatherObj = {};
    try {
        const route = json.response.body.items.item;
        for (var i=0; i<route.length; i++) {
            if (route[i].fcstTime == time) {                                
                weatherObj.fcstDate = route[i].fcstDate;
                weatherObj.fcstTime = route[i].fcstTime;
                                
                const category = route[i].category;
                if (weatherType.includes(category))
                    weatherObj[category] = route[i].fcstValue;
            }
        }
        return weatherObj;
                        
    } catch (err) {
        return -1;
    }
}
                
exports.weatherAPI = async (x, y) => {

    const base_date = dayjs().format('YYYYMMDD');
    const base_time = dayjs().format('HHMM');
    const weather_key = config.weather.key;
    // const url = createUrl(weather_key, base_date , 0, x, y);
    const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;
    const params = {
        ServiceKey : weather_key,
        pageNo : 1,
        numOfRows : 1000,
        dataType : 'JSON',
        base_date : 20240518,
        base_time : 6030,
        nx : x,
        ny : y
    }
    const res = await axios.get(url, {params});
    console.log(res.data)
    const result = extractWeatherInfoByDateTime(base_time, JSON.parse(res.data));
    return res.data;
}
