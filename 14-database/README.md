## Database

- List
  - Database의 개념과 종류들
  - SQL | 관계형 데이터베이스와 쿼리언어
  - NoSQL | NoSQL 개념과 종류들, 탄생배경
  - ORM, ODM 은 무엇이고 왜 필요할까, 장단점
  - SQL vs NoSQL | 데이터베이스 개념과 종류들

### Database

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
