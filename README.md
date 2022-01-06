## Run app
```
$ npm install
$ npm run build
$ npm run start:dev
```

## Run app

```
$ npm install
$ npm run build
$ npm run typeorm migration:generate -- -n InitialSchema
$ npm run typeorm migration:create -- -n Users
$ npm run start:dev
```

## Terminal

```
$ npm install --save typeorm @nestjs/typeorm mysql
$ npm install --save @nestjs/cqrs
$ npm install --save typescript-result
$ npm install --save moment-timezone
$ npm install --save node-sql-reader
$ nest g resource customers
```

## Environment variables

```
BANKING_DDD_NEST_MYSQL=mysql://{user}:{password}@{host}:{port}/{database}
BANKING_DDD_NEST_MYSQL=mysql://root:root@localhost:3306/banking-ddd-nest
Note: Password must be URL encoded, %25 is the url encoding of %.
```

## Fix issue with MySQL 8

Client does not support authentication protocol requested by server; consider upgrading MySQL client.
To fix it, run the following command changing the values with your credentials:

```
ALTER USER '{user}'@'{host}' IDENTIFIED WITH mysql_native_password BY '{password}'
FLUSH PRIVILEGES;
```

### Example:

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin'
FLUSH PRIVILEGES;
```