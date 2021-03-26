import { ToolModel } from '../models/tool';

export interface LoadToolByTag {
  loadByTag: (tag: string) => Promise<ToolModel[]>;
}
