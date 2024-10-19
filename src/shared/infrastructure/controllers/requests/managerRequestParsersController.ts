import { injectable, injectAll } from 'tsyringe';
import { RequestParserController } from '@shared/infrastructure/controllers/requests/requestParserController';

@injectable()
export class ManagerRequestParsersController {
  private parsers: RequestParserController[];

  constructor(@injectAll('RequestParserController') parsers: RequestParserController[]) {
    this.parsers = parsers;
  }

  public getParser(event: any, context: any): RequestParserController {
    const parser = this.parsers.find((parser) => parser.match(event, context));
    if (!parser) {
      throw new Error('RequestParserController has not been found');
    }

    return parser;
  }
}
