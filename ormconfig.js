const dir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
const extension = process.env.NODE_ENV === 'prod' ? 'js' : 'ts';

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("PG_HOST", process.env.PG_HOST);
console.log("PG_USERNAME", process.env.PG_USERNAME);
console.log("PG_PASSWORD", process.env.PG_PASSWORD);
console.log("PG_DATABASE", process.env.PG_DATABASE);
console.log("PG_PORT", process.env.PG_PORT);
console.log("API_PORT", process.env.API_PORT);

module.exports = {
  type: 'postgres',
  host: process.env.NODE_ENV === 'prod' ? process.env.PG_HOST : 'localhost',
  port: process.env.PG_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.NODE_ENV === 'prod' ? process.env.PG_DATABASE : 'tnm_tests',
  entities: [`./${dir}/infra/orm/typeorm/entities/*.${extension}`],
  migrations: [`./${dir}/infra/orm/typeorm/migrations/*.${extension}`],
  cli: {
    migrationsDir: `./${dir}/infra/orm/typeorm/migrations`
  }
}
