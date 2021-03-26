import { LoadToolsRepository } from '../../../src/data/protocols/loadToolsRepository';
import { DbLoadTools } from '../../../src/data/useCases/dbLoadTools';
import { ToolModel } from '../../../src/domain/models/tool';

const makeFakeTools = (): ToolModel[] => ([
  {
    id: 'any_id',
    title: 'any_title',
    link: 'any_link',
    description: 'any_description',
    tags: ['any_tag'],
  }, {
    id: 'other_id',
    title: 'other_title',
    link: 'other_link',
    description: 'other_description',
    tags: ['other_tag'],
  },
]);

const fakeLoadToolsRepository = (): LoadToolsRepository => {
  class LoadToolsRepositoryStub implements LoadToolsRepository {
    async loadAll(): Promise<ToolModel[]> {
      return new Promise((resolve) => resolve(makeFakeTools()));
    }
  }
  return new LoadToolsRepositoryStub();
};

type SutTypes = {
  sut: DbLoadTools;
  LoadToolsRepositoryStub: LoadToolsRepository;
};

const makeSut = (): SutTypes => {
  const LoadToolsRepositoryStub = fakeLoadToolsRepository();
  const sut = new DbLoadTools(LoadToolsRepositoryStub);
  return {
    sut,
    LoadToolsRepositoryStub,
  };
};

describe('DbLoadTools UseCase', () => {
  it('Should throw if DbLoadTools throws', async () => {
    const { sut, LoadToolsRepositoryStub } = makeSut();
    jest.spyOn(LoadToolsRepositoryStub, 'loadAll').mockRejectedValue(new Error());
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow();
  });

  it('Should return all tools on success', async () => {
    const { sut } = makeSut();
    const tools = await sut.loadAll();
    expect(tools).toEqual(makeFakeTools());
  });
});
