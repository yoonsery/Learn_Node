## Sequelize [👀](https://sequelize.org/master/)

Sequelize is a promise-based Node.js ORM for Postgres, MySQL...  
It features solid transaction support, relations, eager and lazy loading, read replication and more

`npm i sequelize` 로 설치

ORM은 작성한 class 모델을 베이스로 해서 자동으로 database에 필요한 테이블을 생성해준다  
SQL query language에 대해서 몰라도 되기때문에 더욱 간편하다

워크벤치에서 MySQL 때 작성한 tweets, users 테이블을 우클릭, drop table을 선택해서 지워준다

```js
// db > database.js에서

import mysql from 'mysql2';
import { config } from '../config.js';
import SQ from 'sequelize';

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});
```

```js
// app.js에서
import { sequelize } from './db/database.js';

sequelize.sync().then((client) => {
  console.log(client);
  const server = app.listen(config.host.port);
  initSocket(server);
});
```
