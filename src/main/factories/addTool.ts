import { DbAddTool } from '../../data/useCases/dbAddTool';
import { ToolTypeORMRepository } from '../../infra/orm/typeorm/repositories/toolRepository';
import { AddToolController } from '../../presentation/controllers/addToolController';

export const makeAddToolController = (): AddToolController => {
  const toolTypeORMRepository = new ToolTypeORMRepository();
  const dbAddTool = new DbAddTool(toolTypeORMRepository);
  return new AddToolController(dbAddTool);
};
