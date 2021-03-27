import { RemoveToolById } from '../../domain/useCases/removeToolById';
import { RemoveToolByIdRepository } from '../protocols/removeToolByIdRepository';

export class DbRemoveToolById implements RemoveToolById {
  constructor(
    private removeToolByIdRepository: RemoveToolByIdRepository,
  ) {}

  async removeById(id: string): Promise<void> {
    await this.removeToolByIdRepository.removeById(id);
  }
}
