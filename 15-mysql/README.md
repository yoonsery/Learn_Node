## MySQL [👀](https://dev.mysql.com/doc/refman/8.0/en/)

Community Downloads > MySQL Community Server, MySQL Workbench 다운로드

### schema 정의하기

왼쪽 schemas탭에서 오른쪽 클릭 create schema -> schema name은 프로젝트의 이름으로 설정 -> apply클릭  
왼쪽에 프로젝트명을 따온 스키마 ▶️ 클릭하면 Tables, Views...등 메뉴가 나온다 -> tables에서 우클릭

Column | Datatype 에서

- `PK` : primary key | DB에서 주요키인지
- `NN` : not null | 옵셔널이 아니라 항상 값이 있어야 하는지
- `UQ` : unique | 모든 레코드에서 고유한 값인지
- `BIN` : binary type 인지
- `UN` : unsigned | 마이너스가 아닌 정수인지
- `ZF` : zero fill | 0으로 채울건지
- `AI` : auto increment | 자동으로 증가할 건지
- `G` : generated | 자동으로 만들것인지

#### 첫번째 테이블 만들기 | users

화면 윗부분에 Name: users 라고 작성하고  
Column - `id` , Datatype - INT, pk, nn, uq, al을 만들고  
Column - `username` , Datatype - varchar(45), nn, uq 만들고  
Column - `password` , Datatype - varchar(128), nn 만들고  
Column - `name` , Datatype - varchar(128), nn 만들고  
Column - `email` , Datatype - varchar(128), nn 만들고  
Column - `url` , Datatype - TEXT 만든다

📌 varchar: 글자수

다 지정했으면 apply클릭 하면 아래 화면처럼 창이 뜬다

```
CREATE TABLE `dwitter`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `url` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

```

#### 두번째 테이블 tweets

Name: tweets  
Column - `id` , Datatype - INT, pk, nn, uq, ai  
Column - `text` , Datatype - TEXT, nn  
Column - `createdAt` , Datatype - DATETIME, nn  
Column - `userId` , Datatype - INT, nn (왜 uq가 아니냐면 유저가 여러개의 트윗을 작성했을 수도 있으므로 & 왜 INT냐면 첫번째 테이블에서 id가 INT였으므로)

#### 테이블 연결하기

tweets 테이블에서 아래쪽에 Foreign Keys 탭이 있다  
왼쪽창에서 Foreign Key - `id`, Referenced Table - `dwitter.users` 를 선택하고  
오른쪽 창 Foreign key details 'id' 에서 Column `userId`를 체크 (연결할 값을 체크) 하고 apply
그럼 아래처럼 연결되었다고 뜬다

```
ALTER TABLE `dwitter`.`tweets`
ADD INDEX `id_idx` (`userId` ASC) VISIBLE;
;
ALTER TABLE `dwitter`.`tweets`
ADD CONSTRAINT `id`
  FOREIGN KEY (`userId`)
  REFERENCES `dwitter`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```

3번째 창에서 Foreign Key가 가리키고 있는 userId(사용자)가 삭제된다면 관련된 트윗을 어떻게 할건지 선택할 수 있다  
드위터에선 RESTRICT로 아무것도 하지 않는 걸로 선택할거얌

맨 왼쪽 schemas에서 table의 ▶️ 을 선택하면 tweets, users가 만들어진 것을 확인할 수 있다  
🔧 모양을 클릭하면 데이터타입을 변경할 수 있다 (apply 잊지마~)  
테이블 모양을 클릭하면 실제 데이터를 볼 수 있고 `SELECT * FROM dwitter.tweets;`이 적힌 창에서 SQL을 써서 직접 query도 연습해볼 수 있다

### node 서버에서 연결하기

`npm i mysql2` 설치 후 db라는 폴더를 만든 후 > `database.js` 만든다

```js
// database.js

import mysql from 'mysql2';
import { config } from '../config.js';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
});

export const db = pool.promise();
```

`config.js`와, `.env`에서 관련된 값을 작성하고

```js
// config.js

export const config = {
  db: {
    host: required('DB_HOST'), //          localhost
    user: required('DB_USER'), //          root
    database: required('DB_DATABASE'), //  dwitter
    password: required('DB_PASSWORD'), //  🙊
  },
};
```

`app.js`에서 db를 불러와서 `getConnection()`으로 불러온다

```js
// app.js

import { db } from './db/database.js';
db.getConnection().then(console.log); // PromisePoolConnection 의 관련된 내용들이 콘솔에 나온다
```

### 서버 data > `auth.js` 에서 MySQL 사용하기

1. createUser에 MySQL 적용하기

```js
import { db } from '../db/database.js';

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return db
    .execute(
      'INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)',
      // 앞에 명시한 params의 갯수만큼 ?를 입력한다
      // database에서 자동으로 증가하는 id를 만드므로 따로 id 명시 안함
      [username, password, name, email, url]
    )
    .then((result) => {
      console.log(result);
      return result;
    });
}
```

npm start 후 포스트맨에서 signup을 해보면 console.log(result); 의 결과가 아래와 같이 출력된다

```shell
  ResultSetHeader {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 6,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
```

.then()에 콘솔로그 대신 아래처럼 코드를 넣어준다

```js
.then((result) => result[0].insertId);
```

MySQL Workbench에 가서 users 테이블을 확인하면 user가 추가되어 있는 것을 볼 수 있다

2. findByUsername 에 MySQL 적용하기

```js
export async function findByUsername(username) {
  return db
    .execute('SELECT * FROM users WHERE username=?', [username])
    .then((result) => result[0][0]); // 로그로 result값을 확인해보면 이중배열의 첫번째 값을 가져와야함
}
```

3. findById 에 MySQL 적용하기

```js
export async function findById(id) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id])
    .then((result) => result[0][0]);
}
```

데이터베이스를 이용하도록 수정하는데 data > auth.js 파일 하나만 수정하면 되었다!

### 서버 data > `tweet.js` 에서 MySQL 사용하기 | join query

```js
export async function getAll() {
  return db
    .execute(
      'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id ORDER BY tw.createdAt DESC'
    )
    .then((result) => result[0]);

  // 'SELECT / FROM - JOIN / ON / ORDER BY DESC'
  // =>  createdAt을 기준으로 역순으로 정렬

  // MySQL사용 전 코드 ↓
  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, url } = await userRepository.findById(
  //       tweet.userId
  //     );
  //     return { ...tweet, username, name, url };
  //   })
  // );
}
```

반복해서 사용되는 값을 변수로 할당해서 쓰면 간편!

```js
import { db } from '../db/database.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id ';

const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_DESC}`) //
    .then((result) => result[0]);
}

export async function getAllByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=?`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function update(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
    .then(() => getById(id));
}

export async function remove(id) {
  return db.execute('DELETE FROM tweets WHERE id=?', [id]);
}
```

테이블을 묶을 때 `FROM - JOIN` 사용, `ON`을 이용해 어떤 것이 똑같을 때 묶을건지 정해줬다  
function getById(id)에서 `WHERE tw.id=?`과 function getAllByUsername(username)에서 `WHERE username=?`처럼  
테이블 이름을 명시하는 것은 생략이 가능하고, 두개의 테이블에 동일한 이름이 있을때 충돌을 피하기 위해 테이블명을 명시해준다

오타같은 실수가 있으면 컴파일 때 문제가 발생하는게 아니라 실시간으로 문제가 발생한다 -> 이것을 피할 수 있게 도와주는게 ORM
