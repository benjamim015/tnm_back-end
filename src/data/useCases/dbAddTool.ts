import { ToolModel } from '../../domain/models/tool';
import { AddTool, AddToolParams } from '../../domain/useCases/addTool';
import { AddToolRepository } from '../protocols/addToolRepository';

export class DbAddTool implements AddTool {
  constructor(
    private addToolRepository: AddToolRepository,
  ) {}

  async add(toolData: AddToolParams): Promise<ToolModel> {
    const tool = await this.addToolRepository.add(toolData);
    return tool;
  }
}
