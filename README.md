# DaangnMarket-API
안드로이드 당근마켓 클론 앱을 위한 API 서버

## #API Document
API 설계문서 엑셀 [다운로드](https://github.com/Park-SM/DaangnMarket-API/files/6950422/API.xlsx)


## #Setup
새로운 디렉토리 "config"를 생성 후 아래의 두 파일을 생성하고 값 입력 후 사용하기.

### 1. config.js
>절대경로
<pre>
/config/config.js
</pre>

>내용
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

### 2. mysql-properties.js
>절대경로
<pre>
/config/mysql-properties.js
</pre>

>내용
<pre>
exports.HOST = "";
exports.PORT = "";
exports.DB = "";
exports.ID = "";
exports.PW = "";
exports.LOGGING = true | false;
</pre>


