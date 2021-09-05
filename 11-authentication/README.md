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

#### User Sessions

사용자의 session을 서버에서 보관  
클라이언트가 서버에 로그인 => 서버는 사용자의 DB에 있는 id, pw가 일치하는지 확인  
=> 존재하는, 유효한 사용자라면 세션을 만든다 - 세션에는 userId, sessionId, expiration(세션이 얼마동안 유효한지)이  
=> 이 세션의 정보를 별도의 session이라는 Database에 저장한다 (DB | FileSystem | memory 일 수 있다)  
=> 클라이언트에게 세션과 관련된 정보를 (대체로) 쿠키에 넣어서 보내준다 `HTTP only`라는 옵션을 주면  
=> 해당 쿠키는 브라우저에 의해서만 읽을 수 있다 (JS나 프로그램내에서는 볼 수 없으므로 안전)  
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

### JWT

#### Using JWT

JWT - JSON Web Token, JSON을 이용해 웹 토큰을 주고 받는 것  
JSON이라는 오브젝트 베이스 안에 `Header`, `Payload`, `signature` 3가지로 나눠져있다

- **Header** : 사용하는 알고리즘과 타입에 대해 명시
- **Payload** : 전송하고 주고받고 싶은 다양한 데이터들이 포함 - 인코딩되어서 보안처리됨
- **signature** : 인코딩한 header, payload 뿐만 아니라 이것을 인코딩하기 위해서 사용하는 서버의 비밀키 (= secret)이라는 것을 이용해서  
  함께 인코딩을 해놓음 => 서버에서만 알고있고 서버에서만 사용하는 시크릿과 함께 인코딩한다
  - 사용자가 악의적으로 payload의 정보를 바꾼다면, signature에 있는 정보를 통해서 해당내용의 변경여부를 알 수 있다

secret을 통해서 인코딩을 하므로 정보의 유효성을 확인할 수 있고 안전하다

사용자가 로그인하고 유효한 사용자라면, 사용자의 id와 원하는 정보를 함께 묶어서 JWT를 만든다 (Create JWT) - userId, claims, expiration  
=> JWT를 사용자에게 보내준다 => 추후에 일어나는 요청은 header에 JWT를 포함해서 요청함  
=> 서버에서는 클라이언트에서 받은 JWT를 유효한지, 수정되었는지, 만료되었는지.. 유효성 검사를 하고 (Verify JWT)  
=> 해당하는 데이터를 클라이언트에게 보내준다

- JWT의 장점

  - No State
  - state가 없으므로 서버간의 네트워크 요청을 통한 사용자검증이 필요없다 - secret key 만 가지고 있으면 된다

- JWT의 단점
  - { JWT } : JWT 자체가 단점이 될 수 있다
  - 만약 만료기간이 없는 JWT를 주고 받는다면 - 해커가 JWT를 가져가서 악용할 수 있다

## bcrypt

password-hashing function 패스워드 암호화 알고리즘

어떤 알고리즘을 썼는지 알고리즘에 대한 정보 `Alg` - 얼마나 많은 복잡도로 암호화 했는지 암호화에 대한 비용 `Cost` -  
더 랜덤한 것들을 이용해 원하는 길이만큼 암호를 복잡하게 하는 `Salt` - 암호화된 정보 `Hash` 로 구성되어 있다

암호를 hashing만 할 수 있고, hashing 된 결과를 다시 패스워드로 만들 수는 없다 (예\_계란 -> 오믈렛)  
암호화할 때 랜덤한 문자열을 이용해서 (Salt) 암호화를 좀 더 복잡하게 만들 수 있다

`npm view bcrypt` 치면 [깃헙링크](https://github.com/kelektiv/node.bcrypt.js#readme) 볼 수 있다
`npm i bcrypt`로 설치

```js
// 예시는 동기적인 방식인 Sync를 사용하지만 서버에서 구현할 때는 비동기적인 방식으로 하자!
const bcrypt = require('bcrypt');

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10); // 길이가 10개인 salt 설정
console.log(`password: ${password}, hashed: ${hashed}`);

const result = bcrypt.compareSync('abcd1234', hashed);
console.log(result); // true
```

salt의 복잡도가 높아질수록 해시하는데 걸리는 시간이 기하급수적으로 늘어난다  
암호계산은 CPU를 사용하는 것이므로 salt를 지나치게 길게 할 필요없다, 대부분 8, 10 ~ 12로 한다  
[- salt 길이별 성능 측정](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)
