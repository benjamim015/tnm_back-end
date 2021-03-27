import 'dotenv/config';
import 'reflect-metadata';

import { TypeORMHelper } from '../infra/orm/typeorm/helper';

TypeORMHelper.instance
  .connect()
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(process.env.API_PORT, () => console.log(`Server running at http://localhost:${process.env.API_PORT}`));
  })
  .catch(console.error);
