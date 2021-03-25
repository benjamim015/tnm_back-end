import { AddTool } from '../../domain/useCases/addTool';
import { MissingParamError } from '../errors';
import { badRequest, ok, serverError } from '../helpers/http';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class AddToolController implements Controller {
  constructor(
    private addTool: AddTool,
  ) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['title', 'link', 'description', 'tags'];
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const tool = await this.addTool.add(body);
      return ok(tool);
    } catch (error) {
      return serverError();
    }
  }
}
