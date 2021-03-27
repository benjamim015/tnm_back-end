import { ToolModel } from '../../../src/domain/models/tool';
import { LoadTools } from '../../../src/domain/useCases/loadTools';
import { LoadToolByTag } from '../../../src/domain/useCases/loadToolByTag';
import { LoadToolsController } from '../../../src/presentation/controllers/loadToolsController';
import { ok, serverError } from '../../../src/presentation/helpers/http';

const makeFakeTools = (): ToolModel[] => ([
  {
    id: 'any_id',
    title: 'any_title',
    link: 'any_link',
    description: 'any_description',
    tags: ['any_tag'],
  },
  {
    id: 'other_id',
    title: 'other_title',
    link: 'other_link',
    description: 'other_description',
    tags: ['other_tag'],
  },
]);

const makeLoadTools = (): LoadTools => {
  class LoadToolsStub implements LoadTools {
    async loadAll(): Promise<ToolModel[]> {
      return new Promise((resolve) => resolve(makeFakeTools()));
    }
  }
  return new LoadToolsStub();
};

const makeLoadToolsByTag = (): LoadToolByTag => {
  class LoadToolByTagStub implements LoadToolByTag {
    async loadByTag(_tag: string): Promise<ToolModel[]> {
      return new Promise((resolve) => resolve(makeFakeTools()));
    }
  }
  return new LoadToolByTagStub();
};

type SutTypes = {
  loadToolByTagStub: LoadToolByTag;
  loadToolsStub: LoadTools;
  sut: LoadToolsController;
};

const makeSut = (): SutTypes => {
  const loadToolsStub = makeLoadTools();
  const loadToolByTagStub = makeLoadToolsByTag();
  const sut = new LoadToolsController(loadToolsStub, loadToolByTagStub);
  return {
    sut,
    loadToolsStub,
    loadToolByTagStub,
  };
};

describe('LoadToolsController', () => {
  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(makeFakeTools()));
  });

  it('Should return 200 if an tag is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ query: { tag: 'any_tag' } });
    expect(httpResponse).toEqual(ok(makeFakeTools()));
  });

  it('Should return 500 if LoadTools throws', async () => {
    const { sut, loadToolsStub } = makeSut();
    jest.spyOn(loadToolsStub, 'loadAll').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError());
  });
});
