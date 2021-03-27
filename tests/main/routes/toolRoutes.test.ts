import request from 'supertest';
import { Tool } from '../../../src/infra/orm/typeorm/entities/tool';
import { TypeORMHelper } from '../../../src/infra/orm/typeorm/helper';
import app from '../../../src/main/config/app';

const makeFakeTools = async () => {
  const toolRepository = TypeORMHelper.instance.getRepository(Tool);
  const tool1 = toolRepository.create({
    id: 'any_id',
    title: 'any_title',
    link: 'any_link',
    description: 'any_description',
    tags: ['any_tag'],
  });
  await toolRepository.save(tool1);
  const tool2 = toolRepository.create({
    id: 'other_id',
    title: 'other_title',
    link: 'other_link',
    description: 'other_description',
    tags: ['other_tag'],
  });
  await toolRepository.save(tool2);
};

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
    it('Should return an tool on success', async () => {
      await request(app).post('/api/tools').send({
        title: 'any_title',
        link: 'any_link',
        description: 'any_description',
        tags: ['any_tag'],
      }).expect(201);
    });
  });

  describe('GET /tools', () => {
    it('Should return all tools on success', async () => {
      await makeFakeTools();
      const httpResponse = await request(app).get('/api/tools');
      expect(httpResponse.status).toEqual(200);
      expect(httpResponse.body).toHaveLength(2);
    });
  });

  describe('GET /tools?tag=any', () => {
    it('Should return all tools that have the provided tag on success', async () => {
      await makeFakeTools();
      const httpResponse = await request(app).get('/api/tools?tag=any_tag');
      expect(httpResponse.status).toEqual(200);
      expect(httpResponse.body).toHaveLength(1);
      expect(httpResponse.body[0].tags[0]).toEqual('any_tag');
    });
  });

  describe('DELETE /tools/:id', () => {
    it('Should remove a tool on success', async () => {
      await makeFakeTools();
      const httpResponse = await request(app).delete('/api/tools/any_id');
      const tools = await TypeORMHelper.instance.getRepository(Tool).find();
      expect(tools).toHaveLength(1);
      expect(httpResponse.status).toEqual(204);
    });
  });
});
