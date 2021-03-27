import { RemoveToolById } from '../../domain/useCases/removeToolById';
import { noContent, serverError } from '../helpers/http';
import { Controller, HttpRequest, HttpResponse } from '../protocols';

export class RemoveToolController implements Controller {
  constructor(
    private removeToolById: RemoveToolById,
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      await this.removeToolById.removeById(request.params.id);
      return noContent();
    } catch (error) {
      return serverError();
    }
  }
}
