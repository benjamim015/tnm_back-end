import { DbRemoveToolById } from '../../data/useCases/dbRemoveToolById';
import { ToolTypeORMRepository } from '../../infra/orm/typeorm/repositories/toolRepository';
import { RemoveToolController } from '../../presentation/controllers/removeToolController';

export const makeRemoveToolController = (): RemoveToolController => {
  const toolTypeORMRepository = new ToolTypeORMRepository();
  const dbRemoveToolById = new DbRemoveToolById(toolTypeORMRepository);
  return new RemoveToolController(dbRemoveToolById);
};
