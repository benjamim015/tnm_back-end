export type RemoveToolByIdRepository = {
  removeById: (id: string) => Promise<void>;
};
