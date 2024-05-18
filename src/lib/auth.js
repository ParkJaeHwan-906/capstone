const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const encrypt = require('./encrypt');

const secret_key = process.env.ENCRYPTION_KEY;

/*
 * 기본 jsonwebtoken 라이브러리의 sign 유형 
 * jwt.sign(payload, secretKey, option)
 * payload : 포함할 정보
 * secretKey : salt 값
 * option : 사용할 알고리즘, 만료시간, 발급자 정보 등
*/

/*
 * crypto.createCipheriv('aes-256-cbc', keys, buffer)
 * 암호화 하는데 사용할 알고리즘 
 * aes-256-cbc
 * keys 
 * 사용할 키
 * buffer 
 * 암호화 시 초기화 하는 백터이다.
 * 
 * 암호화
 * update(문자열, 인코딩, 출력 인코딩)
 * 
 * final 
 * 출력 인코딩
*/

// password 기반 키 값 유도 함수
// password, salt, keylength
const keys = crypto.scryptSync(process.env.PASSWORD, process.env.KEY ,32);
// 받은 숫자 16 만큼의 빈 사이즈의 버퍼 생성 
const buffer = Buffer.alloc(16, process.env.BUFFER);

/**
 * 무기한 토큰값 생성
 * buffer 16자리
 * keys 32자리 암호화 버퍼
 * iv 256은 32자리 key(32자리면 아무거나 OK) & 16자리 버퍼(이것도?)
 * 마지막에 jwt key로 jwt를 암호화
*/
exports.sign = (payload) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', keys, buffer);
    let result = cipher.update(JSON.stringify(payload), 'utf8', 'base64');
    result += cipher.final('base64');
    return jwt.sign({ iss: result }, secret_key)
}

/*
 * 토큰 검증
 * 헤더가 비어있으면 code : 1 에러
 * 헤더는 있지만, bearer 키워드가 없을 경우 code : 2 에러
 * 
 * token 은 bearer 토큰 의 형태로 공백 기준으로 나눈 뒤, [0] 은 bearer [1] 은 토큰 정보임 -> 토큰 정보만 추출
 * jwt 라이브러리의 verify 메서드로 secret 키로 생성한 토큰 복호화 
 * 
 * cipher 생성시 사용했던 알고리즘과 버퍼를 이용해 decipher 복호화 함 
 * ⚠️ 인코딩 방식은 암호화에서 사용한 역순으로 함
 * 
 * 
*/ 
exports.verify = function (req, res, next) {
    const header = req.headers['authorization']
    if (!header) return res.status(401).json({ code: 1, result: 'token length' });
    if (header.length <= 0 && header.indexOf('bearer') == -1) return res.status(401).json({ code: 2, result: 'token length' });
  
    try {
      const token = header.split(' ').pop();
      const decode = jwt.verify(token, secret_key);
  
      let decipher = crypto.createDecipheriv('aes-256-cbc', keys, buffer);
      let result = decipher.update(decode.iss, 'base64', 'utf8');
      result += decipher.final('utf8');
  
      req.auth = JSON.parse(result);

      next();
    } catch (e) {
      console.log(e)
      res.status(401).json({ code: 0, reason: 'token error' });
    }
  };
  