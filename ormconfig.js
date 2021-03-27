const dir = process.env.NODE_ENV === 'prod' ? 'dist' : 'src';
const extension = process.env.NODE_ENV === 'prod' ? 'js' : 'ts';

console.log("DATABASE_URL > ", process.env.DATABASE_URL);

if (process.env.DATABASE_URL) {
  module.exports = {
    type: 'postgres',
    url: 'postgres://easyevmipblpzf:c28c083388620ab4ba57380e8a89d17a7e14dfbc5ff8c73f3b1c9775751b4dd1@ec2-54-145-102-149.compute-1.amazonaws.com:5432/d3tk04ks91b85r',
    ssl: true,
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