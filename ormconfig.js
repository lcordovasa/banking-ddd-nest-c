module.exports = {
  type: 'mysql',
  // url: 'mysql://root:root@localhost:3306/banking-ddd-nest',
  url: 'mysql://sql10463155:xUfDjch9iN@sql10.freemysqlhosting.net:3306/sql10463155',
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  bigNumberStrings: false,
  entities: [process.env.ENVIRONMENT == 'prod' ? '**/infrastructure/persistence/typeorm/entities/*.js' : 'dist/**/infrastructure/persistence/typeorm/entities/*.js'],
  migrations: [process.env.ENVIRONMENT == 'prod' ? 'common/infrastructure/persistence/typeorm/migrations/*.js' : 'dist/common/infrastructure/persistence/typeorm/migrations/*.js'],
  cli: {
    migrationsDir: process.env.ENVIRONMENT == 'prod' ? 'common/infrastructure/persistence/typeorm/migrations' : 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};