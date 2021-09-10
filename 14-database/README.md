## Database

- List
  - [Database의 개념과 종류들](#database-의-개념과-종류)
  - [SQL | 관계형 데이터베이스와 쿼리언어](#sql--관계형-데이터베이스와-쿼리언어)
  - [NoSQL | NoSQL 개념과 종류들, 탄생배경](#nosql)
  - [ORM, ODM 은 무엇이고 왜 필요할까, 장단점](#orm--odm)
  - [SQL vs NoSQL | 데이터베이스 개념과 종류들](#sql-vs-nosql)

## Database 의 개념과 종류

컴퓨터 파일시스템에서 관련있는 데이터들끼리 모아놓는 것  
❝ A database is an `organized collection of data`, generally stored and  
accessed electronically from a computer system. ❞

**Flat-File Database** | plain file with rows of records, 일반문서나 엑셀파일도 데이터베이스라 할 수 있다

#### Database Management System (DBMS)

software package to define, create, maintain and control access to the database  
데이터베이스 관리엔진이라고도 불림, 예) ORACLE, MySQL, mongoDB...

- Flat-File Database

  - ✅ Simple data
  - 🚫 Inflexible, Inefficient, Poor performance

- DBMS
  - database 엔진 자체가 데이터를 저장, 검색, 업데이트에 최적화되어있고 복잡한 일을 엔진이 처리
  - ✅ optimised for data storage & retrieval
  - ✅ handle complex data
  - ✅ concurrent access
  - ✅ data security
  - 🚫 complex itself

#### SQL | Structured Query Language

Designed for managing data in relational databases  
RDBMS\_ Relational DBMS, `관계형` 데이터베이스 매니지먼트 시스템

#### NoSQL | SQL이 아닌 모든 데이터베이스 관리시스템

- NoSQL에는 여러종류의 데이터베이스가 있다
  - Key - Value 로 관리하는 데이터베이스
  - Document
  - Wide-column
  - Graph

## SQL | 관계형 데이터베이스와 쿼리언어

SQL Database is an organized collection of one or more `Tables` of `rows` and `columns`  
각 행마다 특정한 데이터 타입을 지정해야 한다 ( id는 number타입, title은 text타입..)  
데이터 타입뿐만 아니라 여러가지 속성을 지정할 수 도 있다, 예) id는 Not null & auto increment 하게

- `record`: each row makes up a single database
- `Data integrity`: Data integrity is the maintenance of, and the assurance of,  
   data accuracy and consistency over its entire life-cycle

`Schema`를 통해 `Data integrity`를 보장할 수 있다

DB에 중요한 역할을 하는 key 2가지가 있다

- `primary Key`: 고유한 식별자(또는 id)를 가질 수 있는 키
  - primary key 로 데이터베이스가 검색의 최적화를 해준다
- `Foreign Key`: tables can relate to each other via Foreign keys
  - 두가지의 다른 테이블의 관계를 정해준다

### Basic stricture of an SQL Query

- `SELECT` : lists a record attributes to be copied | 어떤 행을 선택할 건지
- `FROM` : lists tables (relations) to be used | 어떤 테이블에서 가지고 올 건지
- `WHERE` : corresponds to selection predicate | 조건

## NoSQL

### Why?

1. Mid 1990s: raise of Object Databased to solve "impedance mismatch" problem  
   오브젝트를 기반으로 한 프로그래밍에서 어떻게 하면 오브젝트 자체를 데이터베이스에 저장할 수 있을까 -> 오브젝트형 데이터베이스가 나옴
2. Mid 2000s: raise of the internet and Big data sparked growth of NoSQL DB adoption

#### NoSQL의 특징

1. Don't have rigid, strict schema\_`schema-less`
2. Non-relational, hence cluster-friendly
3. Address specific problems or use cases

- mongoDB | the most commonly used NoSQL DB in Web Dev, `Document DB`
  - Primary unit of data is a `document`
  - Documents organised in `collections`
  - Document structure is not enforced by DB
  - Each document is `self-contained`
  - `Data duplication` instead of relation

NoSQL 에는 schema라는 개념이 없기 때문에 데이터베이스는 어떤 정보가 정확한지 알 수 없다 (오류가 있는지 알지 못함)  
그래서 개발자가 스스로 컬렉션을 잘 관리해야한다

#### Most Popular NoSQL DB

- Wide Column: cassandra, Cloud Bigtable
- Graph: neo4j
- Key-value: Redis, DynamoDB
- Document: mongoDB

## ORM / ODM

### ORM \_ Object Relational Mapping

코드에서 작성한 오브젝트를 자동으로 DB에 schema를 만들고, 저장하고, 읽어와서 코드로 변환해준다

1. Run the code
2. Creates DB Table
3. Creates the record

- ✅ 장점
  - Business Logic에 집중해서 개발할 수 있게 도와줌
  - No Boilerplate code | 반복되는 코드사용을 줄여준다
  - Database Abstraction | 데이터베이스의 추상화로 다른 DB를 사용해도 편하게 사용가능
  - schema migration | 스키마나 코드가 변경되어도 자동으로 처리
- 🚫 단점
  - Suboptimal queries | ORM에서 제공해주는 API만으로는 상세한 쿼리를 할 수 없다
  - SQL Knowledge | SQL은 비슷해서 다른 프로그램에서 쉽게 사용이 가능한데  
    ORM은 ORM마다 서로 다른 API를 제공해서 각각 배워야한다
  - Complex Queries | ORM만으로는 복잡한 쿼리를 할 수 없다
  - ORM API의 특성상 모든 행에 있는 데이터를 다 읽어와서 코드에서 필터링을 해야하므로  
    빠른 성능, 메모리의 최적화가 조금 떨어진다

코드의 편리함을 추구한다면 ORM 사용 🙆🏻‍♀️  
프로젝트의 DB가 무겁고 성능이 중요하다면 🙅🏻‍♀️ (DB와 SQL사용을 추천)

#### Some of the Great ORMs of the JavaScript world

- TYPEORM, Sequelize, Prisma

#### ODM | Object Document Mapper

`mongoose`: elegant mongoDB object modeling for node.js

## SQL vs NoSQL

SQL vs NoSQL comparison table

|                            | SQL           | NoSQL                |
| -------------------------- | ------------- | -------------------- |
| **Getting Started**        | Medium        | Easy                 |
| **Data Structure**         | Rigid / Fixed | Undefined / Flexible |
| **Data lookup**            | Easy          | Easy                 |
| **Aggregate Queries**      | Easy          | Difficult            |
| **Slicing & Dicing Data**  | Easy          | Difficult            |
| **Scaling for High Input** | Difficult     | Easy                 |
| **Running cost**           | costly        | cheap                |

#### Scaling 확장성

- Vertical ( Up / Down ) `SQL`

  - RAM, CPU, Disk 를 확장해야 함 (서로 다른 테이블이 연관되어 있으므로)

- Horizontal ( Out / In ) `NoSQL`
  - Add more servers (데이터들이 연관이 없으므로 )

#### How to choose?

1. The type of data in question | 어떤 데이터 타입을 저장할건지
2. The amount of data | 얼마나 많은 사용자를 예상하는지, 각 사용자마다 얼마나 많은 데이터를 저장할 수 있는지
3. How data will be queried | 각각의 데이터들이 관계가 있는지, 관계가 있다면 쿼리를 할 확률이 얼마나 있는지

- **SQL**

  - Accounting Software
  - E-commerce Platforms
  - Customer Relationship Software (CRM)

- **NoSQL**

  - Social Networks | Graph
  - Distributed cache | key-value
  - Content Management Systems | Document
  - Real-time analytics, Big Data | wide-column

대표적인 예시일 뿐 항상 이렇게 둘중 하나만 선택하는건 아니다

- **Hybrid approach** | `Polyglot Persistence`
  - choose a database appropriate for particular problem \_ 같은 프로젝트라도 필요에 따라 부분적으로 다른 DB 사용가능
  - 예: User Service - MongoDB / Billing Servide - MySQL / Transcoding Service - DynamoDB
