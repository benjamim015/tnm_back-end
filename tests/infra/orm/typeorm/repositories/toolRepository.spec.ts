import { Tool } from '../../../../../src/infra/orm/typeorm/entities/tool';
import { TypeORMHelper } from '../../../../../src/infra/orm/typeorm/helper';
import { ToolTypeORMRepository } from '../../../../../src/infra/orm/typeorm/repositories/toolRepository';

const makeFakeTools = async () => {
  const toolRepository = TypeORMHelper.instance.getRepository(Tool);
  const tool1 = toolRepository.create({
    title: 'any_title', link: 'any_link', description: 'any_description', tags: ['any_tag'],
  });
  await toolRepository.save(tool1);
  const tool2 = toolRepository.create({
    title: 'other_title', link: 'other_link', description: 'other_description', tags: ['other_tag'],
  });
  await toolRepository.save(tool2);
};

type SutTypes = {
  sut: ToolTypeORMRepository;
};

const makeSut = (): SutTypes => {
  const sut = new ToolTypeORMRepository();
  return {
    sut,
  };
};

describe('Tool TypeORM Repository', () => {
  beforeAll(async () => {
    await TypeORMHelper.instance.connect();
  });

  beforeEach(async () => {
    await TypeORMHelper.instance.deleteFrom('tools');
  });

  afterAll(async () => {
    await TypeORMHelper.instance.disconnect();
  });

  describe('add()', () => {
    it('Should return an tool on success', async () => {
      const { sut } = makeSut();
      const tool = await sut.add({
        title: 'any_title',
        link: 'any_link',
        description: 'any_description',
        tags: ['any_tag'],
      });
      expect(tool).toBeTruthy();
      expect(tool).toHaveProperty('id');
      expect(tool).toHaveProperty('title', 'any_title');
      expect(tool).toHaveProperty('link', 'any_link');
      expect(tool).toHaveProperty('description', 'any_description');
      expect(tool).toHaveProperty('tags', ['any_tag']);
      expect(tool).toHaveProperty('created_at');
      expect(tool).toHaveProperty('updated_at');
    });
  });

  describe('loadAll()', () => {
    it('Should return all tools on success', async () => {
      await makeFakeTools();
      const { sut } = makeSut();
      const tools = await sut.loadAll();
      expect(tools).toBeTruthy();
      expect(tools).toHaveLength(2);
      expect(tools[0]).toHaveProperty('title', 'any_title');
      expect(tools[1]).toHaveProperty('title', 'other_title');
    });
  });
});
