import { ToolModel } from '../../domain/models/tool';

export type LoadToolsRepository = {
  loadAll: () => Promise<ToolModel[]>;
};
