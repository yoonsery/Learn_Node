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
