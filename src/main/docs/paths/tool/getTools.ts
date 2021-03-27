export const getToolsPath = {
  get: {
    tags: ['Tool'],
    summary: 'Get all tools',
    parameters: [{
      in: 'query',
      name: 'tag',
      description: 'tag to filter',
      schema: {
        type: 'string',
      },
    }],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/tool',
              },
            },
          },
        },
      },
    },
  },
};
