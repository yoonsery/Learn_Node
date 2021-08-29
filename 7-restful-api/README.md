# RESTful API

## REST란 ?

**API** - application programming interface으로  
어플리케이션만을 지칭하는 것 뿐만 아니라, 사용자들이 쉽게 쓸 수 있는 interface(+ 함수들)을 뜻함  
서버 입장에서의 API란, 클라이언트가 사용할 수 있는 URL

**REST** - Representational State Transfer  
Software Architectural Style  
Web Service Guidelines

Architectural Styles and Design of `Network-based` Software Architectures

### 6 Guiding constrains of RESTful System

#### 1. Client-server architecture

서버는 브라우저나 모바일 외에도 다양한 어플리케이션 형태의 클라이언트에게 데이터를 제공할 수 있는 아키텍처를 유지해야 한다

#### 2. Statelessness

state가 없는 상태를 유지해야 한다. 하나의 요청이 다른 요청과 연결되지 않는 상태로 서버가 디자인되어야 한다 - HTTP 프로토콜에서 적용

#### 3. Cacheability

캐시가 가능하다면 캐시를 할 수 있게 디자인해야한다 - HTTP 프로토콜에서 적용

#### 4. Layered System

서버의 갯수나 게이트서버의 여부와 상관없이 (= 서버의 구조와 상관없이), 서버에서 제공된 공통된 API 하나로 클라이언트가 사용할 수 있어야 함

#### 5. code on demand

optional guide line, 클라이언트가 원한다면 클라이언트에서 수행해야되는 코드를 서버에서 클라이언트에게 보내줄 수 있다

#### 6. Uniform interface

⭐️ fundamental to the design of any RESTful system

- Resource Identification in requests
  - 클라이언트 요청에서 서버에 있는 어떤 리소스(or 도메인 데이터)를 원하는지 식별할 수 있어야 한다
  - 서버에서 어떤 형태로 데이터가 저장되어 있든지간에 클라이언트가 이해할 수 있는 포맷(html | json)으로 데이터를 보내줘야 한다
- Resource manipulation through representations
  - 서버로부터 받은 state | data를 통해서 해당 리소스에 대해서 앞으로 어떻게 처리할 수 있는지에 대한 모든 정보를 알 수 있어야 한다  
    (수정이나 삭제를 원한다면 어떤식으로 요청을 해야하는지 알 수 있어야 한다)  
    ↑ 단순히 URL을 어떻게 디자인하는지를 넘어 외적인 부분을 더 포함하고 있는 걸 알 수 있다
- Self-descriptive messages
  - 서버에서 보내는 응답데이터 안에는 클라이언트가 이 데이터를 어떻게 처리해야하는지 반드시 설명이 있어야 한다 (예\_ html header에 content-type을 지정해주는 것)
- Hypermedia as the engine of application state - HATEOAS
  - hypermedia를 어플리케이션 엔진처럼 제공해야한다
  - 서버에서 url이 있다면, 클라이언트가 서버에 어떤 url이 있는지 알아야 하고, 적절한 url로 요청해야한다 잘못된 url로 요청하면 404 Not found를 받게된다
  - 클라이언트가 서버에게 특정 url에 관련된 걸 하고 싶다고 요청을 하면
  - 서버에서 해당 url로 할 수 있는 모든 액션들에 대해서 - 어떤 url을 이용해 서버에 요청할 수 있는지, 링크된 url을 응답으로 보내준다
  - 클라이언트는 서버로부터 받은 리스트를 이용해서 어떻게 서버를 이용하면 되는지 정보를 얻는다
  - hypermedia를 제공하는 서버는 사실 많지 않다
