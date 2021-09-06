# 당근마켓 API
&nbsp;안드로이드 당근마켓 앱을 클론 코딩하며 사용하는 API 저장소 입니다. 앱의 전체적인 기능 구현을 목표로 하기보단 담당한 파트를 공부하고 개발하는 중이며 안드로이드 앱에서 필요한 기능만 우선적으로 구현하고 있습니다.

## 1. API Document
API 설계문서 엑셀 파일 &nbsp;[`Download`](https://github.com/Park-SM/DaangnMarket-API/files/7115735/API.xlsx)


## 2. Setup
1. 최상위 디렉토리에서 새로운 디렉토리 "config"를 생성합니다.
2. 아래의 두 파일을 config 디렉토리 안에 만들고 값을 입력합니다.
3. `npm install` 을 통해 module을 설치합니다.
4. `node app.js` 를 통해 서버를 실행합니다.

- /config/config.js
<pre>
exports.HOST = "";
exports.PORT = "";
exports.SESSION = require("express-session")({
    secret: "",
    resave: false,
    saveUninitialized: true
});

exports.JWT_SECRET = "";
exports.JWT_A_TOKEN_EXPIRED_IN = "";
exports.JWT_R_TOKEN_EXPIRED_IN = "";
exports.JWT_ISSUER = "";
</pre>

- /config/mysql-properties.js
<pre>
exports.HOST = "";
exports.PORT = "";
exports.DB = "";
exports.ID = "";
exports.PW = "";
exports.LOGGING = true | false;
</pre>

## 3. Tech
`Node.js` `MVC` `express` `JWT` `Sequelize` `MySQL`

## 4. Client Android App
본 API를 사용하는 안드로이드 당근마켓 클론 앱이고 아래의 주소에서 확인할 수 있습니다.<br>
https://github.com/Park-SM/DaangnMarket
