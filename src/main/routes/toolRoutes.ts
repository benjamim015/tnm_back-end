import { Router } from 'express';
import { adaptRoute } from '../adapters/expressRouteAdapter';
import { makeAddToolController } from '../factories/addTool';

export default (router: Router): void => {
  router.post('/tools', adaptRoute(makeAddToolController()));
};
