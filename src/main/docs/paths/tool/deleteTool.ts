export const deleteToolPath = {
  delete: {
    tags: ['Tool'],
    summary: 'Delete a tool by id',
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'id to delete the tool',
      required: true,
      schema: {
        type: 'string',
        format: 'uuid',
      },
    }],
    responses: {
      204: {
        description: 'Success',
      },
    },
  },
};
