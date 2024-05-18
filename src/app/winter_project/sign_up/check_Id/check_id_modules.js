const db = require('../../../../lib/database');

exports.check_id = (account) => {
    const qString = `
        SELECT * FROM user_account
        WHERE account = ?  
    `;
    return db.query(qString, [account]);
};