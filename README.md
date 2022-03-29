# node_ERP_ioasys

## Start
### 1. install dependencies:
``$ yarn install``

### 2. connect your database (PostgreSQL)

NOTE: you should create your `.env` file.
example; 
```
DB_HOST=127.0.0.1
DB_USER=***
DB_PASS=***
DB_NAME=***
```

### 3. run Migrations & Seeds
If you don't have sequelize globally installed globally: ``$ yarn install sequelize -g``

run migrations: ``$ yarn sequelize db:migrate``
run seeds: ``yarn sequelize-cli db:seed:all``

### 4. start server:
``$ yarn start``

### 5. Access the Api documentation
import the [Insomnia file](api_documentation/Insomnia_2022-03-28.json) to Insomnia or Postman

OBS: You can do login with the credentials (admin user): 
```
email: teste@gmail.com
password: nodeERP2803
```

-----------
### Environment Variables in Windows
https://www.edureka.co/community/77202/how-can-i-set-node-env-production-on-windows

----------

## Project structure
Inside `src/`;
``app.js`` => server logic (application)
``server.js`` => allocate ports
``routes.js`` => application routes

-----------

## Tests with Jest
https://jestjs.io/
Node.js unit tests, mocks, coverage, etc.

1. install jest
``yarn add jest -D``

2. Jest Init
``yarn jest --init``

3. configure your `jest.config.js` & create your test in __tests__/integration or ___tests__/unit
4. run your tests
``yarn test``

----------------------------------------------
## Working with Sequelize
### Instaling sequelize & other libs
``yarn add sequelize pg`` (I'm using PostgreSQL)
``yarn add sequelize-cli -D``

### Sequelize init
``yarn sequelize init``
creates files `config/config.json` & `models/index.js` & the emptys folders `migrations/` and `seeders/`;

### [Migrations & Seeds](https://medium.com/@diomalta/migrations-e-seeders-no-sequelizejs-67ba3571ed0e)
#### Create migrations
``yarn sequelize migration:create --name=create-users``

#### Create Seeds
``yarn sequelize seed:generate --name users``

### Create a Database in PostgreSQL
If you are using postgreSQL & pgAdmin;
Create a new database in PgAdmin
NOTE: you can change the username & password in `src/config/database.js` and the database name must be the same name

### running migrations
``yarn sequelize db:migrate``
create tables in the database if they don't exist & update database
after create your table you can access in pgAdmin -> Databases -> 'your_database' -> Schemas -> public -> Tables

------------------------------------

## Libraries

### [Jest](https://jestjs.io/)

Node.js unit tests, mocks, coverage, etc.

1. install jest
``yarn add jest -D``

2. Jest Init
``yarn jest --init``

---------
### Sequelize
It is an ORM that makes it easier for us to deal with the data and tables of our Database, using `Javascript` syntax instead of `SQL`.

#### pg
lib for sequelize to handle PostgreSQL Database

#### sequelize-cli;
Helps to deal with the creation of migrations, which are the files that will control the version of our DB tables