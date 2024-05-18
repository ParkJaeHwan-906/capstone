const db = require('../../../lib/database');

const crypto = require('../../../lib/encrypt');

exports.sign_up = async(name, birth, email, account, password, phone, address, detail, nickname) => {

    // console.log(`
    // name : ${name},
    // birth : ${birth},
    // phone : ${phone},
    // email : ${email},
    // address : ${address},
    // detail : ${detail},
    // account : ${account},
    // password : ${password}
    // `);

    password_crypto = await crypto.password_crypto(password);
    
    let qString1 = `
        INSERT INTO user_account (account, pw) VALUES (?, ?);
    `;
    
    await db.query(qString1, [account, password_crypto]);

    let qString2 = `
        INSERT INTO user_info (nick_name, name, birth, phone, email, address, detail) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    await db.query(qString2, [nickname, name, birth, phone, email, address, detail]);

    let qString3 = `
        SELECT u_i.name, u_a.account, u_a.pw FROM user_account u_a
        JOIN user_info u_i ON u_i.idx = u_a.idx
        WHERE u_a.account = ?;
    `;
    return db.query(qString3, [account]);
    
};