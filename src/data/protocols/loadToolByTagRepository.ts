import { ToolModel } from '../../domain/models/tool';

export type LoadToolByTagRepository = {
  loadByTag: (tag: string) => Promise<ToolModel[]>;
};
