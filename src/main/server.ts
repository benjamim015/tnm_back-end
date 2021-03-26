import 'reflect-metadata';

import { TypeORMHelper } from '../infra/orm/typeorm/helper';

TypeORMHelper.instance
  .connect()
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(3000, () => console.log(`Server running at http://localhost:${process.env.PORT}`));
  })
  .catch(console.error);
