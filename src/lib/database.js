const mysql = require('mysql');
//const config = require('../../config.json');

const poolRead = mysql.createPool({
    host: process.env.AWS_AURORA_MYSQL_READ_HOST,
    port: process.env.AWS_AURORA_MYSQL_READ_PORT,
    user: process.env.AWS_AURORA_MYSQL_READ_USER,
    password: process.env.AWS_AURORA_MYSQL_READ_PASSWORD,
    database: process.env.AWS_AURORA_MYSQL_READ_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

const poolWrite = mysql.createPool({
    host: process.env.AWS_AURORA_MYSQL_WRITE_HOST,
    port: process.env.AWS_AURORA_MYSQL_WRITE_PORT,
    user: process.env.AWS_AURORA_MYSQL_WRITE_USER,
    password: process.env.AWS_AURORA_MYSQL_WRITE_PASSWORD,
    database: process.env.AWS_AURORA_MYSQL_WRITE_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

exports.query = (query, params) => {
    return new Promise((res, rej) => {
        // query 문에 갱신 명령어가 대소문자 구분하지 않고 포함되어있는지 구분하는 부분
        const pool = query.match(/INSERT|UPDATE|DELETE|CALL/gi) !== null ? poolWrite : poolRead;
        pool.getConnection((err, conn) => {
            if (err) return rej(err);
            conn.query(query, params, (err, result) => {
                conn.release();
                if (err) return rej(err);
                return res(result);
            })
        })

    })
}
