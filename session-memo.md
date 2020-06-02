# Express-Session

## 모듈의 설치

npm i express-session

## 모듈의 사용

```javascript
var express = require("express");
var parseurl = require("parseurl");
var session = require("express-session");

var app = express();

app.use(
  session({
    secret: "keyboard cat",
    resave: false, // ??
    saveUninitialized: true, // 세션이 필요할 때만 작동한다 (리소스 절약)
  })
);

app.get("/", function (req, res, next) {
  // '/' 경로에 접속했을 떄, 'exam' 이라는 이름의 세션을 1로 설정한다.
  req.session.exam = 1;
});

app.listen(3000, () => {
  console.log("success");
});
```

기본적으로 세션은 메모리에 저장되므로 서버가 중지되면 휘발된다.
(session store)

## session store 바꾸기

https://github.com/expressjs/session

예) 파일로 저장

```
npm i session-file-store
```

```javascript
var session = require("express-session");
var FileStore = require("session-file-store")(session);

var fileStoreOptions = {}; // 여러 옵션을 객체형태로 설정 가능

app.use(
  session({
    store: new FileStore(fileStoreOptions), // 옵션으로 추가, 옵션객체 넘겨줌
    secret: "keyboard cat",
  })
);
```

세션이 sessions/ 디렉토리에 저장된다

## 세션이 저장된 후 콜백함수 실행

```javascript
req.session.save(() => {
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
});
```
