import { ToolModel } from '../../../src/domain/models/tool';
import { AddTool, AddToolParams } from '../../../src/domain/useCases/addTool';
import { AddToolController } from '../../../src/presentation/controllers/addToolController';
import { MissingParamError } from '../../../src/presentation/errors';
import { badRequest, created, serverError } from '../../../src/presentation/helpers/http';
import { HttpRequest } from '../../../src/presentation/protocols';

const makeFakeTool = (): ToolModel => ({
  id: 'any_id',
  title: 'any_title',
  link: 'any_link',
  description: 'any_description',
  tags: ['any_tag'],
});

const makeFakeRequest = (): HttpRequest => ({
  body: {
    title: 'any_title',
    link: 'any_link',
    description: 'any_description',
    tags: ['any_tag'],
  },
});

const makeAddTool = (): AddTool => {
  class AddToolStub implements AddTool {
    async add(_tool: AddToolParams): Promise<ToolModel> {
      return new Promise((resolve) => resolve(makeFakeTool()));
    }
  }
  return new AddToolStub();
};

type SutTypes = {
  addToolStub: AddTool;
  sut: AddToolController;
};

const makeSut = (): SutTypes => {
  const addToolStub = makeAddTool();
  const sut = new AddToolController(addToolStub);
  return {
    sut,
    addToolStub,
  };
};

describe('AddToolController', () => {
  it('Should return 400 if an required field is not provided', async () => {
    const { sut } = makeSut();
    const requiredFields = ['title', 'link', 'description', 'tags'];
    for (const field of requiredFields) {
      const httpRequest = makeFakeRequest();
      delete httpRequest.body[field];
      const httpResponse = await sut.handle(httpRequest);
      expect(httpResponse).toEqual(badRequest(new MissingParamError(field)));
    }
  });

  it('Should call AddTool with correct values', async () => {
    const { sut, addToolStub } = makeSut();
    const addSpy = jest.spyOn(addToolStub, 'add');
    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenCalledWith({ ...makeFakeRequest().body });
  });

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(created(makeFakeTool()));
  });

  it('Should return 500 if AddTool throws', async () => {
    const { sut, addToolStub } = makeSut();
    jest.spyOn(addToolStub, 'add').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError());
  });
});
