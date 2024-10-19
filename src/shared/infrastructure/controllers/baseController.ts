import { container } from 'tsyringe';
import { DomainException } from '@shared/domain/exceptions/domainException';
import { ManagerRequestParsersController } from '@shared/infrastructure/controllers/requests/managerRequestParsersController';
import { BaseResponseType } from '@shared/infrastructure/controllers/responses/baseResponseType';
import { Logger } from '@shared/domain/loggers/logger';

export abstract class BaseController<RequestType, ResponseType> {
  protected logger: Logger;
  private managerRequestParser: ManagerRequestParsersController;

  constructor() {
    this.managerRequestParser = container.resolve<ManagerRequestParsersController>('ManagerRequestParsersController');
    this.logger = container.resolve<Logger>('Logger');
  }

  public async execute(event: any, context?: any): Promise<BaseResponseType> {
    const request: RequestType | null = null;
    try {
      const request = await this.parseEventToRequest(event, context);
      const result = await this.run(request, context, event);

      return this.generateSuccessResult(result);
    } catch (error) {
      // eslint-disable-next-line no-use-before-define
      return this.generateErrorResult(error, event, request);
    }
  }

  protected getSuccessStatusCode(response: ResponseType): number {
    if (!response) {
      return 204;
    }

    return 200;
  }

  protected generateSuccessResult(response: ResponseType): BaseResponseType {
    return {
      statusCode: this.getSuccessStatusCode(response),
      body: response,
    };
  }

  protected generateErrorResult(
    error: DomainException | Error | any,
    event: any,
    request?: RequestType | null,
  ): BaseResponseType {
    console.error({
      message: 'Error Result - Event >>>>>> ',
      event,
      request,
    });

    console.error({
      name: error.name,
      statusCode: error.status || 500,
      errorCode: error.code,
      message: error.message,
      stack: error.stack,
      metadata: error.metadata,
    });

    return {
      statusCode: error.status || 500,
      body: {
        statusCode: error.status || 500,
        errorCode: error.code,
        message: error.message,
      },
    };
  }

  private async parseEventToRequest(event: any, context?: any): Promise<RequestType> {
    const parser = this.managerRequestParser.getParser(event, context);
    const request = await parser.parseRequest<RequestType>(event, context);
    return request;
  }

  public abstract run(request: RequestType, context?: any, event?: any): Promise<ResponseType>;
}
