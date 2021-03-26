import { LoadToolByTagRepository } from '../../../src/data/protocols/loadToolByTagRepository';
import { DbLoadToolByTag } from '../../../src/data/useCases/dbLoadToolByTag';
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
    tags: ['any_tag', 'other_tag'],
  },
]);

const fakeLoadToolByTagRepository = (): LoadToolByTagRepository => {
  class LoadToolByTagRepositoryStub implements LoadToolByTagRepository {
    async loadByTag(_tag: string): Promise<ToolModel[]> {
      return new Promise((resolve) => resolve(makeFakeTools()));
    }
  }
  return new LoadToolByTagRepositoryStub();
};

type SutTypes = {
  sut: DbLoadToolByTag;
  LoadToolByTagRepositoryStub: LoadToolByTagRepository;
};

const makeSut = (): SutTypes => {
  const LoadToolByTagRepositoryStub = fakeLoadToolByTagRepository();
  const sut = new DbLoadToolByTag(LoadToolByTagRepositoryStub);
  return {
    sut,
    LoadToolByTagRepositoryStub,
  };
};

describe('DbLoadToolByTag UseCase', () => {
  it('Should call LoadToolByTagRepository with correct value', async () => {
    const { sut, LoadToolByTagRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(LoadToolByTagRepositoryStub, 'loadByTag');
    await sut.loadByTag('any_tag');
    expect(addSpy).toHaveBeenCalledWith('any_tag');
  });

  it('Should throw if DbLoadToolByTag throws', async () => {
    const { sut, LoadToolByTagRepositoryStub } = makeSut();
    jest.spyOn(LoadToolByTagRepositoryStub, 'loadByTag').mockRejectedValue(new Error());
    const promise = sut.loadByTag('any_tag');
    await expect(promise).rejects.toThrow();
  });

  it('Should return all tools that contain the tag on success', async () => {
    const { sut } = makeSut();
    const tools = await sut.loadByTag('any_tag');
    expect(tools).toEqual(makeFakeTools());
  });
});
