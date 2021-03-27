export const addToolPath = {
  post: {
    tags: ['Tool'],
    summary: 'Create new tool',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addToolParams',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/tool',
            },
          },
        },
      },
    },
  },
};
