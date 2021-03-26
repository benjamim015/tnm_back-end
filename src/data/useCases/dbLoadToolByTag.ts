import { ToolModel } from '../../domain/models/tool';
import { LoadToolByTag } from '../../domain/useCases/loadToolByTag';
import { LoadToolByTagRepository } from '../protocols/loadToolByTagRepository';

export class DbLoadToolByTag implements LoadToolByTag {
  constructor(
    private loadToolByTagRepository: LoadToolByTagRepository,
  ) {}

  async loadByTag(tag: string): Promise<ToolModel[]> {
    const tools = await this.loadToolByTagRepository.loadByTag(tag);
    return tools;
  }
}
