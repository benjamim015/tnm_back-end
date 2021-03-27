import { LoadToolByTag } from '../../domain/useCases/loadToolByTag';
import { LoadTools } from '../../domain/useCases/loadTools';
import { ok, serverError } from '../helpers/http';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class LoadToolsController implements Controller {
  constructor(
    private loadTools: LoadTools,
    private loadToolByTag: LoadToolByTag,
  ) {}

  async handle(request?: HttpRequest): Promise<HttpResponse> {
    try {
      let tools = [];
      if (request?.query?.tag) {
        tools = await this.loadToolByTag.loadByTag(request.query.tag);
      } else {
        tools = await this.loadTools.loadAll();
      }
      return ok(tools);
    } catch (error) {
      return serverError();
    }
  }
}
