const dir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
const extension = process.env.NODE_ENV === 'prod' ? 'js' : 'ts';

console.log("DATABASE_URL > ", process.env.DATABASE_URL);

if (process.env.DATABASE_URL) {
  module.exports = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    entities: [`./${dir}/infra/orm/typeorm/entities/*.${extension}`],
    migrations: [`./${dir}/infra/orm/typeorm/migrations/*.${extension}`],
    cli: {
      migrationsDir: `./${dir}/infra/orm/typeorm/migrations`
    }
  }
} else {
  module.exports = {
    type: 'postgres',
    host: process.env.NODE_ENV === 'prod' ? 'postgres' : 'localhost',
    port: process.env.PG_PORT,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.NODE_ENV === 'prod' ? 'tnm' : 'tnm_tests',
    entities: [`./${dir}/infra/orm/typeorm/entities/*.${extension}`],
    migrations: [`./${dir}/infra/orm/typeorm/migrations/*.${extension}`],
    cli: {
      migrationsDir: `./${dir}/infra/orm/typeorm/migrations`
    }
  }  
}