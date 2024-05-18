const db = require('../../../lib/database');

const crypto = require('../../../lib/encrypt');

exports.check_account = async(account, pw) => {
    q_string = `
    SELECT u_a.idx, u_i.nick_name , u_a.account, u_a.pw FROM user_account u_a
    
    JOIN user_info u_i ON u_i.idx = u_a.idx
    
    WHERE u_a.account = ?;
    `;

    // 해당하는 account 값을 가진 데이터 출력
    const info = await db.query(q_string, [account]);
    
    if(info.length > 0){
        
        // console.log(info);

        const password_crypto = await crypto.password_crypto(pw);

        // console.log(password_crypto);
        
        if(password_crypto === info[0].pw){
            return {
                result : 1,
                user_idx : info[0].idx,
                user_nickname : info[0].nick_name
            };
        }else{
            return {
                result : 0
            };
        }

    }else{
        // 해당 id의 결과가 없는 경우
        return -1;
    }

};