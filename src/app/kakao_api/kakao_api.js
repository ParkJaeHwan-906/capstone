const axios = require('axios');
const config = require('../../../config.json');

const headers = {
    Authorization: config.kakao.key
};
// 좌표 불러오기 (주소 입력 시)
exports.get_coordinate = async(address) => {
    try {
        const params = {
            query: address
        };

        const response = await axios.get('https://dapi.kakao.com/v2/local/search/address', { headers, params });
        if (response.status === 200) {
            const documents = response.data.documents;
            if (documents.length > 0) {
                const geo = documents[0].address;
                return {
                    x: geo.x,
                    y: geo.y
                };
            } else {
                return null;
            }
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

// 카테고리 입력 시 주소 불러오기 
exports.get_address = async(category) => {
    try {
        const params = {
            query: category
        };

        const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', { headers, params });
        if (response.status === 200) {
            const documents = response.data.documents;
            if (documents.length > 0) {
                return {
                    documents
                };
            } else {
                return null;
            }
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}