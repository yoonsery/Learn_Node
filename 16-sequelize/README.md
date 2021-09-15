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

### Sequelize auth.js에 적용하기

```js
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
);
```

실행하면 아래의 값이 콘솔에 출력된다

```shell
Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(45) NOT NULL, `password` VARCHAR(128) NOT NULL, `name` VARCHAR(128) NOT NULL, `email` VARCHAR(128) NOT NULL, `url` TEXT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
Executing (default): SHOW INDEX FROM `users`
```

워크벤치에서 테이블 우클릭 refresh all을 클릭하면 users 테이블이 만들어진 걸 확인할 수 있다  
내가 설정하지 않은 createdAt, updatedAt도 만들어져있는데 이러한 time stamp가 필요없다면  
2번째 인자로 옵션 `{ timestamps: false }`을 주면 된다  
workbench에서 테이블을 drop후 다시 refresh해서 확인해보면 timestamps 는 테이블에 포함되지 않은걸 확인할 수 있다

sequelize.define()으로 User를 받아온 코드로 작성을 해보면 ↓

```js
// auth.js

export async function findByUsername(username) {
  return User.findOne({ where: { username } });
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
  // return User.create(user).then((data) => {
  //   console.log(data);  // 데이터를 출력해보면 필요한 값인 id 가 data.dataValues.id 인 것 알 수 있다
  //   return data;
  // });
}
```

### Sequelize tweet.js에 적용하기

auth.js에서 User를 export 해주고

```js
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Tweet.belongsTo(User);
```

workbench 에서 refresh하면 tweets 테이블이 만들어진 거 확인할 수 있다  
createdAt, Foreign keys가 만들어진 것도 확인할 수 있다

```js

```
