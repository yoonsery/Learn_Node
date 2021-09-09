## Socket

기존의 HTTP는 요청-응답으로 이뤄진 프로토콜  
만약 서버에 공지사항이 생겼더라도 클라이언트가 따로 요청하지 않으면, 서버는 클라이언트에게 보낼 수 있는 방법이 없다

#### Web Socket

클라이언트와 서버의 관계가 connection이 형성만 되면  
공지사항이 생기면 서버가 먼저 클라이언트에게 데이터를 보낼 수 있고, 필요할 때마다 데이터를 보낼 수 있다  
클라이언트도 서버에게 데이터를 실시간으로 주고 받을 수 있다

node의 express 라이브러를 사용한 것 처럼 socket도 `socket.io` 라이브러리 사용해보자~
서버 -> `npm i socket.io`  
클라이언트 => `npm i socket.io-client` 설치

server `app.js`에서

```js
import { Server } from 'socket.io';

const server = app.listen(config.host.port); // app.listen을 변수에 할당하고
const socketIO = new Server(server, {
  // socket.id에서 제공하는 Server에 전달한다
  cors: {
    // cors policy 오류때문에 일단 * 모든것을 허용하는 옵션을 전달한다
    origin: '*',
  },
});

socketIO.on('connection', (socket) => {
  console.log('Client is here!');
  socketIO.emit('dwitter', 'Hello 👋🏻');
  // 해당하는 주제, 메시지 전달 | 채팅방 별로 그룹지을 경우 채팅방의 이름 or 해당하는 토픽이 될 수 있다
  // ✍🏻 서버에서 dwitter 라고 설정하고 클라이언트에서 dwitter
});
```

client `index.js`에서

```js
import socket from 'socket.io-client';

const socketIO = socket(baseURL);
socketIO.on('connect_error', (error) => {
  console.log('socket error', error);
});
socketIO.on('dwitter', (message) => console.log(message));
// ✍🏻 서버에서 'dwitter'라고 설정한 값을 클라이언트에서 들을 수 있다
```

`setInterval`을 이용해 1초마다 들을 수도 있다

```js
// server
import { Server } from 'socket.io';

const server = app.listen(config.host.port);
const socketIO = new Server(server, {
  cors: {
    origin: '*',
  },
});

socketIO.on('connection', (socket) => {
  console.log('Client is here!');
});

setInterval(() => {
  socketIO.emit('dwitter', 'Hello 👋🏻');
}, 1000);
```

#### dwitter에서 적용하기

[server] connection 폴더 만들고 Socket class를 만든다 [👀](https://github.com/yoonsery/twitter-clone-coding-server/blob/main/connection/socket.js), [👀](https://github.com/yoonsery/twitter-clone-coding-server/commit/b49349c4179ad124c76f3631c6255ccf3a1c1846)  
[client] network에 `socket.js`파일을 만들고, TweetService class에 socket 추가 [👀](https://github.com/yoonsery/twitter-clone-coding-client/commit/e5f52fc2c5315062f8cb224d35ad9ac8f443e3ce)

간혹 socket 사용시 token을 `auth`가 아니라 `query`를 사용하는 사람이 있는데 (참고: client/network/socket.js)  
query를 사용하면 브라우저에서 token이 보이고 로그에도 남을 수 있다  
-> 강화된 보안을 위해 클라이언트에서 - `auth`, 서버에서 - `socket.handshake.auth.token`을 사용해야한다
