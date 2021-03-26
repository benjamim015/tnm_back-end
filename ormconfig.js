const dir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
const extension = process.env.NODE_ENV === 'prod' ? 'js' : 'ts';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'tools',
  entities: [`./${dir}/infra/orm/typeorm/entities/*.${extension}`],
  migrations: [`./${dir}/infra/orm/typeorm/migrations/*.${extension}`],
  cli: {
    migrationsDir: `./${dir}/infra/orm/typeorm/migrations`
  }
}
