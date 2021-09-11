## MySQL

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

#### node 서버에서 연결하기

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
