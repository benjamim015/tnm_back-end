import { addToolPath, getToolsPath, deleteToolPath } from './paths/tool';
import { toolSchema } from './schemas/tool';
import { addToolParamsSchema } from './schemas/addToolParams';

export default {
  openapi: '3.0.0',
  info: {
    title: 'TNM API',
    description: 'TNM test API',
    version: '1.0.0',
  },
  servers: [{
    url: '/api',
  }],
  tags: [{
    name: 'Tool',
  }],
  paths: {
    '/tools': { post: addToolPath.post, get: getToolsPath.get },
    '/tools/{id}': deleteToolPath,
  },
  schemas: {
    tool: toolSchema,
    addToolParams: addToolParamsSchema,
  },
};
