import { AddToolRepository } from '../../../../data/protocols/addToolRepository';
import { LoadToolByTagRepository } from '../../../../data/protocols/loadToolByTagRepository';
import { LoadToolsRepository } from '../../../../data/protocols/loadToolsRepository';
import { ToolModel } from '../../../../domain/models/tool';
import { AddToolParams } from '../../../../domain/useCases/addTool';
import { Tool } from '../entities/tool';
import { TypeORMHelper } from '../helper';

export class ToolTypeORMRepository implements AddToolRepository, LoadToolsRepository, LoadToolByTagRepository {
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

  async loadByTag(tag: string): Promise<ToolModel[]> {
    const toolRepository = TypeORMHelper.instance.getRepository(Tool);
    const tools = await toolRepository.query(`SELECT * FROM tools WHERE LOWER(array_to_string(tags, ',')) LIKE '%${tag.toLowerCase()}%'`);
    return tools;
  }
}
