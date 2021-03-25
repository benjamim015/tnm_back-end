import { ToolModel } from '../../domain/models/tool';
import { AddToolParams } from '../../domain/useCases/addTool';

export type AddToolRepository = {
  add: (tool: AddToolParams) => Promise<ToolModel>;
};
