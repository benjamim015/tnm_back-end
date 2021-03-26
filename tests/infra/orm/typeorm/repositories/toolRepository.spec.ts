import { TypeORMHelper } from '../../../../../src/infra/orm/typeorm/helper';
import { ToolTypeORMRepository } from '../../../../../src/infra/orm/typeorm/repositories/toolRepository';

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

  it('Should return an Tool on success', async () => {
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
