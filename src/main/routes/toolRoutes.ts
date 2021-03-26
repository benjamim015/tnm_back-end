import { Router } from 'express';
import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeAddToolController } from '../factories/addTool';
import { makeLoadToolsController } from '../factories/loadTools';

export default (router: Router): void => {
  router.post('/tools', adaptRoute(makeAddToolController()));
  router.get('/tools', adaptRoute(makeLoadToolsController()));
};
