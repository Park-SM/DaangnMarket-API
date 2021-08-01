# DaangnMarket-API
안드로이드 당근마켓 클론 앱을 위한 API 서버

## Description
새로운 디렉토리 "config"를 생성 후 아래의 두 파일을 생성하고 값 입력 후 사용하기.

### 1. config.js
>절대경로
<pre>
/config/config.js
</pre>

>내용
<pre>
const _session = require("express-session");
const HOST = "";
const PORT = "";
const SESSION = _session({
    secret: "",
    resave: false,
    saveUninitialized: true
});

module.exports = { HOST, PORT, SESSION };
</pre>

### 2. mysql-properties.js
>절대경로
<pre>
/config/mysql-properties.js
</pre>

>내용
<pre>
const HOST = "";
const PORT = "";
const DB = "";
const ID = "";
const PW = "";

module.exports = { HOST, PORT, DB, ID, PW };
</pre>
