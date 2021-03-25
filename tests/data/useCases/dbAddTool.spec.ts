import { AddToolRepository } from '../../../src/data/protocols/addToolRepository';
import { DbAddTool } from '../../../src/data/useCases/dbAddTool';
import { ToolModel } from '../../../src/domain/models/tool';
import { AddToolParams } from '../../../src/domain/useCases/addTool';

const makeFakeTool = (): ToolModel => ({
  id: 'any_id',
  title: 'any_title',
  link: 'any_link',
  description: 'any_description',
  tags: ['any_tag'],
});

const makeFakeToolData = (): AddToolParams => ({
  title: 'any_title',
  link: 'any_link',
  description: 'any_description',
  tags: ['any_tag'],
});

const fakeAddToolRepository = (): AddToolRepository => {
  class AddToolRepositoryStub implements AddToolRepository {
    async add(_tool: AddToolParams): Promise<ToolModel> {
      return new Promise((resolve) => resolve(makeFakeTool()));
    }
  }
  return new AddToolRepositoryStub();
};

type SutTypes = {
  sut: DbAddTool;
  addToolRepositoryStub: AddToolRepository;
};

const makeSut = (): SutTypes => {
  const addToolRepositoryStub = fakeAddToolRepository();
  const sut = new DbAddTool(addToolRepositoryStub);
  return {
    sut,
    addToolRepositoryStub,
  };
};

describe('DbAddTool UseCase', () => {
  it('Should call AddToolRepository with correct values', async () => {
    const { sut, addToolRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addToolRepositoryStub, 'add');
    await sut.add(makeFakeToolData());
    expect(addSpy).toHaveBeenCalledWith(makeFakeToolData());
  });

  it('Should throw if DbAddTool throws', async () => {
    const { sut, addToolRepositoryStub } = makeSut();
    jest.spyOn(addToolRepositoryStub, 'add').mockRejectedValue(new Error());
    const promise = sut.add(makeFakeToolData());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an tool on success', async () => {
    const { sut } = makeSut();
    const tool = await sut.add(makeFakeToolData());
    expect(tool).toEqual(makeFakeTool());
  });
});
