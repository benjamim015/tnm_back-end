import { AddToolRepository } from '../../../../data/protocols/addToolRepository';
import { LoadToolsRepository } from '../../../../data/protocols/loadToolsRepository';
import { ToolModel } from '../../../../domain/models/tool';
import { AddToolParams } from '../../../../domain/useCases/addTool';
import { Tool } from '../entities/tool';
import { TypeORMHelper } from '../helper';

export class ToolTypeORMRepository implements AddToolRepository, LoadToolsRepository {
  async add(toolData: AddToolParams): Promise<ToolModel> {
    const toolRepository = TypeORMHelper.instance.getRepository(Tool);
    const tool = toolRepository.create(toolData);
    await toolRepository.save(tool);
    return tool;
  }

  async loadAll(): Promise<ToolModel[]> {
    const toolRepository = TypeORMHelper.instance.getRepository(Tool);
    const tools = await toolRepository.find();
    return tools;
  }
}
