import { RemoveToolByIdRepository } from '../../../src/data/protocols/removeToolByIdRepository';
import { DbRemoveToolById } from '../../../src/data/useCases/dbRemoveToolById';

const fakeRemoveToolByIdRepository = (): RemoveToolByIdRepository => {
  class RemoveToolByIdRepositoryStub implements RemoveToolByIdRepository {
    async removeById(_id: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new RemoveToolByIdRepositoryStub();
};

type SutTypes = {
  sut: DbRemoveToolById;
  removeToolByIdRepositoryStub: RemoveToolByIdRepository;
};

const makeSut = (): SutTypes => {
  const removeToolByIdRepositoryStub = fakeRemoveToolByIdRepository();
  const sut = new DbRemoveToolById(removeToolByIdRepositoryStub);
  return {
    sut,
    removeToolByIdRepositoryStub,
  };
};

describe('DbRemoveToolById UseCase', () => {
  it('Should throw if DbRemoveToolById throws', async () => {
    const { sut, removeToolByIdRepositoryStub } = makeSut();
    jest.spyOn(removeToolByIdRepositoryStub, 'removeById').mockRejectedValue(new Error());
    const promise = sut.removeById('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('Should call RemoveToolByIdRepository', async () => {
    const { sut, removeToolByIdRepositoryStub } = makeSut();
    const removeSpy = jest.spyOn(removeToolByIdRepositoryStub, 'removeById');
    await sut.removeById('any_id');
    expect(removeSpy).toHaveBeenCalled();
  });
});
