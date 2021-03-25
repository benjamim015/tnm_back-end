import { ToolModel } from '../models/tool';

export type AddToolParams = Omit<ToolModel, 'id'>;

export interface AddTool {
  add: (tool: AddToolParams) => Promise<ToolModel>;
}
