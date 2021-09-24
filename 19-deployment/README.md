## Deployment

List

- Pre-Deployment checklist
- How do I want to `operate` it?
- Deployment: front-end, backend

### 배포 전 체크리스트

- Prepare production configuration  
  보안에 관련된 중요한 키들이 들어있거나 커밋되어 있지 않은지 확인  
  서버에서 설정할 수 있는 환경변수들이 따로 설정이 가능한지 체크
- Logs audit(no sensitive data output)  
  보안에 민감한 사항 또는 불필요한 데이터를 출력하고 있지 않은지 확인
- Sanitise server responses ( Strip off debug info and call-stacks )
- Set API rate limits  
  한 사용자 또는 한 IP에서 주기적으로 반복적인 API 요청을 하지 못하게 제약을 걸어둔다
- SQL같은 schema 베이스의 DB를 사용한다면 schema를 만들 수 있는 파일들을 깃에 커밋을 해두는게 좋다

### 호스팅 고르는 법

#### What are My hosting requirements

- 서버의 종류: web server or static hosting
- database가 필요한지?
- 어떤 데이터베이스를 사용하고 있는지?
- 사용하는 데이터베이스를 지원해주고 있는 호스팅이 있는지?
- CDN이 필요한지?
- 서버의 파일시스템에 접근해서 파일을 읽어와야 하는지? (file storage)
- SSL과 같은 TLS가 필요한지?
- 어디에 있는 / 어떤 위치에 있는 서버가 필요한지?

#### How do I want to operate it?

- DIY (have full control)

  - provision VMS
  - install dependencies
  - setup networking
  - setup scaling
  - etc..
  - in these cases: Google Cloud, amazon web services, Azure...

- Fully managed (have some control)
  - just upload the code
  - configure access
  - configure scaling
  - etc..
  - in these cases: heroku, netlify, platform.sh ...

### dwitter deployment

- Frontend -> netlify

  - HTTP v2, free, redirects
  - client-side rendering

- Backend -> platform.sh
  - node.js, MySQL
  - HTTP v2, free
  - Heroku는 백엔드 배포에 많이 사용되지만 아직 HTTP v1만 지원한다
  - mongoDB는 Atlas에 이미 배포를 한 상태라 배포를 따로 하지 않아도 된다

### 배포 전 최종 코드 점검 (main branch로 돌아와서)

platform 호스팅에서는 port라는 단어를 사용하므로 `configure.js`에서 변경해준다

```js
 host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
// 가 아니라 아래처럼 변경! 하고 cors도 추가해준다

port: parseInt(required('PORT', 8080)),
cors: {
  allowedOrigin: required('CORS_ALLOW_ORIGIN'),
},
```

app.js 에서 코드 추가, 수정

```js
// app.js

// 추가
const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

// 수정
app.use(cors(corsOption)); // cors 인자로 corsOption 추가

sequelize.sync().then(() => {
  const server = app.listen(config.port); // port로 수정한 값
  initSocket(server);
});
```

#### 버그수정 & clean up

middleware의 auth.js에서 `req.token = token;`를 전달해줘야 한다  
app.js에서 `console.log('Server is started...🏃🏻‍♀️ ${new Date()}');`를 추가해서 나중에 서버의 로그를 확인할 때 서버가 언제 시작, 재시작되었는지 알 수 있다  
(실제 코드에선 '' 대신 백틱사용~)  
socket.js에서 `origin: '*'` 대신 `origin: config.cors.allowedOrigin,`으로 변경한다
