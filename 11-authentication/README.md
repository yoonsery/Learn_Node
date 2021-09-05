## Authentication

### 인증이란?

- you are who you say you are
- password, pin-code로 인증 `You know` → client
- mobile phone, hardware token `You have`
- fingerprints, signature `You are` → server

http는 stateless protocol 인데 어떻게 AUTH happen?

- 사용자는 id, password를 통해 서버에 가입
- 서버에 사용자에 대한 정보를 저장 (id, pw) 해두면 나중에 사용자의 id, pw로 로그인을 할 수 있다
- 로그인이 성공적으로 되었다면, 다음의 사용자가 다른 리퀘스트를 할 때,  
  서버가 어떻게 이 추가적인 요청을 하는 클라이언트가 로그인된 사용자인지 아닌지 구분하는가? ⟶ 2가지 방법이 있다

### Session & Cookies

#### 1. User Sessions

사용자의 session을 서버에서 보관  
클라이언트가 서버에 로그인 => 서버는 사용자의 DB에 있는 id, pw가 일치하는지 확인  
=> 존재하는, 유효한 사용자라면 세션을 만든다 - 세션에는 userId, sessionId, expiration(세션이 얼마동안 유효한지)이  
=> 이 세션의 정보를 별도의 session이라는 Database에 저장한다 (DB | FileSystem | memory 일 수 있다)  
=> 클라이언트에게 세션과 관련된 정보를 (대체로) 쿠키에 넣어서 보내준다 `HTTP only`라는 옵션을 주면  
해당 쿠키는 브라우저에 의해서만 읽을 수 있다 (JS나 프로그램내에서는 볼 수 없으므로 안전)  
=> 클라이언트가 서버에 다른 요청을 할 때 이 쿠키의 정보(세션 id)를 브라우저가 자동으로 포함해 준다  
=> 클라이언트에서 보내준 session id를 통해서 세션 DB에 존재하는 session id 인지, 만료된 건 아닌지 검토한 다음  
=> 유효하다면 session id를 통해서 사용자가 누구인지 파악해서, 관련된 데이터를 클라이언트에게 보내줄 수 있다

- User Sessions 장점

  - session DB에 세션에 대한 정보를 보관하고 있으므로 신뢰할 수 있다, TRUSTED
  - 쿠키사용으로 서버에서 보내기도 쉽고 클라이언트가 별도 처리할 일 없이 브라우저에서 알아서 해결해서 간단하고 심플함, MAKE IT EASY
  - HTTP Only 옵션을 사용할 경우 안전하고 보안성이 높다
  - 사용자에 대한 정보가 아니라 session Id에 대해서 보내므로 안전성이 높다

- User Sessions 단점
  - Stateful : 서버에서 사용자에 대한 정보를 session에 보관 => 서버에 state가 있다
  - 한 서버에 세션을 보관하고 있으므로 많은 서버들이 세션의 정보를 확인하기 위해서 하나의 서버에 접속해서 네트워크 요청을 해야한다  
    => 클라이언트의 요청을 처리하기 위해서 내부적으로 여러가지 네트워크요청을 해야하므로써 시간이 걸릴 수 있다
