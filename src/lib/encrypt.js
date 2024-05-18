const crypto = require('crypto');
const config = require('../../config.json');
const { env } = require('process');

/*
crypto 의 메소드
createHash() : 사용할 알고리즘
update() : 암호화할 비밀번호
digest() : 인코딩 방식
*/


// 비밀번호 생성 예시
// exports.createHashedPassword = (password) => {
//     // sha512 알고리즘을 사용해 password를 암호화 하고 base64로 인코딩한다.
//     return crypto.createHash("sha512").update(password).digest("base64");
// }

// 문제점 동일한 해시 알고리즘과 인코딩 방식을 사용할 때, 비밀번호가 동일한 경우 동일한 해시 값을 반환한다.
// 이를 레인보우 테이블이라 함
// ⚠️ 임의값을 입력하면서 유추할 수 있음 

// 해결방법
// salt를 사용함 -> salt : 소금을 뿌리듯 입력 값에 특정 값을 붙여 변형시키는 것 
// 해시 함수를 여러번 사용함 (이중 해싱)

// salt 사용은 crytpo 의 
// randomBytes() 과 비밀번호 암호화 또는 검증에서는 pbkdf2() 를 사용 
/*
// salt 생성 
// ⚠️salt는 이후 검증을 위해 회원가입 시 password와 함께 DB에 저장된다.
const create_salt = async () => {
    // randomBytes() 메서드를 통해 64 바이트 길이의 buffer 형식으로 salt 값을 생성
    const buf = await crypto.randomBytes(64);
  
    // buffer 값을 base64 문자열로 변경
    return buf.toString("base64");
  };

// salt 적용한 암호화
  exports.encrypto_password = async(password) => {
    // salt 생성
    const salt = await create_salt();

    // console.log(salt);

    // salt를 이용한 암호화
    // pbkdf2Sync(해싱할 값, salt, 해시 함수 반복 횟수, 해시 값 길이, 해시 알고리즘)
    const hashed_password = await crypto.pbkdf2Sync(password, salt, 104906, 64, "sha512").toString("base64");
    // 생성된 key 는 buffer 형식을 갖고 있으므로 bas64 문자열로 변경해줌
    //const hashedPassword = key.toString("base64");
    
    // DB에 저장을 위한 암호화 된 password와 salt 값 리턴 
    return {hashed_password, salt};
}

// salt 적용한 암호를 복호화
// 사용자가 입력한 값, DB의 salt 값, DB의 암호화된 PW 값
exports.verify_password = async(password, salt, encrypto_password) => {
    
  encrypto_password = encrypto_password.replace(/ /gi,'+');
  // salt를 이용한 암호화
    // pbkdf2Sync(해싱할 값, salt, 해시 함수 반복 횟수, 해시 값 길이, 해시 알고리즘)
    const hashed_password = await crypto.pbkdf2Sync(password, salt, 104906, 64, "sha512").toString("base64");
    // 생성된 key 는 buffer 형식을 갖고 있으므로 bas64 문자열로 변경해줌
    //const hashedPassword = key.toString("base64");

    // 입력된 값과 저장된 값이 같다면 true
    if(hashed_password === encrypto_password) return true;
    // 다르다면 false
    return false;
}
*/

// 단방향 암호화
exports.password_crypto = async(password) => {
  // 미리 만들어놓은 key를 가지고 salt를 생성한다. 
  const salt = crypto.createHash('sha512').update(process.env.ENCRYPTION_KEY).digest("base64").toUpperCase();
  // 입력받은 pw를 salt를 사용해 7번 반복하여 64비트의 해시를 생성한다.
  return crypto.pbkdf2Sync(password, salt, 7, 64, 'sha512').toString('base64').toUpperCase();
}





//------------------------------------------------------------------------------------------------------------------

// salt 생성을 위한 키 생성
exports.create_key = async(plain_text) => {
  const key = crypto.createHash('sha512').update(plain_text).digest("base64");
  return key;
}


// // 단방향 암호화
// exports.pw_crypto = (password) => {
//     const salt = crypto.createHash('sha256').update(config.salt.key).digest('base64').toUpperCase()
//     return crypto.pbkdf2Sync(password, salt, 7, 64, 'sha512').toString('hex').toUpperCase()
// }