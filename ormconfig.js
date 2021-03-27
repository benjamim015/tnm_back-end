const dir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
const extension = process.env.NODE_ENV === 'prod' ? 'js' : 'ts';

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
