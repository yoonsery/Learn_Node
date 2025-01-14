## HTTP

- ~~Hypertext~~ Hypermedia Transfer Protocol
- request ⇄ response protocol

  - 브라우저 클라이언트가 특정한 url에 접속하면, 서버는 해당하는 url에 맞는 html 문서를 보내준다
  - 클라이언트가 특정한 url을 이용해 json을 요구하면, 서버는 그에 맞는 json이라는 데이터 타입을 클라이언트에게 보내준다

### HTTPS

Hypermedia Transfer Protocol **Secure**

- TLS \_Transport Layer Security
- SSL \_Secure Sockets Layer

암호화된 안전한 방식으로 데이터를 주고 받는다  
`서로 보안 관계가 형성된` 클라이언트와 서버끼리 데이터를 안전하게 주고 받으면서 데이터를 해독해서 볼 수 있다  
보안 관계가 형성되지 않은 제 3자는 볼 수 없다

## HTTP의 역사와 V2, V3

- HTTP v1 (HTTP | HTTPS) : text-based, uncompressed headers, one file at a time, `inefficient`
- HTTP v2 (HTTPS) : binary based protocol, header compression, multiplexing, stream prioritization, `efficient` / `secure`
- HTTP v3 (HTTPS) : 기존의 `TCP` (Transmission Control Protocol) 에서 `UDP` (User Datagram Protocol)로

## HTTPS 통신 과정

- client - server 통신을 할 때 HTTP를 사용하면,
- TCP connection이 생긴다 서로 커넥션을 연결한 다음에
- 클라이언트가 서버에게 `request`를 요청한다
  - 어떤 행동을 하길 원하는지 - `request method`
  - 서버에서 어떤 문서에, 어떤 경로에 있는 데이터를 받기를 원하는지 - `URL`
  - header를 포함해서 다양한 정보들을 요청
- 서버는 클라이언트에서 받은 요청에 해당하는 내용을 `response`로 클라이언트에게 보내준다
  - 성공 | 실패 여부를 나타내는 status 코드를 함께 묶어서 보낸다
  - HTTP v2에서는 HTML뿐만아니라 관련된 여러가지 파일들(css, js...)을 동시에 보낼 수 있다
- 서버에서 응답을 보내고 더이상 보낼 데이터가 없다면, TCP connection이 닫혀서 종료가 된다

### [Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

처리된 결과의 정보를 내포하고 있다

- **`1xx` : informational**
  - `100` : continue
  - `102` : processing
- **`2xx` : successful**
  - `200` : OK
  - `201` : created
  - `204` : no content
- **`3xx` : redirection**
  - `301` : moved permanently
  - `302` : found
  - `303` : see other (get 요청에서만 응답)
  - `307` : temporary redirect (same methods)
  - `308` : permanent redirect (same methods)
- **`4xx` : client error**
  - `400` : bad request
  - `401` : unauthorized
  - `403` : forbidden (admin)
  - `404` : not found
  - `405` : method not allowed
  - `409` : conflict
- **`5xx` : server error**
  - `500` : internal server error
  - `502` : bad gateway
  - `503` : service unavailable

## Request Method

#### URL : Uniform Resource Locator

서버에 요청할 때 어떤 리소스를 원하는지, URL을 사용해서 특정한 리소스의 경로에 대해서 나타내야 한다  
리소스가 어디에 있는지 고유한 값을 나타내는 주소 같은 것  
URL은 다양한 프로토콜에서 사용할 수 있다

- `https` : protocol (어떤 프로토콜인지)
- `www.server.com` : hostname (어떤 서버에 접속하는지 명시)
- `:443 port` : 주로 생략, 그 서버에 있는 어떤 어플리케이션에, 어떤 포트에 접속 할건지
- `/index.html` : path 어떤 경로에 접속할 건지

예) `https://www.server.com/courses/backend/search?q=coding` 이라면,  
protocol + hostname + pathname + query (`?q=coding`이 해당)

`URL`은 클라이언트가 서버 특정한 위치에 있는 리소스에 접근하기 위해서, `서버에 있는 무엇을 원하는지`를 나타낸다  
이 때 함께 사용하는 `Request Methods`는 그 리소스를 이용해서, `어떤 액션을 원하는지` 명시한다

#### [Request Methods의 종류](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

- **GET** : get
- **POST** : create
- **PUT** : replace (idempotent: yes)
- **DELETE** : delete
- **PATCH** : replace partially (idempotent: no)
- **HEAD** : get without body
- **OPTIONS** : all supported methods for URL
- **TRACE** : echoes the received request

`POST` : 201 (created), 401,3,4,9 로 응답할 수 있다 항상 200일 필요 없다, 상황에 맞게 적절한 status code를 보내면 된다  
`PUT | DELETE | PATCH` : 200, 204(no content), 403,4,5  
`HEAD | OPTIONS | TRACE` : 200, 401,3,4,5

- 서버에 있는 리소스를 읽기만 하는 요청 (서버에 있는 데이터를 변경하지 않음) : **GET | HEAD | OPTIONS | TRACE**
- 서버에 있는 데이터를 변경하는 요청 : **POST | PUT | DELETE | PATCH**

각 메소드마다 `safe`, `idempotent`, `cacheable` 을 눈여겨 보기  
`Idempotent` : 동일한 요청을 여러번 했을 때 (몇 번 했냐에 상관없이) 항상 서버를 동일한 상태로 유지할 수 있는지를 나타냄  
멱등성\_ 동일한 요청을 한 번 보내는 것과 여러 번 연속으로 보내는 것이 같은 효과를 지니고, 서버의 상태도 동일하게 남을 때 해당 HTTP가 멱등성을 가졌다고 한다

## HTTP Headers

#### HTTP의 특징

- **Stateless Protocol** : 각각의 요청은 서로 연관이 없다
- **Sessions & Cookies** : 쿠키-브라우저에서 보관하고 있는 저장소
  - 서버에서 보내주는 header에 auth token이 포함된 쿠키가 들어 있으면, 브라우저가 자동으로 쿠키에 저장한다 (로그인을 위해 클라이언트가 따로 해야할 일은 없음)
  - 다음 리퀘스트를 요청할 때 header에 똑같은 쿠키를 넣어서 서버에게 보냄
  - 이 외에도 서버에서 클라이언트에 정보를 줄 때, header에 cache-control을 명시할 수도 있다 - 브라우저가 데이트를 저장소에 저장해둠
  - 클라이언트가 동일한 요청을 하면 서버에 또다시 요청하지 않고 저장된 데이터를 재활용한다
  - `UA`\_User-Agent: 요청하는 클라이언트가 누구인지 알고 싶을 때 사용 (browser, os에 대한 정보가 들어있다)

#### [Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

- `Standard` : 표준화가 된 `Authorization` 사용
- `Custom` : `domain-key`, `domain.key`형태로 사용

### Standard Headers

정해진 표준안에 따라서 브라우저가 구현되었기 때문에, 브라우저가 우리가 원하는 대로 동작하길 원한다면 표준안을 따라야한다

#### Request Context

`User-Agent`: Mozilla/5.0 (\<system-information\>) \<platform\> (\<platform-details\>) \<extensions\>

#### Authorization

#### Message body information

- `Content-Length` : 컨텐츠의 사이즈 정보 bytes
- `Content-Type` : text/html | application/json
  - `Content-Language` : en

#### Caching

`Cache-Control` : 얼마나 오랫동안 이 데이터를 캐시(저장)해야하는지 명시

---

개발자 툴 - network - `⌘ + shift + r` 해서 강제 리프레시 - Header 탭에서 확인
