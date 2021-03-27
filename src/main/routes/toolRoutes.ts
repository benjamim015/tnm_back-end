import { Router } from 'express';
import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeAddToolController } from '../factories/addTool';
import { makeLoadToolsController } from '../factories/loadTools';
import { makeRemoveToolController } from '../factories/removeTool';

export default (router: Router): void => {
  router.post('/tools', adaptRoute(makeAddToolController()));
  router.get('/tools', adaptRoute(makeLoadToolsController()));
  router.delete('/tools/:id', adaptRoute(makeRemoveToolController()));
};
