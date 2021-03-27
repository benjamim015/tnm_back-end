import { DbLoadToolByTag } from '../../data/useCases/dbLoadToolByTag';
import { DbLoadTools } from '../../data/useCases/dbLoadTools';
import { ToolTypeORMRepository } from '../../infra/orm/typeorm/repositories/toolRepository';
import { LoadToolsController } from '../../presentation/controllers/loadToolsController';

export const makeLoadToolsController = (): LoadToolsController => {
  const toolTypeORMRepository = new ToolTypeORMRepository();
  const dbLoadTools = new DbLoadTools(toolTypeORMRepository);
  const dbLoadToolByTag = new DbLoadToolByTag(toolTypeORMRepository);
  return new LoadToolsController(dbLoadTools, dbLoadToolByTag);
};
