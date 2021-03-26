import request from 'supertest';
import { TypeORMHelper } from '../../../src/infra/orm/typeorm/helper';
import app from '../../../src/main/config/app';

describe('CarShop Routes', () => {
  beforeAll(async () => {
    await TypeORMHelper.instance.connect();
  });

  beforeEach(async () => {
    await TypeORMHelper.instance.deleteFrom('tools');
  });

  afterAll(async () => {
    await TypeORMHelper.instance.disconnect();
  });

  describe('POST /tools', () => {
    it('should return an tool on success', async () => {
      await request(app).post('/api/tools').send({
        title: 'any_title',
        link: 'any_link',
        description: 'any_description',
        tags: ['any_tag'],
      }).expect(201);
    });
  });

  describe('GET /tools', () => {
    it('should return all tools on success', async () => {
      await request(app).get('/api/tools').expect(200);
    });
  });
});
