const db = require('../../../lib/database');

// 중복 장소 업로드 방지
exports.place_duplication = async(place_name, place_address) => {
    const query = `
        SELECT * FROM place
        WHERE place_name = ? AND address = ?;
    `;

    return await db.query(query, [place_name, place_address]);
}

// 장소 업로드 
exports.place_upload = async(user_idx, place_name, place_address, geo_x, geo_y, category, place_url, place_phone) => {
    const query = `
        INSERT INTO place(user_idx, place_name, address, kakao_geo, category, place_url, place_phone)
        VALUES(?, ?, ?, POINT(?,?), ?, ?, ?);
    `;
    return await db.query(query, [user_idx, place_name, place_address, geo_x, geo_y, category, place_url, place_phone]);
}

// 조회수 업데이트
exports.update_view = async(place_name, place_address) => {
    const query = `
        UPDATE place SET view = view+1
        WHERE place_name = ? AND address = ?;
    `;
    return await db.query(query, [place_name, place_address]);
}

// 장소 리스트
exports.place_list = async(location, category) => {
    category = category.replace(/[\[\]]/g, '').split(",");
    let query = `
        SELECT * FROM place 
        WHERE address LIKE ? AND run = 1
    `;
    
    switch(category.length){
        case 1 :
            query += `AND category IN(?)
            ORDER BY view DESC;`;
            return await db.query(query, [location+"%", +category[0]]);
            break;
        case 2 :
            query += `AND category IN(?, ?)
            ORDER BY view DESC;`;
            return await db.query(query, [location+"%", +category[0], +category[1]]);
            break;
        case 3 :
            query += `AND category IN(?, ?, ?)
            ORDER BY view DESC;`;
            return await db.query(query, [location+"%",+category[0], +category[1], +category[2]]);
            break;
    }
    query += `
    ORDER BY view DESC;`;
    return await db.query(query, [location+"%", ]);
};

// 장소 상세보기
exports.place_detail = async(place_name, place_address) => {
    const query = `
        SELECT * FROM place
        WHERE place_name = ? AND address = ? AND run = 1;   
    `;
    return await db.query(query, [place_name, place_address]);
};