import { RemoveToolById } from '../../../src/domain/useCases/removeToolById';
import { RemoveToolController } from '../../../src/presentation/controllers/removeToolController';
import { noContent, serverError } from '../../../src/presentation/helpers/http';

const makeRemoveToolById = (): RemoveToolById => {
  class RemoveToolByIdStub implements RemoveToolById {
    async removeById(_id: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new RemoveToolByIdStub();
};

type SutTypes = {
  RemoveToolByIdStub: RemoveToolById;
  sut: RemoveToolController;
};

const makeSut = (): SutTypes => {
  const RemoveToolByIdStub = makeRemoveToolById();
  const sut = new RemoveToolController(RemoveToolByIdStub);
  return {
    sut,
    RemoveToolByIdStub,
  };
};

describe(' RemoveToolController', () => {
  it('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ params: { id: 'any_id' } });
    expect(httpResponse).toEqual(noContent());
  });

  it('Should return 500 if RemoveToolById throws', async () => {
    const { sut, RemoveToolByIdStub } = makeSut();
    jest.spyOn(RemoveToolByIdStub, 'removeById').mockRejectedValueOnce(new Error());
    const httpResponse = await sut.handle({ params: { id: 'any_id' } });
    expect(httpResponse).toEqual(serverError());
  });
});
