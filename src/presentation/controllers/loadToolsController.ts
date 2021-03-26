import { LoadTools } from '../../domain/useCases/loadTools';
import { ok, serverError } from '../helpers/http';
import { Controller, HttpResponse } from '../protocols';

export class LoadToolsController implements Controller {
  constructor(
    private loadTools: LoadTools,
  ) {}

  async handle(): Promise<HttpResponse> {
    try {
      const tools = await this.loadTools.loadAll();
      return ok(tools);
    } catch (error) {
      return serverError();
    }
  }
}
