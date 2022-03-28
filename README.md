# node_ERP_ioasys


## Project structure
Inside `src/`;
``app.js`` => server logic (application)
``server.js`` => allocate ports
``routes.js`` => application routes

----------------------------------------------
## Working with Sequelize
### Instaling sequelize & other libs
``yarn add sequelize pg`` (I'm using PostgreSQL)
``yarn add sequelize-cli -D``

### Sequelize init
``yarn sequelize init``
creates files `config/config.json` & `models/index.js` & the emptys folders `migrations/` and `seeders/`;

### running migrations
``yarn sequelize migration:create --name=create-users``

------------------------------------

## Libraries
### Sequelize
It is an ORM that makes it easier for us to deal with the data and tables of our Database, using `Javascript` syntax instead of `SQL`.

### pg
lib for sequelize to handle PostgreSQL Database

### sequelize-cli;
Helps to deal with the creation of migrations, which are the files that will control the version of our DB tables