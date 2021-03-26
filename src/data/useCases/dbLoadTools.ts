import { ToolModel } from '../../domain/models/tool';
import { LoadTools } from '../../domain/useCases/loadTools';
import { LoadToolsRepository } from '../protocols/loadToolsRepository';

export class DbLoadTools implements LoadTools {
  constructor(
    private loadToolsRepository: LoadToolsRepository,
  ) {}

  async loadAll(): Promise<ToolModel[]> {
    const tools = await this.loadToolsRepository.loadAll();
    return tools;
  }
}
