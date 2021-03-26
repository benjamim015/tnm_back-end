import { ToolModel } from '../models/tool';

export interface LoadTools {
  loadAll: () => Promise<ToolModel[]>;
}
